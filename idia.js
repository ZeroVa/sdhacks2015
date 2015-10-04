var http = require('http')
var map = require('through2-map')
var url = require('url')
var querystring = require('querystring');

    var server = http.createServer(function (req, res) {
      // request handling logic...
        if(req.method=='GET'){
                res.setHeader("Content-Type", "text/html");
                var reqObject = url.parse(req.url, true);
                if(reqObject.pathname=='/api/pill'){
                    console.log(querystring.stringify(reqObject.query));
                    var cReqObject = reqObject.query;
                    var sumThing="";
                    var requestString='http://rximage.nlm.nih.gov/api/rximage/1/rxnav?';
                    // if(reqObject.query.color) requestString+=('?color=' + reqObject.query.color);
                    requestString+= querystring.stringify(cReqObject);
                    console.log(requestString);
                    http.get(requestString, function(response){
                        // response.setEncoding('utf8');
                        response.on('data', function(e){
                            sumThing+=e;
                        });
                        response.on('end', function(){
                            resObject = JSON.parse(sumThing);
                            resObject.nlmRxImages.forEach(function(element, index, array){
                                res.write('<img src=\"' + element.imageUrl + '\" alt=\"\">');
                            });
                            
                            res.end();
                        })
                    });
                }

        }
    });
    server.listen(1234);