window.log = function(){
  log.history = log.history || [];
  log.history.push(arguments);
  arguments.callee = arguments.callee.caller;  
  if(this.console) console.log( Array.prototype.slice.call(arguments) );
};
(function(b){function c(){}for(var d="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),a;a=d.pop();)b[a]=b[a]||c})(window.console=window.console||{});


/* 
	less grid v4.0 - For Less Framework 4.
	(c) Arnau March http://arnaumarch.com/en/lessgrid.html, freely distributable under the terms of the MIT license.
*/

$(document).ready(function() {
	createSwitch();
});

function createGrid () {
	$('body').append('<div id="less-grid"></div>');
	var pageWidth = $('body').width();
	//var pageWidth = $('body').children(':first').width();   //If you don't set body width, uncomment this
	//var pageLeft = ($('body').width() - pageWidth) / 2;	  //If you don't set body width, uncomment this
	$('#less-grid').css({ 
							width: pageWidth,
							position: "absolute",
							top: "0",
							bottom: "0",
							zIndex: 900,
							//left: pageLeft //If you don't set body width, uncomment this
	});
	var colWidth = 68;
	var colSep = 24;
	var colCount = 1;
	for(colLeft=0;colLeft<=pageWidth;colLeft=(colWidth+colSep)*(colCount-1)){
		$('#less-grid').append('<span class="col col-'+colCount+'">&nbsp;col:&nbsp;'
		+colCount+'<br/>&nbsp;w:&nbsp;'+(((colWidth+colSep)*colCount)-colSep)+'</span>'); 
		$('#less-grid .col-'+colCount).css({ 
								width: colWidth,
								position: "absolute",
								top: "0",
								left: colLeft,
								bottom: "0",
								background: "#3d5fa3",
								opacity: 0.5,
								color: "#fff",
								fontSize: "13px",
								paddingTop: "33px"
		});
		colCount++;
	};
}

function createSwitch () {
	$('body').append('<span id="less-grid-switch">show grid</span>');
	$('#less-grid-switch').css({ 
							position: "absolute",
							top: "0",
							right: "0",
							background: "#3d5fa3",
							border: "2px solid #fff",
							borderTop: 0,
							color: "#fff",
							fontSize: "13px",
							lineHeight: "13px",
							padding: "2px 8px 6px 8px",
							cursor: "pointer",
							"border-radius": "0 0 5px 5px",
							"-moz-border-radius": "0 0 5px 5px",
							zIndex: 1000
							
	});
	$('#less-grid-switch').toggle(function() {
		$(this).text("x");
		$('#less-grid').show();
		$(this).attr('rel','on');
		$('#less-grid').remove();
		createGrid();	
	}, function() {
		$(this).text('show grid');
		$('#less-grid').hide();
		$(this).attr('rel','off');
	});
	
}

$(function(){
	$(window).resize(function(){
		if($('#less-grid-switch').attr('rel')=="on") {
			$('#less-grid').remove();
			createGrid();
		}
	 });
});

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
