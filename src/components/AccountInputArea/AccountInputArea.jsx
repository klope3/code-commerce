import React from "react";
import "./AccountInputArea.css";

class AccountInputArea extends React.Component {
    render() {
        const { fieldId, labelText } = this.props;
        return (
            <div>
                <label htmlFor={fieldId} className="field-label">{labelText}</label>
                <input {...this.props} id={fieldId} />
            </div>
        )
    }
}

export default AccountInputArea;