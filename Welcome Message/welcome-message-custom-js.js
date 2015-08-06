/* 
 * This is an example of how to add a personalised welcome message with
 * an embedded youtube video.
 */
var user = null;
var cust = null;

fco.ready = function() {
    console.log("Ready");
    if (fco.authenticated()) {
        console.log("Authenticated");
        user = fco.user();
        cust = fco.customer();

        createPopup();
    }
}

var createPopup = function() {
    console.log("Popup");
    var opts = {
        header: fco.util.translate("Welcome, {0}", user.resourceName),
        onShow: modalShow,
    };
    var modal = modal || fco.create.modal(opts);
    modal.show();
}

var modalShow = function(modal) {
    console.log("Show");
    modal.addStyle('fco-welcome-modal');
    $(modal).addClass('fco-welcome-content').html('<div class="fco-welcome-left"><iframe width="480px" height="360px" src="https://www.youtube.com/embed/lbSlx2cXro0?rel=0" frameborder="0" allowfullscreen></iframe></div><div class="fco-welcome-right"></div>');

    vid = $('.fco-welcome-content iframe').get(0);
    var aspectRatio = parseInt(vid.height) / parseInt(vid.width);
    $(vid).removeAttr('height').removeAttr('width');
    var newHeight = $(vid).width() * aspectRatio;
    $('.fco-welcome-left').height(newHeight);

    var btn = fco.create.button("Get Started");
    btn.addStyle('Secondary');
    btn.addClickHandler(function() {
        modal.hide();
    });
    $('.fco-welcome-right')
        .innerWidth($('.fco-welcome-content').width() - $('.fco-welcome-left').width())
        .html('<div class="fco-welcome-message">' + fco.util.translate("Watch this short video for a whistle stop tour on the basics of Flexiant Cloud Orchestrator, what it looks like, the dashboard and a few key features.") + '</div><div class="fco-welcome-get-started"></div>');
    $('.fco-welcome-get-started').append(btn);

    var height = 0;
    $('.fco-welcome-content > div').each(function(i) {
        if (height < $(this).height()) {
            height = $(this).height();
        }
    }).height(height);
};