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
        if (data.length == 0) {
            return <div>
                <p style={{ color: 'grey' }}>Giỏ hàng trống </p>
            </div>
        }
        return data.map((e, i) => {
            return (
                <div key={e.id_product} className="item-cart">
                    <img src={e.image} alt={e.name} style={{ width: 100, height: 100 }} />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <p>{e.name}</p>
                        <p style={{ color: '#BF081F' }}>Giá: {e.price} VNĐ</p>
                        <p>Số lượng: {e.quantity}</p>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <div style={{
                                display: 'flex', justifyContent: 'center', alignContent: 'center',
                                padding: 10,
                                margin: 10,
                                backgroundColor: 'green',
                                height: 45
                            }}
                                onClick={() => this.onIncrease(e)}
                            >
                                <p style={{ color: 'white', fontSize: 16, margin: 0 }}>+</p>
                            </div>
                            <div style={{
                                display: 'flex', justifyContent: 'center', alignContent: 'center',
                                padding: 10,
                                margin: 10,
                                backgroundColor: 'green',
                                height: 45
                            }}
                                onClick={() => this.onDecrease(e)}
                            >
                                <p style={{ color: 'white', fontSize: 16, margin: 0 }}>-</p>
                            </div>

                            <div style={{
                                display: 'flex', justifyContent: 'center', alignContent: 'center',
                                padding: 10,
                                margin: 10,
                                backgroundColor: 'red',
                                height: 45
                            }}
                                onClick={() => this.onRemove(e)}
                            >
                                <p style={{ color: 'white', fontSize: 16 }}>X</p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    }

    onBuy = async () => {
        if (this.state.data && this.state.data.length <= 0) {
            alert('Giỏ hàng trống vui lòng chọn ít nhất 1 sản phầm để tiếp tục');
            return;
        }
        try {
            const params = {
                data: this.state.data,
                datetime: new Date
            }
            const user = await localStorage.getItem('user');
            const userPar = JSON.parse(user);
            console.log(params, userPar);
            const res = await Axios.post(`${Constant.BASE_URL}/order/create`, params, {
                headers: {
                    'Authorization': `Bearer ${userPar && userPar.access_token}`
                }
            });
            if (res.data.status != 200) {
                alert(res.data.message);
                return;
            }
            console.log("onBuy:", res);
            this.props.history.push("/");
            setTimeout(() => { alert(res.data.message) }, 200)

        } catch (error) {
            console.log(error);
        }
    }

    render() {
        console.log(this.state.user)
        return (
            <div>
                <h1> Giỏ hàng </h1>
                <p>Tài khoản: {this.state.user && this.state.user.username}</p>
                <div
                    onClick={this.onBuy}
                    style={{
                        marginTop: 10,
                        marginBottom: 10,
                        display: 'flex',
                        justifyContent: 'center', alignContent: 'center',
                        backgroundColor: 'orange', width: 100, padding: 10
                    }}>
                    <p style={{ margin: 0 }}>Mua hàng</p>
                </div>
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
