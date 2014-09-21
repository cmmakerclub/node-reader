var moment = require('moment');
var com = require("serialport");
var fs = require('fs');
var receiveData;
var serialPort = new com.SerialPort(process.argv[2], {
    baudrate: 9600,
    parser: com.parsers.readline('\r\n')
  });

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
        fs.writeFile("data/" + "SN:" + serialNumber + ",SENSOR:" + splitData[0] + ",AT:" + Date.now(), splitData[1], function(err) {
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
