import React from "react";
import CartPriceBreakdown from "../CartPriceBreakdown/CartPriceBreakdown";
import OrderProgressBar from "../OrderProgressBar/OrderProgressBar";
import ProductDisplayArea from "../ProductDisplayArea/ProductDisplayArea";
import "./ShippingInfo.css";

class ShippingInfo extends React.Component {
    fieldRow = (inputType, inputIds, labelText, labelFor, changeFieldFunction) => {
        return (
            <div key={`section${inputIds.join()}`}>
                <label htmlFor={labelFor}>{labelText}</label>
                {inputIds.map(inputId => <input type={inputType} name={inputId} id={inputId} key={inputId} onChange={changeFieldFunction}/>)}
            </div>
        )
    }

    fieldRowSection = (rowSection, changeFieldFunction) => {
        return rowSection.map(rowSection => {
            const { inputType, inputs, labelText, labelFor } = rowSection;
            return this.fieldRow(inputType, inputs, labelText, labelFor, changeFieldFunction);
        })
    }

    buildFieldRows = changeFieldFunction => {
        const rowSection1 = [
            {
                inputType: "text",
                inputs: ["addressTitle"],
                labelText: "Address Title",
                labelFor: "addressTitle",
            },
            {
                inputType: "text",
                inputs: ["nameSurname"],
                labelText: "Name - Surname",
                labelFor: "nameSurname",
            },
            {
                inputType: "text",
                inputs: ["address"],
                labelText: "Your Address",
                labelFor: "address",
            },
        ];
        const rowSection2 = [
            {
                inputType: "number",
                inputs: ["zipCode"],
                labelText: "Zip Code",
                labelFor: "zipCode",
            },
            {
                inputType: "text",
                inputs: ["country"],
                labelText: "Country",
                labelFor: "country",
            },
            {
                inputType: "text",
                inputs: ["city"],
                labelText: "City",
                labelFor: "city",
            },
            {
                inputType: "text",
                inputs: ["state"],
                labelText: "State",
                labelFor: "state",
            },
        ];
        const rowSection3 = [
            {
                inputType: "number",
                inputs: ["cellCountryCode", "cellNumber"],
                labelText: "Cell Phone",
                labelFor: "cellNumber",
            },
            {
                inputType: "number",
                inputs: ["telephoneCountryCode", "telephoneNumber"],
                labelText: "Telephone",
                labelFor: "telephoneNumber",
            },
        ];
        return (
            <div>
                {this.fieldRowSection(rowSection1, changeFieldFunction)}
                <div className="shipping-info-small-fields">
                    {this.fieldRowSection(rowSection2, changeFieldFunction)}
                </div>
                {this.fieldRowSection(rowSection3, changeFieldFunction)}
            </div>
        )
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

    buildShippingMethods = (cartSubtotal, checkedStates, changeFieldFunction) => {
        const radios = [
            {
                id: "standard",
                labelText: "STANDARD",
                description: "Delivery in 4-6 business days - Free ($40 minimum)",
                checked: checkedStates[0],
                disabled: false,
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
            },
            changeFieldFunction,
        } = this.props;
        const shippingMethodCheckedStates = [shippingMethod === "standard", shippingMethod === "express"];
        return (
            <div className="shipping-info-main">
                <div className="shipping-info-left">
                    <OrderProgressBar orderStep={1} />
                    <h2>SHIPPING INFORMATION</h2>
                    {this.buildFieldRows(changeFieldFunction)}
                    <h2>SHIPPING METHOD</h2>
                    {this.buildShippingMethods(subtotal, shippingMethodCheckedStates, changeFieldFunction)}
                </div>
                <div className="shipping-info-right">
                    <h2>SUMMARY</h2>
                    <div><strong>{`${cartItems.length} items`}</strong> in your bag.</div>
                    <div>
                        {cartItems.map((item, index) => {
                            return (
                                <ProductDisplayArea productData={item.product} quantity={item.quantity} hideDescription={true} key={index} />
                            )
                        })}
                    </div>
                    <CartPriceBreakdown subtotal={subtotal} shippingHandling={shippingHandling} discount={discount} />
                    <button>CHECKOUT</button>
                </div>
            </div>
        )
    }
}

export default ShippingInfo;