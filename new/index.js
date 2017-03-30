const fs = require('fs')

let app = process.argv[2]
fs.readFile('new/html.html', 'utf8', (err, data) => {
  if (err) throw err

  data = data.replace('index.bundle.js', `${app}.bundle.js`)
  data = data.replace('page-', `page-${app}`)

  fs.writeFile(`page/${app}.html`, data, err => {
    if (err) throw err
  })
})

fs.readFile('new/js.js', (err, data) => {
  if (err) throw err

  fs.writeFile(`src/js/${app}.js`, data, err => {
    if (err) throw err
  })
})

fs.readFile('new/less.less', 'utf8', (err, data) => {
  if (err) throw err

  data = data.replace('page-', `page-${app}`)

  fs.writeFile(`src/less/Pages/${app}.less`, data, err => {
    if (err) throw err
  })
})
