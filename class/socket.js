var func = require('./function.js');
class SocketIO
{
	constructor(httpServer,mongodb)
	{
		var that = this;
		var ourbikes = [];
		var bool = false;
		this.mongoDataBase = mongodb;
		this.io = require('socket.io').listen(httpServer);
		this.io.sockets.on('connection',function(socket){

			socket.emit("log","connection success");

			var getBikesInterval =  setInterval(function() {
				if(that.mongoDataBase.MongoDatabase!=null){
					that.mongoDataBase.getBikes(function(err,data) {
						if(err){
							socket.emit('bikes',func.dberror());
						}
						else{
							//socket.emit('bikes',func.result(data,1));
							for(var i=0;i<data.length;i++){
								var obj = new Object;
								obj.id = data[i]._id;
								obj.state = data[i].data.charAt(9)%2;
								obj.battery = data[i].data.charAt(8)%2;
								obj.location = data[i].location;
								//obj.kid = null;
								var d = new Date();
								obj.time = data[i].time;
								obj.lasttime = new Date(0).getTime();
								if(bool == true){
									obj.battery = ourbikes[i].state*10 + obj.state;
									var temp =  ourbikes[i].state;
									if(obj.state !== temp){
										obj.lasttime =  new Date().getTime();
										that.mongoDataBase.updateBike(obj.id,obj.lasttime,function(err,data) {
										});
									}
								}

								ourbikes[i] = obj;
							};
							socket.emit('bikes',func.result(ourbikes,1));
							bool = true;
						}
					});
				}
			},1000);

			socket.on('disconnect',function() {
				clearInterval(getBikesInterval);
			});
		});
	}
}

module.exports = SocketIO;
