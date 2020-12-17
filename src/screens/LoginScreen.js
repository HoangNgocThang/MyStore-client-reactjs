import React, { Component } from 'react';
import axios from 'axios';

class LoginScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }

    handleChangeUsername = (e) => {
        this.setState({ username: e.target.value });
    }

    handleChangePassword = (e) => {
        this.setState({ password: e.target.value });
    }

    onLoigin = async () => {
        try {
            const params = {
                username: this.state.username,
                password: this.state.password
            }
            const res = await axios.post('http://localhost:3000/api/login', params);
            console.log("onLoigin:", res)
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        const { username, password } = this.state;
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
            }}>
                <h1>Đăng nhập tài khoản</h1>
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



export default function BaseLoginScreen(params) {
    return (
        <LoginScreen />
    )
};