import React from "react";
import SummarySidebar from "../SummarySidebar/SummarySidebar";
import OrderProgressBar from "../OrderProgressBar/OrderProgressBar";
import "./PaymentInfo.css";
import FieldRowSection from "../FieldRowSection/FieldRowSection";
import { creditCardLogos } from "../constants";
import { numberArray } from "../utility";

class PaymentInfo extends React.Component {
    constructor(props) {
        super(props);
        this.changeOrderStepFunction = props.changeOrderStepFunction;
    }

    buildFields = (cardNumber, cardholder, cardType, securityCode, changeFunction, blurFunction, errors) => {
        const fieldRows = [
            {
                displayText: "Cardholder Name",
                value: cardholder,
                name: "cardholder",
                id: "cardholder",
                label: "cardholder name",
                type: "text",
                errorMessage: errors.cardholder,
            },
            {
                displayText: "Card Number",
                value: cardNumber,
                name: "cardNumber",
                id: "cardNumber",
                label: "card number",
                type: "text",
                extraInputContent: cardType ? <img src={creditCardLogos[cardType]} alt={cardType} className="credit-card-logo" /> : undefined,
                errorMessage: errors.cardNumber,
            },
            {
                displayText: "Exp. Date",
                name: "expiryMonth",
                id: "expiryMonth",
                label: "expiration month",
                type: "select",
                placeholder: "Month",
                options: numberArray(1, 12),
                errorMessage: errors.expiryMonth,
            },
            {
                name: "expiryYear",
                id: "expiryYear",
                label: "expiration year",
                type: "select",
                placeholder: "Year",
                options: numberArray(2022, 2032),
                errorMessage: errors.expiryYear,
            },
            {
                displayText: "CVV",
                value: securityCode,
                name: "securityCode",
                id: "securityCode",
                label: "security code",
                type: "text",
                errorMessage: errors.securityCode,

            },
        ];
        return <FieldRowSection fieldRows={fieldRows} changeFieldFunction={changeFunction} blurFieldFunction={blurFunction} />
    }

    handleNavClick = event => {
        if (event.target.name === "nav-forward") this.changeOrderStepFunction();
        else if (event.target.name === "nav-backward") this.changeOrderStepFunction(true);
    }

    render() {
        const { 
            cartItems, 
            subtotal, 
            shippingHandling, 
            discount, 
            shippingInfo,
            paymentInfo,
            fieldData: {
                cardholder,
                cardNumber, 
                cardType,
                securityCode,
                errors,
            },
            changeFieldFunction,
            blurFieldFunction,
        } = this.props;
        const orderTotalString = (subtotal + shippingHandling - discount).toFixed(2);
        return (
            <div className="order-screen-main">
                <div className="order-screen-left-container">
                    <OrderProgressBar orderStep={2} />
                    <div className="order-screen-left-sub-container" id="payment-info-screen">
                        <h2>PAYMENT INFORMATION</h2>
                        {this.buildFields(cardNumber, cardholder, cardType, securityCode, changeFieldFunction, blurFieldFunction, errors)}
                        <button className="nav-forward-button">PAY {`$${orderTotalString}`}</button>
                        <button name="nav-backward" className="nav-backward-button" onClick={this.handleNavClick}>BACK TO SHIPPING</button>
                    </div>
                </div>
                <SummarySidebar 
                    cartItems={cartItems} 
                    subtotal={subtotal}
                    shippingHandling={shippingHandling} 
                    discount={discount}
                    shippingInfo={shippingInfo} 
                    paymentInfo={paymentInfo}
                    navClickFunction={this.handleNavClick}
                    navButtonText={`PAY $${orderTotalString}`} />
            </div>
        )
    }
}

export default PaymentInfo;