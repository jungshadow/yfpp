// Import dependencies 
import React from 'react';
import ReactDOM from 'react-dom';


/**
 * SiteTitle Component
 *
 * @class SiteTitle
 * @extends React.Component
 */
class SiteTitle extends React.Component {

	/**
	 * Renders site title block
	 *
	 * @method render
	 * @return {object} site title component markup
	 */
	render() {


		return (
			<h1 className="siteTitle">
				<strong className="siteTitle-seg1">Where's My <span className="mix-siteTitle_accent">Fucking</span></strong>
				<strong className="siteTitle-seg2">Polling Place?</strong>
			</h1>
			)
	}

};

export default SiteTitle;