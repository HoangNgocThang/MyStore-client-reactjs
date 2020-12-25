import React, { Component } from 'react';

class AccountScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            phone: '',
            address: '',
            avatar: ''
        };
    }

    handleChangeName = (e) => {
        this.setState({ name: e.target.value });
    }

    handleChangePhone = (e) => {
        this.setState({ phone: e.target.value });
    }

    handleChangeAdress = (e) => {
        this.setState({ address: e.target.value });
    }


    onFileChange = () => {

    }

    render() {
        const { name, phone, address } = this.state;
        return (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h1>Tài khoản</h1>

                <span>Name:</span>
                <input
                    style={{ width: 200, marginTop: 10 }}
                    placeholder="name"
                    id="name"
                    onChange={this.handleChangeName}
                    value={name}
                />

                <span>Phone:</span>
                <input
                    style={{ width: 200, marginTop: 10 }}
                    placeholder="phone"
                    id="phone"
                    onChange={this.handleChangePhone}
                    value={phone}
                />

                <span>Address:</span>
                <input
                    style={{ width: 200, marginTop: 10 }}
                    placeholder="address"
                    id="address"
                    onChange={this.handleChangeAdress}
                    value={address}
                />

                <span>Avtart:</span>
                <input
                    type="file"
                    style={{ width: 200, marginTop: 10 }}
                    onChange={this.onFileChange} />
            </div>
        );
    }
}


export default function BaseAccountScreen() {
    return <AccountScreen />
};