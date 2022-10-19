import React from "react";

class FieldRowSection extends React.Component {
    inputElement = (type, value, name, placeholder, changeFieldFunction, options) => {
        let element = (<input 
            type={type} 
            value={value} 
            name={name} 
            id={name} 
            placeholder={placeholder} 
            onChange={changeFieldFunction} />);
        if (type === "select") {
            element = (<select name={name} id={name} onChange={changeFieldFunction}>
                {placeholder && <option disabled selected hidden>{placeholder}</option>}
                {options.map(option => <option key={`${name}-option-${option}`} value={option}>{option}</option>)}
            </select>);
        }
        return element;
    }

    fieldRow = (rowData, changeFieldFunction) => {
        const { 
            displayText, 
            value, 
            name, 
            label, 
            showLabel, 
            type, 
            errorMessage,
            extraInputContent, 
            placeholder, 
            options 
        } = rowData;
        return (
            <div key={name} className="field-row">
                {displayText && <span className="field-row-display-text">{displayText}</span>}
                <label htmlFor={name} style={{display: showLabel ? "inline" : "none"}}>
                    {label}
                </label>
                <span className="field-row-input-container">
                    {this.inputElement(type, value, name, placeholder, changeFieldFunction, options)}
                    {errorMessage && <span class="field-row-input-error">{errorMessage}</span>}
                    {extraInputContent}
                </span>
            </div>
        )
    }

    render() {
        const { fieldRows,  changeFieldFunction } = this.props;
        return fieldRows.map(rowData => this.fieldRow(rowData, changeFieldFunction));
    }
}

export default FieldRowSection;