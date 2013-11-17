var listOfTests=["sound","visual"];
var userName=prompt("whats ur name");

function setCookie(c_name,value,exdays){
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie=c_name + "=" + c_value;
}

function getCookie(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    }
    else
    {
        begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
        end = dc.length;
        }
    }
    return unescape(dc.substring(begin + prefix.length, end));
} 

function checkCookieAndSet() {
    var myCookie = getCookie("MyCookie");

    if (myCookie == null) {
        // do cookie doesn't exist stuff;
		setCookie("userName",userName,30);
    }
    else {
        // do cookie exists stuff
    }
}

checkCookieAndSet();


$( document ).ready(function() {
	function IncrementAndReturn(){
		$.getJSON("backendtest.py").done(function(data){
			$("#counter").text("Your Button Presses: "+data[0]);
			$("#global").text("Total Button Presses: "+data[1]);
		});
	}
	function CounterValue(){
		$.getJSON("backendtest.py?readonly=true").done(function(data){
			$("#counter").text("Your Button Presses: "+data[0]);
			$("#global").text("Total Button Presses: "+data[1]);
		});
	}
	
	IncrementAndReturn();
	
	$("#counter").click(function(){
		IncrementAndReturn();
	});
	
	function CounterValueCaller(){
		CounterValue();
		setTimeout(CounterValueCaller,500);
	}
	CounterValueCaller();
	
	
	var f1=function(event){
		alert("f1");
	};
	var f2=function(event){
		alert("f2");
	};
	
	
	
	
});

