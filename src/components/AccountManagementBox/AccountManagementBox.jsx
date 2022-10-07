import React from "react";
import AccountInputArea from "../AccountInputArea/AccountInputArea";
import "./AccountManagementBox.css";

class AccountManagementBox extends React.Component {
    render() {
        return (
            <div className="account-management-box">
                <div>
                    <input type="radio" name="accountInputScreen" id="login-toggle" />
                    <label htmlFor="login-toggle">SIGN IN</label>
                    <input type="radio" name="accountInputScreen" id="create-account-toggle" />
                    <label htmlFor="create-account-toggle">CREATE ACCOUNT</label>
                </div>
                <AccountInputArea
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
                    labelText="Postcode" />
                <input type="submit" />
            </div>
        )
    }
}

export default AccountManagementBox;