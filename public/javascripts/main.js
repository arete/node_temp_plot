var socket=io.connect(), d1=[], d5=[], d15=[], zone_delta=(new Date()).getTimezoneOffset()*60000;	// time diff in ms
var interval,limit=1440; // show 2 hours data (7200/5) at interval=5sec
socket.on('newdata', function(v) {
	var ts=v[0]-zone_delta;
	d1.push([ts, v[1]]);	
	re_flot();	
	var i=1;
	$('#legend').find('tr').each(function() {
		$(this).append('<td class="last_val">'+v[i++]+'</td>');
	});
});
socket.on('history', function(a) {
	for(var i=0, l=a.length;i<l;i++) {
		var v=a[i],  ts=v[0]-zone_delta;
		d1.push([ts, v[1]]);	
	}
	re_flot();
});

function re_flot() {
	var d1_len=d1.length;
	if(d1_len<1) { return; }
	// slice arrays if len>limit
	if(d1_len>limit) {
		d1=d1.slice(0-limit);
	}
	d1_len=d1.length;
	var tick_int=Math.round((d1[d1_len-1][0]-d1[0][0])/5000);
	var d=[
		{ data: d1, label:'Temp. cucina'}
	];
	$.plot(
		$('#testflot'), 
		d,
		{
			xaxis:{mode:'time', timeFormat:'%h:%M:%S', tickSize:[tick_int, "second"]},
			legend: { container: $('#legend') }
		}
	);
}


