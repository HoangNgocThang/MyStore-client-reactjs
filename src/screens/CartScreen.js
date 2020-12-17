import React, { Component } from 'react';
import { useRouteMatch, useParams, useHistory } from "react-router-dom";

class CartScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <span> CartScreen </span>
            </div>
        );
    }
}


export default function BaseCartScreen() {
    let match = useRouteMatch();
    let param = useParams();
    const history = useHistory();

    return <CartScreen match={match.url} history={history} />
}
