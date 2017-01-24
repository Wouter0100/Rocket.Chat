Package.describe({
	name: 'rocketchat:token-auth',
	version: '0.0.1',
	summary: 'Accounts login handler for LDAP using ldapjs from npm',
	git: ''
});

Package.onUse(function(api) {
	api.use('rocketchat:logger');
	api.use('rocketchat:lib');
	api.use('ecmascript');
	api.use('sha');

	api.use('accounts-base', 'server');
	api.use('accounts-password', 'server');

	api.addFiles('server/loginHandler.js', 'server');
	api.addFiles('server/settings.js', 'server');

	api.export('TOKENAUTH', 'server');
});
