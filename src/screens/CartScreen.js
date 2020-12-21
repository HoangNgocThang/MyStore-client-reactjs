import Axios from 'axios';
import React, { Component } from 'react';
import { useRouteMatch, useParams, useHistory } from "react-router-dom";

class CartScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    showCart = async () => {
        try {
            const res = await Axios.get('')
        } catch (error) {
            console.log(error);
        }
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
    const history = useHistory();

    return <CartScreen match={match.url} history={history} />
}
