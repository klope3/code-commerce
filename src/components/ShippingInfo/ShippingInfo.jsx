import React from "react";
import OrderProgressBar from "../OrderProgressBar/OrderProgressBar";

class ShippingInfo extends React.Component {
    render() {
        return (
            <div className="shipping-info-main">
                <div>
                    <OrderProgressBar orderStep={1} />
                </div>
            </div>
        )
    }
}

export default ShippingInfo;