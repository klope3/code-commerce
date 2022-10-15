import React from "react";

class CartPriceBreakdown extends React.Component {
    render() {
        const { subtotal, shippingHandling, discount } = this.props;
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
            <div>
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