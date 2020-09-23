import React from 'react';

function CandidateResults(props) {
    const renderSocial = (channels) => {
        if (!channels) {
            return;
        }
        return channels.map((channel, index) => (
            <li key={index}>
                <a href={channel.id} className={'actionLink actionLink_' + channel.type.toLowerCase()}>
                    {channel.type}
                </a>
            </li>
        ));
    };

    const renderCandidateList = (contest) => {
        return contest.candidates.map((candidate) => (
            <li className="candidate">
                <div className="split">
                    <div className="split-lft">
                        <strong className="txt mix-txt_blue">{candidate.name}</strong>
                        {candidate.party ? <span> - {candidate.party}</span> : ''}
                    </div>
                    <div className="split-rgt">
                        <ul className="hList">{renderSocial(candidate.channels)}</ul>
                    </div>
                </div>
            </li>
        ));
    };

    const { contest } = props;

    return (
        <div className="card card_secondary">
            <span className="card-flag">{contest.type}</span>
            <div className="card-bd">
                <div className="group group_md">
                    <div className="group-hd">
                        <h3 className="hdg hdg_2 mix-hdg_headline mix-hdg_blue">{contest.office}</h3>
                    </div>
                    <div className="group-bd">
                        <ul className="vList vList_divided">{renderCandidateList(contest)}</ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CandidateResults;
