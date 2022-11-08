import React from "react";
import ProductDisplayArea from "../ProductDisplayArea/ProductDisplayArea";
import CartPriceBreakdown from "../CartPriceBreakdown/CartPriceBreakdown";
import { shippingStandardDescription, shippingExpressDescription } from "../constants";
import "./SummarySidebar.css";

class SummarySidebar extends React.Component {
    buildProductAreas = cartItems => {
        return cartItems.map((item, index) => {
            return (
                <ProductDisplayArea productData={item.product} quantity={item.quantity} hideDescription={true} key={index} />
            )
        })
    }

    buildPromoArea = (promoCodeField, handleChangePromoCode, clickPromoSubmitFunction) => {
        return (
            <div>
                <div>Do you have a promo code?</div>
                <div id="promo-code-container">
                    <label htmlFor="promo-code-field" style={{display: "none"}}>Promo Code</label>
                    <div>
                        <input id="promo-code-field" type="text" value={promoCodeField} onChange={handleChangePromoCode} />
                    </div>
                    <button onClick={clickPromoSubmitFunction}>APPLY</button>
                </div>
            </div>
        )
    }

    buildShippingPaymentArea = (shippingInfo, paymentInfo, totalPayment, alternateDisplay) => {
        const shippingMethodName = shippingInfo && shippingInfo.shippingMethod === "express" ? "express" : "standard";
        const shippingMethodDescription = shippingMethodName === "standard" ? shippingStandardDescription : shippingExpressDescription;
        if (alternateDisplay) {
            return (
                <div>
                    <div>
                        <h2>SHIPPING</h2>
                        <div>{shippingMethodName}</div>
                        <div>{shippingMethodDescription}</div>
                    </div>
                    <div>
                        <h2>PAYMENT</h2>
                        <div>{paymentInfo.cardType}</div>
                        <div>{`Total payment: $${totalPayment.toFixed(2)}`}</div>
                    </div>
                </div>
            )
        }
        return (
            <div>
                {shippingInfo && 
                    <div>
                        <div>
                            <h2>SHIPMENT ADDRESS</h2>
                            <div>{shippingInfo.addressTitle}</div>
                            <div>{shippingInfo.address}</div>
                            <div>{`${shippingInfo.city}, ${shippingInfo.state} ${shippingInfo.zipCode}`}</div>
                            <div>{`${shippingInfo.country}`}</div>
                        </div>
                        <div>
                            <h2>SHIPMENT METHOD</h2>
                            <div>{shippingMethodName}</div>
                            <div>{shippingMethodDescription}</div>
                        </div>
                    </div>
                }
            </div>
        )
    }
    
    render() {
        const { 
            cartItems, 
            subtotal, 
            shippingHandling, 
            discount, 
            shippingInfo, 
            paymentInfo,
            promoCodeField,
            changePromoCodeFunction,
            clickPromoSubmitFunction,
            navClickFunction,
            navButtonText,
            disableNavButton,
            alternateDisplay,
        } = this.props;
        const totalPayment = subtotal + shippingHandling - discount;
        return (
            <div className="summary-sidebar-main">
                <h2>SUMMARY</h2>
                {changePromoCodeFunction && this.buildPromoArea(promoCodeField, changePromoCodeFunction, clickPromoSubmitFunction)}
                {cartItems && !alternateDisplay && 
                    <div className="top-bottom-bordered">
                        <strong>{`${cartItems.length} item${cartItems.length > 1 ? "s" : ""}`}</strong> in your bag.
                    </div>
                }
                {cartItems && <div className="sidebar-products-container">{this.buildProductAreas(cartItems)}</div>}
                <CartPriceBreakdown subtotal={subtotal} shippingHandling={shippingHandling} discount={discount} />
                {this.buildShippingPaymentArea(shippingInfo, paymentInfo, totalPayment, alternateDisplay)}
                <button name="nav-forward" className="nav-forward-button" disabled={disableNavButton} onClick={navClickFunction}>{navButtonText ? navButtonText : "CHECKOUT"}</button>
            </div>
        )
    }
}

export default SummarySidebar;