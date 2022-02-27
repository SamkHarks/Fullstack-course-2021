import React from "react";
import { Field, Formik, Form } from "formik";
import { Entry, EntryFormValues } from "../types";
import { DiagnosisSelection, NumberField, TextField, TypeSelection } from "../AddPatientModal/FormField";
import { Button, Grid } from "semantic-ui-react";
import diagnoses from "../data/diagnoses";

const typeOptions: Array<Entry['type']> = ['Hospital', 'OccupationalHealthcare', 'HealthCheck'];

interface Props {
    onSubmit: (values: EntryFormValues) => void;
    onCancel: () => void;
}

export const AddEntryForm =({ onSubmit, onCancel } : Props ) => {
    return (
        <Formik
        initialValues={{
            type: "Hospital",
            description: "",
            date: "",
            specialist: "",
        }}
        onSubmit={onSubmit}
        validate={values => {
            const requiredError = "Field is required";
            const errors: { [field: string]: string } = {};
            if (!values.type) {
                errors.type = requiredError;
            }
            if (!values.description) {
                errors.description = requiredError;
            }
            if (!values.date) {
                errors.date = requiredError;
            }
            if (!values.specialist) {
                errors.specialist = requiredError;
            }
            if (values.type ==='Hospital' && !values.dischargeDate) {
                errors.dischargeDate = requiredError;
            }
            if (values.type ==='Hospital' && !values.criteria) {
                errors.criteria = requiredError;
            }
            if (values.type ==='HealthCheck' && !values.healthCheckRating) {
                errors.healthCheckRating = requiredError;
            }
            if (values.type ==='OccupationalHealthcare' && !values.employerName) {
                errors.employerName = requiredError;
            }
            if (values.type ==='OccupationalHealthcare' && !values.startDate) {
                errors.startDate = requiredError;
            }
            if (values.type ==='OccupationalHealthcare' && !values.endDate) {
                errors.endDate = requiredError;
            }
            return errors;
        }}
        >
        {({ isValid, dirty, setFieldValue, setFieldTouched, values  }) => {
            return (
            <Form className="form ui">
                <TypeSelection
                    label="Type"
                    name="type"
                    options={typeOptions}
                />
                <Field
                    label="Specialist"
                    placeholder="Specialist"
                    name="specialist"
                    component={TextField}
                />
                <Field
                    label="Description"
                    placeholder="Description"
                    name="description"
                    component={TextField}
                />
                <Field
                    label="Date"
                    placeholder="YYYY-MM-DD"
                    name="date"
                    component={TextField}
                />
                <DiagnosisSelection
                    setFieldValue={setFieldValue}
                    setFieldTouched={setFieldTouched}
                    diagnoses={Object.values(diagnoses)}
                />
                {values.type === 'HealthCheck' && <Field
                    label="Health Check Rating"
                    name="healthCheckRating"
                    component={NumberField}
                    min={0}
                    max={3}
                />}
                {values.type === 'Hospital' && (<>
                    <Field
                        label="Discharge Date"
                        placeholder="YYYY-MM-DD"
                        name="dischargeDate"
                        component={TextField}
                    />
                    <Field
                        label="Criteria"
                        placeholder="Criteria"
                        name="criteria"
                        component={TextField}
                    />
                </>)}
                {values.type === 'OccupationalHealthcare' && (<>
                    <Field
                        label="Employer Name"
                        placeholder="Name"
                        name="employerName"
                        component={TextField}
                    />
                    <Field
                        label="Sick Leave Starting Date"
                        placeholder="YYYY-MM-DD"
                        name="startDate"
                        component={TextField}
                    />
                    <Field
                        label="Sick Leave Ending Date"
                        placeholder="YYYY-MM-DD"
                        name="endDate"
                        component={TextField}
                    />
                </>)}
                <Grid>
                <Grid.Column floated="left" width={5}>
                    <Button type="button" onClick={onCancel} color="red">
                    Cancel
                    </Button>
                </Grid.Column>
                <Grid.Column floated="right" width={5}>
                    <Button
                    type="submit"
                    floated="right"
                    color="green"
                    disabled={!dirty || !isValid}
                    >
                    Add
                    </Button>
                </Grid.Column>
                </Grid>
            </Form>
            );
        }}
        </Formik>
    );
};