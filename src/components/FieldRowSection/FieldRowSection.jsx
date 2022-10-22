import React from "react";
import "./FieldRowSection.css";

class FieldRowSection extends React.Component {
    inputElement = (type, value, name, id, placeholder, changeFieldFunction, blurFieldFunction, options, checked) => {
        const checkable = type === "checkbox" || type === "radio";
        let element = (<input 
            type={type} 
            value={!checkable ? value : undefined} 
            name={name} 
            id={id ? id : name} 
            placeholder={placeholder} 
            onChange={changeFieldFunction}
            onBlur={blurFieldFunction}
            checked={checkable ? checked : undefined} />);
        if (type === "select") {
            element = (<select name={name} id={name} onChange={changeFieldFunction} onBlur={blurFieldFunction}>
                {placeholder && <option disabled selected hidden>{placeholder}</option>}
                {options.map(option => <option key={`${name}-option-${option}`} value={option}>{option}</option>)}
            </select>);
        }
        return element;
    }

    fieldRow = (rowData, changeFieldFunction, blurFieldFunction) => {
        const { 
            displayText, 
            value, 
            name, 
            id,
            label, 
            showLabel, 
            type, 
            errorMessage,
            extraInputContent, 
            placeholder, 
            options 
        } = rowData;
        return (
            <div key={id ? id : name} className="field-row">
                {displayText && <span className="field-row-display-text">{displayText}</span>}
                <label htmlFor={name} style={{display: showLabel ? "inline" : "none"}}>
                    {label}
                </label>
                <span className="field-row-input-container">
                    {this.inputElement(type, value, name, id, placeholder, changeFieldFunction, blurFieldFunction, options)}
                    {errorMessage && <span className="field-row-input-error">{errorMessage}</span>}
                    {extraInputContent}
                </span>
            </div>
        )
    }

    render() {
        const { fieldRows,  changeFieldFunction, blurFieldFunction } = this.props;
        return fieldRows.map(rowData => this.fieldRow(rowData, changeFieldFunction, blurFieldFunction));
    }
}

export default FieldRowSection;