import fs from 'fs';
import path from 'path';
import { execFile } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

const browserPath = fs.existsSync(CHROME_PATH) ? CHROME_PATH : EDGE_PATH;

const HTML_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>AsanShipping Developer API Documentation v1.0</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600;700&display=swap');

    @page {
      size: A4 portrait;
      margin: 16mm 14mm 16mm 14mm;
      @bottom-right {
        content: "Page " counter(page);
        font-family: 'JetBrains Mono', monospace;
        font-size: 8pt;
        color: #64748b;
      }
      @bottom-left {
        content: "AsanShipping External Developer API v1.0";
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: 8pt;
        color: #64748b;
      }
    }

    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    body {
      font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
      font-size: 9.5pt;
      line-height: 1.55;
      color: #0f172a;
      background: #ffffff;
      margin: 0;
      padding: 0;
    }

    .page-break {
      page-break-before: always;
      break-before: page;
    }

    .no-break {
      page-break-inside: avoid;
      break-inside: avoid;
    }

    /* Cover Page */
    .cover-page {
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background: linear-gradient(145deg, #09090b 0%, #0f172a 60%, #064e3b 100%);
      color: #ffffff;
      padding: 40mm 20mm 20mm 20mm;
      border-radius: 6px;
      page-break-after: always;
    }

    .cover-badge {
      display: inline-block;
      padding: 6px 14px;
      background: rgba(16, 185, 129, 0.15);
      border: 1px solid rgba(16, 185, 129, 0.4);
      color: #34d399;
      font-family: 'JetBrains Mono', monospace;
      font-size: 9pt;
      font-weight: 700;
      border-radius: 999px;
      margin-bottom: 20px;
    }

    .cover-title {
      font-size: 34pt;
      font-weight: 800;
      line-height: 1.15;
      letter-spacing: -0.03em;
      margin: 0 0 16px 0;
      color: #ffffff;
    }

    .cover-subtitle {
      font-size: 13pt;
      color: #94a3b8;
      max-width: 520px;
      line-height: 1.5;
      margin: 0 0 30px 0;
    }

    .cover-meta {
      border-top: 1px solid rgba(255, 255, 255, 0.15);
      padding-top: 20px;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      font-size: 8.5pt;
    }

    .cover-meta-label {
      color: #64748b;
      font-family: 'JetBrains Mono', monospace;
      font-size: 7.5pt;
      text-transform: uppercase;
      margin-bottom: 4px;
    }

    .cover-meta-value {
      font-weight: 700;
      color: #f1f5f9;
    }

    /* Headings */
    h1 {
      font-size: 18pt;
      font-weight: 800;
      color: #0f172a;
      border-bottom: 2px solid #059669;
      padding-bottom: 6px;
      margin-top: 0;
      margin-bottom: 14px;
    }

    h2 {
      font-size: 13pt;
      font-weight: 700;
      color: #0f172a;
      margin-top: 18px;
      margin-bottom: 8px;
    }

    h3 {
      font-size: 10.5pt;
      font-weight: 700;
      color: #1e293b;
      margin-top: 12px;
      margin-bottom: 6px;
    }

    p {
      margin: 0 0 10px 0;
      color: #334155;
    }

    /* Tables */
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 10px 0 16px 0;
      font-size: 8.5pt;
    }

    th {
      background: #f8fafc;
      color: #475569;
      font-weight: 700;
      font-family: 'JetBrains Mono', monospace;
      text-align: left;
      padding: 7px 10px;
      border: 1px solid #cbd5e1;
      font-size: 8pt;
    }

    td {
      padding: 7px 10px;
      border: 1px solid #e2e8f0;
      color: #1e293b;
      vertical-align: top;
    }

    tr:nth-child(even) td {
      background: #f8fafc;
    }

    /* Code Blocks */
    code {
      font-family: 'JetBrains Mono', monospace;
      font-size: 8pt;
      background: #f1f5f9;
      padding: 2px 5px;
      border-radius: 4px;
      color: #0f766e;
    }

    pre {
      background: #09090b;
      color: #34d399;
      padding: 12px;
      border-radius: 6px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 7.8pt;
      line-height: 1.45;
      overflow-x: hidden;
      white-space: pre-wrap;
      word-break: break-all;
      margin: 8px 0 14px 0;
      border: 1px solid #27272a;
    }

    /* Method Badges */
    .badge {
      display: inline-block;
      padding: 2px 7px;
      border-radius: 4px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 7.5pt;
      font-weight: 700;
      text-transform: uppercase;
      margin-right: 6px;
    }

    .badge-get { background: #dcfce7; color: #15803d; border: 1px solid #86efac; }
    .badge-post { background: #dbeafe; color: #1d4ed8; border: 1px solid #93c5fd; }
    .badge-patch { background: #fef3c7; color: #b45309; border: 1px solid #fde68a; }
    .badge-delete { background: #ffe4e6; color: #be123c; border: 1px solid #fecdd3; }

    .endpoint-card {
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      padding: 12px 14px;
      margin-bottom: 18px;
      background: #ffffff;
      page-break-inside: avoid;
    }

    .endpoint-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 8px;
      margin-bottom: 8px;
    }

    .endpoint-path {
      font-family: 'JetBrains Mono', monospace;
      font-size: 9.5pt;
      font-weight: 700;
      color: #0f172a;
    }

    .endpoint-scope {
      font-family: 'JetBrains Mono', monospace;
      font-size: 7.5pt;
      background: #ecfdf5;
      color: #047857;
      border: 1px solid #a7f3d0;
      padding: 2px 6px;
      border-radius: 4px;
    }

    .callout {
      border-left: 4px solid #059669;
      background: #f0fdf4;
      padding: 10px 14px;
      margin: 12px 0;
      border-radius: 0 6px 6px 0;
      font-size: 8.5pt;
    }
  </style>
</head>
<body>

  <!-- COVER PAGE -->
  <div class="cover-page">
    <div>
      <div class="cover-badge">REST API SPECIFICATION • v1.0</div>
      <h1 class="cover-title">Asan<span style="color: #34d399;">Shipping</span><br>Developer API<br>Documentation</h1>
      <p class="cover-subtitle">Enterprise Integration Manual for Custom Storefronts, Mobile Apps, Inventory Ledgers, Order Ingestion, Courier Milestone Tracking & Webhook Subscriptions.</p>
    </div>

    <div>
      <div class="cover-meta">
        <div>
          <div class="cover-meta-label">Environment Base URLs</div>
          <div class="cover-meta-value" style="font-size: 7pt; font-family: 'JetBrains Mono';">https://merchant-api.asanshipping.com/api/v1</div>
        </div>
        <div>
          <div class="cover-meta-label">Protocol & Auth</div>
          <div class="cover-meta-value">HTTPS / Bearer API Key</div>
        </div>
        <div>
          <div class="cover-meta-label">Documentation Date</div>
          <div class="cover-meta-value">September 2026 (v1.0)</div>
        </div>
      </div>
    </div>
  </div>

  <!-- TABLE OF CONTENTS & ARCHITECTURE -->
  <div class="page-break">
    <h1>1. System Overview & Architecture</h1>
    <p>The AsanShipping Developer API enables merchants and technology partners to programmatically access catalog, inventory ledger, canonical order placement, courier tracking, and real-time webhook subscriptions.</p>

    <div class="callout">
      <strong>Enterprise Multi-Tenancy & Isolation:</strong> Every API key is strictly scoped to a single merchant organization. Cross-tenant access is prohibited at the database engine level.
    </div>

    <h2>Base URLs</h2>
    <table>
      <thead>
        <tr>
          <th>Environment</th>
          <th>Base URL</th>
          <th>Purpose</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Live Production</strong></td>
          <td><code>https://merchant-api.asanshipping.com/api/v1</code></td>
          <td>Production store integrations & live order processing</td>
        </tr>
        <tr>
          <td><strong>Local / Sandbox</strong></td>
          <td><code>http://localhost:5000/api/v1</code></td>
          <td>Local staging, CI/CD pipelines & test suites</td>
        </tr>
      </tbody>
    </table>

    <h2>Standard Request & Response Headers</h2>
    <table>
      <thead>
        <tr>
          <th>Header Name</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>Authorization</code></td>
          <td>string</td>
          <td>Bearer authentication token: <code>Bearer as_live_...</code></td>
        </tr>
        <tr>
          <td><code>X-API-Key</code></td>
          <td>string</td>
          <td>Alternative header to pass secret or storefront API keys</td>
        </tr>
        <tr>
          <td><code>Idempotency-Key</code></td>
          <td>string (UUIDv4)</td>
          <td>Guarantees atomic, non-duplicate execution on mutating POST/PATCH endpoints</td>
        </tr>
        <tr>
          <td><code>X-Request-Id</code></td>
          <td>string</td>
          <td>Unique telemetry identifier returned in every response header for tracing</td>
        </tr>
        <tr>
          <td><code>X-Cache-Lookup</code></td>
          <td>string</td>
          <td>Set to <code>IDEMPOTENT_HIT</code> when returning a cached 24h replay response</td>
        </tr>
      </tbody>
    </table>

    <h2>Authentication & Permission Scopes</h2>
    <p>API keys are created in the Merchant Portal under <strong>Settings ➔ Developer & API</strong>.</p>
    <table>
      <thead>
        <tr>
          <th>Scope Key</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr><td><code>products:read</code></td><td>View catalog items, prices, variants, and image URLs.</td></tr>
        <tr><td><code>products:write</code></td><td>Create/edit products, manage SKUs, and upload WebP images to Backblaze B2.</td></tr>
        <tr><td><code>inventory:read</code></td><td>Query real-time stock balances across warehouses.</td></tr>
        <tr><td><code>inventory:write</code></td><td>Submit authoritative adjustments (restocks/damages) and transfers.</td></tr>
        <tr><td><code>orders:read</code></td><td>Query canonical orders, customer contacts, and consignments.</td></tr>
        <tr><td><code>orders:write</code></td><td>Ingest orders with automated phone normalization and destination checks.</td></tr>
        <tr><td><code>orders:cancel</code></td><td>Cancel unbooked orders with automatic inventory restocking.</td></tr>
        <tr><td><code>tracking:read</code></td><td>Public and authenticated parcel milestone tracking timeline.</td></tr>
        <tr><td><code>webhooks:manage</code></td><td>Register, inspect, and test webhook subscriptions.</td></tr>
      </tbody>
    </table>
  </div>

  <!-- IDEMPOTENCY & RATE LIMITS -->
  <div class="page-break">
    <h1>2. Reliability, Idempotency & Errors</h1>

    <h2>Idempotency Protocol (24-Hour Window)</h2>
    <p>To eliminate duplicate charges and repeated order creation during network dropouts, AsanShipping implements an enterprise Idempotency Protocol on mutating endpoints (<code>POST /orders</code>, <code>POST /inventory/adjustments</code>, <code>POST /products</code>).</p>
    
    <div class="callout">
      <strong>How to use:</strong> Send a unique UUIDv4 in the <code>Idempotency-Key</code> header. If a network timeout occurs and your client resends the identical request within 24 hours, the server returns the cached response with the <code>X-Cache-Lookup: IDEMPOTENT_HIT</code> header without executing duplicate side-effects.
    </div>

    <h2>Rate Limits</h2>
    <table>
      <thead>
        <tr>
          <th>Environment Tier</th>
          <th>Rate Limit</th>
          <th>Burst Allowance</th>
          <th>429 Penalty Window</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Live Production (<code>as_live_...</code>)</strong></td>
          <td>120 requests / min</td>
          <td>30 requests</td>
          <td>Check <code>Retry-After</code> header</td>
        </tr>
        <tr>
          <td><strong>Sandbox Testing (<code>as_test_...</code>)</strong></td>
          <td>60 requests / min</td>
          <td>15 requests</td>
          <td>Check <code>Retry-After</code> header</td>
        </tr>
      </tbody>
    </table>

    <h2>Unified Error Protocol</h2>
    <p>All client and server errors adhere to the standard structured error schema:</p>
    <pre>{
  "success": false,
  "error": {
    "code": "INSUFFICIENT_STOCK",
    "message": "Requested quantity (5) exceeds available stock (2) for SKU 'TS-BLK-M'",
    "details": { "sku": "TS-BLK-M", "requested": 5, "available": 2 },
    "timestamp": "2026-09-26T14:00:00.000Z"
  },
  "meta": {
    "requestId": "req_01J8EF89X...",
    "documentation": "https://asanshipping.com/developers#rate-limits"
  }
}</pre>

    <h2>Error Code Directory</h2>
    <table>
      <thead>
        <tr>
          <th>Status</th>
          <th>Error Code</th>
          <th>Meaning & Resolution</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>401</td><td><code>UNAUTHORIZED</code></td><td>Missing or invalid API key in Authorization header.</td></tr>
        <tr><td>403</td><td><code>FORBIDDEN_INSUFFICIENT_SCOPE</code></td><td>API key lacks the required permission scope.</td></tr>
        <tr><td>400</td><td><code>INVALID_IDEMPOTENCY_KEY</code></td><td>Malformed or empty Idempotency-Key header on mutating route.</td></tr>
        <tr><td>409</td><td><code>IDEMPOTENCY_PAYLOAD_MISMATCH</code></td><td>Reused Idempotency-Key with different request payload.</td></tr>
        <tr><td>429</td><td><code>RATE_LIMIT_EXCEEDED</code></td><td>Exceeded allowed requests per minute.</td></tr>
        <tr><td>422</td><td><code>INSUFFICIENT_STOCK</code></td><td>Requested quantity exceeds available ledger balance.</td></tr>
        <tr><td>400</td><td><code>ORDER_ALREADY_DISPATCHED</code></td><td>Cannot cancel or modify an order already booked with courier.</td></tr>
      </tbody>
    </table>
  </div>

  <!-- ENDPOINT REFERENCE: STORE & PRODUCTS -->
  <div class="page-break">
    <h1>3. Store Profile & Catalog Products</h1>

    <div class="endpoint-card">
      <div class="endpoint-header">
        <div><span class="badge badge-get">GET</span><span class="endpoint-path">/store</span></div>
        <span class="endpoint-scope">Scope: Valid API Key</span>
      </div>
      <p>Retrieve merchant profile, operational currency, timezone, and warehouse fulfillments.</p>
      <pre>// Response 200 OK
{
  "success": true,
  "data": {
    "id": "66ce3698ff8e3e449a622b10",
    "name": "Luxe Couture Official",
    "currency": "PKR",
    "timezone": "Asia/Karachi",
    "warehouses": [
      { "id": "wh-khi-01", "name": "Karachi Central Hub", "city": "Karachi", "isDefault": true }
    ],
    "supportedPaymentMethods": ["COD", "Prepaid"],
    "supportedCouriers": ["TCS", "Trax", "PostEx", "Leopards", "M&P"]
  }
}</pre>
    </div>

    <div class="endpoint-card">
      <div class="endpoint-header">
        <div><span class="badge badge-get">GET</span><span class="endpoint-path">/products</span></div>
        <span class="endpoint-scope">Scope: products:read</span>
      </div>
      <p>Query paginated list of catalog products. Supports query parameters: <code>page</code>, <code>limit</code>, <code>search</code>, <code>sku</code>, <code>status</code>, <code>stockStatus</code>.</p>
    </div>

    <div class="endpoint-card">
      <div class="endpoint-header">
        <div><span class="badge badge-post">POST</span><span class="endpoint-path">/products</span></div>
        <span class="endpoint-scope">Scope: products:write [Idempotent]</span>
      </div>
      <p>Create a catalog product with variant pricing, initial inventory allocation, and dimensional weight.</p>
      <pre>// Request Body JSON
{
  "sku": "HD-EMR-XL",
  "title": "Emerald Heavyweight Hoodie",
  "price": 4999,
  "compareAtPrice": 5999,
  "weightGrams": 650,
  "inventory": { "warehouseId": "wh-khi-01", "quantity": 40 }
}</pre>
    </div>

    <div class="endpoint-card">
      <div class="endpoint-header">
        <div><span class="badge badge-post">POST</span><span class="endpoint-path">/products/:id/images</span></div>
        <span class="endpoint-scope">Scope: products:write</span>
      </div>
      <p>Upload a product image (JPG/PNG/WebP, up to 10MB). Automatically compressed and stored on Backblaze B2.</p>
    </div>
  </div>

  <!-- ENDPOINT REFERENCE: INVENTORY & ORDERS -->
  <div class="page-break">
    <h1>4. Authoritative Inventory & Canonical Orders</h1>

    <div class="endpoint-card">
      <div class="endpoint-header">
        <div><span class="badge badge-get">GET</span><span class="endpoint-path">/inventory</span></div>
        <span class="endpoint-scope">Scope: inventory:read</span>
      </div>
      <p>Retrieve authoritative on-hand, reserved, and available stock quantities per warehouse node.</p>
    </div>

    <div class="endpoint-card">
      <div class="endpoint-header">
        <div><span class="badge badge-post">POST</span><span class="endpoint-path">/inventory/adjustments</span></div>
        <span class="endpoint-scope">Scope: inventory:write [Idempotent]</span>
      </div>
      <p>Submit atomic delta adjustments (+50 restock, -2 damage) with audit trail.</p>
      <pre>{
  "sku": "TS-BLK-M",
  "warehouseId": "wh-khi-01",
  "quantityDelta": 25,
  "reason": "RESTOCK",
  "referenceId": "PO-2026-992"
}</pre>
    </div>

    <div class="endpoint-card">
      <div class="endpoint-header">
        <div><span class="badge badge-post">POST</span><span class="endpoint-path">/orders</span></div>
        <span class="endpoint-scope">Scope: orders:write [Idempotent]</span>
      </div>
      <p>Submit a canonical customer order. Automatically validates destination city & subarea against AsanShipping directory, normalizes mobile numbers to E.164 (+92), reserves inventory, and logs an idempotent transaction.</p>
      <pre>// Request Body JSON
{
  "orderNumber": "WEB-2026-9041",
  "customer": { "name": "Bilal Ahmed", "phone": "03001234567", "email": "bilal@example.com" },
  "shippingAddress": { "address1": "House 42, Street 5, DHA Phase 6", "city": "Lahore", "subarea": "DHA Phase 6" },
  "items": [{ "sku": "TS-BLK-M", "quantity": 2, "unitPrice": 2499 }],
  "paymentMethod": "COD",
  "totalAmount": 5248
}</pre>
    </div>

    <div class="endpoint-card">
      <div class="endpoint-header">
        <div><span class="badge badge-post">POST</span><span class="endpoint-path">/orders/:id/cancel</span></div>
        <span class="endpoint-scope">Scope: orders:cancel</span>
      </div>
      <p>Cancel an unbooked order and automatically restock reserved items back to warehouse ledger.</p>
    </div>
  <!-- ENDPOINT REFERENCE: LOCATIONS & ADDRESS READER -->
  <div class="page-break">
    <h1>5. Delivery Locations & Address Reader Tool</h1>

    <div class="endpoint-card">
      <div class="endpoint-header">
        <div><span class="badge badge-get">GET</span><span class="endpoint-path">/locations/cities</span></div>
        <span class="endpoint-scope">Scope: locations:read / Storefront</span>
      </div>
      <p>Access all available Pakistani delivery cities, provinces, logistics tiers, and sub-area coverage zones. Ideal for checkout city dropdowns and destination validation.</p>
      <pre>// Query Parameters: ?province=Punjab&search=lahore&includeAreas=true
{
  "success": true,
  "data": [
    {
      "name": "Lahore",
      "province": "Punjab",
      "tier": "Tier 1",
      "areasCount": 42,
      "areas": ["Johar Town", "Gulberg", "DHA Phase 5", "Model Town", "Bahria Town"]
    },
    {
      "name": "Karachi",
      "province": "Sindh",
      "tier": "Tier 1",
      "areasCount": 56,
      "areas": ["Clifton", "DHA Phase 6", "Gulshan-e-Iqbal", "North Nazimabad"]
    }
  ]
}</pre>
    </div>

    <div class="endpoint-card">
      <div class="endpoint-header">
        <div><span class="badge badge-post">POST</span><span class="endpoint-path">/tools/parse-address</span></div>
        <span class="endpoint-scope">Scope: tools:execute / orders:write</span>
      </div>
      <p>Intelligently parse unstructured customer text into normalized Pakistani phone numbers (+923...), standardized delivery cities, sub-areas, and clean street addresses with confidence scoring. Supports single strings and high-speed bulk arrays (up to 100 items per request).</p>
      <pre>// Request Body JSON (Single or Bulk)
{
  "addresses": [
    "Ali Khan, 0300-1234567, Flat 4B, Johar Town, lhr",
    "Fatima Tariq, +92 321 9876543, House 12, Gulshan-e-Iqbal, Karachi"
  ]
}

// Response JSON
{
  "success": true,
  "data": {
    "results": [
      {
        "originalText": "Ali Khan, 0300-1234567, Flat 4B, Johar Town, lhr",
        "detectedPhone": "03001234567",
        "phoneNormalized": "+923001234567",
        "detectedCity": "Lahore",
        "detectedProvince": "Punjab",
        "detectedSubArea": "Johar Town",
        "cleanedStreetAddress": "Ali Khan, Flat 4B",
        "confidence": { "city": 98, "subArea": 100, "phone": 100, "overall": 99 }
      }
    ],
    "totalProcessed": 1
  }
}</pre>
    </div>
  </div>

  <!-- ENDPOINT REFERENCE: TRACKING & WEBHOOKS -->
  <div class="page-break">
    <h1>6. Public Tracking & Webhooks</h1>

    <div class="endpoint-card">
      <div class="endpoint-header">
        <div><span class="badge badge-get">GET</span><span class="endpoint-path">/tracking/:trackingNumber</span></div>
        <span class="endpoint-scope">Scope: tracking:read / Public</span>
      </div>
      <p>Public lookup endpoint returning the complete chronological journey milestones and COD balance.</p>
      <pre>{
  "success": true,
  "data": {
    "trackingNumber": "ASN-PK-8921849",
    "courier": "Trax Logistics",
    "status": "OUT_FOR_DELIVERY",
    "originCity": "Karachi",
    "destinationCity": "Lahore",
    "codAmount": 5248,
    "milestones": [
      { "status": "BOOKED", "location": "Karachi Hub", "timestamp": "2026-09-25T14:20:00Z" },
      { "status": "IN_TRANSIT", "location": "Lahore Sort Facility", "timestamp": "2026-09-26T06:45:00Z" },
      { "status": "OUT_FOR_DELIVERY", "location": "DHA Lahore Branch", "timestamp": "2026-09-26T10:15:00Z" }
    ]
  }
}</pre>
    </div>

    <h2>Webhooks & HMAC-SHA256 Signature Verification</h2>
    <p>Every webhook payload sent to your server contains the header <code>X-Asan-Signature: sha256={timestamp}.{hmacHex}</code>.</p>

    <h3>Node.js Verification Implementation</h3>
    <pre>import crypto from 'crypto';

export function verifyAsanWebhook(rawBodyBuffer, signatureHeader, webhookSecret) {
  const parts = signatureHeader.split('.');
  const timestamp = parts[0].replace('sha256=', '');
  const signature = parts[1];

  // Prevent replay attacks (reject payloads older than 5 minutes)
  if (parseInt(timestamp) < Math.floor(Date.now() / 1000) - 300) {
    throw new Error('Webhook timestamp expired');
  }

  const expected = crypto
    .createHmac('sha256', webhookSecret)
    .update(\`\${timestamp}.\${rawBodyBuffer.toString('utf8')}\`)
    .digest('hex');

  return crypto.timingSafeEqual(Buffer.from(signature, 'hex'), Buffer.from(expected, 'hex'));
}</pre>

    <h2>Supported Webhook Topics</h2>
    <table>
      <thead>
        <tr>
          <th>Topic</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr><td><code>order.created</code></td><td>Fired immediately after an order is accepted into the system.</td></tr>
        <tr><td><code>order.updated</code></td><td>Fired when customer details, delivery address, or consignments are updated.</td></tr>
        <tr><td><code>order.cancelled</code></td><td>Fired when an order is cancelled and items are returned to inventory.</td></tr>
        <tr><td><code>tracking.milestone_updated</code></td><td>Fired when courier pushes a new tracking scan.</td></tr>
        <tr><td><code>inventory.low_stock</code></td><td>Fired when stock drops below safety reorder threshold.</td></tr>
      </tbody>
    </table>
  </div>

</body>
</html>
`;

async function generatePdf() {
  const htmlPath = path.join(__dirname, 'temp_docs.html');
  const outputPdfLanding = path.join(__dirname, '../public/downloads/AsanShipping_Developer_API_Documentation_v1.0.pdf');
  const outputPdfPortal = path.join(__dirname, '../../Web-Portal/docs/AsanShipping_Developer_API_Documentation_v1.0.pdf');

  // Ensure output dirs exist
  fs.mkdirSync(path.dirname(outputPdfLanding), { recursive: true });
  fs.mkdirSync(path.dirname(outputPdfPortal), { recursive: true });

  fs.writeFileSync(htmlPath, HTML_TEMPLATE, 'utf8');

  console.log(`[PDF Generator] Using browser: ${browserPath}`);
  console.log(`[PDF Generator] Rendering HTML to PDF...`);

  const args = [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--run-all-compositor-stages-before-draw',
    '--print-to-pdf-no-header',
    `--print-to-pdf=${outputPdfLanding}`,
    htmlPath
  ];

  execFile(browserPath, args, (error) => {
    if (error) {
      console.error('[PDF Generator] Error running browser print-to-pdf:', error);
      process.exit(1);
    }

    // Also copy to Web-Portal docs directory
    if (fs.existsSync(outputPdfLanding)) {
      fs.copyFileSync(outputPdfLanding, outputPdfPortal);
      const stats = fs.statSync(outputPdfLanding);
      console.log(`[PDF Generator] Success! Generated PDF: ${outputPdfLanding} (${(stats.size / 1024).toFixed(1)} KB)`);
      console.log(`[PDF Generator] Copied to Web-Portal docs: ${outputPdfPortal}`);
    }

    // Clean up temp file
    try {
      fs.unlinkSync(htmlPath);
    } catch (_) {}
  });
}

generatePdf();
