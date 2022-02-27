import { Diagnose } from "../types";
import diagnoseData from "../../data/diagnoses";

const diagnoses: Array<Diagnose> = diagnoseData;

const getAllDiagnoses = (): Diagnose[] => {
    return diagnoses;
};

export default {
    getAllDiagnoses,
};