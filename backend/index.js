const express = require("express");
const { executeCpp } = require("./executeCpp");
const app = express();
const { generateFile } = require("./generateFile");
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.get("/", (req, res) => {
  return res.json({ hello: "Hello world" });
});
app.post("/run", async (req, res) => {
  const { lng = "cpp", code } = req.body;
  if (code === undefined) {
    res.status(400).json({ sucess: false, error: "Empty Code Body" });
  }
  const path = await generateFile(lng, code);
  const output = await executeCpp(path);
  return res.json({ path: path, output: output });
});
app.listen(5000, () => {
  console.log("Listening on port 5000...");
});
