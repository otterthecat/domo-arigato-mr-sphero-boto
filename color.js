var Cylon = require('cylon');
Cylon.robot({
	connection: {
		name: 'sphero',
		adaptor: 'sphero',
		port: '/dev/rfcomm1'
	},
	device: {
		name: 'sphero',
		driver: 'sphero'
	},
	work: function(my) {

		 var opts = {
			// n: int, divisor of the max sampling rate, 400 hz/s
			// n = 40 means 400/40 = 10 data samples per second,
			// n = 200 means 400/200 = 2 data samples per second
			n: 200,
			// m: int, number of data packets buffered before passing them to the stream
			// m = 10 means each time you get data it will contain 10 data packets
			// m = 1 is usually best for real time data readings.
			m: 1,
			// pcnt: 1 -255, how many packets to send.
			// pcnt = 0 means unlimited data Streaming
			// pcnt = 10 means stop after 10 data packets
			pcnt: 0,
		};
		my.sphero.setDataStreaming(['locator', 'accelOne', 'velocity'], opts);

		every((1).seconds(), function() {
			my.sphero.roll(40, Math.floor(Math.random() * 360));
			my.sphero.setRandomColor();
		});

		my.sphero.on('locator', function(data){
			console.log(data);
		});
	}
}).start();