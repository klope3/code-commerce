import React from "react";
import "./ProductDisplayArea.css";

class ProductDisplayArea extends React.Component {
    render() {
        const { productData, quantity, hideDescription } = this.props;
        return (
            <div className="product-display-container">
                <img src={productData.imgUrl} alt="Product" />
                <div>
                    {!hideDescription && <div>{productData.description}</div>}
                    <div><strong>{productData.name}</strong></div>
                    <div>Filesize: {productData.fileSize}kb</div>
                    <div>Stars: {productData.starRating}</div>
                    {quantity && <div>Qty: {quantity}</div>}
                    {quantity && <div className="product-display-price">{`$${productData.price * quantity}`}</div>}
                </div>
            </div>
        )
    }
}

export default ProductDisplayArea;