const http = require('http');
const fs = require("fs");
const { log } = require('console');

const port = 8080;

http.createServer((req, res) => {
    let filename = "";

    switch (req.url) {
        case "/":
            filename = "index.html";
            break;
        case "/about":
            filename = "about.html";
            break;
        case "/contact":
            filename = "contact.html";
            break;
        case "/services":
            filename = "services.html";
            break;
        default:
            break;
    }

    fs.readFile(filename, (err, data) => {
        if (!err) {
            res.end(data);
        }
    })

}).listen(port, (err) => {
    if (err) {
        console.log(err);
        return
    }
    console.log(`Your server is running on http://localhost:${port}`);
})