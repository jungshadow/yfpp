// Import dependencies 
import React from 'react';
import ReactDOM from 'react-dom';




/**
 * Actions Component
 *
 * @class Actions
 * @extends React.Component
 */
 class Actions extends React.Component {

 	buildTweet() {

 		const queryParameters = {
 			text: 'I just found my fucking polling location',
 			url: 'http://yourfuckingpollingplace.com',
 			hashtags: 'YourFuckingPollingPlace'
 		}

 		queryParameters.text = 'text=' + encodeURI(queryParameters.text);
 		queryParameters.url = 'url=' + queryParameters.url;
 		queryParameters.hashtags = 'hashtags=' + queryParameters.hashtags;


 		return <a className="twitter-share-button"
		  href={'https://twitter.com/intent/tweet?' + queryParameters.text + '&' + queryParameters.url + '&' + queryParameters.hashtags}>
		Tweet</a>
 	}

	/**
	 * Renders actions under polling place results
	 *
	 * @method render
	 * @return {object} actions component markup
	 */
	 render() {




	 	return (
	 		<ul className="actions">
				<li className="actions-item">
					<span className="actions-item-title">Share</span>
					<div className="actions-item-links">
						<ul className="hList">
							<li>
								{this.buildTweet()}
							</li>
							<li>
								<a href="#">Facebook</a>
							</li>
						</ul>
					</div>
				</li>
				<li className="actions-item">
					<span className="actions-item-title">Map It</span>
					<div className="actions-item-links">				
						<a href="#">Map</a>							
					</div>
				</li>
			</ul>
	 		)
	 }

	};

	export default Actions;