import React from "react";
import FieldRowSection from "../FieldRowSection/FieldRowSection";
//import AccountInputArea from "../AccountInputArea/AccountInputArea";
//import { checkLettersOnly, checkValidEmail, checkValidPassword, checkValidPostcode } from "../validations";
//import { fieldNamesCreate, fieldNamesLogin } from "../constants";
//import { addAccount, doesAccountExist, tryVerifyLogin } from "../accounts";
import "./AccountManagementBox.css";

class AccountManagementBox extends React.Component {
    constructor() {
        super();
        this.state = {
            accountModeToggle: "",

            signInEmail: "",
            signInPassword: "",

            createAccountEmail: "",
            createAccountPassword: "",
            createAccountPasswordConfirm: "",
            createAccountFirstName: "",
            createAccountSurname: "",
            createAccountZipCode: "",
        };
        //const fieldValues = {};
        //const fieldErrors = {};
        //Object.keys(fieldNamesCreate).forEach(fieldName => {
        //    fieldValues[fieldName] = "";
        //    fieldErrors[this.errorKeyNameFor(fieldName)] = "";
        //});
        //this.state = {
        //    createAccountMode: true,
        //    ...fieldValues,
        //    fieldErrors: fieldErrors,
        //    submitError: "",
        //}
        //this.validationFunctions = new Map([
        //    [
        //        fieldNamesCreate.emailCreate, 
        //        value => {
        //            if (doesAccountExist(value)) { return "An account with that E-Mail already exists."; }
        //            return checkValidEmail(value) ? "" : "Please enter a valid E-Mail."
        //        }
        //    ],
        //    [
        //        fieldNamesCreate.passwordCreate, 
        //        value => checkValidPassword(value) ? "" : "Please enter a valid password."
        //    ],
        //    [
        //        fieldNamesCreate.passwordConfirm, 
        //        value => this.state[fieldNamesCreate.passwordCreate] === value ? "" : "The passwords must match."
        //    ],
        //    [
        //        fieldNamesCreate.firstName, 
        //        value => checkLettersOnly(value) ? "" : "Please enter a valid first name."
        //    ],
        //    [
        //        fieldNamesCreate.surname, 
        //        value => checkLettersOnly(value) ? "" : "Please enter a valid surname."
        //    ],
        //    [
        //        fieldNamesCreate.postcode, 
        //        value => checkValidPostcode(value) ? "" : "Please enter a valid postcode."
        //    ],
        //]);
    }

