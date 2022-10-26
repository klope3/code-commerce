import React from "react";
import CartPriceBreakdown from "../CartPriceBreakdown/CartPriceBreakdown";
import FieldRowSection from "../FieldRowSection/FieldRowSection";
import OrderProgressBar from "../OrderProgressBar/OrderProgressBar";
import ProductDisplayArea from "../ProductDisplayArea/ProductDisplayArea";
import SummarySidebar from "../SummarySidebar/SummarySidebar";
import "./ShippingInfo.css";

class ShippingInfo extends React.Component {
    constructor(props) {
        super(props);
        this.changeOrderStepFunction = props.changeOrderStepFunction;
    }

    buildFieldRows = (fieldData, changeFieldFunction, blurFieldFunction) => {
        const { 
            zipCode, 
            state,
            city,
            nameSurname,
            cellCountryCode,
            cellNumber,
            telephoneCountryCode,
            telephoneNumber,
            errors
        } = fieldData;
        const fieldRows = [
            {
                name: "addressTitle",
                displayText: "Address Title",
                label: "address title",
                type: "text",
                errorMessage: errors.addressTitle,
            },
            {
                name: "nameSurname",
                value: nameSurname,
                displayText: "Name - Surname",
                label: "name surname",
                type: "text",
                errorMessage: errors.nameSurname,
            },
            {
                name: "address",
                displayText: "Your Address",
                label: "your address",
                type: "text",
                errorMessage: errors.address,
            },
            {
                name: "zipCode",
                value: zipCode,
                displayText: "Zip",
                label: "zip code",
                type: "text",
                errorMessage: errors.zipCode
            },
            {
                name: "country",
                displayText: "Country",
                label: "country",
                type: "text",
            },
            {
                name: "city",
                value: city,
                displayText: "City",
                label: "city",
                type: "text",
                errorMessage: errors.city,
            },
            {
                name: "state",
                value: state,
                displayText: "State",
                label: "state",
                type: "text",
                errorMessage: errors.state,
            },
            {
                name: "cellCountryCode",
                value: cellCountryCode,
                displayText: "Cell Phone",
                label: "cell country code",
                type: "text",
                errorMessage: errors.cellCountryCode,
            },
            {
                name: "cellNumber",
                value: cellNumber,
                // displayText: "",
                label: "cell number",
                type: "text",
                errorMessage: errors.cellNumber,
            },
            {
                name: "telephoneCountryCode",
                value: telephoneCountryCode,
                displayText: "Telephone",
                label: "telephone country code",
                type: "text",
                errorMessage: errors.telephoneCountryCode,
            },
            {
                name: "telephoneNumber",
                value: telephoneNumber,
                // displayText: "",
                label: "telephone number",
                type: "text",
                errorMessage: errors.telephoneNumber,
            },
        ];
        return <FieldRowSection fieldRows={fieldRows} changeFieldFunction={changeFieldFunction} blurFieldFunction={blurFieldFunction} />
    }

    radioRow = (inputName, inputId, labelText, descriptionText, defaultChecked, disabled, changeFieldFunction) => {
        return (
            <div key={inputId}>
                <label>
                    <input type="radio" name={inputName} id={inputId} checked={defaultChecked} disabled={disabled} onChange={changeFieldFunction} />
                    {labelText}
                    <span>{descriptionText}</span>
                </label>
            </div>
        )
    }

    buildShippingMethods = (cartSubtotal, checkedStates, standardShippingAllowed, changeFieldFunction) => {
        const radios = [
            {
                id: "standard",
                labelText: "STANDARD",
                description: "Delivery in 4-6 business days - Free ($40 minimum)",
                checked: checkedStates[0],
                disabled: !standardShippingAllowed,
            },
            {
                id: "express",
                labelText: "EXPRESS",
                description: "Delivery in 1-3 business days - $5.00",
                checked: checkedStates[1],
                disabled: false,
            },
        ];
        return (
            <div className="shipping-radio-buttons">
                {radios.map(row => this.radioRow("shippingMethod", row.id, row.labelText, row.description, row.checked, row.disabled, changeFieldFunction))}
            </div>
        )
    }

    handleNavClick = event => {
        if (event.target.name === "nav-forward") this.changeOrderStepFunction();
        else if (event.target.name === "nav-backward") this.changeOrderStepFunction(true);
    }

    render() {
        const { 
            cartItems, 
            subtotal, 
            shippingHandling, 
            discount,
            fieldData,
            fieldData: {
                addressTitle,
                nameSurname,
                zipCode,
                country,
                city,
                state,
                cellCountryCode,
                cellNumber,
                telephoneCountryCode,
                telephoneNumber,
                shippingMethod,
                errors,
            },
            standardShippingAllowed,
            changeFieldFunction,
            blurFieldFunction,
        } = this.props;
        const shippingMethodCheckedStates = [shippingMethod === "standard", shippingMethod === "express"];
        return (
            <div className="shipping-info-main">
                <div className="shipping-info-left">
                    <OrderProgressBar orderStep={1} />
                    <h2>SHIPPING INFORMATION</h2>
                    {this.buildFieldRows(fieldData, changeFieldFunction, blurFieldFunction, errors)}
                    <h2>SHIPPING METHOD</h2>
                    {this.buildShippingMethods(subtotal, shippingMethodCheckedStates, standardShippingAllowed, changeFieldFunction)}
                    <button name="nav-backward" onClick={this.handleNavClick}>BACK TO CART</button>
                </div>
                <SummarySidebar 
                    cartItems={cartItems} 
                    subtotal={subtotal}
                    shippingHandling={shippingHandling} 
                    discount={discount}
                    navClickFunction={this.handleNavClick} />
            </div>
        )
    }
}

export default ShippingInfo;