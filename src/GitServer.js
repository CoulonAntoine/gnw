const fs = require('fs');
const path = require('path');
const cp = require('child_process');
const http = require('http');
const events = require('events');

const utils = require('./utils');

class GitServer extends events.EventEmitter {

	constructor(serverDirectory, options = {}) {
		super();

		if (typeof serverDirectory !== 'string') throw new Error('serverDirectory must be a string');
		if (!path.isAbsolute(serverDirectory)) throw new Error('serverDirectory must be an absolute path');
		if (!fs.existsSync(serverDirectory)) throw new Error('serverDirectory does not exist');
		
		this.directory = serverDirectory;
		this.options = {};
		
		if (typeof options.authorizedChars === 'string')
			this.options.authorizedChars = options.authorizedChars;
		else
			this.options.authorizedChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_.";
	}

	create(repository) {
		if (typeof repository !== 'string') throw new Error('serverDirectory must be a string');
		if (path.isAbsolute(repository)) throw new Error('repository must be a relative path');

		const parsed = path.parse(repository);

		if (parsed.ext !== '' && parsed.ext !== '.git') throw new Error('repository ext can only be .git');
		if (!utils.strOnly(parsed.name, this.options.authorizedChars)) throw new Error('repository must only contain authorized characters');
		if (!utils.strOnly(parsed.dir, this.options.authorizedChars + '/')) throw new Error('repository must only contain authorized characters');

		var dir = path.join(this.directory, parsed.dir, parsed.name + '.git');

		dir = fs.mkdirSync(dir, { recursive: true });

		console.log(dir);
	}

}

module.exports = GitServer;
