import type { FastifyPluginAsync } from 'fastify'
import bookingsRoutes from './bookings.js'
import servicesRoutes from './services.js'
import { readFile } from 'fs/promises'
import { join } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const routes: FastifyPluginAsync = async (app) => {
  app.get('/', async () => ({ 
    message: 'Welcome to SESI Consults API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      docs: '/docs',
      bookings: '/bookings',
      services: '/services'
    }
  }))

  app.get('/health', async () => ({ status: 'ok' }))

  app.get('/docs', async (request, reply) => {
    try {
      // Try to read from the docs folder (production build)
      const docPath = join(process.cwd(), 'docs', 'API_DOCUMENTATION.md')
      const content = await readFile(docPath, 'utf-8')
      
      // Check if request accepts HTML
      const acceptHeader = request.headers.accept || ''
      
      if (acceptHeader.includes('text/html')) {
        // Return HTML with marked.js for proper markdown rendering
        const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SESI Consults API Documentation</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.5.1/github-markdown.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css">
    <style>
      :root {
        --bg: #f7f9fc;
        --card-bg: #ffffff;
        --text: #24292e;
        --muted-text: #4b5563;
        --code-bg: #f6f8fa;
        --shadow: 0 2px 10px rgba(0,0,0,0.08);
      }
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        line-height: 1.65;
        max-width: 1000px;
        margin: 0 auto;
        padding: 20px;
        background-color: var(--bg);
        color: var(--text);
      }
      .markdown-body {
        box-sizing: border-box;
        min-width: 200px;
        max-width: 980px;
        margin: 0 auto;
        padding: 45px;
        background-color: var(--card-bg);
        border-radius: 12px;
        box-shadow: var(--shadow);
        color: var(--text) !important;
      }
        @media (max-width: 767px) {
            .markdown-body {
                padding: 15px;
            }
        }
        .header {
          background: linear-gradient(120deg, #5b8cff 0%, #7c5cff 50%, #9b59b6 100%);
          color: #ffffff;
          padding: 36px;
          border-radius: 12px 12px 0 0;
          margin: -45px -45px 30px -45px;
          position: relative;
          overflow: hidden;
        }
        .header::after {
          content: "";
          position: absolute;
          bottom: -30px;
          left: -20px;
          width: 200px;
          height: 200px;
          background: radial-gradient(circle at center, rgba(255,255,255,0.25), rgba(255,255,255,0) 60%);
          filter: blur(10px);
        }
        .header h1 {
          margin: 0;
          color: #ffffff;
          border: none;
          font-size: 28px;
          letter-spacing: 0.2px;
        }
        .header p {
          margin: 8px 0 0 0;
          opacity: 0.96;
        }
        .header .meta {
          margin-top: 12px;
          font-size: 14px;
          opacity: 0.9;
        }
        .nav {
          margin-top: 18px;
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .nav a {
          background: rgba(255,255,255,0.18);
          color: #ffffff !important;
          padding: 8px 12px;
          border-radius: 999px;
          text-decoration: none;
          font-size: 14px;
          border: 1px solid rgba(255,255,255,0.25);
          transition: background 0.2s ease, transform 0.1s ease;
        }
        .nav a:hover {
          background: rgba(255,255,255,0.28);
          transform: translateY(-1px);
        }
        code {
          background-color: var(--code-bg);
          color: var(--text);
          padding: 0.2em 0.4em;
          border-radius: 4px;
          font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
        }
        pre {
          background-color: #ffffff;
          padding: 16px;
          border-radius: 8px;
          overflow-x: auto;
          border: 1px solid #e5e7eb;
        }
        pre code {
          background-color: transparent !important;
          color: var(--text) !important;
          padding: 0;
        }
        .markdown-body code {
          background-color: var(--code-bg) !important;
          color: var(--text) !important;
          border-radius: 4px;
        }
        .markdown-body pre {
          background: #ffffff !important;
          color: var(--text) !important;
        }
        .markdown-body .hljs {
          background: var(--code-bg) !important;
          color: var(--text) !important;
        }
        .markdown-body .hljs-comment,
        .markdown-body .hljs-quote { color: #374151 !important; }
        .markdown-body .hljs-attr,
        .markdown-body .hljs-keyword,
        .markdown-body .hljs-string,
        .markdown-body .hljs-number,
        .markdown-body .hljs-literal { color: #1f2937 !important; }
        h1, h2, h3, h4, h5, h6 { color: var(--text) !important; }
        p, p * { color: var(--text) !important; }
        li, li * { color: var(--text) !important; }
        ul li, ol li { color: var(--text) !important; }
        table, th, td { color: var(--text) !important; }
        dt, dd { color: var(--text) !important; }
        a { color: #0969da !important; }
        em { color: var(--text) !important; }
        blockquote { color: var(--muted-text) !important; border-left: 4px solid #e5e7eb; padding-left: 12px; }
    </style>
</head>
<body>
    <div class="markdown-body">
      <div class="header">
        <h1>📚 SESI Consults API Documentation</h1>
        <p>Complete reference for integrating with the SESI Consults API</p>
        <div class="meta">Version v1.0.0 · Updated Jan 28, 2026</div>
        <div class="nav">
          <a href="#overview">Overview</a>
          <a href="#endpoints">Endpoints</a>
          <a href="#bookings">Bookings</a>
          <a href="#services">Services</a>
          <a href="#data-models">Data Models</a>
          <a href="#error-handling">Errors</a>
          <a href="#environment-variables">Env Vars</a>
          <a href="#development">Development</a>
        </div>
      </div>
      <div id="content"></div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
    <script>
        const markdown = ${JSON.stringify(content)};
        
        // Configure marked options
      marked.setOptions({
        breaks: true,
        gfm: true,
        headerIds: true,
        mangle: false,
        highlight: function(code, lang) {
          if (window.hljs) {
            try {
              return window.hljs.highlight(code, { language: lang || 'plaintext' }).value;
            } catch (e) {
              return code;
            }
          }
          return code;
        }
      });
        
        // Render markdown to HTML
      document.getElementById('content').innerHTML = marked.parse(markdown);
      if (window.hljs) { window.hljs.highlightAll(); }
    </script>
</body>
</html>`;
        reply.type('text/html').send(html)
      } else {
        // Return plain markdown
        reply.type('text/markdown').send(content)
      }
    } catch (error) {
      reply.code(500).send({
        error: 'Failed to load documentation',
        message: 'Documentation file not found. Please ensure the docs folder is included in the build.'
      })
    }
  })

  app.register(bookingsRoutes, { prefix: '/bookings' })
  app.register(servicesRoutes, { prefix: '/services' })
}

export default routes
