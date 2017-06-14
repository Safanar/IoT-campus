var func = require('./function.js');
class SocketIO
{
	constructor(httpServer,mongodb)
	{
		var that = this;
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
							var ourbikes = [];
							for(var i=0;i<data.length;i++){
								var obj = new Object;
								obj.id = data[i]._id;
								if(data[i].data.charAt(8) == 0)obj.state = 0;
								else obj.state = 1;
								obj.battery = data[i].data.charAt(4);
								obj.location = data[i].location;
								//obj.kid = null;
								d = new Date();
								obj.time = new Date(new Date(data[i].time) - (d.getTimezoneOffset() * 60000));
								console.log(data);
								console.log(obj);
								ourbikes[i] = obj;
							};
							socket.emit('bikes',func.result(ourbikes,1));
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
