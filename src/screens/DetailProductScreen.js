import React, { Component } from 'react';

class DetailProductScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div>
                <h1>Chi tiết sản phẩm</h1>
                <p> DetailProduct </p>
            </div>
        );
    }
}

export default function BaseDetailProductScreen() {
    return <DetailProductScreen />
}