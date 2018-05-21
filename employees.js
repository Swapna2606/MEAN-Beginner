var employeeDb = require('./database/employees.json');

function getEmployees (callback) {
	setTimeout(function () {
    	callback(null, employeeDb);
	}, 500); 
}

function getEmployee (employeeId, callback) {
  getEmployees(function (error, data) {
    if (error) {
      return callback(error);
	}
    var result = data.find(function(item) {
      return item.id === employeeId;
	});

    callback(null, result);
  });
}

module.exports.getEmployees = getEmployees;
module.exports.getEmployee = getEmployee;