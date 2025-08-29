import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const escapeJs = (str) =>
  String(str).replace(/\\/g, "\\\\").replace(/'/g, "\\'");

const envVars = Object.keys(process.env)
  .filter((key) => key.startsWith("NEXT_PUBLIC_"))
  .map(
    (key) =>
      `window.env = window.env || {}; window.env['${key}'] = '${escapeJs(
        process.env[key]
      )}';`
  )
  .join("\n");

const outDir = path.join(__dirname, "../public");
try {
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "env.js"), envVars);
  console.log("env.js generated successfully.");
} catch (err) {
  console.error("Failed to generate env.js:", err);
  process.exit(1);
}
