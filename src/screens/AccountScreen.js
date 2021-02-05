import Axios from 'axios';
import React, { Component } from 'react';
import Constant from '../constant';
import { Link, useRouteMatch, useHistory } from "react-router-dom";

class AccountScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            phone: '',
            address: '',
            avatarShow: '',
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
                address: res.data.data.address,
                avatarShow: res.data.data.avatar
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

    validate = () => {
        if (this.state.name == '' || this.state.name == null) {
            return false;
        }

        if (this.state.address == '' || this.state.address == null) {
            return false;
        }

        return true;
    }

    onSave = async () => {
        console.log(this.state.avatar);
        if (this.validate) {
            try {
                const user = await localStorage.getItem('user');
                const userPar = JSON.parse(user);

                let formData = new FormData();
                formData.append("name", this.state.name);
                formData.append("phone", this.state.phone);
                formData.append("address", this.state.address)
                formData.append('avatar', this.state.avatar);
                formData.append('avatarShow', this.state.avatarShow);

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

                if (res.data.status != 200) {
                    alert(res.data.message);
                    return;
                }
                this.showUser();
            } catch (error) {
                console.log("loi:", error);
            }
        }
    }

    render() {
        const { name, phone, address, avatarShow } = this.state;
        return (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h1>Tài khoản</h1>

                <p style={{ margin: 0 }}>Name:</p>
                <input
                    style={{ width: 200, marginTop: 10 }}
                    placeholder="name"
                    id="name"
                    onChange={this.handleChangeName}
                    value={name}
                />

                <p style={{ margin: 0 }}>Phone:</p>
                <input
                    disabled
                    style={{ width: 200, marginTop: 10 }}
                    placeholder="phone"
                    id="phone"
                    onChange={this.handleChangePhone}
                    value={phone}
                />

                <p style={{ margin: 0 }}>Address:</p>
                <input
                    style={{ width: 200, marginTop: 10 }}
                    placeholder="address"
                    id="address"
                    onChange={this.handleChangeAdress}
                    value={address}
                />

                <p style={{ margin: 0 }}>Avtart:</p>
                {
                    avatarShow && <img src={`${Constant.BASE_URL}${avatarShow}`}
                        style={{
                            objectFit: 'cover',
                            width: 250, height: 250, marginTop: 10
                        }} />
                }
                <input
                    type="file"
                    style={{ width: 200, marginTop: 10 }}
                    onChange={this.onFileChange} />

                <div
                    onClick={this.onSave}
                    style={{ backgroundColor: 'green', width: 70, padding: 4, marginTop: 10 }}>
                    <p style={{ margin: 10, color: 'white', margin: 0 }}>Lưu</p>
                </div>
            </div>
        );
    }
}


export default function BaseAccountScreen() {
    let match = useRouteMatch();
    const history = useHistory();
    return <AccountScreen match={match.url} history={history} />
};