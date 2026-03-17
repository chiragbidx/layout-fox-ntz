import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const PORT = process.env.PORT || 8080;
const ROOT = process.cwd(); // /app

const clients = new Set();
const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".ico": "image/x-icon",
};

const server = http.createServer((req, res) => {
  // SSE endpoint for reload
  if (req.url === "/__hmr") {
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    });
    res.write("\n");

    clients.add(res);
    req.on("close", () => clients.delete(res));
    return;
  }

  // Serve static files
  const urlPath = decodeURIComponent(req.url.split("?")[0] || "/");
  const requestedPath = urlPath === "/" ? "index.html" : urlPath.replace(/^\/+/, "");
  const resolvedPath = path.resolve(ROOT, requestedPath);
  const inRoot = resolvedPath === ROOT || resolvedPath.startsWith(`${ROOT}${path.sep}`);

  if (!inRoot) {
    res.writeHead(403);
    return res.end("Forbidden");
  }

  const sendFile = (absolutePath) => {
    fs.readFile(absolutePath, (err, content) => {
      if (err) {
        res.writeHead(err.code === "ENOENT" ? 404 : 500);
        return res.end(err.code === "ENOENT" ? "Not found" : "Server error");
      }

      const ext = path.extname(absolutePath).toLowerCase();
      if (MIME[ext]) res.setHeader("Content-Type", MIME[ext]);
      res.writeHead(200);
      res.end(content);
    });
  };

  fs.stat(resolvedPath, (err, stats) => {
    if (err) {
      res.writeHead(404);
      return res.end("Not found");
    }

    if (stats.isDirectory()) {
      const indexPath = path.join(resolvedPath, "index.html");
      return sendFile(indexPath);
    }

    sendFile(resolvedPath);
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`[static] serving ${ROOT} on ${PORT}`);
});

// 🔥 reload trigger
export function triggerReload() {
  for (const res of clients) {
    res.write("data: reload\n\n");
  }
}
