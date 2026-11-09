import { createServer } from 'node:http'
import { createReadStream } from 'node:fs'

const hostname = "localhost"
const port = 3000

const server = createServer((req, res) => {
  // Routes
  if (req.url == "/text") {
    res.statusCode = 200
    res.setHeader("Content-Type", "text/plain")
    res.end("Hello text")
  } else if (req.url == "/html") {
    res.statusCode = 200
    res.setHeader("Content-Type", "text/html")
    res.end("<h1>Hello HTML</h1>")
  } else if (req.url == "/file") {
    res.statusCode = 200
    res.setHeader("Content-Type", "text/html")
    createReadStream("index.html").pipe(res)
  } else if (req.url == "/json") {
    res.statusCode = 200
    res.setHeader("Content-Type", "application/json")
    res.end(JSON.stringify({message: "Hello JSON"}))
  } else {
    res.statusCode = 404
    res.end()
  }
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`)
})
