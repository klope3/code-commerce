import React from "react";
import SummarySidebar from "../SummarySidebar/SummarySidebar";
import OrderProgressBar from "../OrderProgressBar/OrderProgressBar";
import "./PaymentInfo.css";

class PaymentInfo extends React.Component {
    render() {
        const { 
            cartItems, 
            subtotal, 
            shippingHandling, 
            discount, 
            shippingInfo,
            paymentInfo,
            fieldData, 
            changeFunction 
        } = this.props;
        return (
            <div style={{display: "flex"}}>  {/*each order window parent div like this should probably have a common css ruleset*/}
                <div className="payment-left-side">
                    <OrderProgressBar orderStep={2} />
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