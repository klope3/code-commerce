import { getCardType } from "./utility";

export const checkLettersOnly = input => /^[a-zA-Z]+$/g.test(input);
export const checkValidPostcode = input => input >= 10000 && input <= 99999;
export const checkValidEmail = input => /^(?:[a-zA-Z\d]+)@(?:[a-zA-Z\d]+)\.(?:[a-zA-Z]{2,})$/g.test(input);
export const checkValidPassword = input => /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+]).{8,20}$/g.test(input);
const checkValidName = string => {
    const validNameSurname = /^ *[a-zA-Z]+ +[a-zA-Z]+ *$/g.test(string);
    return !validNameSurname ? "Please enter a valid name and surname." : undefined;
}

export const paymentValidations = {
    cardNumber: numberString => {
        console.log("Received " + numberString);
        let noSpaces = numberString.replace(/[^\d]/g, "");
        console.log("Validating " + noSpaces);
        return noSpaces.length !== 16 ? "The card number must be 16 digits." : undefined;
    }
};

export const validationFunctions = {
    cardholder: string => checkValidName(string),
    cardNumber: numberString => {
        let noSpaces = numberString.replace(/[^\d]/g, "");
        if (noSpaces.length !== 16) return "The card number must be 16 digits.";
        if (!getCardType(noSpaces)) return "Invalid card number.";
        return undefined;
    },
    securityCode: number => number < 100 || number > 999 ? "Please enter a 3-digit security code." : undefined,
    nameSurname: string => checkValidName(string),
}