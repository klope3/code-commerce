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
    
    render() {
        const { 
            cartItems, 
            subtotal, 
            shippingHandling, 
            discount, 
            shippingInfo, 
            paymentInfo,
            navClickFunction,
            navButtonText
        } = this.props;
        return (
            <div className="shipping-info-right">
                <h2>SUMMARY</h2>
                <div><strong>{`${cartItems.length} items`}</strong> in your bag.</div>
                <div>
                    {this.buildProductAreas(cartItems)}
                </div>
                <CartPriceBreakdown subtotal={subtotal} shippingHandling={shippingHandling} discount={discount} />
                <button name="nav-forward" onClick={navClickFunction}>{navButtonText ? navButtonText : "CHECKOUT"}</button>
            </div>
        )
    }
}

export default SummarySidebar;