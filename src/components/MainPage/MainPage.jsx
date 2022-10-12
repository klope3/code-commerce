import React from "react";
import AccountManagementBox from "../AccountManagementBox/AccountManagementBox";
import CustomerCart from "../CustomerCart/CustomerCart";
import OrderProgressBar from "../OrderProgressBar/OrderProgressBar";

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
                <OrderProgressBar orderStep={3} />
            </div>
        )
    }
}

export default MainPage;