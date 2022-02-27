import React from 'react';
import { useStateValue } from '../state/state';
import { Entry, HealthCheckEntry, HealthCheckRating, HospitalEntry, OccupationalHealthcareEntry,  } from '../types';

const BasicEntry = ({ entry, empoylerName }: { entry: Entry, empoylerName?: string }) => {
    const [{ diagnoses },] = useStateValue();
    
    const setEntryTypeIcon = (entryType: Entry['type']):string => {
        switch(entryType) {
            case "Hospital":
                return "icon hospital";
            case "HealthCheck":
                return "icon user md";
            case "OccupationalHealthcare":
                return "icon stethoscope";
            default:
                return "icon question";
        }
    };
    
    return (
        <div>
            <h3>
                {entry.date + " "} <i className={setEntryTypeIcon(entry.type)}></i>
                {empoylerName}
            </h3>
            <em>{entry.description}</em>
            <ul>
                {entry.diagnosisCodes && entry.diagnosisCodes?.map(code => {
                    return (
                        <li key={code}>
                            {code} {diagnoses[code]?.name}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

const HostpitalEntry = ({ entry }: { entry: HospitalEntry }) => {
    return (
        <div>
            <BasicEntry entry={entry} />
            {entry.discharge.criteria} {entry.discharge.date}
        </div>
    );
};

const OccupationHealtCareEntry = ({ entry }: {entry: OccupationalHealthcareEntry}) => {
    const dateStart = entry.sickLeave?.startDate ? "sick leave began: " : "";
    const dateEnd = entry.sickLeave?.endDate ? "sick leave ended: ": "";
    return (
        <div>
            <BasicEntry entry={entry} empoylerName={entry.employerName} />
            {entry.sickLeave && <h5>{dateStart} {entry.sickLeave?.startDate}<br></br>
            {dateEnd} {entry.sickLeave?.endDate}</h5>}
        </div>
    );
};

const HealtCheckEntry = ({ entry }: {entry: HealthCheckEntry}) => {
    const setRating = (rating: HealthCheckRating) => {
        switch(rating){
            case 0:
                return "green";
            case 1:
                return "red";
            case 2:
                return "yellow";
            case 3:
                return "black";
            default: return "white";
        }
    };
    
    return (
        <div>
            <BasicEntry entry={entry} />
            <i className={'icon heart'} style={{ color:setRating(entry.healthCheckRating) }}></i>
        </div>
    );
};

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch(entry.type) {
        case "Hospital": 
            return <HostpitalEntry entry={entry} />;
        case "OccupationalHealthcare":
            return <OccupationHealtCareEntry entry={entry} />;
        case "HealthCheck":
            return <HealtCheckEntry entry={entry} />;
        default: return assertNever(entry);
    }
};

export { EntryDetails, BasicEntry };