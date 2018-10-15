export default option => {
  console.log(`Connecting to ${option.uri} ...`)

  const ws = new WebSocket(option.uri)

  ws.onopen = ev => {
    console.log('RTServer Connection Created!')

    option.type && ws.send(JSON.stringify({
      type: option.type,
      data: 'Set Request Type'
    }))

    option.host && ws.send(JSON.stringify({
      type: option.type,
      data: option.host
    }))
  }

  ws.onmessage = ev => {
    option.receive(ev.data)
  }

  ws.onclose = ev => {
    console.log('RTServer Connection Closed!')
  }

  ws.onerror = ev => {
    console.log('RTServer Connection Broken!')
    throw new Error(ev)
  }

  return ws
}
