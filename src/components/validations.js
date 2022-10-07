import { fieldNames } from "./constants";
export const validateByFieldName = (fieldName, fieldValue) => {
    const validationFunctions = new Map([
        [fieldNames.emailCreate, checkValidEmail],
        [fieldNames.passwordCreate, checkValidPassword],
        [fieldNames.passwordConfirm, checkValidPassword],
        [fieldNames.firstName, checkLettersOnly],
        [fieldNames.surname, checkLettersOnly],
        [fieldNames.postcode, checkMaxNumber],
        [fieldNames.emailLogin, checkValidEmail],
        [fieldNames.passwordLogin, checkValidPassword],
    ]);
    const func = validationFunctions.get(fieldName);
    return func(fieldValue);
}

export const checkLettersOnly = input => console.log("Checking for letters only")/*/^[a-zA-Z]+$/g.test(input)*/;
export const checkMaxNumber = input => console.log("Checking max number");
export const checkValidEmail = input => console.log("Checking email");
export const checkValidPassword = input => console.log("Checking password");
