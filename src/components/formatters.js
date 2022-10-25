const removeNonDigits = string => string.replace(/[^\d]/g, "");
const removeNonLettersNonSpaces = string => string.replace(/[^a-zA-Z ]/g, "");
const formatPhoneNumber = string => {
    let formatted = removeNonDigits(string);
    if (formatted.length) {
        formatted = formatted.substring(0, 10);
        const matches = formatted.match(/.{1,3}/g);
        if (matches.length === 4) {
            matches[2] += matches[3];
            matches.pop();
        }
        formatted = matches.join("-");
    }
    return formatted;
};

export const formattingFunctions = {
    createAccountFirstName: rawString => removeNonLettersNonSpaces(rawString),
    createAccountSurname: rawString => removeNonLettersNonSpaces(rawString),
    createAccountZipCode: rawString => removeNonDigits(rawString),
    cardNumber: rawString => {
        let formatted = removeNonDigits(rawString).substring(0, 16);
        if (formatted.length) {
            formatted = formatted.match(/.{1,4}/g).join(" ");
        }
        return formatted;
    },
    cardholder: rawString => removeNonLettersNonSpaces(rawString),
    securityCode: rawString => removeNonDigits(rawString),
    zipCode: rawString => removeNonDigits(rawString),
    state: rawString => removeNonLettersNonSpaces(rawString),
    city: rawString => removeNonLettersNonSpaces(rawString),
    nameSurname: rawString => removeNonLettersNonSpaces(rawString),
    cellCountryCode: rawString => removeNonDigits(rawString),
    cellNumber: rawString => formatPhoneNumber(rawString),
    telephoneCountryCode: rawString => removeNonDigits(rawString),
    telephoneNumber: rawString => formatPhoneNumber(rawString),
}