import io from 'socket.io-client'
export default class Socket{
	constructor(map){
		this.socket = io.connect();
		this.map = map;
		this.socket.on('log', function (log) {
			console.log(log);
		});
		this.socket.on('bikes',(response)=>{
			var bikes = response.result;
			var bikes = response.result;
			for (var i = 0; i < bikes.length; i++) {
					var d = new Date;
					bikes[i].time = new Date(new Date(bikes[i].time) - d.getTimezoneOffset() * 6E4);
					if (bikes[i].lasttime == (new Date(0)).getTime()) bikes[i].lasttime = "No data";
					else bikes[i].lasttime = new Date(bikes[i].lasttime);
					var n = d.getTime();
					var diff = (n - bikes[i].lasttime) / (1E3 * 60);
					bikes[i].diff = diff;
			}
			this.map.setBikes(bikes);
		});
	}
}
