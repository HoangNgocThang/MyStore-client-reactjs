import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import './ItemProduct.css';

class ItemProduct extends PureComponent {

    render() {
        const { item, onAdd } = this.props;

        return (
            <li className="product-item">
                {/* <img src={item.image} className="image-product" alt={item.name} /> */}
                <LazyLoadImage alt={item.name} height={180} src={item.image} width={180} style={{alignSelf:'center'}}/>
                <Link to={`/${item.slug_category}/${item.slug}/${item.id}`}>
                    <p className="title-product">{item.name}</p>
                </Link>
                <p style={{ alignSelf: 'center', marginTop: 10, color: '#BF081F', fontWeight: 'bold' }}>Giá: {item.price} VNĐ</p>
                <button
                    style={{ marginTop: 10, alignSelf: 'center', backgroundColor: '#46A049', padding: 8 }}
                    onClick={() => onAdd(item)}>
                    <p style={{ color: 'white', fontWeight: 'bold' }}>Thêm vào giỏ hàng</p>
                </button>
            </li>
        );
    }
}

export default ItemProduct;