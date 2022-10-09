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
            [fieldNamesCreate.emailCreate]: "",
            [fieldNamesCreate.passwordCreate]: "",
            [fieldNamesCreate.passwordConfirm]: "",
            [fieldNamesCreate.firstName]: "",
            [fieldNamesCreate.surname]: "",
            [fieldNamesCreate.postcode]: "",
            fieldErrors: {
                [this.errorKeyNameFor(fieldNamesCreate.emailCreate)]: "",
                [this.errorKeyNameFor(fieldNamesCreate.passwordCreate)]: "",
                [this.errorKeyNameFor(fieldNamesCreate.passwordConfirm)]: "",
                [this.errorKeyNameFor(fieldNamesCreate.firstName)]: "",
                [this.errorKeyNameFor(fieldNamesCreate.surname)]: "",
                [this.errorKeyNameFor(fieldNamesCreate.postcode)]: "",
            },
            submitError: "",
        }
        this.validationFunctions = new Map([
            [
                fieldNamesCreate.emailCreate, 
                value => {
                    if (doesAccountExist(value)) { return "An account with that E-Mail already exists."; }
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
            ...this.state.fieldErrors,
            [errorKey]: inputError,
        };
        if (name === fieldNamesCreate.passwordCreate) {
            const passwordConfirmError = this.validateByFieldName(fieldNamesCreate.passwordConfirm, this.state[fieldNamesCreate.passwordConfirm]);
            const passwordConfirmErrorKey = this.errorKeyNameFor(fieldNamesCreate.passwordConfirm);
            newErrors[passwordConfirmErrorKey] = passwordConfirmError;
        }
        this.setState(prevState => ({
            ...prevState,
            fieldErrors: newErrors,
        }));
    };

    handleSubmit = event => {
        event.preventDefault();
        const { createAccountMode } = this.state;
        const submitError = createAccountMode && !this.isAccountFormReady() ? 
            "We're sorry, but one or more fields are incomplete or incorrect. Find errors." : 
            "";
        this.setState(prevState => ({
            ...prevState,
            submitError: submitError,
        }));
        if (submitError.length === 0) {
            this.doSubmit(event);
        }
    };

    doSubmit = event => {
        if (this.state.createAccountMode) {
            addAccount(
                this.state[fieldNamesCreate.emailCreate],
                this.state[fieldNamesCreate.passwordCreate],
                this.state[fieldNamesCreate.firstName],
                this.state[fieldNamesCreate.surname],
                this.state[fieldNamesCreate.postcode],
            ); //can destructuring be used here??????????????
            this.clearFields();
        }
    }

    clearFields = () => {
        console.log("clearing");
        this.setState(prevState => ({
            ...prevState,
            [fieldNamesCreate.emailCreate]: "",
            [fieldNamesCreate.passwordCreate]: "",
            [fieldNamesCreate.passwordConfirm]: "",
            [fieldNamesCreate.firstName]: "",
            [fieldNamesCreate.surname]: "",
            [fieldNamesCreate.postcode]: "",
        }));
    }

    tryFindInputErrors = () => {
        const { fieldErrors: errors } = this.state;
        for (const key in errors) {
            if (errors[key].length > 0) {
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

    isAccountFormReady = () => !this.tryFindInputErrors() && !this.tryFindEmptyField();

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
                value: this.state[fieldNamesCreate.emailCreate],
                labelText: "Your E-Mail Address",
                errorText: this.state.fieldErrors[this.errorKeyNameFor(fieldNamesCreate.emailCreate)],
            },
            {
                name: fieldNamesCreate.passwordCreate,
                type: "password",
                value: this.state[fieldNamesCreate.passwordCreate],
                labelText: "Create Password",
                subText: "Password must be 8-20 characters, including: at least one capital letter, at least one small letter, one number and one special character - ! @ # $ % ^ & * () _ +",
                errorText: this.state.fieldErrors[this.errorKeyNameFor(fieldNamesCreate.passwordCreate)],
            },
            {
                name: fieldNamesCreate.passwordConfirm,
                type: "password",
                value: this.state[fieldNamesCreate.passwordConfirm],
                labelText: "Confirm Password",
                errorText: this.state.fieldErrors[this.errorKeyNameFor(fieldNamesCreate.passwordConfirm)],
            },
            {
                name: fieldNamesCreate.firstName,
                type: "text",
                value: this.state[fieldNamesCreate.firstName],
                labelText: "First Name",
                errorText: this.state.fieldErrors[this.errorKeyNameFor(fieldNamesCreate.firstName)],
            },
            {
                name: fieldNamesCreate.surname,
                type: "text",
                value: this.state[fieldNamesCreate.surname],
                labelText: "Surname",
                errorText: this.state.fieldErrors[this.errorKeyNameFor(fieldNamesCreate.surname)],
            },
            {
                name: fieldNamesCreate.postcode,
                type: "number",
                value: this.state[fieldNamesCreate.postcode],
                labelText: "Postcode",
                errorText: this.state.fieldErrors[this.errorKeyNameFor(fieldNamesCreate.postcode)],
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
        const { createAccountMode, submitError } = this.state;
        return (
            <div className="account-management-box">
                <div>
                    <input type="radio" name="accountInputToggle" id="login-toggle" onChange={this.handleChange} checked={!createAccountMode} />
                    <label htmlFor="login-toggle">SIGN IN</label>
                    <input type="radio" name="accountInputToggle" id="create-account-toggle" onChange={this.handleChange} checked={createAccountMode} />
                    <label htmlFor="create-account-toggle">CREATE ACCOUNT</label>
                </div>
                <form action="">
                    {submitError && <div className="error-text">{submitError}</div>}
                    {createAccountMode ? this.createAccountForm() : this.signInForm()}
                    <input type="submit" value={createAccountMode ? "SAVE" : "SIGN IN"} onClick={this.handleSubmit} />
                </form>
            </div>
        )
    }
}

export default AccountManagementBox;