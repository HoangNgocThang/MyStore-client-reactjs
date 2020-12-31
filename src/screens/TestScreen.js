import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

class TestScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div>
                <header>
                    <h2>Cities</h2>
                </header>

                <section>
                    <nav>
                        <ul>
                            <li><a href="#">London</a></li>
                            <li><a href="#">Paris</a></li>
                            <li><a href="#">Tokyo</a></li>
                        </ul>
                    </nav>

                    <article>
                        <h1>London</h1>
                        <p>London is the capital city of England. It is the most populous city in the  United Kingdom, with a metropolitan area of over 13 million inhabitants.</p>
                        <p>Standing on the River Thames, London has been a major settlement for two millennia, its history going back to its founding by the Romans, who named it Londinium.</p>
                    </article>
                    <FontAwesomeIcon icon={faCoffee} />
                </section>

                <footer>
                    <p>Footer</p>
                </footer>

            </div>
        );
    }
}

export default function BaseTestScreen() {
    return <TestScreen />
} 