import React, { Component } from 'react';
import axios from 'axios';
import '../../src/assets/styles/home.css';
import { Link, useRouteMatch, useParams, useHistory } from "react-router-dom";

class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null,
            categoies: [],
            products: []
        };
    }

    componentDidMount() {
        this.getAuth();
        this.getCategory();
        this.getProducts();
    }

    getAuth = async () => {
        try {
            let user = await localStorage.getItem('user');
            this.setState({ user: JSON.parse(user) })
        } catch (error) {
            console.log(error);
        }
    }

    getCategory = async () => {
        try {
            const res = await axios.get("http://localhost:3000/category");
            this.setState({ categoies: [{ id: 4, name: "Tất cả", slug: '' }].concat(res.data.data) });
        } catch (e) {
            console.log(e);
        }
    }

    getProducts = async () => {
        try {
            const res = await axios.get("http://localhost:3000/products/index");
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
        this.getProductsBySlug(e.slug);
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

    onAdd = (item) => {
        console.log('item11:', item);
        this.addItemToCart(item);
    }

    addItemToCart = async (item) => {
        try {
            console.log("pa:", item);
            const res = await axios.post('http://localhost:3000/cart/item/add', item);
            console.log("resadd:", res);
            alert(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    renderProducts = () => {
        const { products } = this.state;
        return (
            products.map((e, i) => {
                return (
                    <div className="product-item" key={e.id}>
                        <img src={e.image} className="image-product" alt="product" />
                        <span className="title-product">{e.name}</span>
                        <span style={{ alignSelf: 'center', marginTop: 10, color: '#BF081F' }}>Giá: {e.price} VNĐ</span>
                        <div
                            style={{ marginTop: 10, alignSelf: 'center', backgroundColor: '#46A049', padding: 8 }}
                            onClick={() => this.onAdd(e)}
                        >
                            <span style={{ color: 'white' }}>Thêm vào giỏ hàng</span>
                        </div>
                    </div>
                )
            })
        )
    }

    logout = () => {
        this.setState({
            user: null
        }, () => {
            localStorage.clear();
        })
    }

    render() {
        return (
            <div>
                <h1 >Trang chủ</h1>
                <div style={{ position: 'fixed', right: 0 }}>
                    {
                        this.state.user ?
                            <span style={{ fontWeight: 'bold' }}>Hello {this.state.user.username}</span> :
                            <Link
                                to={'/login'}
                                style={{
                                    padding: 10,
                                    margin: 4,
                                    backgroundColor: 'yellow'
                                }}>
                                <span>Đăng nhập</span>
                            </Link>
                    }
                    {
                        this.state.user ?
                            <div
                                onClick={this.logout}
                                style={{
                                    margin: 4,
                                    padding: 10,
                                    backgroundColor: 'pink'
                                }}>
                                <span>Đăng xuất</span>
                            </div> :
                            <Link
                                to={'/register'}
                                style={{
                                    margin: 4,
                                    padding: 10,
                                    backgroundColor: 'green'
                                }}>
                                <span>Đăng ký</span>
                            </Link>
                    }

                </div>

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
    const history = useHistory();
    return <HomeScreen match={match.url} history={history} />
}

