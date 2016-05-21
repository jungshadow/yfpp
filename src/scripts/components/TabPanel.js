// Import dependencies 
import React from 'react';
import ReactDOM from 'react-dom';


/**
 * TabPanel Component
 *
 * @class TabPanel
 * @extends React.Component
 */
class TabPanel extends React.Component {

	/**
	 * Renders Tab Panel component
	 *
	 * @method render
	 * @return {object} TabPanel component markup
	 */
	render() {
		

		return (
			<div>{this.props.children}</div>
			)
	}

};

export default TabPanel;