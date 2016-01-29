/**
 * Created by Harry on 28-Jan-16.
 */
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
    var p = Number( document.getElementById("p").value);
    var i = Number( document.getElementById("i").value);
    var x1 = breakEvenLower(f, v1, i);
    var x2 = breakEvenUpper(f, v1, v2, p, i);
    var bx1 = round(checkBreakEven(f, v1, v2, p, i, x1));
    var bx2 = round(checkBreakEven(f, v1, v2, p, i, x2));
    var pmp = "N/A";
    var mp = "N/A";
    if(bx1 == 1 && bx2 == 1) {
        pmp = p;
        mp = getSalesRevenue(i, pmp) - getTotalCosts(f, v1, v2, p, pmp);
        document.getElementById("pmp").innerHTML = pmp;
        document.getElementById("mp").innerHTML = mp;
    } else {
       document.getElementById("pmp").innerHTML = "N/A";
        document.getElementById("mp").innerHTML = "N/A"
    }
    if(bx1 == 1) {
        document.getElementById("xl").innerHTML = Math.ceil(x1) + " (" + x1 + ")";
    } else {
        document.getElementById("xl").innerHTML = "N/A";
    }
    if(bx2 == 1) {
        document.getElementById("xu").innerHTML = Math.ceil(x2) + " (" + x2 + ")";
    } else {
        document.getElementById("xu").innerHTML = "N/A";
    }
}
