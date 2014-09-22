node-reader
===========

Read data from serial and push to xively.


After install node.

	npm install moment serialport xively


Setting
===
Create file name apiKey and feedId in setting folder.

	Put your API KEY and FEED ID in their file.


HOW TO USE
===

Read data from serial

	node readdata.js [port ex /dev/ttyUSB0]

Push data to xively.

	node pushdata.js
