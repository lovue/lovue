export default () => {
  const canvas = document.createElement('canvas')
  const supports = 'probablySupportsContext' in canvas ? 'probablySupportsContext' : 'supportsContext'

  if (supports in canvas) {
    return canvas[supports]('webgl') || canvas[supports]('experimental-webgl')
  }
  return 'WebGLRenderingContext' in window
}
