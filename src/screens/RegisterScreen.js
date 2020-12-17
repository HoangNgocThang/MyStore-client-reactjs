import React, { Component } from 'react';

class RegisterScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div>
                <h1>Đăng ký tài khoản</h1>
                <span> RegisterScreen </span>
            </div>
        );
    }
}


export default function BaseRegisterScreen() {
    return <RegisterScreen />
} 