/* 
 * This is an example of how to add a chat widget from SnapEngage.
 * Note that this example is using a demo account of SnapEngage that 
 * is no longer active. To use this with your own account log in to 
 * SnapEngage and navigate to "Get the Code". Copy the Javascript part 
 * of the code (not the surrounding html tags) and paste it between 
 * the comments below.
 */

fco.ready = function() {
    if (fco.authenticated()) {
        /* SnapEngage javascript code */
        /* Replace this following code with your SnapEngage javascript code. */
        (function() {
            var se = document.createElement('script');
            se.type = 'text/javascript';
            se.async = true;
            se.src = '//storage.googleapis.com/code.snapengage.com/js/d099b9c4-da54-4fe0-9ecf-b12d581e8850.js';
            var done = false;
            se.onload = se.onreadystatechange = function() {
                if (!done && (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete')) {
                    done = true;
                }
            };
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(se, s);
        })();
        /* End of SnapEngage code */
    }
};