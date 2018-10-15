export default (min, max) => {
	return new Array(max - min + 1).fill(0).map((v, i) => (min + i))
}