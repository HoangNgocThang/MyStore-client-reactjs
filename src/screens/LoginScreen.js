import React, { Component } from 'react';
import axios from 'axios';
import { useRouteMatch, useHistory } from "react-router-dom";
import Constant from '../constant';

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

    onValidate = () => {
        const { username, password } = this.state;
        if (username == '') {
            alert('Chưa nhập username');
            return false;
        }

        if (password == '') {
            alert('chưa nhập password');
            return;
        }

        return true;
    }

    onLogin = async () => {
        if (this.onValidate()) {
            try {
                const params = {
                    username: this.state.username,
                    password: this.state.password
                }
                const res = await axios.post(`${Constant.BASE_URL}/api/login`, params);
                console.log("onLoigin:", res)
                if (res.data.status == 200) {
                    // this.props.history.goBack()
                    await localStorage.setItem("user", JSON.stringify(res.data));
                    this.props.history.push('/');
                    return;
                }
            } catch (e) {
                console.log(e);
            }
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
                    onClick={this.onLogin}>
                    <span> Đăng nhập </span>
                </div>

            </div>
        );
    }
}



export default function BaseLoginScreen() {
    let match = useRouteMatch();
    const history = useHistory();
    return (
        <LoginScreen match={match} history={history} />
    )
};