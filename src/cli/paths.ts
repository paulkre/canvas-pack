import path from "path";
import fs from "fs";

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath: string) =>
  path.resolve(appDirectory, relativePath);

const entryPath =
  process.argv.length > 2 && fs.existsSync(resolveApp(process.argv[2]))
    ? process.argv[2]
    : "index.ts";

export const paths = {
  dotenv: resolveApp(".env"),
  appPath: resolveApp("."),
  appEntry: resolveApp(entryPath),
  appPackageJson: resolveApp("package.json"),
  appTsConfig: resolveApp("tsconfig.json")
};
