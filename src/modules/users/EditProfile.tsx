import { Typography, Button, Grid } from "@mui/material";
import { Formik, FormikHelpers, Field, Form } from "formik";
import React from "react";
import { FormTextField } from "./FormInputField";
import * as Yup from "yup";

interface FormValues {
    fullName: string;
    lastName: string;
    firstName: string;
    email: string;
    confirmEmail: string;
    password: string;
    confirmPassword: string;
    role: string;
    phoneNumber: Number;
}
const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Full Name Required"),
    lastName: Yup.string().required("Last Name Required"),
    firstName: Yup.string().required("First Name Required"),
    email: Yup.string().required("Email is Required"),
    confirmEmail: Yup.string().required("Confirm is Required"),
    password: Yup.string().required("password Required"),
    confirmPassword: Yup.string().required("Confirm Password Required"),

});
function EditProfile() {
    return (
        <div>
            <Typography textAlign="center" variant="h4" className="py-10">Edit Profile </Typography>
            <Formik
                initialValues={{
                    fullName: "",
                    lastName: "",
                    firstName: "",
                    email: "",
                    confirmEmail: "",
                    password: "",
                    confirmPassword: "",
                    role: "",
                    phoneNumber: 123456789
                }}
                validationSchema={validationSchema}
                onSubmit={(
                    values: FormValues,
                    formikHelpers: FormikHelpers<FormValues>
                ) => {
                    alert(JSON.stringify(values, null, 2));
                    formikHelpers.setSubmitting(false);
                }}
            >
                {({ handleSubmit, isSubmitting }) => (
                    <Form onSubmit={handleSubmit}>

                        <div className="max-w-[600px] mx-auto ">

                            <Field
                                name="fullName"
                                label="Full Name"
                                size="small"
                                component={FormTextField}
                            />   <Field
                                name="firstName"
                                label="First Name"
                                size="small"
                                component={FormTextField}
                            />   <Field
                                name="lastName"
                                label="Last Name"
                                size="small"
                                component={FormTextField}
                            />   <Field
                                name="email"
                                label="Email"
                                size="small"
                                type="email"
                                component={FormTextField}
                            /> <Field
                                name="confirmEmail"
                                label="Retype Email"
                                type="email"
                                size="small"
                                component={FormTextField}
                            /> <Field
                                name="password"
                                label="Password"
                                size="small"
                                type="password"
                                component={FormTextField}
                            /><Field
                                name="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                size="small"
                                component={FormTextField}
                            />

                            <div>
                                <div className='flex gap-4 items-center my-4 '>
                                    <div className='max-w-[150px] w-full' >{"Role"}</div>
                                    <Field name="role" as="select" className="max-w-[400px] rounded-md bg-white border border-[#c4c4c4] w-full p-[10.5px]">

                                        <option value="red">Red</option>

                                        <option value="green">Green</option>

                                        <option value="blue">Blue</option>

                                    </Field>


                                </div>
                            </div>
                            <Field
                                name="phoneNumber"
                                label="Phone Number"
                                size="small"
                                type="number"
                                component={FormTextField}
                            />

                            <div className="flex gap-5 pt-10 justify-center ">
                                <button
                                    type="submit"
                                    className="rounded-md  text-white bg-[#4979D1] px-10 py-3"
                                    disabled={isSubmitting}
                                >
                                    Submit
                                </button>
                                <button
                                    className="rounded-md  text-[#4979D1] border border-[#4979D1] px-10 py-3"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default EditProfile;
