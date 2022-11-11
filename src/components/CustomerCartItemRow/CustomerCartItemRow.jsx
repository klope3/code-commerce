import React from "react";
import "./CustomerCartItemRow.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import ProductDataText from "../ProductDataText/ProductDataText";

// const circleXMark = <FontAwesomeIcon icon={faCircleXmark} className="remove-cart-item-x" />;

class CustomerCartItemRow extends React.Component {
    render() {
        const { 
            itemData: {
                product,
                product: {
                    name,
                    description,
                    price,
                    fileSize,
                    starRating,
                    imgUrl,
                },
                quantity,
                id,
            },
            changeQuantityFunction,
            removeItemFunction,
        } = this.props;
        const quantityInputName=`quantityField${id}`;
        return (
            <div className="cart-products-flex cart-item-row">
                <div className="product-display-container">
                    <button className="remove-cart-item-x" name={`removeItem${id}`} onClick={removeItemFunction}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                    {/* <button>Remove</button> */}
                    <img src={imgUrl} alt="Product" />
                    <ProductDataText 
                        productData={product} 
                        quantity={quantity}
                        showQuantity={false}
                        changeQuantityFunction={changeQuantityFunction} 
                        quantityInputName={quantityInputName} />
                    
                </div>
                <div className="money-base non-mobile">${price}</div>
                <div className="non-mobile">
                    <input 
                        type="number" 
                        className="product-quantity-input" 
                        value={quantity} 
                        name={quantityInputName}
                        onChange={changeQuantityFunction} />
                </div>
                <div className="money-base non-mobile">${(price * quantity).toFixed(2)}</div>
            </div>
        )
    }
}

export default CustomerCartItemRow;