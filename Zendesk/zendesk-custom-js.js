/* 
 * This is an example of how to add a help widget from Zendesk.
 * Note that this example is using a demo account of Zendesk that 
 * is no longer active. To use this with your own account log in to 
 * Zendesk and navigate to "Widget". Copy the Javascript part 
 * of the code (not the surrounding html tags) and paste it between 
 * the comments below.
 */

fco.ready = function() {
	if (fco.authenticated()) {
		/* Zendesk Javascript Code */
		window.zEmbed||function(e,t){var n,o,d,i,s,a=[],r=document.createElement("iframe");window.zEmbed=function(){a.push(arguments)},window.zE=window.zE||window.zEmbed,r.src="javascript:false",r.title="",r.role="presentation",(r.frameElement||r).style.cssText="display: none",d=document.getElementsByTagName("script"),d=d[d.length-1],d.parentNode.insertBefore(r,d),i=r.contentWindow,s=i.document;try{o=s}catch(c){n=document.domain,r.src='javascript:var d=document.open();d.domain="'+n+'";void(0);',o=s}o.open()._l=function(){var o=this.createElement("script");n&&(this.domain=n),o.id="js-iframe-async",o.src=e,this.t=+new Date,this.zendeskHost=t,this.zEQueue=a,this.body.appendChild(o)},o.write('<body onload="document._l();">'),o.close()}("https://assets.zendesk.com/embeddable_framework/main.js","flexiantdevhelp.zendesk.com");
		/* End Zendesk Code */ 
	}
}