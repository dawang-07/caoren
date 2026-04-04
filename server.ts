import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs/promises";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // GitHub API Proxy Routes
  app.get("/api/github/profile", async (req, res) => {
    const token = process.env.GITHUB_TOKEN;
    if (!token) {
      return res.status(401).json({ error: "GITHUB_TOKEN is not configured." });
    }

    try {
      const response = await fetch("https://api.github.com/user", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "AI-Studio-Resume-App"
        },
      });
      if (!response.ok) throw new Error(`GitHub API error: ${response.statusText}`);
      const data = await response.json();
      res.json(data);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/github/repos", async (req, res) => {
    const token = process.env.GITHUB_TOKEN;
    if (!token) {
      return res.status(401).json({ error: "GITHUB_TOKEN is not configured." });
    }

    try {
      const response = await fetch("https://api.github.com/user/repos?sort=updated&per_page=100&type=owner", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "AI-Studio-Resume-App"
        },
      });
      if (!response.ok) throw new Error(`GitHub API error: ${response.statusText}`);
      const data = await response.json();
      res.json(data);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    
    // Fallback for SPA routing in development
    app.use("*", async (req, res, next) => {
      try {
        const url = req.originalUrl;
        let template = await fs.readFile(path.resolve(process.cwd(), "index.html"), "utf-8");
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ "Content-Type": "text/html" }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
