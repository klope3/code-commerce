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
            },
            {
                leftText: "Shipping & Handling:",
                rightText: shippingHandling <= 0 ? "--" : `$${shippingHandling.toFixed(2)}`,
            },
            {
                leftText: "Discount:",
                rightText: discount <= 0 ? "--" : `$${discount.toFixed(2)}`,
            },
            {
                leftText: "Cart Total:",
                rightText: `$${(subtotal + shippingHandling - discount).toFixed(2)}`,
            },
        ];
        return (
            <div className="top-bottom-bordered">
                {rows.map((row, index) => {
                    return (
                        <div className="cart-price-breakdown-row" key={index}>
                            <div>{row.leftText}</div>
                            <div>{row.rightText}</div>
                        </div>
                    )})
                }
            </div>
        )
    }
}

export default CartPriceBreakdown;