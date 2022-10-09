import React from "react";
import AccountInputArea from "../AccountInputArea/AccountInputArea";
import { checkLettersOnly, checkValidEmail, checkValidPassword, checkValidPostcode } from "../validations";
import { fieldNames } from "../constants";
import "./AccountManagementBox.css";

class AccountManagementBox extends React.Component {
    constructor() {
        super();
        this.state = {
            createAccountMode: true,
            errors: {
                [this.errorKeyNameFor(fieldNames.emailCreate)]: "",
                [this.errorKeyNameFor(fieldNames.passwordCreate)]: "",
                [this.errorKeyNameFor(fieldNames.passwordConfirm)]: "",
                [this.errorKeyNameFor(fieldNames.firstName)]: "",
                [this.errorKeyNameFor(fieldNames.surname)]: "",
                [this.errorKeyNameFor(fieldNames.postcode)]: "",
            }
        }
        this.validationFunctions = new Map([
            [
                fieldNames.emailCreate, 
                value => {
                    if (this.doesAccountExist(value)) { return "An account with that E-Mail already exists."; }
                    return checkValidEmail(value) ? "" : "Please enter a valid E-Mail."
                }
            ],
            [
                fieldNames.passwordCreate, 
                value => checkValidPassword(value) ? "" : "Please enter a valid password."
            ],
            [
                fieldNames.passwordConfirm, 
                value => {
                    console.log("confirm validation");
                    return this.state[fieldNames.passwordCreate] === value ? "" : "The passwords must match."
                }
            ],
            [
                fieldNames.firstName, 
                value => checkLettersOnly(value) ? "" : "Please enter a valid first name."
            ],
            [
                fieldNames.surname, 
                value => checkLettersOnly(value) ? "" : "Please enter a valid surname."
            ],
            [
                fieldNames.postcode, 
                value => checkValidPostcode(value) ? "" : "Please enter a valid postcode."
            ],
        ]);
        /*
        create email field: string valid AND not taken by existing account
        create password field: string valid
        confirm password field: matches above field
        first name: string valid
        surname: string valid
        postcode: string valid
        */
    }

    errorKeyNameFor = fieldName => `${fieldName}Error`;

    doesAccountExist = email => false; //DO!!!!!!!

    validateByFieldName = (fieldName, fieldValue) => {
        console.log("Validating " + fieldName);
        if (!this.validationFunctions.has(fieldName)) { return ""; }
        return this.validationFunctions.get(fieldName)(fieldValue);
        // if (fieldName === fieldName.emailCreate && this.doesAccountExist(fieldValue)) {
        //     return "An account with that E-Mail already exists.";
        // }
        // else if (fieldName === fieldName.passwordConfirm && this.state[fieldName.passwordCreate] !== fieldValue) {
        //     return "The passwords must match.";
        // }
        // else if (!this.validationFunctions.has(fieldName)) {
        //     return "";
        // }
        // else {
        //     return this.validationFunctions.get(fieldName)(fieldValue);
        // }
    };

    handleChange = event => {
        if (event.target.name === "accountInputToggle") {
            this.setState(prevState => ({ createAccountMode: !prevState.createAccountMode}));
        }
        this.setState(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value, 
        }));
    };

    handleBlur = event => {
        const { target: { name, value }} = event;
        const inputError = this.validateByFieldName(name, value);
        const errorKey = this.errorKeyNameFor(name);
        this.setState(prevState => ({
            ...prevState,
            errors: {
                ...prevState.errors,
                [errorKey]: inputError,
            }
        }))
    };

    handleSubmit = event => {
        event.preventDefault();
        
    };

    buildInputAreas = paramsArray => {
        return (paramsArray.map(item => (
            <AccountInputArea 
                params={item} 
                key={item.name} 
                changeFunction={this.handleChange} 
                blurFunction={this.handleBlur}/>
            )
        ))
    };

    createAccountForm = () => {
        const params = [
            {
                name: fieldNames.emailCreate,
                type: "email",
                labelText: "Your E-Mail Address",
                errorText: this.state.errors[this.errorKeyNameFor(fieldNames.emailCreate)],
            },
            {
                name: fieldNames.passwordCreate,
                type: "password",
                labelText: "Create Password",
                subText: "Password must be 8-20 characters, including: at least one capital letter, at least one small letter, one number and one special character - ! @ # $ % ^ & * () _ +",
                errorText: this.state.errors[this.errorKeyNameFor(fieldNames.passwordCreate)],
            },
            {
                name: fieldNames.passwordConfirm,
                type: "password",
                labelText: "Confirm Password",
                errorText: this.state.errors[this.errorKeyNameFor(fieldNames.passwordConfirm)],
            },
            {
                name: fieldNames.firstName,
                type: "text",
                labelText: "First Name",
                errorText: this.state.errors[this.errorKeyNameFor(fieldNames.firstName)],
            },
            {
                name: fieldNames.surname,
                type: "text",
                labelText: "Surname",
                errorText: this.state.errors[this.errorKeyNameFor(fieldNames.surname)],
            },
            {
                name: fieldNames.postcode,
                type: "number",
                labelText: "Postcode",
                errorText: this.state.errors[this.errorKeyNameFor(fieldNames.postcode)],
            }
        ];
        return this.buildInputAreas(params);
    }

    signInForm = () => {
        const params = [
            {
                name: fieldNames.emailLogin,
                type: "email",
                labelText: "E-Mail Address",
            },
            {
                name: fieldNames.passwordLogin,
                type: "password",
                labelText: "Password",
            }
        ];
        return this.buildInputAreas(params);
    }


    render() {
        const { createAccountMode } = this.state;
        return (
            <div className="account-management-box">
                <div>
                    <input type="radio" name="accountInputToggle" id="login-toggle" onChange={this.handleChange} checked={!createAccountMode} />
                    <label htmlFor="login-toggle">SIGN IN</label>
                    <input type="radio" name="accountInputToggle" id="create-account-toggle" onChange={this.handleChange} checked={createAccountMode} />
                    <label htmlFor="create-account-toggle">CREATE ACCOUNT</label>
                </div>
                <form action="">
                    {createAccountMode ? this.createAccountForm() : this.signInForm()}
                    <input type="submit" value={createAccountMode ? "SAVE" : "SIGN IN"} onClick={this.handleSubmit} />
                </form>
            </div>
        )
    }
}

export default AccountManagementBox;