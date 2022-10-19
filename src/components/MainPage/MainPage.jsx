import React from "react";
import AccountManagementBox from "../AccountManagementBox/AccountManagementBox";
import CustomerCart from "../CustomerCart/CustomerCart";
import OrderProgressBar from "../OrderProgressBar/OrderProgressBar";
import ShippingInfo from "../ShippingInfo/ShippingInfo";
import { products } from "../products";
import { promoCodes } from "../promoCodes";
import { creditCardTypes, expressShippingPrice } from "../constants";
import { standardShippingMinimum } from "../constants";
import { paymentValidations } from "../validations";
import PaymentInfo from "../PaymentInfo/PaymentInfo";

class MainPage extends React.Component {
    constructor() {
        super();
        const initialItems = this.getInitialCartItems();
        const standardShippingAllowed = this.getCartSubtotal(initialItems) >= standardShippingMinimum;
        this.state = {
            activeBox: "",
            orderStep: 0,
            loggedInEmail: "person@example.com",
            cartItems: this.getInitialCartItems(),
            promoCodesEntered: [],
            shippingInfo: {
                addressTitle: "",
                nameSurname: "",
                address: "",
                zipCode: "",
                country: "",
                city: "",
                state: "",
                cellCountryCode: "",
                cellNumber: "",
                telephoneCountryCode: "",
                telephoneNumber: "",
                shippingMethod: standardShippingAllowed ? undefined : "express",
            },
            paymentInfo: {
                cardholder: "",
                cardNumber: "",
                cardType: "",
                expiryMonth: "",
                expiryYear: "",
                securityCode: "",
                errors: {
                    cardholder: "",
                    cardNumber: "",
                    securityCode: "",
                }
            },
        }
    }

    removeNonDigits = string => string.replace(/[^\d]/g, "");

    getCardType = numberString => {
        for (const cardType of creditCardTypes) {
            if (numberString.startsWith(cardType.start)) return cardType.type;
        }
        return undefined;
    }

    getInitialCartItems = () => {
        return products.map((product, index) => ({
            product: product,
            quantity: 1,
            id: index,
        }));
    }

    getCartSubtotal = cartItems => cartItems.reduce((accumulator, cartItem) => accumulator + cartItem.product.price * cartItem.quantity, 0);

    getTotalDiscount = () => {
        const cartSubtotal = this.getCartSubtotal(this.state.cartItems);
        let runningTotal = cartSubtotal;
        for (const promo of this.state.promoCodesEntered) {
            runningTotal *= 1 - promo.discountFactor;
        }
        return cartSubtotal - runningTotal;
    }

    getShippingPrice = () => this.state.shippingInfo.shippingMethod === "express" ? expressShippingPrice : 0;

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
        const matchedCode = promoCodes.find(code => code.code === promoCodeField.toLowerCase());
        if (matchedCode && !this.state.promoCodesEntered.find(code => code.code === matchedCode.code)) {
            this.setState(prevState => ({
                ...prevState,
                promoCodesEntered: [...prevState.promoCodesEntered, matchedCode],
            }))
        }
    }

    handleShippingFieldChange = event => {
        const value = event.target.name === "shippingMethod" ? event.target.id : event.target.value;
        this.setState(prevState => ({
            ...prevState,
            shippingInfo: {
                ...prevState.shippingInfo,
                [event.target.name]: value,
            }
        }));
    }

    handlePaymentFieldChange = event => {
        let value = event.target.value;
        const newState = { ...this.state };
        if (event.target.name === "cardNumber") {
            value = this.removeNonDigits(value);
            newState.paymentInfo.cardType = this.getCardType(value);
            if (value.length) value = value.match(new RegExp(".{1,4}", "g")).join(" ");
            newState.paymentInfo.errors.cardNumber = paymentValidations.cardNumber(value);
        }
        newState.paymentInfo[event.target.name] = value;
        this.setState(newState);
    }

    render() {
        const { cartItems, shippingInfo, paymentInfo } = this.state;
        const subtotal = this.getCartSubtotal(cartItems);
        const standardShippingAllowed = subtotal >= standardShippingMinimum;
        return (
            <div>
                <PaymentInfo
                    cartItems={cartItems}
                    subtotal={subtotal}
                    shippingHandling={this.getShippingPrice()}
                    discount={this.getTotalDiscount()}
                    fieldData={paymentInfo}
                    changeFieldFunction={this.handlePaymentFieldChange} />
                {/* <ShippingInfo 
                    cartItems={cartItems} 
                    subtotal={subtotal} 
                    shippingHandling={this.getShippingPrice()} 
                    discount={this.getTotalDiscount()}
                    fieldData={shippingInfo}
                    standardShippingAllowed={standardShippingAllowed}
                    changeFieldFunction={this.handleShippingFieldChange} /> */}
                {/* <CustomerCart 
                    cartItems={cartItems} 
                    subtotal={this.getCartSubtotal()}
                    totalDiscount={this.getTotalDiscount()} 
                    changeQuantityFunction={this.handleChangeItemQuantity} 
                    removeItemFunction={this.handleRemoveItem}
                    submitPromoCodeFunction={this.handleSubmitPromoCode} /> */}
            </div>
        )
    }
}

export default MainPage;