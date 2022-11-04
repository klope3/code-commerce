import React from "react";
import { addAccount, doesAccountExist, tryVerifyLogin } from "../accounts";
import FieldRowSection from "../FieldRowSection/FieldRowSection";
//import AccountInputArea from "../AccountInputArea/AccountInputArea";
//import { checkLettersOnly, checkValidEmail, checkValidPassword, checkValidPostcode } from "../validations";
//import { fieldNamesCreate, fieldNamesLogin } from "../constants";
//import { addAccount, doesAccountExist, tryVerifyLogin } from "../accounts";
import { formattingFunctions } from "../formatters";
import { validationFunctions } from "../validations";
import "./AccountManagementBox.css";

class AccountManagementBox extends React.Component {
    constructor(props) {
        super(props);
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

            errors: {
                createAccountEmail: undefined,
                createAccountPassword: undefined,
                createAccountPasswordConfirm: undefined,
                createAccountEmail: undefined,
                createAccountSurname: undefined,
                createAccountZipCode: undefined,
            }
        };
        this.signInFunction = props.signInFunction;
    }

    validateConfirmPasswordField = () => {
        return this.state.createAccountPassword !== this.state.createAccountPasswordConfirm ? 
            "The passwords must match." : undefined;
    }

    checkForErrors = () => {
        const results = {
            errors: {},
            errorFound: false,
        };
        let errorFound = false;
        for (const key in this.state) {
            if (!key.startsWith("create")) continue;
            const validationFunction = key === "createAccountPasswordConfirm" ? 
                this.validateConfirmPasswordField : validationFunctions[key];
            if (validationFunction) {
                results.errors[key] = validationFunction(this.state[key]);
                if (results.errors[key]) results.errorFound = true;
            }
        }
        return results;
    }

    signUp = () => {
        const { 
            createAccountEmail: email, 
            createAccountFirstName: firstName,
            createAccountSurname: surname,
            createAccountPassword: password,
            createAccountZipCode: zipCode,
        } = this.state;
        const { errors, errorFound } = this.checkForErrors();
        this.setState(prevState => ({
            ...prevState,
            errors: errors,
        }));
        if (!errorFound && !doesAccountExist(this.state.createAccountEmail)) {
            addAccount(email, password, firstName, surname, zipCode);
        }
    }

//#region Handle Functions
    handleButton = event => {
        const signingUp = event.target.name === "signUp";
        if (signingUp) this.signUp();
        else {
            const { 
                signInEmail: email, 
                signInPassword: password,
            } = this.state;
            this.signInFunction(email, password);
        }
    }

    handleChange = event => {
        const { name: sender, value } = event.target;
        let formatted = formattingFunctions[sender] ? formattingFunctions[sender](value) : value;
        this.setState(prevState => ({
            ...prevState,
            [sender]: sender === "accountModeToggle" ? event.target.id : formatted,
        }));
    }

    handleBlur = event => {
        const { name: sender, value } = event.target;
        const validationFunction = sender === "createAccountPasswordConfirm" ? this.validateConfirmPasswordField : validationFunctions[sender];
        const passwordConfirmError = sender === "createAccountPassword" ? this.validateConfirmPasswordField() : undefined;
        this.setState(prevState => ({
            ...prevState,
            errors: {
                ...prevState.errors,
                createAccountPasswordConfirm: passwordConfirmError,
                [sender]: validationFunction ? validationFunction(value) : undefined,
            }
        }));
    }
//#endregion
//#region Builder Functions
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

    buildBottomSection = () => {
        const creatingAccount = this.state.accountModeToggle === "modeCreateAccount";
        const firstButtonText = creatingAccount ? "SAVE" : "SIGN IN";
        const secondButtonText = `SIGN ${creatingAccount ? "UP" : "IN"} WITH FACEBOOK`;
        return (
            <div className="account-buttons-container">
                <button className="nav-forward-button account-button" name={creatingAccount ? "signUp" : "signIn"} onClick={this.handleButton}>{firstButtonText}</button>
                <div>or</div>
                <button className="nav-forward-button account-button" id="facebook-button">{secondButtonText}</button>
            </div>
        )
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
        const { createAccountFirstName, 
            createAccountSurname, 
            createAccountZipCode,
            errors,
         } = this.state;
        const fieldRows = [
            {
                displayText: "Your E-Mail Address",
                name: "createAccountEmail",
                label: "e-mail address",
                type: "text",
                errorMessage: errors.createAccountEmail,
            },
            {
                displayText: "Create Password",
                name: "createAccountPassword",
                label: "create password",
                type: "text",
                errorMessage: errors.createAccountPassword,
            },
            {
                displayText: "Confirm Password",
                name: "createAccountPasswordConfirm",
                label: "confirm password",
                type: "text",
                errorMessage: errors.createAccountPasswordConfirm,
            },
            {
                displayText: "First Name",
                value: createAccountFirstName,
                name: "createAccountFirstName",
                label: "first name",
                type: "text",
                errorMessage: errors.createAccountFirstName,
            },
            {
                displayText: "Surname",
                value: createAccountSurname,
                name: "createAccountSurname",
                label: "surname",
                type: "text",
                errorMessage: errors.createAccountSurname,
            },
            {
                displayText: "Postcode",
                value: createAccountZipCode,
                name: "createAccountZipCode",
                label: "postcode",
                type: "text",
                errorMessage: errors.createAccountZipCode,
            },
        ];
        return <FieldRowSection fieldRows={fieldRows} changeFieldFunction={this.handleChange} blurFieldFunction={this.handleBlur} />
    }
//#endregion

    render() {
        const createAccountMode = this.state.accountModeToggle === "modeCreateAccount";
        return (
            <div className="account-management-container">
                {this.buildAccountModeToggle()}
                {createAccountMode ? this.buildCreateAccountFields() : this.buildSignInFields()}
                {this.buildBottomSection()}
            </div>
        )
    }
}

export default AccountManagementBox;