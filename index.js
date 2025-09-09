import * as core from "@actions/core";
import { parse } from "shell-quote";
// bin/prettier can't be used, because ncc can't resolve dependencies
// the new experimental CLI can't be used because it doesn't export a "run" equivalent
import { run as runPrettierLegacy } from "prettier/internal/legacy-cli.mjs";

async function run() {
  const args = core.getInput("args");
  if (typeof args !== "string") {
    throw new Error("args must be a string.");
  }

  await runPrettierLegacy(parse(args));
}

async function main() {
  try {
    await run();
  } catch (err) {
    core.setFailed(err.message);
  }
}
main();
