//读取csv
var fs = require('fs');
var csv = require('fast-csv');
var stream = fs.createReadStream("data.csv");
var csvStream = csv()
    .on("data", function (data) {
    console.log(data);
})

    .on("end", function () {
    console.log("done");
});
j
