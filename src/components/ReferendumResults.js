import React from 'react';

function ReferendumResults({ contest }) {
    return (
        <div className="card card_secondary">
            <span className="card-flag">{contest.type}</span>
            <div className="card-bd">
                <h3 className="hdg hdg_3 mix-hdg_headline mix-hdg_blue">{contest.referendumTitle}</h3>
                {contest.referendumText ? <p>{contest.referendumText}</p> : ''}
                {contest.referendumUrl && (
                    <a href={contest.referendumUrl} target="_blank" rel="noopener noreferrer">
                        Learn More
                    </a>
                )}
            </div>
        </div>
    );
}

export default ReferendumResults;
