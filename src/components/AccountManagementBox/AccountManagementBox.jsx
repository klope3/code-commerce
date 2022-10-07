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
        }
    }

    handleChange = event => {
        if (event.target.name === "accountInputToggle") {
            this.setState(prevState => ({ createAccountMode: !prevState.createAccountMode}));
        }
        this.setState(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value, 
        }));
    }

    handleBlur = event => {
        validateByFieldName(event.target.name);
    }

    validateBlurredField = fieldName => {
        if (this.validateFunctions.has(fieldName)) {
            const func = this.validateFunctions.get(fieldName);
            console.log(func())
        }
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
            },
            {
                name: fieldNames.passwordCreate,
                type: "password",
                labelText: "Create Password",
                subText: "Password must be 8-20 characters, including: at least one capital letter, at least one small letter, one number and one special character - ! @ # $ % ^ & * () _ +",
            },
            {
                name: fieldNames.passwordConfirm,
                type: "password",
                labelText: "Confirm Password",
            },
            {
                name: fieldNames.firstName,
                type: "text",
                labelText: "First Name",
            },
            {
                name: fieldNames.surname,
                type: "text",
                labelText: "Surname",
            },
            {
                name: fieldNames.postcode,
                type: "number",
                labelText: "Postcode",
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
                </form>
                {/* <AccountInputArea
                    type="email"
                    labelText="Your E-Mail Address" />
                <AccountInputArea
                    type="text"
                    labelText="Create Password"
                    subText="Password must be 8-20 characters, including: at least one capital letter, at least one small letter, one number and one special character - ! @ # $ % ^ & * () _ +" />
                <AccountInputArea
                    type="text"
                    labelText="Confirm Password" />
                <AccountInputArea
                    type="text"
                    labelText="First Name" />
                <AccountInputArea
                    type="text"
                    labelText="Surname" />
                <AccountInputArea
                    type="number"
                    labelText="Postcode" /> */}
                <input type="submit" />
            </div>
        )
    }
}

export default AccountManagementBox;