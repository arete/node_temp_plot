##Create virtual serial port
	>socat -d -d pty,raw,echo=0 pty,raw,echo=0
	 socat[1830] N PTY is /dev/pts/2
	 socat[1830] N PTY is /dev/pts/3
	 socat[1830] N starting data transfer loop with FDs [3,3] and [5,5]

## Generate Random Temp from 18 to 22
       random.sh >/dev/pts/3

edit config.js    serialport:"/dev/pts/3"  
## Real-time data plotting  temp data using flot
	to run: 
	node app.js
	http://<ip>:3000/



