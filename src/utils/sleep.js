export default (ms = 1000) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => resolve(), ms)
	})
}