    //errorKeyNameFor = fieldName => `${fieldName}Error`;
//
    //validateByFieldName = (fieldName, fieldValue) => {
    //    if (!this.validationFunctions.has(fieldName)) { return ""; }
    //    return this.validationFunctions.get(fieldName)(fieldValue);
    //};
//
    //updateErrorsObjectByFieldName = (fieldName, fieldValue, errorsObj) => {
    //    const fieldError = this.validateByFieldName(fieldName, fieldValue);
    //    const errorKey = this.errorKeyNameFor(fieldName);
    //    errorsObj[errorKey] = fieldError;
    //}
//
    //handleChange = event => {
    //    if (event.target.name === "accountInputToggle") {
    //        this.setState(prevState => ({ 
    //            createAccountMode: !prevState.createAccountMode,
    //            submitError: "",
    //        }));
    //        return;
    //    }
    //    this.setState(prevState => ({
    //        ...prevState,
    //        [event.target.name]: event.target.value, 
    //    }));
    //};
//
    //handleBlur = event => {
    //    const { target: { name, value }} = event;
    //    const newErrors = {
    //        ...this.state.fieldErrors,
    //    };
    //    this.updateErrorsObjectByFieldName(name, value, newErrors);
    //    if (name === fieldNamesCreate.passwordCreate) {
    //        const { passwordConfirm } = fieldNamesCreate;
    //        this.updateErrorsObjectByFieldName(passwordConfirm, this.state[passwordConfirm], newErrors);
    //    }
    //    this.setState(prevState => ({
    //        ...prevState,
    //        fieldErrors: newErrors,
    //    }));
    //};
//
    //handleSubmit = event => {
    //    event.preventDefault();
    //    const submitError = this.getSubmitError();
    //    this.setState(prevState => ({
    //        ...prevState,
    //        submitError: submitError,
    //    }));
    //    if (submitError.length === 0) {
    //        this.doSubmit(event);
    //    }
    //};
//
    //getSubmitError = () => {
    //    const { createAccountMode } = this.state;
    //    if (createAccountMode) {
    //        return !this.isAccountFormReady() ? 
    //            "We're sorry, but one or more fields are incomplete or incorrect. Find errors." : 
    //            "";
    //    }
    //    return !tryVerifyLogin(this.state[fieldNamesLogin.emailLogin], this.state[fieldNamesLogin.passwordLogin]) ? 
    //        "Invalid E-Mail or password." : 
    //        "";
    //}
//
    //getCreateAccountValues = () => {
    //    const fieldValues = [];
    //    Object.keys(fieldNamesCreate).forEach(fieldName => {
    //        if (fieldName !== fieldNamesCreate.passwordConfirm) {
    //            fieldValues.push(this.state[fieldName]);
    //        }
    //    });
    //    return fieldValues;
    //}
//
    //doSubmit = () => {
    //    if (this.state.createAccountMode) {
    //        addAccount(...this.getCreateAccountValues());
    //        this.clearFields();
    //    }
    //    else {
    //        console.log("Login attempt success? " + tryVerifyLogin(this.state[fieldNamesLogin.emailLogin], this.state[fieldNamesLogin.passwordLogin]));
    //    }
    //}
//
    //clearFields = () => {
    //    const blankValues = {};
    //    Object.keys(fieldNamesCreate).forEach(fieldName => blankValues[fieldName] = "");
    //    this.setState(prevState => ({
    //        ...prevState,
    //        ...blankValues,
    //    }));
    //}
//
    //tryFindInputErrors = () => {
    //    const { fieldErrors: errors } = this.state;
    //    for (const key in errors) {
    //        if (errors[key].length > 0) {
    //            return true;
    //        }
    //    }
    //    return false;
    //}
//
    //tryFindEmptyField = () => {
    //    for (const item in fieldNamesCreate) {
    //        if (!this.state[item] || this.state[item].length === 0) {
    //            return true;
    //        }
    //    }
    //    return false;
    //}
//
    //isAccountFormReady = () => !this.tryFindInputErrors() && !this.tryFindEmptyField();
//
    //buildInputAreas = paramsArray => {
    //    return (paramsArray.map(item => (
    //        <AccountInputArea 
    //            params={item} 
    //            key={item.name} 
    //            changeFunction={this.handleChange} 
    //            blurFunction={this.handleBlur}/>
    //        )
    //    ))
    //};
//
    //createAccountForm = () => {
    //    const params = [
    //        {
    //            type: "email",
    //            labelText: "Your E-Mail Address",
    //        },
    //        {
    //            type: "password",
    //            labelText: "Create Password",
    //            subText: "Password must be 8-20 characters, including: at least one capital letter, at least one small letter, one number and one special character - ! @ # $ % ^ & * () _ +",
    //        },
    //        {
    //            type: "password",
    //            labelText: "Confirm Password",
    //        },
    //        {
    //            type: "text",
    //            labelText: "First Name",
    //        },
    //        {
    //            type: "text",
    //            labelText: "Surname",
    //        },
    //        {
    //            type: "number",
    //            labelText: "Postcode",
    //        }
    //    ];
    //    Object.keys(fieldNamesCreate).forEach((fieldName, index) => {
    //        const errorKey = this.errorKeyNameFor(fieldName);
    //        params[index].name = fieldName;
    //        params[index].value = this.state[fieldName];
    //        params[index].errorText = this.state.fieldErrors[errorKey];
    //    });
    //    return this.buildInputAreas(params);
    //}
//
    //signInForm = () => {
    //    const params = [
    //        {
    //            name: fieldNamesLogin.emailLogin,
    //            type: "email",
    //            labelText: "E-Mail Address",
    //        },
    //        {
    //            name: fieldNamesLogin.passwordLogin,
    //            type: "password",
    //            labelText: "Password",
    //        }
    //    ];
    //    return this.buildInputAreas(params);
    //}
//
//
//







