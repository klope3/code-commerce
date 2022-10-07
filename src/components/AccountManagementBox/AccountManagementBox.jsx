import React from "react";
import AccountInputArea from "../AccountInputArea/AccountInputArea";
import { accountManagementViews } from "../constants";
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
    }

    createInputAreas = paramsArray => paramsArray.map(item => <AccountInputArea params={item} key={item.name}/>);

    createAccountForm = () => {
        const params = [
            {
                name: "email",
                type: "email",
                labelText: "Your E-Mail Address",
            },
            {
                name: "createPassword",
                type: "password",
                labelText: "Create Password",
                subText: "Password must be 8-20 characters, including: at least one capital letter, at least one small letter, one number and one special character - ! @ # $ % ^ & * () _ +",
            },
            {
                name: "confirmPassword",
                type: "password",
                labelText: "Confirm Password",
            },
            {
                name: "firstName",
                type: "text",
                labelText: "First Name",
            },
            {
                name: "surname",
                type: "text",
                labelText: "Surname",
            },
            {
                name: "postcode",
                type: "number",
                labelText: "Postcode",
            }
        ];
        return this.createInputAreas(params);
    }

    signInForm = () => {
        const params = [
            {
                type: "email",
                labelText: "E-Mail Address",
            },
            {
                type: "password",
                labelText: "Password",
            }
        ];
        return this.createInputAreas(params);
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