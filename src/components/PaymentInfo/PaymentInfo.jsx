import React from "react";
import SummarySidebar from "../SummarySidebar/SummarySidebar";
import OrderProgressBar from "../OrderProgressBar/OrderProgressBar";
import "./PaymentInfo.css";
import FieldRowSection from "../FieldRowSection/FieldRowSection";

class PaymentInfo extends React.Component {
    buildFields = (cardNumber, changeFunction) => {
        const rowSection = [
            {
                inputType: "text",
                inputs: ["cardholder"],
                labelText: "Cardholder Name",
                labelFor: "cardholder",
            },
            {
                inputType: "text",
                inputs: ["cardNumber"],
                labelText: "Card Number",
                labelFor: "cardNumber",
                value: cardNumber
            },
            {
                inputType: "number",
                inputs: ["expiryMonth", "expiryYear"],
                labelText: "Exp. Date",
                labelFor: "expiryMonth",
            },
            {
                inputType: "number",
                inputs: ["securityCode"],
                labelText: "CVV",
                labelFor: "securityCode",
            },
        ];
        return <FieldRowSection rowSection={rowSection} changeFieldFunction={changeFunction} />
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
                cardNumber
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
                        {this.buildFields(cardNumber, changeFieldFunction)}
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