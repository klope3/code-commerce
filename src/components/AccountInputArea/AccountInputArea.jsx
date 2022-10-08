import React from "react";
import "./AccountInputArea.css";

class AccountInputArea extends React.Component {
    togglePasswordVisibility = event => {
        event.preventDefault();
        this.setState(prevState => ({
            passwordVisible: prevState ? !prevState.passwordVisible : true,
        }));
    }

    render() {
        const { 
            params: {
                name,
                type,
                labelText,
                fieldId,
                subText, 
                errorText,
            },
            changeFunction,
            blurFunction,
        } = this.props;
        let typeToUse = type;
        if (type === "password" && this.state && this.state.passwordVisible) {typeToUse = "text"}
        return (
            <div className="account-input-area">
                <label htmlFor={fieldId} className="field-label">{labelText}</label>
                <input type={typeToUse} name={name} className="account-field" id={fieldId} onChange={changeFunction} onBlur={blurFunction} />  
                {subText && <span className="field-sub-text">{subText}</span>}
                {type === "password" && <button className="password-visibility-button" onClick={this.togglePasswordVisibility}></button>}
                {errorText && <span className="field-error-text">{errorText}</span>}
            </div>
        )
    }
}

export default AccountInputArea;