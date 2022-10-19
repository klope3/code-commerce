import React from "react";
import SummarySidebar from "../SummarySidebar/SummarySidebar";
import OrderProgressBar from "../OrderProgressBar/OrderProgressBar";
import "./PaymentInfo.css";
import FieldRowSection from "../FieldRowSection/FieldRowSection";
import { creditCardLogos } from "../constants";

class PaymentInfo extends React.Component {
    buildFields = (cardNumber, cardType, changeFunction) => {
        const fieldRows = [
            {
                displayText: "Cardholder Name",
                //value: cardNumber,
                name: "cardholder",
                label: "cardholder name",
                type: "text",
            },
            {
                displayText: "Card Number",
                value: cardNumber,
                name: "cardNumber",
                label: "card number",
                type: "text",
                extraInputContent: cardType ? <img src={creditCardLogos[cardType]} alt={cardType} className="credit-card-logo" /> : undefined,
            },
            {
                displayText: "Exp. Date",
                // value: cardNumber,
                name: "expiryMonth",
                label: "expiration month",
                type: "number",
            },
            {
                displayText: "Exp. Date",
                // value: cardNumber,
                name: "expiryYear",
                label: "expiration year",
                type: "number",
            },
            {
                displayText: "CVV",
                // value: cardNumber,
                name: "securityCode",
                label: "security code",
                type: "number",
            },
        ];
        return <FieldRowSection fieldRows={fieldRows} changeFieldFunction={changeFunction} />
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
                cardNumber, 
                cardType,
            },
            changeFieldFunction,
        } = this.props;
        const orderTotal = subtotal + shippingHandling - discount;
        return (
            <div style={{display: "flex"}}>  {/*each order window parent div like this should probably have a common css ruleset*/}
                <div className="payment-left-side">
                    <OrderProgressBar orderStep={2} />
                    <div>
                        <h2>PAYMENT INFORMATION</h2>
                        {this.buildFields(cardNumber, cardType, changeFieldFunction)}
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