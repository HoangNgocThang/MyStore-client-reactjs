import React, { Component } from 'react';
import axios from 'axios';
import '../../src/assets/styles/home.css';
import { Link, useRouteMatch, useParams, useHistory, useLocation } from "react-router-dom";

class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categoies: [],
            products: []
        };
    }

    componentDidMount() {
        this.getCategory();
        this.getProducts();
    }

    getCategory = async () => {
        try {
            const res = await axios.get("http://localhost:3000/category");
            console.log(res)
            this.setState({ categoies: [{ id: 4, name: "Tất cả", slug: '' }].concat(res.data.data) });
        } catch (e) {
            console.log(e);
        }
    }

    getProducts = async () => {
        try {
            const res = await axios.get("http://localhost:3000/products/index");
            console.log(res);
            this.setState({ products: res.data.data });
        } catch (e) {
            console.log(e);
        }
    }

    handleClickItem = (e) => {
        console.log(e)
        if (e.id == 4) {
            this.getProducts();
            return;
        }
        this.getProductsBySlug(e.slug)
    }

    getProductsBySlug = async (slug) => {
        try {
            const res = await axios.get('http://localhost:3000/products/show/' + slug);
            this.setState({ products: res.data.data });
        } catch (error) {
            console.log(error);
        }
    }

    renderMenu = () => {
        const { categoies } = this.state;
        return (
            categoies.map((e, i) => {
                return (
                    <div key={e.id} className="menu-item" onClick={() => this.handleClickItem(e)}>
                        <span>{e.name}</span>
                    </div>
                )
            }))
    }

    renderProducts = () => {
        const { products } = this.state;
        return (
            products.map((e, i) => {
                return (
                    <div className="product-item" key={e.id}>
                        <img src={e.image} className="image-product" />
                        <span style={{ alignSelf: 'center', marginTop: 10 }}>Mã máy: {e.product_code}</span>
                        <span className="title-product">{e.name}</span>
                        <span style={{ alignSelf: 'center', marginTop: 10, color: '#BF081F' }}>Giá: {e.price} VNĐ</span>
                    </div>
                )
            })
        )
    }

    render() {
        console.log("PCCCL:", this.props.history)
        return (
            <div>
                <div style={{ display: 'flex', flexDirection: 'row', alignContent: 'center', }}>
                    <h1 >Trang chủ</h1>
                </div>

                <Link
                    to={'/cart'}
                    style={{
                        padding: 10,
                        position: 'fixed',
                        right: 0,
                        backgroundColor: 'yellow'
                    }}
                >
                    <span style={{
                        fontWeight: 'bold',
                        color: 'red'
                    }}>Giỏ hàng: 0 sản phẩm</span>
                </Link>

                <div className="menu">
                    {this.renderMenu()}
                </div>

                <div className="products">
                    {this.renderProducts()}
                </div>

            </div>
        );
    }
}


export default function BaseHomeScreen() {
    let match = useRouteMatch();
    let param = useParams();
    const history = useHistory();
    console.log("params:", param);
    console.log("match:", match);
    console.log('his:', history)
    return <HomeScreen match={match.url} history={history} />
}

