import React from "react";
import AccountInputArea from "../AccountInputArea/AccountInputArea";
import { checkLettersOnly, checkValidEmail, checkValidPassword, checkValidPostcode } from "../validations";
import { fieldNamesCreate, fieldNamesLogin } from "../constants";
import { addAccount, doesAccountExist, tryVerifyLogin } from "../accounts";
import "./AccountManagementBox.css";

class AccountManagementBox extends React.Component {
    constructor() {
        super();
        this.state = {
            createAccountMode: true,
            errors: {
                [this.errorKeyNameFor(fieldNamesCreate.emailCreate)]: "",
                [this.errorKeyNameFor(fieldNamesCreate.passwordCreate)]: "",
                [this.errorKeyNameFor(fieldNamesCreate.passwordConfirm)]: "",
                [this.errorKeyNameFor(fieldNamesCreate.firstName)]: "",
                [this.errorKeyNameFor(fieldNamesCreate.surname)]: "",
                [this.errorKeyNameFor(fieldNamesCreate.postcode)]: "",
            },
            submitDisabled: true,
        }
        this.validationFunctions = new Map([
            [
                fieldNamesCreate.emailCreate, 
                value => {
                    if (this.doesAccountExist(value)) { return "An account with that E-Mail already exists."; }
                    return checkValidEmail(value) ? "" : "Please enter a valid E-Mail."
                }
            ],
            [
                fieldNamesCreate.passwordCreate, 
                value => checkValidPassword(value) ? "" : "Please enter a valid password."
            ],
            [
                fieldNamesCreate.passwordConfirm, 
                value => this.state[fieldNamesCreate.passwordCreate] === value ? "" : "The passwords must match."
            ],
            [
                fieldNamesCreate.firstName, 
                value => checkLettersOnly(value) ? "" : "Please enter a valid first name."
            ],
            [
                fieldNamesCreate.surname, 
                value => checkLettersOnly(value) ? "" : "Please enter a valid surname."
            ],
            [
                fieldNamesCreate.postcode, 
                value => checkValidPostcode(value) ? "" : "Please enter a valid postcode."
            ],
        ]);
    }

    errorKeyNameFor = fieldName => `${fieldName}Error`;

    doesAccountExist = email => false; //DO!!!!!!!

    validateByFieldName = (fieldName, fieldValue) => {
        if (!this.validationFunctions.has(fieldName)) { return ""; }
        return this.validationFunctions.get(fieldName)(fieldValue);
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
        const newErrors = {
            ...this.state.errors,
            [errorKey]: inputError,
        };
        if (name === fieldNamesCreate.passwordCreate) {
            const passwordConfirmError = this.validateByFieldName(fieldNamesCreate.passwordConfirm, this.state[fieldNamesCreate.passwordConfirm]);
            const passwordConfirmErrorKey = this.errorKeyNameFor(fieldNamesCreate.passwordConfirm);
            newErrors[passwordConfirmErrorKey] = passwordConfirmError;
        }
        this.setState(prevState => ({
            ...prevState,
            errors: newErrors,
            submitDisabled: this.state.createAccountMode && !this.isAccountFormReady(newErrors),
        }));
    };

    handleSubmit = event => {
        event.preventDefault();
        
    };

    tryFindInputErrors = errors => {
        console.log("Checking for errors");
        console.log(errors);
        for (const key in errors) {
            if (errors[key].length > 0) {
                console.log("Found an error");
                return true;
            }
        }
        return false;
    }

    tryFindEmptyField = () => {
        for (const item in fieldNamesCreate) {
            if (!this.state[item] || this.state[item].length === 0) {
                return true;
            }
        }
        return false;
    }

    isAccountFormReady = currentErrors => !this.tryFindInputErrors(currentErrors) && !this.tryFindEmptyField();

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
                name: fieldNamesCreate.emailCreate,
                type: "email",
                labelText: "Your E-Mail Address",
                errorText: this.state.errors[this.errorKeyNameFor(fieldNamesCreate.emailCreate)],
            },
            {
                name: fieldNamesCreate.passwordCreate,
                type: "password",
                labelText: "Create Password",
                subText: "Password must be 8-20 characters, including: at least one capital letter, at least one small letter, one number and one special character - ! @ # $ % ^ & * () _ +",
                errorText: this.state.errors[this.errorKeyNameFor(fieldNamesCreate.passwordCreate)],
            },
            {
                name: fieldNamesCreate.passwordConfirm,
                type: "password",
                labelText: "Confirm Password",
                errorText: this.state.errors[this.errorKeyNameFor(fieldNamesCreate.passwordConfirm)],
            },
            {
                name: fieldNamesCreate.firstName,
                type: "text",
                labelText: "First Name",
                errorText: this.state.errors[this.errorKeyNameFor(fieldNamesCreate.firstName)],
            },
            {
                name: fieldNamesCreate.surname,
                type: "text",
                labelText: "Surname",
                errorText: this.state.errors[this.errorKeyNameFor(fieldNamesCreate.surname)],
            },
            {
                name: fieldNamesCreate.postcode,
                type: "number",
                labelText: "Postcode",
                errorText: this.state.errors[this.errorKeyNameFor(fieldNamesCreate.postcode)],
            }
        ];
        return this.buildInputAreas(params);
    }

    signInForm = () => {
        const params = [
            {
                name: fieldNamesLogin.emailLogin,
                type: "email",
                labelText: "E-Mail Address",
            },
            {
                name: fieldNamesLogin.passwordLogin,
                type: "password",
                labelText: "Password",
            }
        ];
        return this.buildInputAreas(params);
    }


    render() {
        const { createAccountMode, submitDisabled } = this.state;
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
                    <input type="submit" value={createAccountMode ? "SAVE" : "SIGN IN"} onClick={this.handleSubmit} disabled={submitDisabled} />
                </form>
            </div>
        )
    }
}

export default AccountManagementBox;