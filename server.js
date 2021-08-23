const express = require("express");
const serveStatic = require("serve-static");
const path = require("path");
app = express();
app.use(serveStatic(path.join(__dirname, "dist")));
app.use(
  history({
    disableDotRule: true,
    verbose: true,
  })
);

app.get("/", function (req, res) {
  res.render(path.join(__dirname + "/dist/index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port);
