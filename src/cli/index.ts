#!/usr/bin/env node

process.env.NODE_ENV = "development";
process.on("unhandledRejection", err => {
  throw err;
});

import fs from "fs";
import chalk from "chalk";
import webpack from "webpack";

import { paths } from "./paths";
import { config } from "./webpack.config";
import { startServer } from "./start-server";

const isInteractive = process.stdout.isTTY;

try {
  fs.accessSync(paths.appEntry, fs.constants.F_OK);
} catch {
  process.exit(1);
}

// Create a webpack compiler that is configured with custom messages.
const compiler = webpack(config);

const clearConsole = () =>
  process.stdout.write(
    process.platform === "win32" ? "\x1B[2J\x1B[0f" : "\x1B[2J\x1B[3J\x1B[H"
  );

compiler.hooks.invalid.tap("invalid", () => {
  if (isInteractive) clearConsole();
  console.log("Compiling...");
});

compiler.hooks.done.tap("done", async stats => {
  if (
    stats.toJson({
      all: false,
      errors: true
    }).errors.length > 0
  )
    return;

  if (isInteractive) clearConsole();
  console.log(chalk.green("Compiled successfully!"));
  console.log();
  console.log(`You can now view your project in the browser.`);
  console.log();
  console.log(`  ${chalk.bold("Local:")} http://localhost:3000`);
  console.log();
});

startServer(compiler);

if (isInteractive) clearConsole();
console.log(chalk.cyan("Starting the development server..."));
console.log();
