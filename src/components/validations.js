import { fieldNames } from "./constants";
export const validateByFieldName = (fieldName, fieldValue) => {
    const validationFunctions = new Map([
        [fieldNames.emailCreate, checkValidEmail],
        [fieldNames.passwordCreate, checkValidPassword],
        [fieldNames.passwordConfirm, checkValidPassword],
        [fieldNames.firstName, checkLettersOnly],
        [fieldNames.surname, checkLettersOnly],
        [fieldNames.postcode, checkValidPostcode],
        [fieldNames.emailLogin, checkValidEmail],
        [fieldNames.passwordLogin, checkValidPassword],
    ]);
    const func = validationFunctions.get(fieldName);
    return func(fieldValue);
}

export const checkLettersOnly = input => /^[a-zA-Z]+$/g.test(input);
export const checkValidPostcode = input => input >= 10000 && input <= 99999; //real postcodes are more complex than this
export const checkValidEmail = input => /^(?:[a-zA-Z\d]+)@(?:[a-zA-Z\d]+)\.(?:[a-zA-Z]{2,})$/g.test(input);
export const checkValidPassword = input => /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+]).{8,20}$/g.test(input);
