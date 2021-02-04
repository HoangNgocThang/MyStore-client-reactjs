import React, { Component } from 'react';
import Axios from 'axios';
import Constant from '../constant';
import { useRouteMatch, useHistory } from "react-router-dom";
import ReactHtmlParser from 'react-html-parser'

class DetailProductScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataDetail: {}
        };
    }

    componentDidMount() {
        this.getDetailProduct();
    }

    getDetailProduct = async () => {
        try {
            const params = this.props.match && this.props.match.params;
            console.log("PARAM:", params)
            const res = await Axios.get(`${Constant.BASE_URL}/products/show-detail/${params.slugCategory}/${params.slugProduct}/${params.idProduct}`);
            console.log('res:', res);
            if (res && res.data && res.data.status != 200) {
                alert(res.data.message);
                return;
            }
            this.setState({
                dataDetail: res && res.data && res.data.data
            })
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const { dataDetail } = this.state;
        console.log(dataDetail);
        return (
            <div style={{ display: 'flex', flexDirection: 'column', padding: 16 }}>
                <h1>Chi tiết sản phẩm</h1>
                <p className="title-product">{dataDetail.name}</p>
                <p style={{ marginTop: 10, color: '#BF081F', fontWeight: 'bold' }}>Giá: {dataDetail.price} VNĐ</p>
                <img src={dataDetail.image} style={{ width: 200, height: 200, objectFit: 'contain', marginTop: 20 }} />
                <div>{ReactHtmlParser(dataDetail.des)}</div>
            </div>
        );
    }
}

export default function BaseDetailProductScreen() {
    const match = useRouteMatch();
    const his = useHistory();
    console.log("VVV:", match, his);
    return <DetailProductScreen match={match} />
}