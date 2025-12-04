import http, {IncomingMessage, ServerResponse} from 'http';

const PORT: number = 3000;

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    res.writeHead(200, {"content-type": "application/json"});

    const responseData = {
      message: "Hello from TypeScript!",
      timestamp: new Date().toISOString()   
    }

    res.end(JSON.stringify(responseData))
})

server.listen(PORT, ()=> {
    console.log(`Server is running on PORT:${PORT}`)
})