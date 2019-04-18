/*
	* react : 
		* create pure HTML in front-end
		* customed components
		* parent/child components communicates via 'props'
		* handle UI via js -> seperate font/back-end
		* it is only a js library : super light weight
		* react tutorial 1 : https://j6qup3.github.io/2016/08/06/猴子也能看懂的-React-教學-1/
*/
import React from 'react'
import { render } from 'react-dom'

import Map from '../map/map'
import Socket from '../socket/socket'
import UI from '../components/UI'

var ui;
var map;
var socket;
function initialize() {
	map = new Map('googleMapDiv');	/* 
		* google map api
		* tutorial 1 : http://chi15036-blog.logdown.com/posts/303408-google-map-javascript-api-use
		* tutorial 2 : https://blog.gtwang.org/programming/getting-started-google-maps-javascript-api/
	*/
	socket = new Socket(map);	/*
		* node.js / socket.io
		* 達到即時性
		* tutorial 1 : https://socket.io/get-started/chat/
		* tutorial 2 : http://huli.logdown.com/posts/261051-node-js-socketio-to-create-super-simple-chat-room
	*/
	ui = render(	/*
			* a tool to construct a single page app : 將東西移到 client end instead of server end
			* render 等於是在 single page app 中讓 server 負擔 client 的部分工作
			* tutorial 1 : http://mz026.logdown.com/tags/Server-Rendering
		*/
		<UI />,
		document.getElementById('app') /*
			* document 是讓 js 跟 網站溝通的 object
			* tutorial 1 : http://www.wibibi.com/info.php?tid=379
			* tutorial 2 : http://www.wibibi.com/info.php?tid=256
		*/
	);
}



google.maps.event.addDomListener(
  window, 'load', initialize);

export {map,ui};
