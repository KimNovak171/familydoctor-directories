const fs = require("fs");
const path = require("path");

const OUT_DIR = path.join(process.cwd(), "out");

function walk(dir) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name);
      if (ext.toLowerCase() !== ".txt") continue;
      if (entry.name.toLowerCase() === "robots.txt") continue;
      fs.unlinkSync(fullPath);
    }
  }
}

if (!fs.existsSync(OUT_DIR)) {
  process.exit(0);
}

walk(OUT_DIR);
