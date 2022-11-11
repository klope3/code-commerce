import React from "react";
import CartPriceBreakdown from "../CartPriceBreakdown/CartPriceBreakdown";
import FieldRowSection from "../FieldRowSection/FieldRowSection";
import OrderProgressBar from "../OrderProgressBar/OrderProgressBar";
import ProductDisplayArea from "../ProductDisplayArea/ProductDisplayArea";
import SummarySidebar from "../SummarySidebar/SummarySidebar";
import { shippingStandardDescription, shippingExpressDescription, countries } from "../constants";
import { validationFunctions } from "../validations";
import "./ShippingInfo.css";

class ShippingInfo extends React.Component {
    constructor(props) {
        super(props);
        this.navigate = props.navigateFunction;
    }

//#region Builder Functions
    buildFieldRows = (fieldData, changeFieldFunction, blurFieldFunction) => {
        const { 
            addressTitle,
            address,
            zipCode, 
            state,
            city,
            country,
            nameSurname,
            cellCountryCode,
            cellNumber,
            telephoneCountryCode,
            telephoneNumber,
            errors
        } = fieldData;
        const fieldRows1 = [
            {
                name: "addressTitle",
                id: "addressTitle",
                value: addressTitle,
                displayText: "Address Title",
                label: "address title",
                type: "text",
                errorMessage: errors.addressTitle,
            },
            {
                name: "nameSurname",
                id: "nameSurname",
                value: nameSurname,
                displayText: "Name - Surname",
                label: "name surname",
                type: "text",
                errorMessage: errors.nameSurname,
            },
            {
                name: "address",
                id: "address",
                value: address,
                displayText: "Your Address",
                label: "your address",
                type: "text",
                errorMessage: errors.address,
            },
        ];
        const fieldRows2 = [
            {
                name: "zipCode",
                id: "zipCode",
                value: zipCode,
                displayText: "Zip",
                label: "zip code",
                type: "text",
                errorMessage: errors.zipCode
            },
            {
                name: "country",
                id: "country",
                value: country,
                displayText: "Country",
                label: "country",
                type: "select",
                placeholder: "Country",
                options: countries,
                errorMessage: errors.country,
            },
            {
                name: "city",
                id: "city",
                value: city,
                displayText: "City",
                label: "city",
                type: "text",
                errorMessage: errors.city,
            },
            {
                name: "state",
                id: "state",
                value: state,
                displayText: "State",
                label: "state",
                type: "text",
                errorMessage: errors.state,
            },
        ];
        const fieldRows3 = [
            {
                name: "cellCountryCode",
                id: "cellCountryCode",
                value: cellCountryCode,
                displayText: "Cell Phone",
                label: "cell country code",
                type: "text",
                errorMessage: errors.cellCountryCode,
            },
            {
                name: "cellNumber",
                id: "cellNumber",
                value: cellNumber,
                label: "cell number",
                type: "text",
                errorMessage: errors.cellNumber,
            },
        ];
        const fieldRows4 = [
            {
                name: "telephoneCountryCode",
                id: "telephoneCountryCode",
                value: telephoneCountryCode,
                displayText: "Telephone",
                label: "telephone country code",
                type: "text",
                errorMessage: errors.telephoneCountryCode,
            },
            {
                name: "telephoneNumber",
                id: "telephoneNumber",
                value: telephoneNumber,
                label: "telephone number",
                type: "text",
                errorMessage: errors.telephoneNumber,
            },
        ];

        return (
            <div>
                <FieldRowSection 
                    fieldRows={fieldRows1} 
                    sectionId="shipping-section-1" 
                    changeFieldFunction={changeFieldFunction} 
                    blurFieldFunction={blurFieldFunction} />
                <FieldRowSection 
                    fieldRows={fieldRows2} 
                    sectionId="shipping-section-2" 
                    changeFieldFunction={changeFieldFunction} 
                    blurFieldFunction={blurFieldFunction} />
                <FieldRowSection 
                    fieldRows={fieldRows3} 
                    sectionId="shipping-section-3" 
                    changeFieldFunction={changeFieldFunction} 
                    blurFieldFunction={blurFieldFunction} />
                <FieldRowSection 
                    fieldRows={fieldRows4} 
                    sectionId="shipping-section-4" 
                    changeFieldFunction={changeFieldFunction} 
                    blurFieldFunction={blurFieldFunction} />
            </div>
            
        );
    }

    radioRow = (inputName, inputId, labelText, descriptionText, defaultChecked, disabled, changeFieldFunction) => {
        return (
            <div key={inputId}>
                <label>
                    <input type="radio" name={inputName} id={inputId} checked={defaultChecked} disabled={disabled} onChange={changeFieldFunction} />
                    <span className="shipping-method-name">{labelText}</span>
                    <span className="shipping-method-description">{descriptionText}</span>
                </label>
            </div>
        )
    }

    buildShippingMethods = (checkedStates, standardShippingAllowed, changeFieldFunction) => {
        const radios = [
            {
                id: "standard",
                labelText: "STANDARD",
                description: `${shippingStandardDescription} - Free ($40 minimum)`,
                checked: checkedStates[0],
                disabled: !standardShippingAllowed,
            },
            {
                id: "express",
                labelText: "EXPRESS",
                description: `${shippingExpressDescription} - $5.00`,
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
//#endregion

    handleNavClick = event => {
        if (event.target.name === "nav-forward") this.navigate("shippingInfo");
        else if (event.target.name === "nav-backward") this.navigate("shippingInfo", true);
    }

    render() {
        const { 
            cartItems, 
            subtotal, 
            shippingHandling, 
            discount,
            fieldData,
            fieldData: {
                shippingMethod,
                errors,
            },
            standardShippingAllowed,
            changeFieldFunction,
            blurFieldFunction,
        } = this.props;
        const shippingMethodCheckedStates = [shippingMethod === "standard", shippingMethod === "express"];
        return (
            <div className="order-screen-main">
                <div className="order-screen-left-container">
                    <OrderProgressBar orderStep={1} />
                    <div className="order-screen-left-sub-container">
                        <h2>SHIPPING INFORMATION</h2>
                        {this.buildFieldRows(fieldData, changeFieldFunction, blurFieldFunction, errors)}
                        <div className="shipping-methods-container">
                            <h2 className="no-border">SHIPPING METHOD</h2>
                            {this.buildShippingMethods(shippingMethodCheckedStates, standardShippingAllowed, changeFieldFunction)}
                        </div>
                        <button name="nav-backward" className="nav-backward-button" onClick={this.handleNavClick}>BACK TO CART</button>
                    </div>
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