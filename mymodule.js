var fs = require('fs')
var path = require('path')

function lsfilter(filePath, extension, newCallback){	
	var buf = fs.readdir(filePath, function callback(err, list){
	if(err) { return newCallback(err);}
       		var newlist=[];
		for(var x = 0; x<list.length; x++){
        	        if(path.extname(list[x])==('.'+extension)) { newlist.push(list[x]);}
       		}
		newCallback(null, newlist);
	});

}

module.exports = lsfilter;
