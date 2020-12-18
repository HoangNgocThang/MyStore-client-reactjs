import React, { Component } from 'react';

class RegisterScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            name: '',
            phone: '',
            address: ''
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
        this.setState({ phone: e.target.value });
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

                <input
                    style={{ width: 200, marginTop: 10 }}
                    placeholder="Phone"
                    id="phone"
                    onChange={this.handleChangeName}
                    value={phone}
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
                    onClick={this.onLoigin}>
                    <span> Đăng nhập </span>
                </div>

            </div>
        );
    }
}


export default function BaseRegisterScreen() {
    return <RegisterScreen />
} 