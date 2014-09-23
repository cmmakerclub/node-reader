var moment = require('moment');
var com = require("serialport");
var fs = require('fs');
var path = require('path');
var receiveData;
var serialPort = new com.SerialPort(process.argv[2], {
    baudrate: 9600,
    parser: com.parsers.readline('\r\n')
  });
var filePath = "";
var fileName = "";
serialPort.on('open',function() {
  //console.log('Port open');
});

serialPort.on('data', function(data) {
  var shouldWriteData = false;
  if (receiveData) {
    shouldWriteData = true;
  }

  if (data) {
    receiveData = data;
  }

  if (shouldWriteData) {

    var serialNumber;
    data = data.split(",");

    for (var i = 0; i < data.length; i++) {
      var splitData = data[i].split(":");

      if (splitData[0] == "SN") {
        serialNumber = splitData[1];
      }
    }

    for (var i = 0; i < data.length; i++) {
      var splitData = data[i].split(":");
      if (splitData[0] != "SN" && splitData.length > 1) {
        fileName = "data/" + "SN:" + serialNumber + ",SENSOR:" + splitData[0] + ",AT:" + Date.now();
        filePath = path.join(__dirname, fileName);
        fs.writeFile(filePath, splitData[1], function(err) {
          if(err) {

          } else {
            // serialPort.close(function() {
              
            // });
          }

        });
      }
    }

    serialPort.close(function() {});

  }

});
