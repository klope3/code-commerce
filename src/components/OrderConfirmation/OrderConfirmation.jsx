import React from "react";
import OrderProgressBar from "../OrderProgressBar/OrderProgressBar";
import SummarySidebar from "../SummarySidebar/SummarySidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import "./OrderConfirmation.css";

class OrderConfirmation extends React.Component {
    constructor() {
        super();
        this.state = { modalWindow: undefined }
    }

    handleModalClick = event => {
        if (event.target.name === "modalClose") {
            this.setState(prevState => ({
                modalWindow: undefined
            }));
            return;
        }
        this.setState({modalWindow: event.target.name});
    }

    buildModalWindow = (shippingInfo, paymentInfo) => {
        const { nameSurname, address, city, state, country } = shippingInfo;
        const { cardholder, cardType, cardNumber, expiryMonth, expiryYear } = paymentInfo;
        if (this.state.modalWindow === "shippingDetails") {
            return (
                <div className="modal-main">
                    <div className="modal-window">
                        <h2>SHIPPING DETAILS</h2>
                        <div className="modal-info-container">
                            <div>{nameSurname}</div>
                            <div>{address}</div>
                            <div>{`${city}, ${state}`}</div>
                            <div>{country}</div>
                        </div>
                        <button name="modalClose" className="modal-x" onClick={this.handleModalClick}><FontAwesomeIcon icon={faXmark} /></button>
                    </div>
                </div>
            )
        }
        if (this.state.modalWindow === "paymentDetails") {
            return (
                <div className="modal-main">
                    <div className="modal-window">
                        <h2>PAYMENT DETAILS</h2>
                        <div className="modal-info-container">
                            <div>{cardholder}</div>
                            <div>{cardType.toUpperCase()}</div>
                            <div>{`Card ending in ${cardNumber.replace(/ /g, "").substring(12)}`}</div>
                            <div>{`Exp. ${expiryMonth}/${expiryYear}`}</div>
                        </div>
                        <button name="modalClose" className="modal-x" onClick={this.handleModalClick}><FontAwesomeIcon icon={faXmark} /></button>
                    </div>
                </div>
            )
        }
    }

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
            <div className="order-confirmation-main" id="order-confirmation-main">
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
                        alternateDisplay={true}
                        modalClickFunction={this.handleModalClick} />
                </div>
                {this.state.modalWindow && this.buildModalWindow(shippingInfo, paymentInfo)}
            </div>
        )
    }
}

export default OrderConfirmation;