#!/bin/bash

for port in `ls /dev/ttyUSB*`; do   
  echo "File -> /dev/ttyUSB1"; 
  /usr/bin/screen -d -m /opt/node/bin/node /home/pi/node-reader/readdata.js $port 
done
