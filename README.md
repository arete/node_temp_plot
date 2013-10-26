##Create virtual serial port
	socat -d -d pty,raw,echo=0 pty,raw,echo=0
## Generate Random Temp from 18 to 22
       random.sh >/dev/pts/NUMBER
   
## Real-time data plotting  temp data using flot
	to run: 
	node app.js
	http://<ip>:3000/



