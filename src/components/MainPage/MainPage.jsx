import React from "react";
import AccountManagementBox from "../AccountManagementBox/AccountManagementBox";
import CustomerCart from "../CustomerCart/CustomerCart";
import OrderProgressBar from "../OrderProgressBar/OrderProgressBar";
import ShippingInfo from "../ShippingInfo/ShippingInfo";
import { products } from "../products";
import { promoCodes } from "../promoCodes";
import { creditCardTypes, expressShippingPrice } from "../constants";
import { standardShippingMinimum } from "../constants";
import { paymentValidations, validationFunctions } from "../validations";
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

    formatCardNumber = rawString => {
        let formatted = this.removeNonDigits(rawString);
        if (formatted.length) {
            formatted = formatted.match(new RegExp(".{1,4}", "g")).join(" ");
        }
        return formatted;
    }

    handleShippingFieldChange = event => {
        const { name: sender, value } = event.target;
        this.setState(prevState => ({
            ...prevState,
            shippingInfo: {
                ...prevState.shippingInfo,
                [sender]: sender === "shippingMethod" ? event.target.id : value,
            }
        }));
    }

    handlePaymentFieldChange = event => {
        const { name: sender, value } = event.target;
        this.setState(prevState => ({
            ...prevState,
            paymentInfo: {
                ...prevState.paymentInfo,
                [sender]: sender === "cardNumber" ? this.formatCardNumber(value) : value,
                cardType: sender === "cardNumber" ? this.getCardType(value) : prevState.paymentInfo.cardType,
            }
        }));
    }

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

    render() {
        const { cartItems, shippingInfo, paymentInfo } = this.state;
        const subtotal = this.getCartSubtotal(cartItems);
        const standardShippingAllowed = subtotal >= standardShippingMinimum;
        return (
            <div>
                {/* <PaymentInfo
                    cartItems={cartItems}
                    subtotal={subtotal}
                    shippingHandling={this.getShippingPrice()}
                    discount={this.getTotalDiscount()}
                    fieldData={paymentInfo}
                    changeFieldFunction={this.handlePaymentFieldChange}
                    blurFieldFunction={this.handlePaymentFieldBlur} /> */}
                <ShippingInfo 
                    cartItems={cartItems} 
                    subtotal={subtotal} 
                    shippingHandling={this.getShippingPrice()} 
                    discount={this.getTotalDiscount()}
                    fieldData={shippingInfo}
                    standardShippingAllowed={standardShippingAllowed}
                    changeFieldFunction={this.handleShippingFieldChange}
                    blurFieldFunction={this.handleShippingFieldBlur} />
                {/* <CustomerCart 
                    cartItems={cartItems} 
                    subtotal={this.getCartSubtotal(this.state.cartItems)}
                    totalDiscount={this.getTotalDiscount()} 
                    changeQuantityFunction={this.handleChangeItemQuantity} 
                    removeItemFunction={this.handleRemoveItem}
                    resetCartFunction={this.handleResetCart}
                    submitPromoCodeFunction={this.handleSubmitPromoCode} /> */}
            </div>
        )
    }
}

export default MainPage;