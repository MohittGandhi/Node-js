const https = require("http");
const fs = require("fs");
const path = require("path");

const port = 8000; //8080 8000 3000 //port 8045 for web services and 22 for ssh request so do not use them

const server = https.createServer((req, res) => {
  const filepath = path.join(
    __dirname,
    req.url === "/" ? "index.html" : req.url
  );
  console.log(filepath);

  const extName = String(path.extname(filepath)).toLowerCase();

  const mimetypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
  };

  const contentType = mimetypes[extName] || "application/octet-stream";

  fs.readFile(filepath, (err, content) => {
    if (err) {
      if (err.code === "ENOENT") {
        res.writeHead(404, { "content-type": "text/html" });
        res.end("404: file not found ");
      }
    } else {
      res.writeHead(200, { "Content-type": contentType });
      res.end(content, "utf-8");
    }
  });
});
server.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});
