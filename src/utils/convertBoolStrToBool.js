export default (str) => {
	let type = typeof str;
	switch (type) {
		case 'string':
			return str === 'true'
		default:
			return str
	}
}
