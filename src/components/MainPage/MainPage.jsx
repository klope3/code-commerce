import React from "react";
import AccountManagementBox from "../AccountManagementBox/AccountManagementBox";
import CustomerCart from "../CustomerCart/CustomerCart";
import OrderProgressBar from "../OrderProgressBar/OrderProgressBar";
import ShippingInfo from "../ShippingInfo/ShippingInfo";
import { products } from "../products";
import { promoCodes } from "../promoCodes";

class MainPage extends React.Component {
    constructor() {
        super();
        this.state = {
            activeBox: "",
            cartItems: this.getInitialCartItems(),
            promoCodesEntered: [],
        }
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

    handleChangeItemQuantity = event => {
        if (event.target.value <= 0) { return; }
        const itemIndex = event.target.name.replace(/[^0-9]/g, "");
        const newState = {...this.state};
        newState.cartItems[itemIndex].quantity = event.target.value;
        this.setState(newState);
    }

    handleRemoveItem = event => {
        const itemId = parseInt(event.target.name.replace(/[^0-9]/g, ""));
        const itemToRemove = this.state.cartItems.find(item => item.id === itemId);
        const newState = { ...this.state };
        newState.cartItems = newState.cartItems.filter(item => item !== itemToRemove);
        this.setState(newState);
    }

    handleResetCart = () => {
        this.setState(prevState => ({
            ...prevState,
            cartItems: this.getInitialCartItems(),
        }));
    }

    handleSubmitPromoCode = (promoCodeField) => {
        console.log("Called in main");
        const matchedCode = promoCodes.find(code => code.code === promoCodeField.toLowerCase());
        if (matchedCode && !this.state.promoCodesEntered.find(code => code.code === matchedCode.code)) {
            this.setState(prevState => ({
                ...prevState,
                promoCodesEntered: [...prevState.promoCodesEntered, matchedCode],
            }))
        }
    }

    render() {
        const { cartItems } = this.state;
        return (
            <div>
                <CustomerCart 
                    cartItems={cartItems} 
                    totalDiscount={this.getTotalDiscount()} 
                    changeQuantityFunction={this.handleChangeItemQuantity} 
                    removeItemFunction={this.handleRemoveItem}
                    submitPromoCodeFunction={this.handleSubmitPromoCode} />
            </div>
        )
    }
}

export default MainPage;