var fs = require('fs');
var path = require('path');

var filePath;

filePath = path.join(__dirname, '/setting/feedId');

var feedId = fs.readFileSync(filePath, {encoding: 'utf-8'});

filePath = path.join(__dirname, '/setting/apiKey');

var apiKey = fs.readFileSync(filePath, {encoding: 'utf-8'});

var XivelyClient = require('xively');
var x = new XivelyClient();

x.setKey(apiKey);

fs.readdir('data', function(err, files) {

  for (var i = 0; i < files.length; i++) {
    var file = files[i].split(",");
    var sn = "";
    var createAt = "";
    var sensorName = "";
    var sensorData = "";

    for (var j = 0; j < file.length; j++) {
      var data = file[j].split(":");
      if (data[0] == "SN") {
        sn = data[1];
      } else if (data[0] == "AT") {
        createAt = data[1];
      } else if (data[0] == "SENSOR") {
        sensorName = data[1];
      }
    }
      filePath = path.join(__dirname, '/data/' + files[i]);
      sensorData = fs.readFileSync(filePath, {encoding: 'utf-8'});
      var dp = {
        "version":"1.0.0",
        "datastreams" :
        [
          {
              "id" : sensorName,
              "current_value" : sensorData
          }
        ]
      }


      if (sensorName && sensorName != '' && sn != '' && createAt != '') {

        fs.unlinkSync(filePath);

        x.feed.new(feedId, {
          data_point: dp,
          callback: function(e) {

          }
        });
      }

  }
});
