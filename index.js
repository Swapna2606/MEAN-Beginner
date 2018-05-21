const http = require('http');
var employeeService = require('./employees.js');
var responder = require('./responseGenerator.js');
var staticFile = responder.staticFile('/public');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
	var _url;
	req.method = req.method.toUpperCase();
  	console.log(req.method + ' ' + req.url);
  	if (req.method !== 'GET') {
    	res.writeHead(501, {'Content-Type': 'text/plain'});
		return res.end(req.method + ' is not implemented by this ➥server.');
	}
	if (_url = /^\/employees$/i.exec(req.url)) {
    // return a list of employees

    	employeeService.getEmployees((error, data) =>{
    		if (error)
    		{
    			return responder.send500(error, res);

			} else{

				  return responder.sendJson(data, res);
			}
    	})
    	
    }
    else if (_url = /^\/employees\/(\d+)$/i.exec(req.url)) {
    // find the employee by the id in the route
	    employeeService.getEmployee(_url[1], (error,data) =>{
	    	if(error){

	    		return responder.send500(error, res);

	    	} if(!data){
	    		   
	    		return responder.send404(res);

	    	}
	    	    return responder.sendJson(data,res);
	    })
    	
  	} else {
    // try to send the static file
    	res.writeHead(200);
    	res.end('static file maybe');
  	}
  	
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});