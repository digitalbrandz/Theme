





// fix initial page load not being at top
$(document).one("pagecontainershow", function(e, data) {
 $('body,html').scrollTop(0);
})



$(document).on( "pagecreate", ".ui-page[data-url='/challenge']", function( event, ui ) {
$(document).one("pagecontainershow", function (event,ui) {
  console.log('fuck captcha');
  var page = ui.toPage[0];
  jQuery(page).find('form').attr('data-ajax','false');
});
});




/*
/////////////////////////////////////////////         Swap Active Link
*/

$(document).one("pagecontainerchange", function(event, ui) {
    changelinks(event, ui);
   // mobilepanelbind(); 
});
$(document).on("pagecontainerbeforetransition", function(event, ui) {
    changelinks(event, ui); 
});

function changelinks(event, ui) {
    //console.log($(ui.toPage[0]).attr("data-url"));
    var current = $(ui.toPage[0]).jqmData("title");
    if (!current) {
      if($(ui.toPage[0]).attr("data-url").includes("collections")) {
        var current = $(ui.toPage[0]).attr("data-url");
      }else{
        var current = $(ui.toPage[0]).attr("data-title");
      }
    }
    if (current.includes("–")) {
        var current = current.substring(0, current.indexOf('–')).trim();
    }
    $("[data-role = 'navbar'] a.ui-btn-active").removeClass("ui-btn-active");
    // Add active class to current nav button
 
    $("[data-role = 'navbar'] a").each(function() {
       if ($(this).attr('title') == null) {
              // do something 
              }else{
        var page = $(this).attr('link-title');
        if (page.includes("–")) {
            var page = page.substring(0, page.indexOf('–')).trim();
        }
       }
        if (page === current) {
            if (!$(this).hasClass('ui-btn-active')) {
                $(this).addClass("ui-btn-active");
            }
        }
    });
}


function mobilepanelbind() {
	jQuery('#mobilepanellink').off('click').on('click', function() {
            jQuery('#mobilemenu').panel( "toggle" );
	});
}



/*
/////////////////////////////////////////////          Swap body classes 
*/

$(document).on("pagecontainerbeforeshow", function (event, ui) {
  var eventid = ui.toPage[0].id;     
  if(eventid.indexOf('collection') != -1){
  var eventid = eventid.substring(0, eventid.indexOf('-'));
   }  
  var dataPrev = ui.prevPage[0] ;
  if(typeof dataPrev != 'undefined') {
     var previd = dataPrev.id;  
      jQuery(document.body).removeClass(previd).addClass(eventid);
  }else{
   jQuery(document.body).addClass(eventid);
  }
 
});







/*
/////////////////////////////////////////////          Handle Slider Issues
*/


// pause existing slider
$(document).on("pagebeforehide", ".ui-page", function(event) {
  var slider = jQuery(this).find('.rev_slider');
  if(slider.hasClass('revslider-initialised')) {
  	slider.revpause();
  }
});


// kill existing slider if page is being removed
$(document).on("pageremove", ".ui-page", function(event) {
  var slider = jQuery(this).find('.rev_slider');
  if(slider) {
  	slider.revkill();
  }
});









/*
/////////////////////////////////////////////          Fix Page jump on Transition 
*/
/*
$(document).on("pagecontainerbeforechange", function(e, data) {
    if (typeof data.prevPage !== 'undefined' && data.prevPage[0].baseURI == data.toPage[0].baseURI) {} else {
        if (typeof data.prevPage !== 'undefined' && data.prevPage[0].baseURI == data.toPage) {} else {
            if (data.options.stopRecursion != 1) {
                // prevent infinite recursion:
                data.options.stopRecursion = 1;
                // prevent pageChange before hiding current Page:
                e.preventDefault();
                var page = data.toPage;
                if (typeof page == 'string') {
                    if (page.indexOf('#') != -1) {
                        var hashash = true;
                    }
                }
                if (hashash != true) {
                    // get current ScrollPos and move PageDiv y pixel to top
                    // and scroll at the same time to the top
                    var y = $(document).scrollTop();
                    var h = $(data.prevPage).outerHeight();
                    //var h = $(data).scrollTop();  
                    $(data.options.fromPage).css({
                        "margin-top": "-" + y + "px",
                        'min-height': h + "px"
                    });
                    $(document).scrollTop(0);
                }
                //trigger changePage manualy - now Transition-Procedure can scrollTop
                //it will have no effect : we are already at Top ;-)
                $(":mobile-pagecontainer").pagecontainer("change", data.toPage, data.options);
            }
        }
    }
});
*/



/*
/////////////////////////////////////////////          Fix Going Back to misplaced div 
*/

// in case of navigating back without page-reload
// remove page-div displacement: 
/*
$(document).on("pagecontainerhide", function(e, data) {
    $(data.prevPage).css({
        "margin-top": "",
        'min-height': ""
    });
})
*/