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
    every((1).second(), function() {
      my.sphero.roll(100, 180); // arguments are speed, direction and state
    });
  }
}).start();