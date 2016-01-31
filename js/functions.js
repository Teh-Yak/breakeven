/**
 * Created by Harry on 28-Jan-16.
 */
//Desmos variable
//var calculator;

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
function init() {
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
    for(var j=0; j < all.length; j++) {
        if(j!=0) {
            total += all[j-1][0]*all[j][1];
            total -= all[j][0]*all[j][1];
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
    //Do desmos things here

    /*
    calculator.setExpression({id: "fixed", latex: "f="+f});
    calculator.setExpression({id: "var1", latex: "v="+v1});
    calculator.setExpression({id: "var2", latex: "w="+v2});
    calculator.setExpression({id: "point", latex: "p="+p});
    calculator.setExpression({id: "income", latex: "i="+i});
    calculator.setExpression({id: "costs", latex: "g(x)=f+vx+(1/2)(w-v)(x+abs(x-p)-p)", color: "#ff0000"});
    calculator.setExpression({id: "revenue", latex: "h(x)=ix", color: "#00ff00"});
    calculator.setExpression({id: "nshade", latex: "g(x)>y>h(x)", color: "#ff0000"});
    calculator.setExpression({id: "pshade", latex: "g(x)<y<h(x)", color: "#00ff00"});
    */
}
$(document).ready(function(){
    //Init materialize stuff
    $('.modal-trigger').leanModal();
    $(".button-collapse").sideNav();
    //Desmos & main code
    /*
    calculator = Desmos.Calculator(document.getElementById('graph'), {keypad: false, expressionsCollapsed: true, settingsMenu: false, solutions: true});
    calculator.setGraphSettings({xAxisStep: 10, yAxisStep: 10});
    calculator.setMathBounds({left: -1000, right: 1000, bottom: -60000, top: 60000});
    */
    init();
});
$(document).on("change",".update", function() {
    init();
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
    $('#variable').append('<div id="v'+current+'"><div class="col m3 offset-m3 s5 offset-s1"><input type="number" id="iv'+current+'" name="iv'+current+'" required min="0" value="150" step="0.01" class="update"><label for="i">Variable cost '+(current+1)+'</label></div><div class="col m3 s5"><input type="number" id="ip'+current+'" name="ip'+current+'" required min="0" value="150" step="0.01" class="update"><label for="i">Point of change '+(current)+'</label.</div><div class="col offset-m3 offset-s1"></div></div>');
    $('#output').append('<div class="col m3 s12" id="b'+current+'"><input readonly type="text" id="ib'+current+'" value="N/A"><label for="ib'+current+'">Break Even Point '+(current+1)+'</label></div>');
    current++;
    init();
}
function delVar() {
    if(current > 1) {
        current--;
        document.getElementById("variable").removeChild(document.getElementById("v"+current));
        document.getElementById("output").removeChild(document.getElementById("b"+current));
        init();
    }
}
