export const checkLettersOnly = input => /^[a-zA-Z]+$/g.test(input);
export const checkValidPostcode = input => input >= 10000 && input <= 99999;
export const checkValidEmail = input => /^(?:[a-zA-Z\d]+)@(?:[a-zA-Z\d]+)\.(?:[a-zA-Z]{2,})$/g.test(input);
export const checkValidPassword = input => /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+]).{8,20}$/g.test(input);

export const paymentValidations = {
    cardNumber: numberString => {
        console.log("Received " + numberString);
        let noSpaces = numberString.replace(/[^\d]/g, "");
        console.log("Validating " + noSpaces);
        return noSpaces.length !== 16 ? "The card number must be 16 digits." : undefined;
    }
};