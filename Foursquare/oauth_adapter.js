var OAuthAdapter = function(_clientId, _clientSecret, _signatureMethod, _urlCallback) 
{
    	var consumerSecret = _clientId;
    	var consumerKey = _clientSecret;
    	var signatureMethod = _signatureMethod;
	var urlCallback = _urlCallback;
    	var accessToken = null;
	var window = null;
	var winBase = null;
    	var view = null;
    	var webView = null;

    	this.load = function() 
	{
        	if (Ti.App.Properties.hasProperty("foursquare_token"))
         	   	accessToken = (Ti.App.Properties.getString("foursquare_token") == "") ? null : Ti.App.Properties.getString("foursquare_token");
    	};

    	save = function() 
	{
		var foursquare = {
			"foursquare_token": accessToken,
			"sid": Ti.App.Properties.getString("sid")
		}

		Ti.App.Properties.setString("foursquare_token", accessToken);
		Ti.App.fireEvent("app:foursquare_integrated");
    	};

    	this.isAuthorized = function() 
	{
        	return ! (accessToken == null);
    	};

	hide = function() 
	{
		winBase.close();
		window = null;
		winBase = null;
	};

	this.show = function(_url)
	{	
		closeButton = Ti.UI.createButton({
           		title:"Cancelar",
			style:Ti.UI.iPhone.SystemButtonStyle.DONE
        	});

		winBase = Ti.UI.createWindow({
			modal:true,
			modalStyle:Ti.UI.iPhone.MODAL_PRESENTATION_PAGESHEET,
			fullscreen:false,
			navBarHidden:true
		});
		window = Ti.UI.createWindow({
			leftNavButton:closeButton,
			barColor:Ti.UI.currentWindow.barColor
        	});
		var nav = Ti.UI.iPhone.createNavigationGroup({
			window:window
		});
		winBase.add(nav);

        	view = Ti.UI.createView({
			backgroundColor:'white'
		});

		webView = Ti.UI.createWebView({
			url: _url,
			autoDetect: [Ti.UI.AUTODETECT_NONE]
		});

		webView.addEventListener("load", function(e) {
			var regex = new RegExp("(#access_token)");
			if (regex.test(e.url) == true)
			{
				accessToken = e.url.substr(urlCallback.length + 15, e.url.length);
				save();
				hide();
			}
		});

		view.add(webView);

		closeButton.addEventListener("click", function(e) {
			Ti.App.fireEvent("app:foursquare_canceled");
			hide();
		});

		window.add(view);
		winBase.open();
	};
};
