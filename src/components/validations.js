import { getCardType } from "./utility";

export const checkLettersOnly = input => /^[a-zA-Z]+$/g.test(input);
export const checkValidPostcode = input => input >= 10000 && input <= 99999;
export const checkValidEmail = input => /^(?:[a-zA-Z\d]+)@(?:[a-zA-Z\d]+)\.(?:[a-zA-Z]{2,})$/g.test(input);
export const checkValidPassword = input => /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+]).{8,20}$/g.test(input);
const hasDigitCount = (string, count) => string.replace(/[^\d]/g, "").length === count;
const checkValidFullName = string => {
    const validNameSurname = /^ *[a-zA-Z]+ +[a-zA-Z]+ *$/g.test(string);
    return !validNameSurname ? "Please enter a valid name and surname." : undefined;
}
const emptyInput = inputString => !inputString || !inputString.length;
const validPasswordMessage = "Password must be 8-20 characters, including at least one capital letter, at least one small letter, one number and one special character - !@#$%^&*()_+";

export const paymentValidations = {
    cardNumber: numberString => {
        let noSpaces = numberString.replace(/[^\d]/g, "");
        return noSpaces.length !== 16 ? "The card number must be 16 digits." : undefined;
    }
};

export const validationFunctions = {
    createAccountEmail: string => !checkValidEmail(string) ? "Please enter a valid e-mail address." : undefined,
    createAccountPassword: string => !checkValidPassword(string) ? validPasswordMessage : undefined,
    createAccountFirstName: string => !checkLettersOnly(string) ? "Please enter a valid first name." : undefined,
    createAccountSurname: string => !checkLettersOnly(string) ? "Please enter a valid last name." : undefined,
    createAccountZipCode: numberString => !checkValidPostcode(numberString) ? "Please enter a 5-digit zip code." : undefined,
    //payment
    cardholder: string => checkValidFullName(string),
    cardNumber: numberString => {
        let noSpaces = numberString.replace(/[^\d]/g, "");
        if (noSpaces.length !== 16) return "The card number must be 16 digits.";
        if (!getCardType(noSpaces)) return "Invalid card number.";
        return undefined;
    },
    expiryMonth: value => !value || value === "Month" ? "Please choose a month." : undefined,
    expiryYear: value => !value || value === "Year" ? "Please choose a year." : undefined,
    securityCode: number => number < 100 || number > 999 ? "Please enter a 3-digit security code." : undefined,
    //shipping
    addressTitle: string => emptyInput(string) ? "Please enter an address title." : undefined,
    nameSurname: string => checkValidFullName(string),
    address: string => emptyInput(string) ? "Please enter an address." : undefined,
    zipCode: string => emptyInput(string) ? "Please enter a zip code." : undefined,
    state: string => emptyInput(string) ? "Please enter a state." : undefined,
    city: string => emptyInput(string) ? "Please enter a city." : undefined,
    cellCountryCode: string => emptyInput(string) ? "Please enter a cell country code." : undefined,
    cellNumber: string => !hasDigitCount(string, 10) ? "Please enter a 10-digit cell number." : undefined,
    telephoneCountryCode: string => emptyInput(string) ? "Please enter a telephone country code." : undefined,
    telephoneNumber: string => !hasDigitCount(string, 10) ? "Please enter a 10-digit telephone number." : undefined,
}