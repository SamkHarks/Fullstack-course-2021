import { Patient, NonSensitivePatient, NewPatient, Entry, NewEntry } from "../types";
import patients from '../../data/patients';
import {v1 as uuid} from 'uuid';



//const patients: Patient[] = patientData;

const getPatients = (): NonSensitivePatient[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation})=> ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};
 
const addPatient = (patient: NewPatient): Patient => {
    const id: string = uuid();
    const newPatient: Patient = {
        id,
        ...patient
    };

    patients.push(newPatient);
    return newPatient;
};

const getPatient = (id: string): Patient | undefined => {
    return patients.find(p => p.id === id);
};

const addEntry = (id: string, entry: NewEntry): Entry => {
    const entryId: string = uuid();
    const newEntry: Entry = {
        id: entryId,
        ...entry
    };

    patients.map(p => p.id === id ? p.entries.push(newEntry) : p);
    return newEntry;
};

export default {
    getPatients,
    addPatient,
    getPatient,
    addEntry,
};