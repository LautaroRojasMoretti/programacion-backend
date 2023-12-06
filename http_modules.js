const http = require('http');

const PORT = 8080;

const server = htttp.createServer((req, res) =>{
    res.end('hola mundddssoo')
});

server.listen(PORT, () =>{
    console.log(`Servidor escuchando en puerto 8080`)
})