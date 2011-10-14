<h1>What?</h1>
<p>This API will help you authorize the Foursquare Account in your Titanium Appcelerator application.</p>
<h1>How?</h1>
<p>It's very easy to use, but first you have to create a new "Application" in Foursquare here: https://foursquare.com/oauth/</p>
<p>Ok, if you created your Application, let's code:</p>
<p>You have to configure your <i>foursquare.config.js</i> file:</p>
<pre>var Foursquare = new FoursquareAPI({
    	clientId:YOUR_CLIENT_ID,
    	clientSecret:YOUR_CLIENT_SECRET,
	urlCallback:YOUR_CALLBACK_URL
});</pre>
<p>After configure this file, you have to include it in your project:</p>
<pre>Ti.include("foursquare.config.js");</pre>
<p>Now, when you wanna log the user, you will use this method:</p>
<pre>Foursquare.init();</pre>
<p>If the user isn't logged, will open a modal window to login</p>
<h1>Properties</h1>
<p>This application works with a Property to save the AccessToken of the user, the name of property is <b>foursquare_token</b>.</p>
<p>To get the token, you have to do this:</p>
<pre>var token = Ti.App.Properties.getString(<b>foursquare_token</b>);</pre>
<h1>Events</h1>
<p>We have two events: <b>app:foursquare_integrated</b> and <b>app:foursquare_canceled</b>.</p>
<p>To use the events, in your project, you will use this:</p>
<pre>Ti.App.addEventListener(<b>app:foursquare_integrated</b>, function() {
	saveYourToken();
});

Ti.App.addEventListener(<b>app:foursquare_canceled</b>, function() {
	hideTheActivityIndicator();
});</pre>
<h1>Notes</h1>
<p>If you wanna change the layout of window, you will need change the function <b>show</b>, in the <i>oauth_adapter.js</i> file.</p>
