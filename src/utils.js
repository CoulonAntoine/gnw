function strOnly(string, characters) {
	var str = String(string);
	const chars = String(characters);
	for (c of str) {
		if (!chars.includes(c)) return (false);
	}
	return (true);
}

module.exports = {
	strOnly
}
