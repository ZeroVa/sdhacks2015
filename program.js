
var http = require('http')
var map = require('through2-map')
var url = require('url')

    var server = http.createServer(function (req, res) {
      // request handling logic...
	if(req.method=='GET'){
		var reqObject = url.parse(req.url, true);
		var myDate = new Date(reqObject.query.iso);
		console.log(reqObject.pathname);
		if(reqObject.pathname=='/api/unixtime'){
			var resObject = {unixtime: Date.parse(reqObject.query.iso)};
			res.end(JSON.stringify(resObject));
			
		}
		else if(reqObject.pathname=='/api/parsetime'){
			var resObject = {hour: myDate.getHours(), 
					minute: myDate.getMinutes(), 
					second: myDate.getSeconds()};
			res.end(JSON.stringify(resObject));
		}
		
	}
    })
    server.listen(process.argv[2]);
