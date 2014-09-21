var Cylon = require('cylon');

/*
    IMPORTANT:
    OSX - update the connection port using the value from this terminal command:
        "ls /dev/tty.Sphero*"

    Linux Mint (and presumably Ubuntu and other distros) - follow these steps:

    1. Find the address of the Sphero, by using:
        "hcitool scan"

    2. Pair to Sphero using this command - substituting the actual address of your Sphero
       Which you should have gotten in the first step:
        "sudo bluez-simple-agent hci0 [address]

    3. Connect to the Sphero using this command - substituting the actual address of your Sphero
       Which you should have gotten in the first step:
        "sudo rfcomm connect /dev/rfcomm1 [address] 1"

    4. When connected, you should then be able to use the connection port as is currently set
       in the code. Note when you run the script, you may need to also use sudo.

    Windows - there's probably some trick you have to do here, but I haven't bothered to look,
    as I don't work with Windows for free.
 */

Cylon.robot({
  connection: { name: 'sphero', adaptor: 'sphero', port: '/dev/rfcomm1' },
  device: {name: 'sphero', driver: 'sphero'},

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
    every((1).second(), function() {
      my.sphero.roll(80, Math.floor(Math.random() * 360)); // arguments are speed, direction and state
    });

my.sphero.on('data', function(loc, acc, vel) {
console.log("locator: ", loc);
console.log("accelOne: ", acc);
console.log("velocity: ", vel);
});
  }
}).start();