export default () => {
	const ua = navigator.userAgent
	let browser = ua.match(/Edge\/([\d.]+)/i)
	if (browser) return 'edge'

	browser = ua.match(/Firefox\/([\d.]+)/i)
	if (browser) return 'firefox'

	browser = ua.match(/Version\/([\d.]+)/i)
	if (browser) return 'safari'

	browser = ua.match(/Chrome\/([\d.]+)/i)
	if (browser) return 'chrome'
}