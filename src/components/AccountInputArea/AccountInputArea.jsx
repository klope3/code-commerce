import React from "react";
import "./AccountInputArea.css";

class AccountInputArea extends React.Component {
    render() {
        const { fieldId, labelText, subText } = this.props;
        const errorText = "This is an error.";
        return (
            <div className="account-input-area">
                <label htmlFor={fieldId} className="field-label">{labelText}</label>
                <input {...this.props} className="account-field" id={fieldId} />  
                {/* This input field is currently getting ALL props; fix!!!!!!! */}
                {subText && <span className="field-sub-text">{subText}</span>}
                <span className="field-error-text">{errorText}</span>
            </div>
        )
    }
}

export default AccountInputArea;