/**
 * Created by Harry on 28-Jan-16.
 */
//Desmos
var calculator;
//Main code

function round(num) {
    return Math.round(num*1000000)/1000000
}
function breakEvenLower(f, v1, i) {
    return (f/(i-v1));
}
function breakEvenUpper(f, v1, v2, p, i) {
    return ((f+(v1*p)-(v2*p))/(i-v2));
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
    var f = Number(document.getElementById("f").value);
    var v1 = Number(document.getElementById("v1").value);
    var v2 = Number(document.getElementById("v2").value);
    var p = Number(document.getElementById("p").value);
    var i = Number(document.getElementById("i").value);
    var x1 = breakEvenLower(f, v1, i);
    var x2 = breakEvenUpper(f, v1, v2, p, i);
    var bx1 = round(checkBreakEven(f, v1, v2, p, i, x1));
    var bx2 = round(checkBreakEven(f, v1, v2, p, i, x2));
    var pmp = "N/A";
    var mp = "N/A";
    if(bx1 == 1 && bx2 == 1) {
        pmp = p;
        mp = getSalesRevenue(i, pmp) - getTotalCosts(f, v1, v2, p, pmp);
        document.getElementById("pmp").value = pmp;
        document.getElementById("mp").value = mp;
    } else {
       document.getElementById("pmp").value = "N/A";
        document.getElementById("mp").value = "N/A"
    }
    if(bx1 == 1) {
        document.getElementById("xl").value = Math.ceil(x1) + " (" + x1 + ")";
    } else {
        document.getElementById("xl").value = "N/A";
    }
    if(bx2 == 1) {
        document.getElementById("xu").value = Math.ceil(x2) + " (" + x2 + ")";
    } else {
        document.getElementById("xu").value = "N/A";
    }

    //Do desmos things here
    calculator.setExpression({id: "fixed", latex: "f="+f});
    calculator.setExpression({id: "var1", latex: "v="+v1});
    calculator.setExpression({id: "var2", latex: "w="+v2});
    calculator.setExpression({id: "point", latex: "p="+p});
    calculator.setExpression({id: "income", latex: "i="+i});
    calculator.setExpression({id: "costs", latex: "g(x)=f+vx+(1/2)(w-v)(x+abs(x-p)-p)", color: "#ff0000"});
    calculator.setExpression({id: "revenue", latex: "h(x)=ix", color: "#00ff00"});
    calculator.setExpression({id: "nshade", latex: "g(x)>y>h(x)", color: "#ff0000"});
    calculator.setExpression({id: "pshade", latex: "g(x)<y<h(x)", color: "#00ff00"});
}
$(document).ready(function(){
    calculator = Desmos.Calculator(document.getElementById('graph'), {keypad: false, expressionsCollapsed: true, settingsMenu: false, solutions: true});
    calculator.setGraphSettings({xAxisStep: 10, yAxisStep: 10});
    calculator.setMathBounds({left: -1000, right: 1000, bottom: -60000, top: 60000});
    init();
});
$(document).on("change",".update", function() {
    init();
});
