/* eslint new-cap: [2, {"capIsNewExceptions": ["SHA256"]}] */

const logger = new Logger('TOKENAUTH', {});
const crypto = Npm.require('crypto');

Accounts.registerLoginHandler('token', function(loginRequest) {
	if (!loginRequest.token) {
		return undefined;
	}

	logger.info('Init Token login', loginRequest.username);

	if (RocketChat.settings.get('Token_Enable') !== true) {
		throw new Error('Token authentication not enabled');
	}

	const key = RocketChat.settings.get('Token_Key');
	const hash = crypto.createHash('sha256').update(loginRequest.username + key).digest('hex');

	if (hash != loginRequest.hash) {
		throw new Error('Hash not invalid for Token authentication');
	}

	const user = Meteor.users.findOne(userQuery = {
		username: loginRequest.username
	});

	if (!user) {
		throw new Error('User not found after Token authentication');
	}

	const stampedToken = Accounts._generateStampedLoginToken();

	Meteor.users.update(user._id, {
		$push: {
			'services.resume.loginTokens': Accounts._hashStampedToken(stampedToken)
		}
	});

	return {
		userId: user._id,
		token: stampedToken.token
	};
});
