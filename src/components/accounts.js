const accounts = [];

export const addAccount = (email, password, firstName, surname, postcode) => {
    accounts.push({
        email: email, 
        password: password,
        firstName: firstName,
        surname: surname,
        postcode: postcode,
    });
};

export const doesAccountExist = email => {
    for (const account of accounts) {
        if (account.email === email) {
            return true;
        }
    }
    return false;
};

export const tryVerifyLogin = (email, password) => {
    for (const account of accounts) {
        if (account.email === email && account.password === password) {
            return true;
        }
    }
    return false;
};