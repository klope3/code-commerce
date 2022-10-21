import React from "react";
import CartPriceBreakdown from "../CartPriceBreakdown/CartPriceBreakdown";
import FieldRowSection from "../FieldRowSection/FieldRowSection";
import OrderProgressBar from "../OrderProgressBar/OrderProgressBar";
import ProductDisplayArea from "../ProductDisplayArea/ProductDisplayArea";
import SummarySidebar from "../SummarySidebar/SummarySidebar";
import "./ShippingInfo.css";

class ShippingInfo extends React.Component {
    buildFieldRows = (changeFieldFunction, blurFieldFunction, errors) => {
        const fieldRows = [
            {
                name: "addressTitle",
                displayText: "Address Title",
                label: "address title",
                type: "text",
            },
            {
                name: "nameSurname",
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
            },
            {
                name: "zipCode",
                displayText: "Zip",
                label: "zip code",
                type: "number",
            },
            {
                name: "country",
                displayText: "Country",
                label: "country",
                type: "text",
            },
            {
                name: "city",
                displayText: "City",
                label: "city",
                type: "text",
            },
            {
                name: "state",
                displayText: "State",
                label: "state",
                type: "text",
            },
            {
                name: "cellCountryCode",
                displayText: "Cell Phone",
                label: "cell country code",
                type: "number",
            },
            {
                name: "cellNumber",
                // displayText: "",
                label: "cell number",
                type: "number",
            },
            {
                name: "telephoneCountryCode",
                displayText: "Telephone",
                label: "telephone country code",
                type: "number",
            },
            {
                name: "telephoneNumber",
                // displayText: "",
                label: "telephone number",
                type: "number",
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

    render() {
        const { 
            cartItems, 
            subtotal, 
            shippingHandling, 
            discount,
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
                    {this.buildFieldRows(changeFieldFunction, blurFieldFunction, errors)}
                    <h2>SHIPPING METHOD</h2>
                    {this.buildShippingMethods(subtotal, shippingMethodCheckedStates, standardShippingAllowed, changeFieldFunction)}
                </div>
                <SummarySidebar 
                    cartItems={cartItems} 
                    subtotal={subtotal}
                    shippingHandling={shippingHandling} 
                    discount={discount} />
            </div>
        )
    }
}

export default ShippingInfo;