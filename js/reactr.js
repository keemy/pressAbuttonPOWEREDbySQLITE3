var listOfTests=["sound","visual"];
var userName=prompt("whats ur name");

function setCookie(c_name,value,exdays){
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie=c_name + "=" + c_value;
}

setCookie("userName",userName,30);

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

