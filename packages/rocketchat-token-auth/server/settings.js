const crypto = Npm.require('crypto');

Meteor.startup(function() {
	RocketChat.settings.addGroup('Token Authentication', function() {
		const enableQuery = {_id: 'Token_Enable', value: true};

		this.add('Token_Enable', false, { type: 'boolean', public: true });
		this.add('Token_Key',  crypto.randomBytes(20).toString('hex'), { type: 'string', enableQuery: enableQuery });
	});
});
