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

      /*
			var ourbikes = [];
			for(var i=0;i<bikes.length;i++){
				var obj = new Object;
				obj.id = bikes[i]._id;
				if(bikes[i].data.charAt(8) == 0)obj.state = 0;
				else obj.state = 1;
				obj.battery = bikes[i].data.charAt(4);
				obj.location = bikes[i].location;

				//obj.kid = null;

				var d = new Date();
				obj.time = new Date(new Date(bikes[i].time) - (d.getTimezoneOffset() * 60000));

				console.log(bikes[i]);
				console.log(obj);
				ourbikes[i] = obj;
			};

			this.map.setBikes(ourbikes);
			*/
			this.map.setBikes(bikes);
		});
	}
}
