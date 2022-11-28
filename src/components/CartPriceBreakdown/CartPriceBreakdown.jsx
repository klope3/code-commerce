import React from "react";
import "./CartPriceBreakdown.css";

class CartPriceBreakdown extends React.Component {
    render() {
        const { subtotal } = this.props;
        let { shippingHandling, discount } = this.props;
        shippingHandling = shippingHandling ? shippingHandling : 0;
        discount = discount ? discount : 0;
        const rows = [
            {
                leftText: "Cart Subtotal:",
                rightText: `$${subtotal.toFixed(2)}`,
                rightTextClass: "money-base",
            },
            {
                leftText: "Shipping & Handling:",
                rightText: shippingHandling <= 0 ? "--" : `$${shippingHandling.toFixed(2)}`,
                rightTextClass: "money-base",
            },
            {
                leftText: "Discount:",
                rightText: discount <= 0 ? "--" : `-$${discount.toFixed(2)}`,
                rightTextClass: "money-base money-discount",
            },
            {
                leftText: "Cart Total:",
                rightText: `$${(subtotal + shippingHandling - discount).toFixed(2)}`,
                rightTextClass: "money-base money-big money-grand-total",
            },
        ];
        return (
            <div className="breakdown-container top-bordered bottom-bordered">
                <div className="breakdown-info-container">
                    {rows.map((row, index) => {
                        return (
                            <div className="cart-price-breakdown-row" key={index}>
                                <div>{row.leftText}</div>
                                <div className={row.rightTextClass}>{row.rightText}</div>
                            </div>
                        )})
                    }
                </div>
            </div>
        )
    }
}

export default CartPriceBreakdown;