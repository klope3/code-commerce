import React from "react";
import "./CustomerCart.css";
import CustomerCartItemRow from "../CustomerCartItemRow/CustomerCartItemRow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation, faXmark } from "@fortawesome/free-solid-svg-icons";
import { products } from "../products";
import { promoCodes } from "../promoCodes";

const exclamation = <FontAwesomeIcon icon={faTriangleExclamation} />;
const xMark = <FontAwesomeIcon icon={faXmark} className="close-x" />;

class CustomerCart extends React.Component {
    constructor() {
        super();
        this.state = {
            cartItems: this.getInitialCartItems(),
            promoCodeField: "",
            promoCodesEntered: [],
        }
    }

    handleChangeItemQuantity = event => {
        if (event.target.value <= 0) { return; }
        const itemIndex = event.target.name.replace(/[^0-9]/g, "");
        const newState = {...this.state};
        newState.cartItems[itemIndex].quantity = event.target.value;
        this.setState(newState);
    }

    handleChangePromoCode = event => {
        this.setState(prevState => ({
            ...prevState,
            promoCodeField: event.target.value,
        }));
    }

    handleRemoveItem = event => {
        const itemId = parseInt(event.target.name.replace(/[^0-9]/g, ""));
        const itemToRemove = this.state.cartItems.find(item => item.id === itemId);
        const newState = { ...this.state };
        newState.cartItems = newState.cartItems.filter(item => item !== itemToRemove);
        this.setState(newState);
    }

    handleSubmitPromoCode = () => {
        const matchedCode = promoCodes.find(code => code.code === this.state.promoCodeField.toLowerCase());
        const newState = { 
            ...this.state,
            promoCodeField: "",
        };
        if (matchedCode && !this.state.promoCodesEntered.find(code => code.code === matchedCode.code)) {
            newState.promoCodesEntered.push(matchedCode);
        }
        this.setState(newState);
    }

    handleResetCart = () => {
        this.setState(prevState => ({
            ...prevState,
            cartItems: this.getInitialCartItems(),
        }));
    }

    getInitialCartItems = () => {
        return products.map((product, index) => ({
            product: product,
            quantity: 1,
            id: index,
        }));
    }

    getCartSubtotal = () => this.state.cartItems.reduce((accumulator, cartItem) => accumulator + cartItem.product.price * cartItem.quantity, 0);

    getTotalDiscount = () => {
        const cartSubtotal = this.getCartSubtotal();
        let runningTotal = cartSubtotal;
        for (const promo of this.state.promoCodesEntered) {
            runningTotal *= 1 - promo.discountFactor;
        }
        return cartSubtotal - runningTotal;
    }

    buildCartColumnLabels = () => {
        const labels = ["PRODUCT", "PRICE", "QUANTITY", "TOTAL PRICE"];
        return labels.map((label, index) => <div key={index}>{label}</div>);
    }

    cartBreakdownRow = (leftText, rightText) => {
        return (
            <div className="cart-price-breakdown-row">
                <div>{leftText}</div>
                <div>{rightText}</div>
            </div>
        )
    }

    buildCartBreakdown = () => {
        const subtotal = this.getCartSubtotal();
        const totalDiscount = this.getTotalDiscount();
        const breakdown = [
            {
                leftText: "Cart Subtotal:",
                rightText: `$${subtotal.toFixed(2)}`,
            },
            {
                leftText: "Shipping & Handling:",
                rightText: "--",
            },
            {
                leftText: "Discount:",
                rightText: totalDiscount === 0 ? "--" : `$${totalDiscount.toFixed(2)}`,
            },
            {
                leftText: "Cart Total:",
                rightText: `$${(subtotal - totalDiscount).toFixed(2)}`,
            },
        ];
        return breakdown.map((breakdownRow, index) => {
            return (
                <div className="cart-price-breakdown-row" key={index}>
                    <div>{breakdownRow.leftText}</div>
                    <div>{breakdownRow.rightText}</div>
                </div>
            )
        });
    }

    resetCartButton = () => {
        return (
            <button>Reset Cart</button>
        )
    }

    render() {
        const { cartItems } = this.state;
        const emptyCart = cartItems.length === 0;
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
                        {this.buildCartColumnLabels()}
                    </div>
                    <div className="cart-items-container">
                        {cartItems.map(cartItem => <CustomerCartItemRow key={cartItem.id} itemData={cartItem} changeQuantityFunction={this.handleChangeItemQuantity} removeItemFunction={this.handleRemoveItem} />)}
                        {emptyCart && <button className="reset-cart-button" onClick={this.handleResetCart}>Reset Cart</button>}
                    </div>
                </div>
                <div className="cart-right-container">
                    <h2>SUMMARY</h2>
                    <div>
                        <div>Do you have a promo code?</div>
                        <div>
                            <input type="text" value={this.state.promoCodeField} onChange={this.handleChangePromoCode} />
                            <button onClick={this.handleSubmitPromoCode}>APPLY</button>
                        </div>
                        <div>
                            {this.buildCartBreakdown()}
                        </div>
                        <button disabled={emptyCart}>CHECKOUT</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default CustomerCart;