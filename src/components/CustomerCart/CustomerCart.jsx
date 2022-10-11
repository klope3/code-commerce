import React from "react";
import "./CustomerCart.css";
import CustomerCartItemRow from "../CustomerCartItemRow/CustomerCartItemRow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation, faXmark } from "@fortawesome/free-solid-svg-icons";
import { products } from "../products";

const exclamation = <FontAwesomeIcon icon={faTriangleExclamation} />;
const xMark = <FontAwesomeIcon icon={faXmark} className="close-x" />;

class CustomerCart extends React.Component {
    constructor() {
        super();
        this.state = {
            cartItems: products.map((product, index) => ({
                product: product,
                quantity: 6,
                id: index,
            })),
        }
    }

    handleChangeItemQuantity = event => {
        if (event.target.value <= 0) { return; }
        const itemIndex = event.target.name.replace(/[^0-9]/g, "");
        const newState = {...this.state};
        newState.cartItems[itemIndex].quantity = event.target.value;
        this.setState(newState);
    }

    getCartTotal = () => this.state.cartItems.reduce((accumulator, cartItem) => accumulator + cartItem.product.price * cartItem.quantity, 0);

    cartBreakdownRow = (leftText, rightText) => {
        return (
            <div className="cart-price-breakdown-row">
                <div>{leftText}</div>
                <div>{rightText}</div>
            </div>
        )
    }

    buildCartBreakdown = () => {
        // const subtotal = this.getCartTotal();
        // const breakdown = [
        //     {
        //         leftText: "Cart Subtotal:",
        //         rightText: `$${subtotal.toFixed(2)}`,
        //     },
        //     {
        //         leftText: "Shipping & Handling:",
        //         rightText: "--",
        //     },
        //     {
        //         leftText: "Discount:",
        //         rightText: "--",
        //     },
        //     {
        //         leftText: "Cart Total:",
        //         rightText: `$${subtotal.toFixed(2)}`,
        //     },
        // ];
        // return breakdown.map(breakdownRow => this.cartBreakdownRow(breakdownRow.leftText, breakdownRow.rightText));
        const subtotal = this.getCartTotal();
        return [
            this.cartBreakdownRow("Cart Subtotal:", `$${subtotal.toFixed(2)}`),
            this.cartBreakdownRow("Shipping & Handling:", "--"),
            this.cartBreakdownRow("Discount:", "--"),
            this.cartBreakdownRow("Cart Total:", `$${subtotal.toFixed(2)}`),
        ];
    }

    render() {
        const { cartItems } = this.state;
        return (
            <div className="cart-main">
                <div className="cart-left-container">
                    <div className="out-of-stock-notice">
                        {exclamation}
                        <div>One out of stock item removed:</div>
                        <div>Product name here</div>
                        {xMark}
                    </div>
                    <div className="cart-products-flex">
                        <div>PRODUCT</div>
                        <div>PRICE</div>
                        <div>QUANTITY</div>
                        <div>TOTAL PRICE</div>
                    </div>
                    <div className="cart-items-container">
                        {cartItems.map(cartItem => <CustomerCartItemRow key={cartItem.id} itemData={cartItem} changeQuantityFunction={this.handleChangeItemQuantity} />)}
                    </div>
                </div>
                <div className="cart-right-container">
                    <h2>SUMMARY</h2>
                    <div>
                        <div>Do you have a promo code?</div>
                        <div>
                            <input type="text" />
                            <button>APPLY</button>
                        </div>
                        <div>
                            {this.buildCartBreakdown()}
                            {/* {this.cartBreakdownRow("Cart Subtotal:", `$${this.getCartTotal().toFixed(2)}`)}
                            {this.cartBreakdownRow("Shipping & Handling:", "--")}
                            {this.cartBreakdownRow("Discount:", "--")}
                            {this.cartBreakdownRow("Cart Total:", `$${this.getCartTotal().toFixed(2)}`)} */}
                        </div>
                        <button>CHECKOUT</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default CustomerCart;