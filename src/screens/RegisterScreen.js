import Axios from 'axios';
import React, { Component } from 'react';
import { useRouteMatch, useHistory } from "react-router-dom";
import Constant from '../constant';

class RegisterScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            name: '',
            phone: '',
            address: '',
        };
    }

    handleChangeUsername = (e) => {
        this.setState({ username: e.target.value });
    }

    handleChangePassword = (e) => {
        this.setState({ password: e.target.value });
    }

    handleChangeName = (e) => {
        this.setState({ name: e.target.value });
    }

    handleChangePhone = (e) => {
        this.setState({ phone: e.target.value });
    }

    handleChangeAddress = (e) => {
        this.setState({ address: e.target.value });
    }

    validate = () => {
        const { username, password, name, phone, address } = this.state;

        if (username === '') {
            alert('username không đc bỏ trống');
            return false;
        }

        if (password === '') {
            alert('password không đc bỏ trống');
            return false;
        }

        if (name === '') {
            alert('name không đc bỏ trống');
            return false;
        }

        if (phone === '') {
            alert('phone không đc bỏ trống');
            return false;
        }

        if (address === '') {
            alert('address không đc bỏ trống');
            return false;
        }

        return true;
    }

    onRegister = async () => {
        const { username, password, name, phone, address } = this.state;
        if (this.validate()) {
            try {
                const params = {
                    username: username,
                    password: password,
                    name: name,
                    phone: phone,
                    address: address
                }
                const res = await Axios.post(`${Constant.BASE_URL}/api/register`, params);
                console.log("Dangki:", res);
                if (res.data.status !== 200) {
                    setTimeout(() => { alert(res.data.message) }, 250);
                    return;
                }
                alert(res.data.message);
                await localStorage.clear();
                this.props.history.push('/');
            } catch (error) {
                console.log(error);
            }
        }
    }

    render() {
        const { username, password, name, phone, address } = this.state;
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
            }}>
                <h1>Đăng ký tài khoản</h1>
                <input
                    style={{ width: 200, marginTop: 10 }}
                    placeholder="Username"
                    id="username"
                    onChange={this.handleChangeUsername}
                    value={username}
                />

                <input
                    style={{ width: 200, marginTop: 10 }}
                    placeholder="Password"
                    id="password"
                    onChange={this.handleChangePassword}
                    value={password}
                />

                <input
                    style={{ width: 200, marginTop: 10 }}
                    placeholder="Name"
                    id="name"
                    onChange={this.handleChangeName}
                    value={name}
                />

                <input
                    style={{ width: 200, marginTop: 10 }}
                    placeholder="Phone"
                    id="phone"
                    onChange={this.handleChangePhone}
                    value={phone}
                />

                <input
                    style={{ width: 200, marginTop: 10 }}
                    placeholder="Address"
                    id="address"
                    onChange={this.handleChangeAddress}
                    value={address}
                />

                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 100,
                        padding: 10, marginTop: 20,
                        backgroundColor: '#42ABE1'
                    }}
                    onClick={this.onRegister}>
                    <p> Đăng ký </p>
                </div>

            </div>
        );
    }
}


export default function BaseRegisterScreen() {
    let match = useRouteMatch();
    const history = useHistory();
    return <RegisterScreen match={match.url} history={history} />
} 