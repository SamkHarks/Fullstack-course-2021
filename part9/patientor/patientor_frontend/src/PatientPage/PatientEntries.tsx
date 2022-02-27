import React from "react";
import { Patient } from "../types";
import { Segment } from 'semantic-ui-react';
import { EntryDetails } from './EntryDetails';

interface Props {
    patient: Patient;
}

export const PatientEntries = ({ patient }: Props) => {

    const renderPatients = () => {
        return (
            <Segment.Group>
                {patient.entries.map(entry =>{
                    return (
                        <Segment key={entry.id}>
                            <EntryDetails entry={entry} />
                        </Segment>
                    );
                })}
            </Segment.Group>
        );
    };

    return (
        <div>
            {patient.entries && patient.entries.length > 0 && renderPatients()}
        </div>
    );
};