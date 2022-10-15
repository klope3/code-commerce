import React from "react";
import SummarySidebar from "../SummarySidebar/SummarySidebar";
import OrderProgressBar from "../OrderProgressBar/OrderProgressBar";
import "./PaymentInfo.css";
import FieldRowSection from "../FieldRowSection/FieldRowSection";

class PaymentInfo extends React.Component {
    buildFields = changeFunction => {
        const rowSection = [
            {
                inputType: "text",
                inputs: ["cardholder"],
                labelText: "Cardholder Name",
                labelFor: "cardholder",
            },
            {
                inputType: "number",
                inputs: ["cardNumber"],
                labelText: "Card Number",
                labelFor: "cardNumber",
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
        console.log(changeFunction);
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
            fieldData, 
            changeFieldFunction,
        } = this.props;
        const orderTotal = subtotal + shippingHandling - discount;
        return (
            <div style={{display: "flex"}}>  {/*each order window parent div like this should probably have a common css ruleset*/}
                <div className="payment-left-side">
                    <OrderProgressBar orderStep={2} />
                    <div>
                        <h2>PAYMENT INFORMATION</h2>
                        {this.buildFields(changeFieldFunction)}
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