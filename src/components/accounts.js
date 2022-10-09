const accounts = [];

export const addAccount = (email, password, firstName, surname, postcode) => {
    accounts.push({
        email: email, 
        password: password,
        firstName: firstName,
        surname: surname,
        postcode: postcode,
    });
    console.log("Added");
    console.log(accounts);
};

export const doesAccountExist = email => {
    for (const account in accounts) {
        if (account.email === email) {
            return true;
        }
    }
    return false;
};

export const tryVerifyLogin = (email, password) => {

};