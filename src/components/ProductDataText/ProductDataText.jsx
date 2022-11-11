import React from "react";

class ProductDataText extends React.Component {
    render() {
        const { 
            productData: {
                description,
                name,
                fileSize,
                starRating,
                price,
            }, 
            quantity, 
            showQuantity,
            changeQuantityFunction,
            quantityInputName,
        } = this.props;
        return (
            <div>
                <div>{description}</div>
                <div><strong>{name}</strong></div>
                <div>Filesize: {fileSize}kb</div>
                <div>Stars: {starRating}</div>
                {showQuantity && <div>Qty: {quantity}</div>}
                {changeQuantityFunction && <div className="mobile-only">
                    <div className="money-base non-mobile">${price}</div>
                    <div>
                        <input 
                            type="number" 
                            className="product-quantity-input" 
                            value={quantity} 
                            name={quantityInputName}
                            onChange={changeQuantityFunction} />
                    </div>
                    <div className="money-base">${(price * quantity).toFixed(2)}</div>
                </div>}
            </div>
        )
    }
}

export default ProductDataText;