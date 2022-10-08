import React from "react";
import AccountInputArea from "../AccountInputArea/AccountInputArea";
import { checkLettersOnly, validateByFieldName } from "../validations";
import { fieldNames } from "../constants";
import "./AccountManagementBox.css";

class AccountManagementBox extends React.Component {
    constructor() {
        super();
        this.state = {
            createAccountMode: true,
            errors: {
                [this.errorKeyNameFor(fieldNames.emailCreate)]: false,
                [this.errorKeyNameFor(fieldNames.passwordCreate)]: false,
                [this.errorKeyNameFor(fieldNames.passwordConfirm)]: false,
                [this.errorKeyNameFor(fieldNames.firstName)]: false,
                [this.errorKeyNameFor(fieldNames.surname)]: false,
                [this.errorKeyNameFor(fieldNames.postcode)]: false,
            }
        }
    }

    errorKeyNameFor = fieldName => `${fieldName}Error`;

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
        const inputError = !validateByFieldName(name, value);
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
        
    }

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
                errorText: this.state.errors[this.errorKeyNameFor(fieldNames.emailCreate)] ? "Please enter a valid E-Mail" : undefined,
            },
            {
                name: fieldNames.passwordCreate,
                type: "password",
                labelText: "Create Password",
                subText: "Password must be 8-20 characters, including: at least one capital letter, at least one small letter, one number and one special character - ! @ # $ % ^ & * () _ +",
                errorText: this.state.errors[this.errorKeyNameFor(fieldNames.passwordCreate)] ? "Please enter a valid password" : undefined,
            },
            {
                name: fieldNames.passwordConfirm,
                type: "password",
                labelText: "Confirm Password",
                errorText: this.state.errors[this.errorKeyNameFor(fieldNames.passwordConfirm)] ? "Please enter a valid password" : undefined,
            },
            {
                name: fieldNames.firstName,
                type: "text",
                labelText: "First Name",
                errorText: this.state.errors[this.errorKeyNameFor(fieldNames.firstName)] ? "Please enter a valid first name" : undefined,
            },
            {
                name: fieldNames.surname,
                type: "text",
                labelText: "Surname",
                errorText: this.state.errors[this.errorKeyNameFor(fieldNames.surname)] ? "Please enter a valid surname" : undefined,
            },
            {
                name: fieldNames.postcode,
                type: "number",
                labelText: "Postcode",
                errorText: this.state.errors[this.errorKeyNameFor(fieldNames.postcode)] ? "Please enter a valid postcode" : undefined,
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