import React from "react";
import ProductDisplayArea from "../ProductDisplayArea/ProductDisplayArea";
import CartPriceBreakdown from "../CartPriceBreakdown/CartPriceBreakdown";
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
        } = this.props;
        return (
            <div className="summary-sidebar-main">
                <h2>SUMMARY</h2>
                {changePromoCodeFunction && this.buildPromoArea(promoCodeField, changePromoCodeFunction, clickPromoSubmitFunction)}
                {cartItems && <div className="top-bottom-bordered"><strong>{`${cartItems.length} items`}</strong> in your bag.</div>}
                {cartItems && <div>{this.buildProductAreas(cartItems)}</div>}
                <CartPriceBreakdown subtotal={subtotal} shippingHandling={shippingHandling} discount={discount} />
                <button name="nav-forward" className="nav-forward-button" disabled={disableNavButton} onClick={navClickFunction}>{navButtonText ? navButtonText : "CHECKOUT"}</button>
            </div>
        )
    }
}

export default SummarySidebar;