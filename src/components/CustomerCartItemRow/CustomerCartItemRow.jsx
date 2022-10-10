import React from "react";
import "./CustomerCartItemRow.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const circleXMark = <FontAwesomeIcon icon={faCircleXmark} className="remove-cart-item-x" />;

class CustomerCartItemRow extends React.Component {
    render() {
        console.log(this.props.itemData);
        const { 
            itemData: {
                product: {
                    name,
                    description,
                    price,
                    fileSize,
                    starRating,
                },
                quantity,
                id,
            },
            changeQuantityFunction,
        } = this.props;
        return (
            <div className="cart-products-flex cart-item-row">
                <div className="product-display-container">
                    {circleXMark}
                    <img src="https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
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