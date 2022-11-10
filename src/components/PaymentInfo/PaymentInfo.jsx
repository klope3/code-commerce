import React from "react";
import SummarySidebar from "../SummarySidebar/SummarySidebar";
import OrderProgressBar from "../OrderProgressBar/OrderProgressBar";
import "./PaymentInfo.css";
import FieldRowSection from "../FieldRowSection/FieldRowSection";
import { creditCardLogos } from "../constants";
import { numberArray } from "../utility";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

class PaymentInfo extends React.Component {
    constructor(props) {
        super(props);
        this.navigate = props.navigateFunction;
        this.state = {
            showSecurityCodeInfo: false,
        };
    }

    toggleSecurityCodeInfo = () => this.setState(prevState => ({ showSecurityCodeInfo: !prevState.showSecurityCodeInfo}));

    buildFields = (cardNumber, cardholder, cardType, expiryMonth, expiryYear, securityCode, changeFunction, blurFunction, errors) => {
        const securityCodeQuestionArea = (<div className="security-code-question-area">
            <button onClick={this.toggleSecurityCodeInfo}><FontAwesomeIcon icon={faQuestionCircle} /></button>
            {this.state.showSecurityCodeInfo && <div className="security-code-question-message">The CVV is the 3-digit number on the back of your card.</div>}
        </div>);
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
                value: expiryMonth,
                label: "expiration month",
                type: "select",
                placeholder: "Month",
                options: numberArray(1, 12),
                errorMessage: errors.expiryMonth,
            },
            {
                name: "expiryYear",
                id: "expiryYear",
                value: expiryYear,
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
                extraInputContent: securityCodeQuestionArea,
            },
        ];
        return <FieldRowSection fieldRows={fieldRows} changeFieldFunction={changeFunction} blurFieldFunction={blurFunction} />
    }

    handleNavClick = event => {
        if (event.target.name === "nav-forward") this.navigate("paymentInfo");
        else if (event.target.name === "nav-backward") this.navigate("paymentInfo", true);
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
                expiryMonth,
                expiryYear,
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
                        {this.buildFields(cardNumber, cardholder, cardType, expiryMonth, expiryYear, securityCode, changeFieldFunction, blurFieldFunction, errors)}
                        <button name="nav-forward" className="nav-forward-button" onClick={this.handleNavClick}>PAY {`$${orderTotalString}`}</button>
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