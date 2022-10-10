import React from "react";
import "./CustomerCart.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation, faXmark, faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const exclamation = <FontAwesomeIcon icon={faTriangleExclamation} />;
const xMark = <FontAwesomeIcon icon={faXmark} className="close-x" />;
const circleXMark = <FontAwesomeIcon icon={faCircleXmark} className="remove-cart-item-x" />;

class CustomerCart extends React.Component {
    render() {
        return (
            <div className="cart-main">
                <div className="cart-left-container">
                    <div className="out-of-stock-notice">
                        {exclamation}
                        <div>One out of stock item removed:</div>
                        <div>Product name here</div>
                        {xMark}
                    </div>
                    <div className="cart-products-flex">
                        <div>PRODUCT</div>
                        <div>PRICE</div>
                        <div>QUANTITY</div>
                        <div>TOTAL PRICE</div>
                    </div>
                    <div className="cart-items-container">
                        <div className="cart-products-flex cart-item-row">
                            <div className="product-display-container">
                                {circleXMark}
                                <img src="https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                                <div>
                                    <div>Product Description</div>
                                    <div>Product Name</div>
                                    <div>Data 1: 130</div>
                                    <div>Data 2: 12</div>
                                </div>
                            </div>
                            <div>$21.50</div>
                            <div><input type="number" className="product-quantity-input" /></div>
                            <div>$21.50</div>
                        </div>
                        <div className="cart-products-flex cart-item-row">
                            <div className="product-display-container">
                                {circleXMark}
                                <img src="https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                                <div>
                                    <div>Product Description</div>
                                    <div>Product Name</div>
                                    <div>Data 1: 130</div>
                                    <div>Data 2: 12</div>
                                </div>
                            </div>
                            <div>$21.50</div>
                            <div><input type="number" className="product-quantity-input" /></div>
                            <div>$21.50</div>
                        </div>
                        <div className="cart-products-flex cart-item-row">
                            <div className="product-display-container">
                                {circleXMark}
                                <img src="https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                                <div>
                                    <div>Product Description</div>
                                    <div>Product Name</div>
                                    <div>Data 1: 130</div>
                                    <div>Data 2: 12</div>
                                </div>
                            </div>
                            <div>$21.50</div>
                            <div><input type="number" className="product-quantity-input" /></div>
                            <div>$21.50</div>
                        </div>
                    </div>
                </div>
                <div className="cart-right-container">
                    <h2>SUMMARY</h2>
                    <div>
                        <div>Do you have a promo code?</div>
                        <div>
                            <input type="text" />
                            <button>APPLY</button>
                        </div>
                        <div>
                            <div className="cart-price-breakdown-row">
                                <div>Cart Subtotal:</div>
                                <div>$54.00</div>
                            </div>
                            <div className="cart-price-breakdown-row">
                                <div>Shipping and Handling:</div>
                                <div>--</div>
                            </div>
                            <div className="cart-price-breakdown-row">
                                <div>Discount:</div>
                                <div>--</div>
                            </div>
                            <div className="cart-price-breakdown-row">
                                <div>Cart Total:</div>
                                <div>$54.00</div>
                            </div>
                        </div>
                        <button>CHECKOUT</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default CustomerCart;