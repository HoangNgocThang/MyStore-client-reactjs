import Axios from 'axios';
import React, { Component } from 'react';
import { useRouteMatch, useHistory } from "react-router-dom";
import Constant from '../constant';
import '../../src/assets/styles/carts.css';

class CartScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            user: null
        };
    }

    componentDidMount() {
        this.getAuth();
        this.showCart();
    }

    getAuth = async () => {
        try {
            let user = await localStorage.getItem('user');
            this.setState({ user: JSON.parse(user) })
        } catch (error) {
            console.log(error);
        }
    }

    showCart = async () => {
        const user = await localStorage.getItem('user');
        const userPar = JSON.parse(user);
        try {
            const res = await Axios.post(`${Constant.BASE_URL}/cart/show`, {}, {
                headers: {
                    'Authorization': `Bearer ${userPar && userPar.access_token}`
                }
            })
            console.log('SHOW :', res);
            if (res.data.status != 200) {
                alert(res.data.message);
                return;
            }
            this.setState({
                data: res.data.data,
            });
        } catch (error) {
            console.log(error);
        }
    }

    onIncrease = async (e) => {
        console.log(e);
        try {
            const user = await localStorage.getItem('user');
            const userPar = JSON.parse(user);
            const res = await Axios.post(`${Constant.BASE_URL}/cart/item/increase`, e, {
                headers: {
                    'Authorization': `Bearer ${userPar && userPar.access_token}`
                }
            });
            console.log('res:', res);
            if (res.data.status != 200) {
                alert(res.data.message);
                return;
            }
            this.showCart();
        } catch (error) {
            console.log('error:', error);
        }
    }

    onDecrease = async (e) => {
        try {
            const user = await localStorage.getItem('user');
            const userPar = JSON.parse(user);
            const res = await Axios.post(`${Constant.BASE_URL}/cart/item/decrease`, e, {
                headers: {
                    'Authorization': `Bearer ${userPar && userPar.access_token}`
                }
            });
            console.log('res:', res);
            if (res.data.status != 200) {
                alert(res.data.message);
                return;
            }
            this.showCart();
        } catch (error) {
            console.log('error:', error);
        }
    }

    onRemove = async (e) => {
        try {
            const user = await localStorage.getItem('user');
            const userPar = JSON.parse(user);
            const res = await Axios.post(`${Constant.BASE_URL}/cart/item/remove`, e, {
                headers: {
                    'Authorization': `Bearer ${userPar && userPar.access_token}`
                }
            });
            console.log('res:', res);
            if (res.data.status != 200) {
                alert(res.data.message);
                return;
            }
            this.showCart();
        } catch (error) {
            console.log(error);
        }
    }

    renderListProduct = () => {
        const { data } = this.state;
        if(data.length==0) {
            return <div>
                <span style={{color:'grey'}}>Giỏ hàng trống </span>
            </div>
        }
        return data.map((e, i) => {
            return (
                <div key={e.id_product} className="item-cart">
                    <img src={e.image} alt={"product"} style={{ width: 100, height: 100 }} />

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span>{e.name}</span>
                        <span style={{ color: '#BF081F' }}>Giá: {e.price} VNĐ</span>
                        <span>Số lượng: {e.quantity}</span>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <div style={{
                                display: 'flex', justifyContent: 'center', alignContent: 'center',
                                padding: 10, margin: 10, width: 24, height: 24, backgroundColor: 'green'
                            }}
                                onClick={() => this.onIncrease(e)}
                            >
                                <span style={{ color: 'white', fontSize: 16 }}>+</span>
                            </div>
                            <div style={{
                                display: 'flex', justifyContent: 'center', alignContent: 'center',
                                padding: 10, margin: 10, width: 24, height: 24, backgroundColor: 'green'
                            }}
                                onClick={() => this.onDecrease(e)}
                            >
                                <span style={{ color: 'white', fontSize: 16 }}>-</span>
                            </div>

                            <div style={{
                                display: 'flex', justifyContent: 'center', alignContent: 'center',
                                padding: 10, margin: 10, width: 24, height: 24, backgroundColor: 'red'
                            }}
                                onClick={() => this.onRemove(e)}
                            >
                                <span style={{ color: 'white', fontSize: 16 }}>X</span>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    }

    render() {
        console.log(this.state.user)
        return (
            <div>
                <h1> Giỏ hàng </h1>
                <span>Tài khoản: {this.state.user && this.state.user.username}</span>
                { this.renderListProduct()}
            </div>
        );
    }
}


export default function BaseCartScreen() {
    let match = useRouteMatch();
    const history = useHistory();

    return <CartScreen match={match.url} history={history} />
}
