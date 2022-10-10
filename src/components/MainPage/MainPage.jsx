import React from "react";
import AccountManagementBox from "../AccountManagementBox/AccountManagementBox";
import CustomerCart from "../CustomerCart/CustomerCart";

class MainPage extends React.Component {
    constructor() {
        super();
        this.state = {
            activeBox: "",
        }
    }

    render() {
        return (
            <div>
                <CustomerCart />
            </div>
        )
    }
}

export default MainPage;