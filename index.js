require("dotenv").config();
require("babel-polyfill");
require("babel-register");

const program = require("commander");
const pkg = require("./package.json");

program
  .version(pkg.version)
  .option("-s --server", "Server")
  .option("-d --dev-server", "Dev Server")
  .parse(process.argv);

if (program.server) {
  require("./server");
}

if (program.devServer) {
  require("./dev-server");
}