    handleChange = event => {
        const { name: sender, value } = event.target;
        this.setState(prevState => ({
            ...prevState,
            [sender]: sender === "accountModeToggle" ? event.target.id : value,
        }));
    }

    handleBlur = event => {
        console.log("Blur from " + event.target.name);
    }

    buildAccountModeToggle = () => {
        const fieldRows = [
            {
                displayText: "Sign In",
                name: "accountModeToggle",
                id: "modeSignIn",
                label: "sign in",
                type: "radio",
            },
            {
                displayText: "Create Account",
                name: "accountModeToggle",
                id: "modeCreateAccount",
                label: "create account",
                type: "radio",
            },
        ];
        return <FieldRowSection fieldRows={fieldRows} changeFieldFunction={this.handleChange} />
    }

    buildSignInFields = () => {
        const fieldRows = [
            {
                displayText: "E-Mail Address",
                name: "signInEmail",
                label: "e-mail address",
                type: "text",
            },
            {
                displayText: "Password",
                name: "signInPassword",
                label: "password",
                type: "text",
            },
        ];
        return <FieldRowSection fieldRows={fieldRows} changeFieldFunction={this.handleChange} blurFieldFunction={this.handleBlur} />
    }

    buildCreateAccountFields = () => {
        const fieldRows = [
            {
                displayText: "Your E-Mail Address",
                //value: cardholder,
                name: "createAccountEmail",
                label: "e-mail address",
                type: "text",
                //errorMessage: errors.cardholder,
            },
            {
                displayText: "Create Password",
                //value: cardholder,
                name: "createAccountPassword",
                label: "create password",
                type: "text",
                //errorMessage: errors.cardholder,
            },
            {
                displayText: "Confirm Password",
                //value: cardholder,
                name: "createAccountPasswordConfirm",
                label: "confirm password",
                type: "text",
                //errorMessage: errors.cardholder,
            },
            {
                displayText: "First Name",
                //value: cardholder,
                name: "createAccountFirstName",
                label: "first name",
                type: "text",
                //errorMessage: errors.cardholder,
            },
            {
                displayText: "Surname",
                //value: cardholder,
                name: "createAccountSurname",
                label: "surname",
                type: "text",
                //errorMessage: errors.cardholder,
            },
            {
                displayText: "Postcode",
                //value: cardholder,
                name: "createAccountZipCode",
                label: "postcode",
                type: "text",
                //errorMessage: errors.cardholder,
            },
        ];
        return <FieldRowSection fieldRows={fieldRows} changeFieldFunction={this.handleChange} blurFieldFunction={this.handleBlur} />
    }

    render() {
        //const { createAccountMode, submitError } = this.state;
        const createAccountMode = this.state.accountModeToggle === "modeCreateAccount";
        return (
            <div>
                {this.buildAccountModeToggle()}
                {createAccountMode ? this.buildCreateAccountFields() : this.buildSignInFields()}
            </div>
            //<div className="account-management-box">
            //    <div>
            //        <input type="radio" name="accountInputToggle" id="login-toggle" onChange={this.handleChange} checked={!createAccountMode} />
            //        <label htmlFor="login-toggle">SIGN IN</label>
            //        <input type="radio" name="accountInputToggle" id="create-account-toggle" onChange={this.handleChange} checked={createAccountMode} />
            //        <label htmlFor="create-account-toggle">CREATE ACCOUNT</label>
            //    </div>
            //    <form action="">
            //        {submitError && <div className="error-text">{submitError}</div>}
            //        {createAccountMode ? this.createAccountForm() : this.signInForm()}
            //        <input type="submit" value={createAccountMode ? "SAVE" : "SIGN IN"} onClick={this.handleSubmit} />
            //    </form>
            //</div>
        )
    }
}

export default AccountManagementBox;