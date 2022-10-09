//import { fieldNames } from "./constants";

// const {
//     emailCreate,
//     passwordCreate,
//     passwordConfirm,
//     firstName,
//     surname,
//     postcode,
//     emailLogin,
//     passwordLogin,
// } = fieldNames;

// export const validateByFieldName = (fieldName, fieldValue) => {
//     const validationFunctions = new Map([
//         [emailCreate, checkValidEmail],
//         [passwordCreate, checkValidPassword],
//         [passwordConfirm, checkValidPassword],
//         [firstName, checkLettersOnly],
//         [surname, checkLettersOnly],
//         [postcode, checkValidPostcode],
//         [emailLogin, checkValidEmail],
//         [passwordLogin, checkValidPassword],
//     ]);
//     return validationFunctions.get(fieldName)(fieldValue);
// }

export const checkLettersOnly = input => /^[a-zA-Z]+$/g.test(input);
export const checkValidPostcode = input => input >= 10000 && input <= 99999;
export const checkValidEmail = input => /^(?:[a-zA-Z\d]+)@(?:[a-zA-Z\d]+)\.(?:[a-zA-Z]{2,})$/g.test(input);
export const checkValidPassword = input => /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+]).{8,20}$/g.test(input);
