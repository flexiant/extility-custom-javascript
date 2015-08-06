/* 
 * This is an advanced example to demonstrate the abilities 
 * of custom javascript. This example uses a custom JQuery
 * plugin that interacts with the FCO javascript library. 
 * This example is for educational purposes only and may contain 
 * bugs. We do not recommend this code to be used on live themes.
 */

;(function ( $, window, document, undefined ) {
    "use strict";
    var pluginName = "tour";
    var defaults = {
        index: 0,
        message: "",
        direction: "north",
        alignment: "none",
        before: null,
        after: null,
    };
     
    var func = {
        index: 0,
        func: null,
    };
     
    var globals = {
        before: null,
        after: null,
    };
     
    var steps = [];
    var overlay = null;
    // The actual plugin constructor
    function Plugin ( element, options ) {
        this.element = element;
        this.settings = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }
    // Avoid Plugin.prototype conflicts
    $.extend(Plugin.prototype, {
        init: function () {
            steps.push(this);
        },
    });
    function fnSort(a, b) {
        var aIndex = (a.settings === undefined) ? (a.index || 0) : a.settings.index;
        var bIndex = (b.settings === undefined) ? (b.index || 0) : b.settings.index;
        return ((aIndex < bIndex) ? -1 : ((aIndex > bIndex) ? 1 : 0));
    }
     
     
    function fnOverlay(elem) {
        var offset = $(elem).offset();
        var pWidth = $("#fco-tour-overlay").width();
        var pHeight = $("#fco-tour-overlay").height();
        var p = 5;
        var w = $(elem).width();
        var h = $(elem).height();
        var t = offset.top;
        var l = offset.left;
        var b = pHeight - (offset.top + $(elem).height())
        var r = pWidth - (offset.left + $(elem).width());
         
        $("#fco-tour-highlight").css({top: t - p, left: l - p, bottom: b - p, right: r - p});
         
        $("#fco-tour-overlay-colL").css({top: t - p, bottom: b - p, left: 0, right: r + w + p});
        $("#fco-tour-overlay-colR").css({top: t - p, bottom: b - p, left: l + w + p, right: 0});
         
        $("#fco-tour-overlay-rowT").css({left:0, right: 0, top: 0, bottom: b + h + p});
        $("#fco-tour-overlay-rowB").css({left:0, right: 0, bottom: 0, top: t + h + p});
    };
     
    function fnStep(i) {
        if (i < $(steps).size()) {
            var step = $(steps).get(i);
            if (typeof step.func === 'function') {
                step.func();
            } else {
                var elem = step.element;
                var config = step.settings;
                var html = "<div class='fco-tour-popover-msg'>" + config.message + "</div>";
                 
                if (typeof config.before === 'function')
                    config.before(elem, config)
     
                var pop = fco.create.popover({
                    target: elem,
                    message: html,
                    auto: false,
                    direction: config.direction,
                    alignment: config.alignment
                });
                 
                fnOverlay(elem);
                pop.show();
                 
                var ctrls = $("<div class='fco-tour-popover-ctrls'></div>");
                $(pop).append(ctrls);
                 
                var nextBtn = fco.create.button();
                nextBtn.setIcon("FONT_ICON_CHEVRON_RIGHT");
                nextBtn.addStyle('Secondary Small');
                nextBtn.addClickHandler(function(){
                    pop.hide();
                    if (typeof config.post === 'function')
                        post(elem, config)
                    fnStep(i+1);
                });
     
                var prevBtn = fco.create.button();
                prevBtn.setIcon("FONT_ICON_CHEVRON_LEFT");
                prevBtn.addStyle('Primary Small');
                prevBtn.enabled(i > 0);
                prevBtn.addClickHandler(function(){
                    pop.hide();
                    fnStep(i-1);
                });
                 
                $(ctrls).append(prevBtn);
                $(ctrls).append(nextBtn);
                 
                pop.hide();
                pop.show();
            }
        } else {
            $.fn[ pluginName ].end();
        }
    }
    $.fn[ pluginName ] = function ( options ) {
        return this.each(function() {
            if ( !$.data( this, "plugin_" + pluginName ) ) {
                $.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
            }
        });
    };
     
    $.fn[ pluginName ].start = function( options ) {
        $.extend(globals, options);
        if (typeof globals.before === 'function') {
            globals.before();
        }
        console.log(steps);
        steps.sort(fnSort);
        overlay = $('<div id="fco-tour-overlay" />');
        $('body').append(overlay);
            $(overlay).append('<div id="fco-tour-highlight"/>'
                    + '<div id="fco-tour-overlay-rowT"/>'
                    + '<div id="fco-tour-overlay-colR"/>'
                    + '<div id="fco-tour-overlay-rowB"/>'
                    + '<div id="fco-tour-overlay-colL"/>');
         
        fnStep(0);
    }
    $.fn[ pluginName ].end = function() {
        $(overlay).remove();
        if (typeof globals.after === 'function') {
            globals.after();
        }
    }
    $.fn[ pluginName ].addEvent = function( options ) {
        var opts = $.extend({}, func, options);
        steps.push(opts);
    }
})( jQuery, window, document );
fco.ready = function() {
    if (fco.authenticated()) {
        fco.action.view("user/qx8y2o");
        fco.create.confirm({message:"Would you like a tour of FCO?", callback: function() {
			$(".Layout > div > .Header > .Panel > .Panel.HeaderBar-UserWrap > .DropDown > .Button").tour({
				message: "This is your first level navigation."
			});
			$(".Layout > div > .Header > .Panel > .Panel.HeaderBar-UserWrap > .DropDown > .Content.PopOver").tour({
				message: "When you click on the icon you can select where to navigate to from this list of available views.",
				direction: "west",
				before: function(elem, config) {
					$(elem).get(0).show();
				},
				after: function(elem, config) {
					$(elem).get(0).hide();
				}
			});
			$(".Workspace > div > div > .Navigation").tour({
				message: "This is the navigation for the particular view that you are on."
			});
			$(".FirstLevelSignPost").tour({
				message: "If you ever get lost, just look up here. This will always correspond to the view you are on.",
			});
			$('div[data-csh-id="CTX_HELP-WORKSPACE#USER-BUTTON_TAB_DASHBOARD"]').tour({
				message: "This is your personal dashboard.",
				direction: "east",
				before: function() {
					fco.action.view("user/qx8y2o");
				}
			});
			$(".Navigation > .Panel .ActionButtonPanel > .Button.NavigationEditButton").tour({
				message: "You can add widgets to your dashboard here.",
				direction: "east",
			});
			$(".Workspace > div > div > .Navigation > .AddNewPanel").tour({
				message: "To get started you can add a server.",
				direction: "east",
				alignment: "north"
			});
		 
			var btn = fco.create.button("Take Tour");
			btn.setIcon("FONT_ICON_EYE_OPEN");
			btn.addClickHandler(function(){
				tour();
			});
			$(".Layout > div > .Header > .Panel > .Panel.HeaderBar-UserWrap > .DropDown .Content .Target").append(btn);
			$(btn).tour({
				message: "If you want to take the tour again, you can find it here.",
				direction: "west",
				before: function() {
					$(".Layout > div > .Header > .Panel > .Panel.HeaderBar-UserWrap > .DropDown > .Content.PopOver").get(0).show();
				}
			});
         
            tour();
        }});
         
    }
}
 
tour = function() {
    $.fn.tour.start({
        before: function() {
            $(".Layout > div > .Header > .Panel > .Panel.HeaderBar-UserWrap > .DropDown > .Content.PopOver").get(0).hide();
        },
        after: function() {
            showModal();
        }
    });
}
showModal = function() {
    var modal = fco.create.modal();
    $(modal).html('<img src="http://m.memegen.com/6yuyae.jpg" />');
    $(modal).css({textAlign: "center", paddingBottom: "10px"});
    modal.show();
     
    var btn = fco.create.button("Let's get Started!");
    btn.addStyle('Large Secondary');
    btn.addClickHandler(function() {
        modal.hide();
    });
     
    $(btn).css({ 
        display: "block",
        width: "200px",
        margin: "20px auto",
    });
     
    $(modal).append(btn);
}