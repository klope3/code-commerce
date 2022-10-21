import React from "react";
import "./CustomerCart.css";
import CustomerCartItemRow from "../CustomerCartItemRow/CustomerCartItemRow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation, faXmark } from "@fortawesome/free-solid-svg-icons";
import { products } from "../products";
import { promoCodes } from "../promoCodes";
import CartPriceBreakdown from "../CartPriceBreakdown/CartPriceBreakdown";

const exclamation = <FontAwesomeIcon icon={faTriangleExclamation} />;
const xMark = <FontAwesomeIcon icon={faXmark} className="close-x" />;

class CustomerCart extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmitPromoCode = props.submitPromoCodeFunction;
        this.state = {
            promoCodeField: "",
        }
    }

    handleChangePromoCode = event => {
        this.setState(prevState => ({
            ...prevState,
            promoCodeField: event.target.value,
        }));
    }

    buildCartColumnLabels = () => {
        const labels = ["PRODUCT", "PRICE", "QUANTITY", "TOTAL PRICE"];
        return labels.map((label, index) => <div key={index}>{label}</div>);
    }

    clickSubmitPromoCode = () => {
        this.handleSubmitPromoCode(this.state.promoCodeField);
        this.setState(prevState => ({
            ...prevState,
            promoCodeField: "",
        }))
    }

    render() {
        const { 
            cartItems, 
            subtotal, 
            totalDiscount, 
            changeQuantityFunction, 
            removeItemFunction, 
            resetCartFunction,
        } = this.props;
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
                        {cartItems.map(cartItem => {
                            return (
                                <CustomerCartItemRow 
                                key={cartItem.id} 
                                itemData={cartItem} 
                                changeQuantityFunction={changeQuantityFunction} 
                                removeItemFunction={removeItemFunction} />
                            )
                        })}
                        {emptyCart && <button className="reset-cart-button" onClick={resetCartFunction}>Reset Cart</button>}
                    </div>
                </div>
                <div className="cart-right-container">
                    <h2>SUMMARY</h2>
                    <div>
                        <div>Do you have a promo code?</div>
                        <div>
                            <input type="text" value={this.state.promoCodeField} onChange={this.handleChangePromoCode} />
                            <button onClick={this.clickSubmitPromoCode}>APPLY</button>
                        </div>
                        <CartPriceBreakdown subtotal={subtotal} shippingHandling={0} discount={totalDiscount} />
                        <button disabled={emptyCart}>CHECKOUT</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default CustomerCart;