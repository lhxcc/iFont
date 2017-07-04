'use strict';

import React, { Component } from 'react';
import './index.less';
class Loading extends Component {
	render() {
		return (<div id="loading" className="loading-content">
							<span className="loading-ball-blue"></span>
							<span className="loading-ball-green"></span>
							<span className="loading-ball-yellow"></span>
							<span className="loading-ball-red"></span>
						</div>);
	}
}
export default Loading;
