import http from "http";
const server = http.createServer((request,response)=>{response.setHeader("content-type","text/plain");

    if(request.method === "GET" && request.url === "/"){
        response.end("hola mundo")
    }
});
server.listen(8080, ()=>{
    console.log("servidor escuchando en el puerto 8080");
})