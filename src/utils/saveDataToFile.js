export default (data, filename, ext) => {
  let blob = new Blob(['\ufeff' + data], { type: `text/${ext};charset=utf-8` }),
    url = URL.createObjectURL(blob)

  let link = document.createElement('a')
  link.setAttribute('href', url)
  link.setAttribute('download', `${filename}.${ext}`)

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
