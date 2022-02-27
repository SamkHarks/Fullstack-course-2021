import { State } from "./state";
import { Diagnosis, Entry, Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSES_LIST";
      payload: Diagnosis[];
    }
  | {
      type: "SET_ENTRY";
      payload: { id: string, entry: Entry };
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "SET_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_DIAGNOSES_LIST":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (car, diagnose) => ({ ...car, [diagnose.code]: diagnose}),
            {}
          ),
          ...state.diagnoses
        }
      };
    case "SET_ENTRY":
      const patient = state.patients[action.payload.id];
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: { ...patient, entries: patient.entries.concat(action.payload.entry) }
        }
      };
    default:
      return state;
  }
};


const setPatientList = (patientListFromApi: Patient[]): Action => {
  return { type: "SET_PATIENT_LIST", payload: patientListFromApi };
};

const setPatient = (patient: Patient): Action => {
  return { type: "SET_PATIENT", payload: patient };
};

const setNewPatient = (newPatient: Patient): Action => {
  return { type: "ADD_PATIENT", payload: newPatient };
};

const setDiagnosisList = (diagnosisListFromApi: Diagnosis[]): Action => {
  return { type: "SET_DIAGNOSES_LIST", payload: diagnosisListFromApi };
};

const setEntry = (id: string, newEntry: Entry): Action => {
  return { type: "SET_ENTRY", payload: { id, entry: newEntry }};
};

export {
  setPatientList,
  setPatient,
  setNewPatient,
  setDiagnosisList,
  setEntry,
};