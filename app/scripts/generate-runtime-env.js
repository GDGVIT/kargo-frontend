import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envVars = Object.keys(process.env)
  .filter((key) => key.startsWith("NEXT_PUBLIC_"))
  .map(
    (key) =>
      `window.env = window.env || {}; window.env['${key}'] = '${process.env[key]}';`
  )
  .join("\n");

const outDir = path.join(__dirname, "../public");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

fs.writeFileSync(path.join(outDir, "env.js"), envVars);
