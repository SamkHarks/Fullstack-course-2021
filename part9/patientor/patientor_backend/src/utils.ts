import { NewPatient, Gender, Entry, NewEntry, HealthCheckRating, Discharge, SickLeave } from "./types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};


const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
      throw new Error('Incorrect or missing name');
    }
  
    return name;
};
  
const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};



const parseDateOfBirth = (dateOfBirth: unknown): string => {
    if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
        throw new Error('Incorrect or missing date of Birth: ' + dateOfBirth);
    }
    return dateOfBirth;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};

const parseOccupation = (occupation: unknown): string => {
    if(!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation');
    }
    return occupation;
};

// Not checking here if the form of ssn is correct xxxxxx-xxxx
const parseSsn = (ssn: unknown): string => {
    if(!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn: ' + ssn);
    }
    return ssn;
};


type Fields = {name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };

const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation } : Fields): NewPatient => {
    
    const newEntry: NewPatient = {
        name: parseName(name),
        dateOfBirth: parseDateOfBirth(dateOfBirth),
        ssn: parseSsn(ssn),
        gender: parseGender(gender),
        occupation: parseOccupation(occupation),
        entries: []
    };

    return newEntry;
};

type EntryField = { 
    description: unknown;
    date: unknown;
    specialist: unknown;
    diagnosisCodes?: unknown;
    type: unknown;
    healthCheckRating?: unknown;
    dischargeDate?: unknown;
    criteria?: unknown;
    employerName?: unknown;
    startDate?: unknown;
    endDate?: unknown;
};

const isEntryType = (type: string): type is Entry['type'] => {
    return ['Hospital', 'HealthCheck', 'OccupationalHealthcare'].includes(type);
};

const parseType = (type: unknown): Entry['type'] => {
    if( !type || !isString(type) || !isEntryType(type)) {
        throw new Error('Incorrect or missing type');
    }
    return type;
};

const isArryofStrings = (arr: unknown): arr is string[] => {
    let isArrayValuesStrings = true;
    if (Array.isArray(arr)) {
        arr.forEach(input => {
            if (!isString(input)) {
                isArrayValuesStrings = false;
            }
        });
    }
    return isArrayValuesStrings;
};

const parseDiagnosisCodes = (codes: unknown): string[] | undefined => {
    if (codes === undefined) {
        return codes;
    }
    if (!isArryofStrings(codes)) {
        throw new Error('incorrect diagnosisCodes');
    }
    return codes;
};

const parseInputString = (input: unknown, error: string): string => {
    if (!input || !isString(input)) {
        throw new Error(error);
    }
    return input;
};

const parseDischarge = (dischargeDate: unknown, criteria: unknown): Discharge => {
    if (!dischargeDate || !criteria || !isString(dischargeDate) || !isString(criteria)) {
        throw new Error('Incorrect or missing date or criteria'); 
    }
    return { date: dischargeDate, criteria } as Discharge;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(HealthCheckRating).includes(Number(param));
};

const parseHealthCheackRating = (healthCheckRating: unknown): HealthCheckRating => {
    if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
        throw new Error('Incorrect or missing health check rating: ' + healthCheckRating);
    }
    return healthCheckRating;
};

const parseSickLeave = (startDate: unknown, endDate: unknown): SickLeave | undefined => {
    if (!startDate && !endDate) return;
    if (!startDate || !endDate || !isString(startDate) || !isString(endDate)) {
        throw new Error('Incorrect or missing dates'); 
    }
    return { startDate, endDate } as SickLeave;
};

export const toNewEntry = (entry: EntryField): NewEntry => {
    const type = parseType(entry.type);
    const newEntry = {
        description: parseInputString(entry.description, 'Incorrect or missing description'),
        date: parseInputString(entry.date, 'Incorrect or missing date'),
        specialist: parseInputString(entry.specialist, 'Incorrect or missing specialist'),
        diagnosisCodes: parseDiagnosisCodes(entry.diagnosisCodes),
    };

    switch (type) {
        case 'HealthCheck': {
            const HealthCheckEntry: NewEntry = {
                ...newEntry,
                type,
                healthCheckRating: parseHealthCheackRating(entry.healthCheckRating),
            };
            return HealthCheckEntry;
        }
        case 'Hospital':
            const HospitalEntry: NewEntry = {
                ...newEntry,
                type,
                discharge: parseDischarge(entry.dischargeDate, entry.criteria),
            };
            return HospitalEntry;
        case 'OccupationalHealthcare':
            const OccupationalHealtCareEntry: NewEntry = {
                ...newEntry,
                type,
                employerName: parseInputString(entry.employerName, 'Incorrect or missing employer name'),
                sickLeave: parseSickLeave(entry.startDate, entry.endDate),
            };
            return OccupationalHealtCareEntry;
        default:
            throw new Error('Something went wrong with new Entry');
    }
};

export default toNewPatientEntry;