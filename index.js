/*come on js es lo mismo que un import en ecma*/ 
const { request, response } = require('express')
const cors = require('cors')
const express = require('express')
const app = express()

//
app.use(cors())
app.use(express.json())

app.use((request, response,next)=>{
  console.log(request.method)
  console.log(request.path)
  console.log(request.body)
  console.log('-----------')
  next()
})

let notes = [
  {
    id: 1,
    content: "HTML is vey easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2019-05-30T18:39:34.091Z",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true
  }
]

/*const app = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' })
  response.end(JSON.stringify(notes))
})*/

//mostrando respuesta en el localhost
app.get('/', (request, response)=>{

  response.send('<h1>hello world</h1>')
})

// mandando respuesta a la ruta '/api/notes'
app.get('/api/notes', (request, response)=>{
  response.json(notes)
})

//ver contenido de la api segun un parametro 
app.get('/api/notes/:id', (request, response) => {

  const id = Number(request.params.id)
  notes = notes.find(note => note.id === id)

  //en caso de no encontrar la nota mandas un status 404 (Error no found)
  if (notes){
    response.send(notes)
  }else{
    response.status(404).end()
  }
})

//borrar en contenido de la api
app.delete('/api/notes/:id',(request, response)=>{
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)
  response.status(204).end()
})

app.post('/api/notes/', (request, response) =>{
  const note = request.body
  
  const ids = notes.map(note => note.id)
  const maxId = Math.max(...ids)

  const newNote = {
    id: maxId + 1,
    content : note.content,
    date: new Date().toString(),
    import: note.import !== undefined ? note.import : false
  }

  notes = notes.concat(newNote)
  response.json(newNote)
})

// si no encuentra la url regresamos un error 404 (no fuond)
app.use((request,response)=>{
  response.status(404).json({
    error: 'No Found'
  })
})

const PORT = 3001
app.listen(PORT, ()=>{
  console.log(`Server running on port ${PORT}`)
})