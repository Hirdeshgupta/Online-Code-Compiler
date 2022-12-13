const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");
const outputPath = path.join(__dirname, "outputs");
if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}
const executeCpp = (filepath) => {
  const jobId = path.basename(filepath).split(".")[0];
  const outPath = path.join(outputPath, `${jobId}.exe`);
  return new Promise((resolve, reject) => {
    exec(
      `g++ -o ${outPath} ${filepath} && cd ${outputPath} && .\\${jobId}.exe `,
      (error, stdout, stderr) => {
        if (error) {
          console.log(error);
          reject({ error: stderr });
        }
        if (stderr) {
          reject(stderr);
        }
        resolve(stdout);
      }
    );
  });
};
module.exports = {
  executeCpp,
};
