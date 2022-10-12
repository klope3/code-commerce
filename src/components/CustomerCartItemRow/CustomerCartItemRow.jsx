import React from "react";
import "./CustomerCartItemRow.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

// const circleXMark = <FontAwesomeIcon icon={faCircleXmark} className="remove-cart-item-x" />;

class CustomerCartItemRow extends React.Component {
    render() {
        const { 
            itemData: {
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
        return (
            <div className="cart-products-flex cart-item-row">
                <div className="product-display-container">
                    <button className="remove-cart-item-x" name={`removeItem${id}`} onClick={removeItemFunction}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                    <img src={imgUrl} alt="Product" />
                    <div>
                        <div>{description}</div>
                        <div>{name}</div>
                        <div>Filesize: {fileSize}kb</div>
                        <div>Stars: {starRating}</div>
                    </div>
                </div>
                <div>${price}</div>
                <div>
                    <input 
                        type="number" 
                        className="product-quantity-input" 
                        value={quantity} 
                        name={`quantityField${id}`}
                        onChange={changeQuantityFunction} />
                </div>
                <div>${(price * quantity).toFixed(2)}</div>
            </div>
        )
    }
}

export default CustomerCartItemRow;