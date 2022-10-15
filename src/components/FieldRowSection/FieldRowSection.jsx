import React from "react";

class FieldRowSection extends React.Component {
    fieldRow = (inputType, inputIds, labelText, labelFor, changeFieldFunction) => {
        return (
            <div key={`section${inputIds.join()}`}>
                <label htmlFor={labelFor}>{labelText}</label>
                {inputIds.map(inputId => <input type={inputType} name={inputId} id={inputId} key={inputId} onChange={changeFieldFunction}/>)}
            </div>
        )
    }

    render() {
        const { rowSection,  changeFieldFunction } = this.props;
        return rowSection.map(rowSection => {
            const { inputType, inputs, labelText, labelFor } = rowSection;
            return this.fieldRow(inputType, inputs, labelText, labelFor, changeFieldFunction);
        })
    }
}

export default FieldRowSection;