/**
* Created by Harry on 28-Jan-16.
*/
//Desmos variable
var calculator;

//Main code
function round(num) {
    return Math.round(num*1000000)/1000000
}
function breakEven(f, total, cur, i) {
    return ((f+total)/(i-cur));
}
function checkBreakEven(f, v1, v2, p, i, x) {
    return (f/(i*x))+(v1/i)+((1/(2*i*x))*(v2-v1)*(x+Math.abs(x-p)-p));
}
function getSalesRevenue(i, x) {
    return i*x;
}
function getTotalCosts(f, v1, v2, p, x) {
    return f+(v1*x)+((1/2)*(v2-v1)*(x+Math.abs(x-p)-p));
}

//Add param to sort out colours - Yak
/* Init the graph.*/
function init(colours) {
    //Get static fields
    var f = Number(document.getElementById("f").value);
    var i = Number(document.getElementById("i").value);
	
    //Get all elements
    var general = document.getElementById("variable").childNodes;
    var all = [];
    for(var j=0; j < general.length - 2; j++) {
        if(j==0) {
            all.push([document.getElementById("iv0").value, 0]);
        } else {
            all.push([document.getElementById("iv"+(j)).value, document.getElementById("ip"+(j)).value]);
        }
    }
    //Start calculation
    var total = 0;
    var str = "g(x)=f+v_0x";
    for(var j=0; j < all.length; j++) {
        calculator.setExpression({id: "v"+j, latex: "v_{"+j+"}="+all[j][0]});
        if(j!=0) {
            total += all[j-1][0]*all[j][1];
            total -= all[j][0]*all[j][1];
            calculator.setExpression({id: "p"+j, latex: "p_{"+j+"}="+all[j][1]});
            str += "+(1/2)(v_{"+j+"}-v_{"+(j-1)+"})(x+abs(x-p_{"+j+"})-p_{"+j+"})";
        }
        var _t = breakEven(f, total, all[j][0], i);
        var _t2 = (f/(i*_t)) + (all[0][0]/i);
        for(var k=1; k <= j; k++) {
            _t2 += (1/(2*i*_t))*(all[k][0]-all[k-1][0])*(_t+Math.abs(_t-all[k][1])-all[k][1]);
        }
        if(round(_t2) == 1) {
            document.getElementById("ib"+j).value = Math.ceil(_t) + " (" + _t + ")";
        } else {
            document.getElementById("ib"+j).value = "N/A";
        }
    }
    calculator.setExpression({id: "fixed", latex: "f="+f});
    calculator.setExpression({id: "income", latex: "i="+i});
    calculator.setExpression({id: "costs", latex: str, color: colours[0]});
    calculator.setExpression({id: "revenue", latex: "h(x)=ix", color: colours[1]});
}
$(document).ready(function(){
	/* Start of Yak's Code.*/
	//Let the user know we can store information on them, what it is and why we do it.
	displayWarning();
	//Update the values from our storage, if it is there.
	if(typeof "Storage" !== "undefined"){
		colorHandling[0]=localStorage.getItem("costscolor");
		colorHandling[1]=localStorage.getItem("salesColor");
		height=localStorage.getItem("graphHeight");
	}
	setValues();
	/* End of Yak's Code.*/
   	//Init materialize stuff
   	$('.modal-trigger').leanModal();
   	$(".button-collapse").sideNav();
   	//Desmos & main code
   	calculator = Desmos.Calculator(document.getElementById('graph'), {keypad: false, expressionsCollapsed: true, settingsMenu: false, solutions: true});
   	calculator.setGraphSettings({xAxisStep: 10, yAxisStep: 10});
   	calculator.setMathBounds({left: -1000, right: 1000, bottom: -60000, top: 60000});
   	init(colorHandling);
	updateGraph();
});

$(document).on("change",".update", function() {
	init(colorHandling);
});



