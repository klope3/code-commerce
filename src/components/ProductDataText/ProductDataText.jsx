import React from "react";

class ProductDataText extends React.Component {
    render() {
        const { productData, quantity } = this.props;
        return (
            <div>
                <div>{productData.description}</div>
                <div><strong>{productData.name}</strong></div>
                <div>Filesize: {productData.fileSize}kb</div>
                <div>Stars: {productData.starRating}</div>
                {quantity && <div>Qty: {quantity}</div>}
            </div>
        )
    }
}

export default ProductDataText;