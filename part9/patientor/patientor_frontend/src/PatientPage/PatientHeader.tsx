import React from 'react';
import { Gender, Patient } from '../types';

interface Props {
    patient: Patient;
}

export const PatientHeader = ({ patient } : Props) => {
     
    const setIcon = (gender: Gender):string => {
        switch(gender){
            case "male":
                return "icon mars";
            case "female":
                return "icon venus";
            case "other":
                return "icon genderless";
            default: return "icon question";
        }
    };

    return (
    <div>
        <h3>{patient.name}<i className={setIcon(patient.gender)}></i></h3>
        <p>
        ssn: {patient.ssn}<br></br>
        occupation: {patient.occupation}
        </p>
    </div>
    );
};