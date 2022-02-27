import React from 'react';
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from '../constants';
import { Entry, EntryFormValues, Patient } from '../types';
import axios from "axios";
import { useStateValue } from '../state/state';
import { setEntry, setPatient } from '../state/reducer';
import { PatientHeader } from './PatientHeader';
import { PatientEntries } from './PatientEntries';
import AddEntryModal from '../AddEntryModal';
import { Button } from 'semantic-ui-react';


const PatientPage = () => {
    const [{ patients }, dispatch] = useStateValue();
    const { id } = useParams<{id:string}>();
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();
  
    const openModal = (): void => setModalOpen(true);
  
    const closeModal = (): void => {
      setModalOpen(false);
      setError(undefined);
    };

    const patient = patients[id];
    React.useEffect(() => {
      const fetchPatient = async () => {
      try {
        if(!patient?.ssn) {
            const { data: patient } = await axios.get<Patient>(
                `${apiBaseUrl}/patients/${id}`
            );
            dispatch(setPatient(patient));
        }
      } catch (e) {
        console.log('failed to fetch patient, error: ',e);
      }
    };
    void fetchPatient();
    }, [dispatch,id]);
    
    if (!patient) return null;

    const submitNewEntry = async (values: EntryFormValues) => {
      try {
        const { data: newEntry } = await axios.post<Entry>(
          `${apiBaseUrl}/patients/${id}/entries`,
          values
        );
        dispatch(setEntry(id, newEntry));
      } catch (e) {
        console.log('Failed to submit new entry, error: ', e);
      }
    };

    return (
        <div className="App" >
            <PatientHeader patient={patient} />
            <PatientEntries patient={patient} />
            <AddEntryModal
              modalOpen={modalOpen}
              onSubmit={submitNewEntry}
              error={error}
              onClose={closeModal}
            />
            <Button onClick={() => openModal()}>Add New Entry for Patient</Button>
        </div>
    );
};

export { PatientPage };