/* Author: 

*/

addEvent(window, "load", makeTrees);

function makeTrees() {
   var ul = $("ul#treenav")[0];
   processULEL(ul);
}

function processULEL(ul) {
    if (!ul.childNodes || ul.childNodes.length == 0) return;
    
    // Iterate LIs
    
    for (var itemi=0;itemi<ul.childNodes.length;itemi++) {
        var item = ul.childNodes[itemi];
        if (item.nodeName == "LI") {
            // Iterate things in this LI
            var a;
            var subul;
	    	subul = "";
            for (var sitemi=0;sitemi<item.childNodes.length;sitemi++) {
                var sitem = item.childNodes[sitemi];
                switch (sitem.nodeName) {
                    case "A": a = sitem; break;
                    case "UL": subul = sitem; 
                               processULEL(subul);
                               break;
                }
            }
            if (subul) {
                associateEL(a,subul);
            } else {
               // a.parentNode.style.listStyleImage = "url(/lib/images/spacer.gif)";
            }
        }
    }
}

function associateEL(a,ul) {
	
	a.onfocus = function () {
		this.blur();
	}
    a.onclick = function () {

	// current item
	var thisItem = $(a).next("ul");
	$(this).next("ul").toggle();
	
        var display = ul.style.display;
        return false;
    }

}

/* Utility functions */

function addEvent(obj, evType, fn){
  /* adds an eventListener for browsers which support it
     Written by Scott Andrew: nice one, Scott */
  if (obj.addEventListener){
    obj.addEventListener(evType, fn, true);
    return true;
  } else if (obj.attachEvent){
	var r = obj.attachEvent("on"+evType, fn);
    return r;
  } else {
	return false;
  }
}
