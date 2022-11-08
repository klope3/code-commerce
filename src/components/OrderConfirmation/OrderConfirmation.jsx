import React from "react";
import OrderProgressBar from "../OrderProgressBar/OrderProgressBar";
import SummarySidebar from "../SummarySidebar/SummarySidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import "./OrderConfirmation.css";

class OrderConfirmation extends React.Component {
    render() {
        const { 
            cartItems,
            subtotal,
            shippingHandling,
            discount,
            shippingInfo,
            paymentInfo,
        } = this.props;
        return (
            <div className="order-confirmation-main">
                <OrderProgressBar orderStep={3} />
                <div className="order-screen-main">
                    <div className="order-screen-left-sub-container">
                        <h2>CONFIRMATION</h2>
                        <div className="order-confirmation-info-container">
                            <FontAwesomeIcon icon={faCircleCheck} id="order-confirmation-check" />
                            <div className="order-confirmation-announcement">Congratulations.<br></br>Your order is accepted.</div>
                            <div className="order-confirmation-details">
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis, natus ut. Odit ipsam eligendi aperiam, molestiae magnam culpa maiores veniam quasi sunt ducimus velit eaque?
                            </div>
                            <button className="nav-forward-button order-confirmation-button" id="track-order-button">TRACK ORDER</button>
                            <button className="nav-backward-button order-confirmation-button">BACK TO HOME PAGE</button>
                        </div>
                    </div>
                    <SummarySidebar 
                        cartItems={cartItems} 
                        subtotal={subtotal}
                        shippingHandling={shippingHandling} 
                        discount={discount}
                        shippingInfo={shippingInfo} 
                        paymentInfo={paymentInfo}
                        alternateDisplay={true} />
                </div>
            </div>
        )
    }
}

export default OrderConfirmation;