//Smooth scroll
$(function(){
    var $window = $(window);
	var scrollTime = 0.5;
	var scrollDistance = 150;

	$window.on("mousewheel DOMMouseScroll", function(event){
		event.preventDefault();
		var delta = event.originalEvent.wheelDelta/120 || -event.originalEvent.detail/3;
		var scrollTop = $window.scrollTop();
		var finalScroll = scrollTop - parseInt(delta*scrollDistance);
		TweenMax.to($window, scrollTime, {scrollTo: {y: finalScroll, autoKill: true}, ease: Power1.easeOut, overwrite: 5});
	});
});

//Code for adding/removing elements
var current = 1;
function addVar() {
    $('#variable').append('<div id="v'+current+'"><div class="col m3 offset-m3 s5 offset-s1"><input type="number" id="iv'+current+'" name="iv'+current+'" required min="0" value="'+((current+1)*10)+'" step="0.01" class="update"><label for="i">Variable cost '+(current+1)+'</label></div><div class="col m3 s5"><input type="number" id="ip'+current+'" name="ip'+current+'" required min="0" value="'+(current*150)+'" step="0.01" class="update"><label for="i">Point of change '+(current)+'</label.</div><div class="col offset-m3 offset-s1"></div></div>');
    $('#output').append('<div class="col m3 s12" id="b'+current+'"><input readonly type="text" id="ib'+current+'" value="N/A"><label for="ib'+current+'">Break Even Point '+(current+1)+'</label></div>');
    current++;
    init(colorHandling);
}
function delVar() {
    if(current > 1) {
        current--;
        document.getElementById("variable").removeChild(document.getElementById("v"+current));
        document.getElementById("output").removeChild(document.getElementById("b"+current));
        init(colorHandling);
    }
}


/**
 * The new part of yaks code starts here.
 */
/* Colours array, 0 and 1 are used for graph lines. */
var colorHandling=["#FF0000","#00FF00"];
/* Are we using stored information?*/
var cookiesEnabled = false;
/* The hieght of the graph. */
var height=200;

/* Updates the colours array. */
function updateColors(){
	var s=document.getElementById("costscolor").value;
	var c=document.getElementById("salesColor").value;
	colorHandling=[s,c]
}
 
 /* Update the graph hieght. */
function updateGraph(){
	height = Number(document.getElementById("graphHeight").value);
	document.getElementById("graph").style.height=height+"px";
	calculator.resize();
}

/* When the graph height is updated... */
$(document).on("change",".updateGraph", function() {
    updateGraph();	
});

/* When the graph colours is updated... */
$(document).on("change",".updateC", function() {
	updateColors();
	init(colorHandling);
});

/* Information storage handling. */
function enable(){
	var label = document.getElementById("enableCooks");
	//is storage enabled?
	if(cookiesEnabled){
		//delete the information
		if(typeof "Storage" !== "undefined"){
			localStorage.clear();
		}
		//change the label and the flag
		cookiesEnabled=false;
		label.style.color="#000000";
		label.innerHTML="Store Graph Settings?"
	}
	else{
		//create the information
		if(typeof "Storage" !== "undefined"){
			localStorage.setItem("costscolor", document.getElementById("costscolor").value);
			localStorage.setItem("salesColor", document.getElementById("salesColor").value);
			localStorage.setItem("graphHeight", document.getElementById("graphHeight").value);
		}
		//change the label and the flag
		cookiesEnabled=true;
		label.style.color="#FF0000";
		label.innerHTML="Remove Stored Graph Settings."
	}
}

/* Called to set the default values of the graph settings. */
function setValues(){
	//If an individual setting is not there, make it default.
	if(colorHandling[0]==null){
		colorHandling[0]="#FF0000";
	}
	if(colorHandling[1]==null){
		colorHandling[1]="#00FF00";
	}
	if(height==null){
		height="200";
	}
	//Set the field to be the right value.
	document.getElementById("costscolor").value=colorHandling[0];
	document.getElementById("salesColor").value=colorHandling[1];
	document.getElementById("graphHeight").value=height;
}

function displayWarning(){
	alert("This webpage can store information on your preferences for the graph. "+
		"The information we store do not impact the main functioning of the page, nor will we ask for personal information." +
		"If you do not wish for us to store data on you then do not click the button which is labelled 'Store Graph Settings'."+
		"You have been warned.");
	
}
