import React, { Component } from 'react';
import './UiScreen.css'

class UiScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div>
                <div>
                    <p className="text">xdasd</p>
                </div>
            </div>
        );
    }
}

export default function BaseUIScreen() {
    return <UiScreen />
}