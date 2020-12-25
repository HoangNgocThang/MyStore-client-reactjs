import React, { Component } from 'react';

class AccountScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div>
                <span> AccountScreen </span>
            </div>
        );
    }
}


export default function BaseAccountScreen() {
    return <AccountScreen />
};