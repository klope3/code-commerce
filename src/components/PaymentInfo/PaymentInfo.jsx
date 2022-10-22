import React from "react";
import SummarySidebar from "../SummarySidebar/SummarySidebar";
import OrderProgressBar from "../OrderProgressBar/OrderProgressBar";
import "./PaymentInfo.css";
import FieldRowSection from "../FieldRowSection/FieldRowSection";
import { creditCardLogos } from "../constants";

class PaymentInfo extends React.Component {
    numberArray = (first, last) => {
        const array = [];
        for (let i = first; i <= last; i++) {
            array.push(i);
        }
        return array;
    }
    buildFields = (cardNumber, cardholder, cardType, securityCode, changeFunction, blurFunction, errors) => {
        const fieldRows = [
            {
                displayText: "Cardholder Name",
                value: cardholder,
                name: "cardholder",
                label: "cardholder name",
                type: "text",
                errorMessage: errors.cardholder,
            },
            {
                displayText: "Card Number",
                value: cardNumber,
                name: "cardNumber",
                label: "card number",
                type: "text",
                extraInputContent: cardType ? <img src={creditCardLogos[cardType]} alt={cardType} className="credit-card-logo" /> : undefined,
                errorMessage: errors.cardNumber,
            },
            {
                displayText: "Exp. Date",
                // value: cardNumber,
                name: "expiryMonth",
                label: "expiration month",
                type: "select",
                placeholder: "Month",
                options: this.numberArray(1, 12),
                errorMessage: errors.expiryMonth,
            },
            {
                displayText: "Exp. Date",
                // value: cardNumber,
                name: "expiryYear",
                label: "expiration year",
                type: "select",
                placeholder: "Year",
                options: this.numberArray(2022, 2032),
                errorMessage: errors.expiryYear,
            },
            {
                displayText: "CVV",
                value: securityCode,
                name: "securityCode",
                label: "security code",
                type: "text",
                errorMessage: errors.securityCode,

            },
        ];
        return <FieldRowSection fieldRows={fieldRows} changeFieldFunction={changeFunction} blurFieldFunction={blurFunction} />
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
        const orderTotal = subtotal + shippingHandling - discount;
        return (
            <div style={{display: "flex"}}>  {/*each order window parent div like this should probably have a common css ruleset*/}
                <div className="payment-left-side">
                    <OrderProgressBar orderStep={2} />
                    <div>
                        <h2>PAYMENT INFORMATION</h2>
                        {this.buildFields(cardNumber, cardholder, cardType, securityCode, changeFieldFunction, blurFieldFunction, errors)}
                        <button>PAY {`$${orderTotal}`}</button>
                    </div>
                </div>
                <SummarySidebar 
                    cartItems={cartItems} 
                    subtotal={subtotal}
                    shippingHandling={shippingHandling} 
                    discount={discount}
                    shippingInfo={shippingInfo} 
                    paymentInfo={paymentInfo} />
            </div>
        )
    }
}

export default PaymentInfo;