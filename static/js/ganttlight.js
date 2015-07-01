var tasks = [];
var csv_date_format = d3.time.format('%m-%d-%Y');
example();    

function example() {

    var taskStatus = {
	"RUNNING" : "bar",
    };

    d3.csv("/ganttlight/data/data.csv", function(error, csvdata) {
	if (error) {
	    return console.warn(error);
        }
	var taskNames = [];
	for ( var i = 0; i < csvdata.length; i++) {
                console.log(csvdata[i]);
		var name = csvdata[i]["Headline"];
		taskNames.push(name);
                startDate = csv_date_format.parse(csvdata[i]["Start Date"] ? csvdata[i]["Start Date"] : "01-01-2006")
                endDate = csv_date_format.parse(csvdata[i]["End Date"] ? csvdata[i]["End Date"] : "06-25-2015")
		tasks.push({
                    "startDate": startDate,
                    "endDate": endDate,
		    "taskName" : name,
		    "status" : "RUNNING"
		});
	}
	var format = "%m/%d/%Y";
	var gantt = d3.gantt().taskTypes(taskNames).taskStatus(taskStatus).tickFormat(format);
	gantt(tasks);
    });

};

