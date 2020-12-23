import React, { Component } from 'react';
import { Link, useRouteMatch, useParams, useHistory } from "react-router-dom";

class OrderScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        
    }

    render() {
        return (
            <div>
                <h1>Đơn hàng</h1>

            </div>
        );
    }
}

export default function BaseOrderScreen() {
    let match = useRouteMatch();
    const history = useHistory();
    return (<OrderScreen match={match} history={history} />)
} 