import React from "react";

import AccountManagementBox from "../AccountManagementBox/AccountManagementBox";
import CustomerCart from "../CustomerCart/CustomerCart";
import ShippingInfo from "../ShippingInfo/ShippingInfo";
import PaymentInfo from "../PaymentInfo/PaymentInfo";

import { products } from "../products";
import { promoCodes } from "../promoCodes";
import { getCardType } from "../utility";
import { expressShippingPrice, standardShippingMinimum } from "../constants";
import { validationFunctions } from "../validations";
import { formattingFunctions } from "../formatters";
import { tryVerifyLogin } from "../accounts";

import "../styles.css";
import "../responsive.css";
import OrderConfirmation from "../OrderConfirmation/OrderConfirmation";

class MainPage extends React.Component {
    constructor() {
        super();
        const initialItems = this.getInitialCartItems();
        const standardShippingAllowed = this.getCartSubtotal(initialItems) >= standardShippingMinimum;
        this.state = {
            activeBox: "",
            orderStep: 0,
            loggedInEmail: "person@example.com",
            cartItems: initialItems,
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
                errors: {
                    nameSurname: undefined,
                    zipCode: undefined,
                }
            },
            paymentInfo: {
                cardholder: "",
                cardNumber: "",
                cardType: "",
                expiryMonth: "",
                expiryYear: "",
                securityCode: "",
                errors: {
                    cardholder: undefined,
                    cardNumber: undefined,
                    securityCode: undefined,
                }
            },
        }
    }

    getInitialCartItems = () => {
        return products.map((product, index) => ({
            product: product,
            quantity: 1,
            id: index,
        }));
    }

//#region Calculation
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
//#endregion
//#region Change Functions
    navigate = (senderName, backwards) => {
        if (backwards) {
            this.setState(prevState => ({
                ...prevState,
                orderStep: prevState.orderStep - 1,
            }));
            window.scroll(0, 0);
            return;
        }
        let shippingErrors = this.state.shippingInfo.errors;
        let paymentErrors = this.state.paymentInfo.errors;
        const { errors, errorFound } = this.checkForErrors(this.state[senderName]);
        if (senderName === "shippingInfo") shippingErrors = errors;
        if (senderName === "paymentInfo") paymentErrors = errors;
        this.setState(prevState => ({
            ...prevState,
            orderStep: errorFound ? prevState.orderStep : prevState.orderStep + 1,
            shippingInfo: {
                ...prevState.shippingInfo,
                errors: shippingErrors,
            },
            paymentInfo: {
                ...prevState.paymentInfo,
                errors: paymentErrors,
            },
        }));
        if (!errorFound) window.scroll(0, 0);
    }

    handleChangeItemQuantity = event => {
        if (event.target.value <= 0) { return; }
        const itemId = +event.target.name.replace(/[^0-9]/g, "");
        let newItems = [...this.state.cartItems];
        for (const i in newItems) {
            if (newItems[i].id !== itemId) continue;
            newItems[i] = {
                ...newItems[i],
                quantity: event.target.value,
            };
        }
        this.setState(prevState => ({
            ...prevState,
            cartItems: newItems,
        }));
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
        const { name: sender, value } = event.target;
        let valueToSet = value;
        if (formattingFunctions[sender]) valueToSet = formattingFunctions[sender](value);
        if (sender === "shippingMethod") valueToSet = event.target.id;
        this.setState(prevState => ({
            ...prevState,
            shippingInfo: {
                ...prevState.shippingInfo,
                [sender]: valueToSet,
            }
        }));
    }

    handlePaymentFieldChange = event => {
        const { name: sender, value } = event.target;
        this.setState(prevState => ({
            ...prevState,
            paymentInfo: {
                ...prevState.paymentInfo,
                [sender]: formattingFunctions[sender] ? formattingFunctions[sender](value) : value,
                cardType: sender === "cardNumber" ? getCardType(value) : prevState.paymentInfo.cardType,
            }
        }));
    }

    trySignIn = (email, password) => {
        if (tryVerifyLogin(email, password)) {
            this.setState(prevState => ({
                ...prevState,
                loggedInEmail: email,
                orderStep: prevState.orderStep + 1,
            }));
        }
    }
//#endregion
//#region Blur Functions
    handleFieldBlur = (event, infoObjectKey) => {
        const { name: sender, value } = event.target;
        const validationFunction = validationFunctions[sender];
        this.setState(prevState => ({
            ...prevState,
            [infoObjectKey]: {
                ...prevState[infoObjectKey],
                errors: {
                    ...prevState[infoObjectKey].errors,
                    [sender]: validationFunction ? validationFunction(value) : undefined,
                }
            }
        }));
    }

    handlePaymentFieldBlur = event => this.handleFieldBlur(event, "paymentInfo");
    handleShippingFieldBlur = event => this.handleFieldBlur(event, "shippingInfo");
//#endregion
    
    checkForErrors = (fieldData) => {
        const results = {
            errors: {},
            errorFound: false,
        };
        for (const key in fieldData) {
            const validationFunction = validationFunctions[key];
            if (validationFunction) {
                results.errors[key] = validationFunction(fieldData[key]);
                if (results.errors[key]) results.errorFound = true;
            }
        }
        return results;
    }

    chooseScreen = () => {
        const { orderStep } = this.state;
        const { cartItems, shippingInfo, paymentInfo } = this.state;
        const subtotal = this.getCartSubtotal(cartItems);
        const standardShippingAllowed = subtotal >= standardShippingMinimum;

        switch (orderStep) {
            case 0:
                return <AccountManagementBox signInFunction={this.trySignIn} />;
            case 1:
                return (
                    <CustomerCart 
                        cartItems={cartItems} 
                        subtotal={this.getCartSubtotal(this.state.cartItems)}
                        totalDiscount={this.getTotalDiscount()} 
                        changeQuantityFunction={this.handleChangeItemQuantity} 
                        removeItemFunction={this.handleRemoveItem}
                        resetCartFunction={this.handleResetCart}
                        submitPromoCodeFunction={this.handleSubmitPromoCode}
                        navigateFunction={this.navigate} />
                );
            case 2:
                return (
                    <ShippingInfo 
                        cartItems={cartItems} 
                        subtotal={subtotal} 
                        shippingHandling={this.getShippingPrice()} 
                        discount={this.getTotalDiscount()}
                        fieldData={shippingInfo}
                        standardShippingAllowed={standardShippingAllowed}
                        changeFieldFunction={this.handleShippingFieldChange}
                        blurFieldFunction={this.handleShippingFieldBlur}
                        navigateFunction={this.navigate} />
                );
            case 3:
                return (
                    <PaymentInfo
                        cartItems={cartItems}
                        subtotal={subtotal}
                        shippingHandling={this.getShippingPrice()}
                        discount={this.getTotalDiscount()}
                        shippingInfo={shippingInfo}
                        fieldData={paymentInfo}
                        changeFieldFunction={this.handlePaymentFieldChange}
                        blurFieldFunction={this.handlePaymentFieldBlur}
                        navigateFunction={this.navigate} />
                );
            case 4:
                return (
                    <OrderConfirmation 
                        cartItems={cartItems}
                        subtotal={subtotal}
                        shippingHandling={this.getShippingPrice()}
                        discount={this.getTotalDiscount()}
                        shippingInfo={shippingInfo}
                        paymentInfo={paymentInfo} />
                );
            default:
                return undefined;
        }
    }

    render() {
        return (
            <div>
                {this.chooseScreen()}
            </div>
        )
    }
}

export default MainPage;