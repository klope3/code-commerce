//import { expressShippingPrice } from "./constants";
//
//export const getCartSubtotal = cartItems => {
//        return cartItems.reduce((accumulator, cartItem) => accumulator + cartItem.product.price * cartItem.quantity, 0)
//}
//
//export const getTotalDiscount = (subtotal, promoCodes) => {
//    let runningTotal = subtotal;
//    for (const promo of promoCodes) {
//        runningTotal *= 1 - promo.discountFactor;
//    }
//    return subtotal - runningTotal;
//}
//
//export const getShippingPrice = shippingMethod => shippingMethod === "express" ? expressShippingPrice : 0;
//
//export const changeComponentState = (component, event) => {
//    console.log("Received " + event.target.value + " from " + event.target.name);
//    component.setState(prevState => ({
//        ...prevState,
//        [event.target.name]: event.target.value,
//    }));
//}
import { creditCardTypes } from "./constants";

export const getCardType = numberString => {
    for (const cardType of creditCardTypes) {
        if (numberString.startsWith(cardType.start)) return cardType.type;
    }
    return undefined;
}