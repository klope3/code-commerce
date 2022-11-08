import amexIcon from "../cc-assets/amex.png";
import discoverIcon from "../cc-assets/discover.png";
import mastercardIcon from "../cc-assets/masterCard.png";
import visaIcon from "../cc-assets/visa.png";

export const fieldNamesCreate = {
    emailCreate: "emailCreate",
    passwordCreate: "passwordCreate",
    passwordConfirm: "passwordConfirm",
    firstName: "firstName",
    surname: "surname",
    postcode: "postcode",
}

export const fieldNamesLogin = {
    emailLogin: "emailLogin",
    passwordLogin: "passwordLogin",
}

export const expressShippingPrice = 5;
export const standardShippingMinimum = 40;

export const creditCardTypes = [
    {
        start: "34",
        type: "americanExpress",
    },
    {
        start: "37",
        type: "americanExpress",
    },
    {
        start: "4",
        type: "visa",
    },
    {
        start: "5",
        type: "mastercard",
    },
    {
        start: "6",
        type: "discover",
    },
];

export const creditCardLogos = {
    americanExpress: amexIcon,
    discover: discoverIcon,
    mastercard: mastercardIcon,
    visa: visaIcon,
};

export const shippingStandardDescription = "Delivery in 4-6 business days";
export const shippingExpressDescription = "Delivery in 1-3 business days";