// const http = require('http');
// const port = 8080;
// http.createServer((req, res) => {
//     res.write('<h1>Hello</h1>')
//     res.end();
// }).listen(port, (err) => {
//     if (err) {
//         console.log("Some Error Occured", err);
//         return
//     }
//     console.log(`Your server is running on ${port}`);
// })

const http = require('http');
const fs = require('fs');
const port = 8080;
http.createServer((req, res) => {
    fs.readFile("demo.txt", "utf8", (error, data) => {
        res.write(`<h1>${data}</h1>`)
        res.end();
    })

}).listen(port, (err) => {
    if (err) {
        console.log("Some Error Occured", err);
        return
    }
    console.log(`Your server is running on http://localhost:${port}`);
})