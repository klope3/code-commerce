import React from "react";

import CustomerCartItemRow from "../CustomerCartItemRow/CustomerCartItemRow";
import SummarySidebar from "../SummarySidebar/SummarySidebar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation, faXmark } from "@fortawesome/free-solid-svg-icons";

import "./CustomerCart.css";

const exclamation = <FontAwesomeIcon icon={faTriangleExclamation} />;
const xMark = <FontAwesomeIcon icon={faXmark} className="close-x" />;

class CustomerCart extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmitPromoCode = props.submitPromoCodeFunction;
        this.changeOrderStep = props.changeOrderStepFunction;
        this.state = {
            promoCodeField: "",
        }
    }

//#region Handle Functions
    handleChangePromoCode = event => {
        this.setState(prevState => ({
            ...prevState,
            promoCodeField: event.target.value,
        }));
    }

    clickSubmitPromoCode = () => {
        this.handleSubmitPromoCode(this.state.promoCodeField);
        this.setState(prevState => ({
            ...prevState,
            promoCodeField: "",
        }))
    }

    handleNavClick = () => this.changeOrderStep();
//#endregion
//#region Builder Functions
    buildLeftContainer = (cartItems, changeQuantityFunction, removeItemFunction, resetCartFunction) => {
        const emptyCart = cartItems.length === 0;
        return (
            <div className="order-screen-left-container">
                <div className="out-of-stock-notice">
                    {exclamation}
                    <div>One out of stock item removed:</div>
                    <div>Product name here</div>
                    {xMark}
                </div>
                <div className="order-screen-left-sub-container" id="cart-screen-left-sub-container">
                    <div className="cart-products-flex cart-column-labels">
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
            </div>
        )
    }

    buildCartColumnLabels = () => {
        const labels = ["PRODUCT", "PRICE", "QUANTITY", "TOTAL PRICE"];
        return labels.map((label, index) => <div key={index}>{label}</div>);
    }
//#endregion

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
            <div className="order-screen-main">
                {this.buildLeftContainer(cartItems, changeQuantityFunction, removeItemFunction, resetCartFunction)}
                <SummarySidebar 
                    promoCodeField={this.state.promoCodeField}
                    changePromoCodeFunction={this.handleChangePromoCode}
                    clickPromoSubmitFunction={this.clickSubmitPromoCode}
                    subtotal={subtotal} 
                    discount={totalDiscount}
                    navClickFunction={this.handleNavClick}
                    disableNavButton={emptyCart} />
            </div>
        )
    }
}

export default CustomerCart;