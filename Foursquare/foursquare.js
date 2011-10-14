Ti.include('oauth_adapter.js');

var FoursquareAPI = function(_params) 
{
	var _self = this;
	var _clientId = _params.clientId;
	var _clientSecret = _params.clientSecret;
	var _urlCallback = _params.urlCallback
	var _signatureMethod = _params.signatureMethod || 'HMAC-SHA1';

	this.oAuthAdapter = new OAuthAdapter(_clientId, _clientSecret, _signatureMethod, _urlCallback);

	this.init = function() 
	{
		var oAuthAdapter = this.oAuthAdapter;

		oAuthAdapter.load();
        
		if (oAuthAdapter.isAuthorized() == false) 
		{
			var URLRequest = "https://foursquare.com/oauth2/authenticate?client_id=" + _clientId + "&response_type=token&redirect_uri=" + _urlCallback;
			oAuthAdapter.show(URLRequest);
		}
	};
};
