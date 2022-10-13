import React from "react";
import CartPriceBreakdown from "../CartPriceBreakdown/CartPriceBreakdown";
import OrderProgressBar from "../OrderProgressBar/OrderProgressBar";
import ProductDisplayArea from "../ProductDisplayArea/ProductDisplayArea";
import "./ShippingInfo.css";

class ShippingInfo extends React.Component {
    render() {
        const { cartItems, subtotal, shippingHandling, discount } = this.props;
        return (
            <div className="shipping-info-main">
                <div className="shipping-info-left">
                    <OrderProgressBar orderStep={1} />
                    <h2>SHIPPING INFORMATION</h2>
                    <div>
                        <span>Address Title</span>
                        <input type="text" />
                    </div>
                    <div>
                        <span>Name - Surname</span>
                        <input type="text" />
                    </div>
                    <div>
                        <span>Your Address</span>
                        <input type="text" />
                    </div>
                    <div className="shipping-info-small-fields">
                        <div>
                            <span>Zip Code</span>
                            <input type="number" />
                        </div>
                        <div>
                            <span>Country</span>
                            <input type="number" />
                        </div>
                        <div>
                            <span>City</span>
                            <input type="number" />
                        </div>
                        <div>
                            <span>State</span>
                            <input type="number" />
                        </div>
                    </div>
                    <div>
                        <span>Cell</span>
                        <input type="number" />
                        <input type="number" />
                    </div>
                    <div>
                        <span>Telephone</span>
                        <input type="number" />
                        <input type="number" />
                    </div>
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