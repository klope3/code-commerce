import React from "react";

class FieldRowSection extends React.Component {
    //fieldDiv = (inputType, inputId, value, changeFieldFunction, extraElement) => {
    //    return (
    //        <div key={inputId}>
    //            <input type={inputType} name={inputId} id={inputId} value={value} onChange={changeFieldFunction}/>
    //            {extraElement}
    //        </div>
    //    )
    //}
//
    //fieldRow = (inputType, inputIds, labelText, labelFor, changeFieldFunction, value, extraElement) => {
    //    console.log(extraElement);
    //    return (
    //        <div key={`section${inputIds.join()}`} style={{position: "relative"}}>
    //            <label htmlFor={labelFor}>{labelText}</label>
    //            {inputIds.map(inputId => this.fieldDiv(inputType, inputId, value, changeFieldFunction, extraElement))}
    //        </div>
    //    )
    //}
    fieldRow = (rowData, changeFieldFunction) => {
        const { displayText, value, name, label, showLabel, type, extraInputContent } = rowData;
        return (
            <div key={name}>
                {displayText && <span className="field-row-display-text">{displayText}</span>}
                <label htmlFor={name} style={{display: showLabel ? "inline" : "none"}}>
                    {label}
                </label>
                <span className="field-row-input-container">
                    <input type={type} value={value} name={name} id={name} onChange={changeFieldFunction} />
                    {extraInputContent}
                </span>
            </div>
        )
    }

    render() {
        const { fieldRows,  changeFieldFunction } = this.props;
        return fieldRows.map(rowData => this.fieldRow(rowData, changeFieldFunction));
        //return rowSection.map(rowSection => {
        //    const { inputType, inputs, labelText, labelFor, value, extraElement } = rowSection;
        //    return this.fieldRow(inputType, inputs, labelText, labelFor, changeFieldFunction, value, extraElement);
        //})
    }
}

export default FieldRowSection;