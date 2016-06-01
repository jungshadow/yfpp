// Import dependencies 
import React from 'react';
import ReactDOM from 'react-dom';




/**
 * Candidate Results Component
 *
 * @class CandidateResults
 * @extends React.Component
 */
 class CandidateResults extends React.Component {


    renderSocial() {

        this.socialLinks = [];

        let i = 0;

        if (this.props.candidate.channels) {

            this.props.candidate.channels.forEach(function(channel) {
                this.socialLinks.push (<li key={i}><a href={channel.id} className={'actionLink actionLink_' + channel.type.toLowerCase()}>{channel.type}</a></li>);

                i++; 

            }.bind(this));           

        }

        return this.socialLinks;
    }
    /**
     * Renders candidate results list items
     *
     * @method render
     * @return {object} candidate results component markup
     */
     render() {

        const candidate = this.props.candidate;

        if (!candidate.name) {
            return;
        }



        return (
            <li className="candidate">
                <div className="split">
                    <div className="split-lft">
                        <strong className="txt mix-txt_blue">{candidate.name}</strong>
                        {candidate.party ? <span> - {candidate.party}</span> : ''}
                    </div>
                    <div className="split-rgt">
                        <ul className="hList">{this.renderSocial()}</ul>
                    </div>
                </div>
            </li>
            )
     }

    };

    export default CandidateResults;