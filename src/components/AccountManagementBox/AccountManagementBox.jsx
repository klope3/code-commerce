import React from "react";
import FieldRowSection from "../FieldRowSection/FieldRowSection";
//import AccountInputArea from "../AccountInputArea/AccountInputArea";
//import { checkLettersOnly, checkValidEmail, checkValidPassword, checkValidPostcode } from "../validations";
//import { fieldNamesCreate, fieldNamesLogin } from "../constants";
//import { addAccount, doesAccountExist, tryVerifyLogin } from "../accounts";
import { formattingFunctions } from "../formatters";
import { validationFunctions } from "../validations";
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

            errors: {
                createAccountEmail: undefined,
                createAccountPassword: undefined,
                createAccountPasswordConfirm: undefined,
                createAccountEmail: undefined,
                createAccountSurname: undefined,
                createAccountZipCode: undefined,
            }
        };
    }

    validateConfirmPassword = () => {
        return this.state.createAccountPassword !== this.state.createAccountPasswordConfirm ? 
            "The passwords must match." : undefined;
    }

    handleButton = event => {
        const { name: sender } = event.target;
        console.log("clicked " + sender);
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
        const validationFunction = sender === "createAccountPasswordConfirm" ? this.validateConfirmPassword : validationFunctions[sender];
        const passwordConfirmError = sender === "createAccountPassword" ? this.validateConfirmPassword() : undefined;
        this.setState(prevState => ({
            ...prevState,
            errors: {
                ...prevState.errors,
                createAccountPasswordConfirm: passwordConfirmError,
                [sender]: validationFunction ? validationFunction(value) : undefined,
            }
        }));
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

    buildBottomSection = () => {
        const creatingAccount = this.state.accountModeToggle === "modeCreateAccount";
        const firstButtonText = creatingAccount ? "SAVE" : "SIGN IN";
        const secondButtonText = `SIGN ${creatingAccount ? "UP" : "IN"} WITH FACEBOOK`;
        return (
            <div>
                <button name={creatingAccount ? "signUp" : "signIn"} onClick={this.handleButton}>{firstButtonText}</button>
                <div>or</div>
                <button>{secondButtonText}</button>
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
                //value: cardholder,
                name: "createAccountEmail",
                label: "e-mail address",
                type: "text",
                errorMessage: errors.createAccountEmail,
            },
            {
                displayText: "Create Password",
                //value: cardholder,
                name: "createAccountPassword",
                label: "create password",
                type: "text",
                errorMessage: errors.createAccountPassword,
            },
            {
                displayText: "Confirm Password",
                //value: cardholder,
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

    render() {
        const createAccountMode = this.state.accountModeToggle === "modeCreateAccount";
        return (
            <div>
                {this.buildAccountModeToggle()}
                {createAccountMode ? this.buildCreateAccountFields() : this.buildSignInFields()}
                {this.buildBottomSection()}
            </div>
        )
    }
}

export default AccountManagementBox;