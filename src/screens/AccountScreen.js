import Axios from 'axios';
import React, { Component } from 'react';
import Constant from '../constant';

class AccountScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            phone: '',
            address: '',
            avatar: null
        };
    }

    componentDidMount() {
        this.showUser()
    }

    showUser = async () => {
        try {
            const user = await localStorage.getItem('user');
            const userPar = JSON.parse(user);
            const res = await Axios.get(`${Constant.BASE_URL}/user/show`, {
                headers: {
                    'Authorization': `Bearer ${userPar && userPar.access_token}`
                }
            });
            console.log(res);
            if (res.data.status != 200) {
                return;
            }
            this.setState({
                name: res.data.data.name,
                phone: res.data.data.phone,
                address: res.data.data.address
            })

        } catch (error) {
            console.log(error)
        }
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


    onFileChange = (e) => {
        console.log(e);

        this.setState({
            avatar: e.target.files[0]
        })
    }

    onSave = async () => {
        if (this.state.avatar !== null) {
            try {
                const user = await localStorage.getItem('user');
                const userPar = JSON.parse(user);
                
                let formData = new FormData();
                formData.append("name", this.state.name);
                formData.append("phone", this.state.phone);
                formData.append("address", this.state.address)
                formData.append('avatar', this.state.avatar);

                const res = await Axios.post(`${Constant.BASE_URL}/user/upload`,
                    formData,
                    {
                        headers: {
                            'Authorization': `Bearer ${userPar && userPar.access_token}`,
                            "Content-type": "multipart/form-data",
                        },
                    }
                )

                console.log(res);
            } catch (error) {
                console.log("loi:",error);
            }
        }
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

                <div
                    onClick={this.onSave}
                    style={{ width: 100, height: 30, backgroundColor: 'green', padding: 4, marginTop: 10 }}>
                    <span>Lưu</span>
                </div>
            </div>
        );
    }
}


export default function BaseAccountScreen() {
    return <AccountScreen />
};