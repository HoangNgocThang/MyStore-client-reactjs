import React, { PureComponent } from 'react';
import './ItemProduct.css';

class ItemProduct extends PureComponent {

    render() {
        const { item, onAdd } = this.props;
        return (
            <li className="product-item" >
                <img src={item.image} className="image-product" alt={item.name} />
                <p className="title-product">{item.name}</p>
                <p style={{ alignSelf: 'center', marginTop: 10, color: '#BF081F', fontWeight: 'bold' }}>Giá: {item.price} VNĐ</p>
                <div
                    style={{ marginTop: 10, alignSelf: 'center', backgroundColor: '#46A049', padding: 8 }}
                    onClick={() => onAdd(item)}>
                    <p style={{ color: 'white', fontWeight: 'bold' }}>Thêm vào giỏ hàng</p>
                </div>
            </li>
        );
    }
}

export default ItemProduct;