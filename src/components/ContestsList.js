import React, { Component } from 'react';
import ContestResults from './ContestResults';

class ContestsList extends Component {
    render() {
        return (
            <div className="group-item">
                <ul className="vList">
                    {this.props.contests.map((contest, index) => (
                        <ContestResults key={index} contest={contest} />
                    ))}
                </ul>
            </div>
        );
    }
}

export default ContestsList;
