import { creditCardTypes } from "./constants";

export const getCardType = numberString => {
    for (const cardType of creditCardTypes) {
        if (numberString.startsWith(cardType.start)) return cardType.type;
    }
    return undefined;
}

export const numberArray = (first, last) => {
    const array = [];
    for (let i = first; i <= last; i++) {
        array.push(i);
    }
    return array;
}