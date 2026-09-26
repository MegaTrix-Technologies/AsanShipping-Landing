export interface ApiParam {
  name: string;
  type: string;
  required: boolean;
  description: string;
  example?: string;
}

export interface ApiHeader {
  name: string;
  type: string;
  required: boolean;
  description: string;
  example?: string;
}

export interface CodeSnippet {
  curl: string;
  node: string;
  python: string;
  php: string;
}

export interface ApiEndpoint {
  id: string;
  method: "GET" | "POST" | "PATCH" | "DELETE" | "PUT";
  path: string;
  title: string;
  category: string;
  scope: string;
  description: string;
  requiresIdempotency?: boolean;
  headers?: ApiHeader[];
  pathParams?: ApiParam[];
  queryParams?: ApiParam[];
  bodyParams?: ApiParam[];
  requestBodyExample?: any;
  responseStatus: number;
  responseExample: any;
  errorResponses?: {
    status: number;
    code: string;
    description: string;
    example: any;
  }[];
  snippets: CodeSnippet;
}

export interface ApiSection {
  id: string;
  title: string;
  description: string;
  endpoints?: ApiEndpoint[];
}

export const API_BASE_PROD = "https://api-core.asanshipping.com/api/v1";
export const API_BASE_DEV = "http://localhost:5000/api/v1";

export const API_SCOPES = [
  { scope: "products:read", description: "View catalog products, variant details, pricing, and image URLs." },
  { scope: "products:write", description: "Create, update, archive products, and upload WebP images to Backblaze B2." },
  { scope: "inventory:read", description: "Access real-time inventory ledger quantities and warehouse stock balances." },
  { scope: "inventory:write", description: "Submit authoritative stock adjustments (restocks, write-offs) and warehouse transfers." },
  { scope: "orders:read", description: "Query canonical order records, customer details, consignments, and tracking." },
  { scope: "orders:write", description: "Create canonical customer orders with automated destination validation and phone normalization." },
  { scope: "orders:cancel", description: "Cancel pending or unbooked orders and trigger automatic inventory restocks." },
  { scope: "tracking:read", description: "Fetch public and authenticated shipment tracking milestones and carrier progress." },
  { scope: "webhooks:manage", description: "Register, update, delete webhook subscriptions, dispatch tests, and inspect audit logs." },
];

export const ERROR_CODES = [
  { code: "UNAUTHORIZED", status: 401, description: "Missing, expired, or malformed API Key or Bearer token." },
  { code: "FORBIDDEN_INSUFFICIENT_SCOPE", status: 403, description: "The provided API key does not have the required permission scope for this action." },
  { code: "INVALID_IDEMPOTENCY_KEY", status: 400, description: "Missing, malformed, or previously mismatched Idempotency-Key header." },
  { code: "IDEMPOTENCY_PAYLOAD_MISMATCH", status: 409, description: "A request with this Idempotency-Key was already executed with different parameters." },
  { code: "RATE_LIMIT_EXCEEDED", status: 429, description: "Exceeded the allowed requests per minute (120 req/min Live, 60 req/min Test). Check Retry-After header." },
  { code: "VALIDATION_ERROR", status: 400, description: "One or more request parameters failed schema validation (e.g. invalid phone or negative price)." },
  { code: "INSUFFICIENT_STOCK", status: 422, description: "Requested item quantity exceeds authoritative available ledger balance." },
  { code: "ORDER_ALREADY_DISPATCHED", status: 400, description: "Cannot cancel or modify an order that has already been booked or dispatched with a courier." },
  { code: "RESOURCE_NOT_FOUND", status: 404, description: "The requested product, order, transfer, or webhook ID does not exist for this merchant." },
  { code: "WEBHOOK_VERIFICATION_FAILED", status: 401, description: "The HMAC-SHA256 signature mismatch on an inbound webhook payload." },
];

export const API_SECTIONS: ApiSection[] = [
  {
    id: "overview",
    title: "Overview & Architecture",
    description: "The AsanShipping Developer API is an enterprise-grade RESTful interface designed for seamless integration with custom e-commerce storefronts (Next.js, Remix, Shopify Headless, WooCommerce, mobile apps, and custom ERPs). All endpoints use JSON for requests and responses, follow strict tenant data isolation, and feature built-in idempotency, rate limiting, and unified error handling."
  },
  {
    id: "authentication",
    title: "Authentication & Scopes",
    description: "Authenticate all API requests using an API Key generated from the AsanShipping Merchant Portal under Settings ➔ Developer & API. Keys come in two environments: Live (`as_live_...`) and Test (`as_test_...`). You can pass keys via the `Authorization: Bearer <key>` header or the `X-API-Key: <key>` header."
  },
  {
    id: "idempotency",
    title: "Idempotency Protocol",
    description: "To prevent accidental duplicate orders or double-charging inventory adjustments during network timeouts, mutating endpoints (`POST /orders`, `POST /inventory/adjustments`, `POST /products`) support the `Idempotency-Key: <UUIDv4>` header. AsanShipping caches responses for 24 hours. Replay requests return the original response with the `X-Cache-Lookup: IDEMPOTENT_HIT` header."
  },
  {
    id: "rate-limits",
    title: "Rate Limits & Throttling",
    description: "API requests are metered per merchant organization using a token bucket algorithm. Live keys have a baseline of 120 requests/minute (burst 30), and Test keys have 60 requests/minute (burst 15). When exceeded, the server responds with HTTP 429 Too Many Requests and a `Retry-After: <seconds>` header."
  },
  {
    id: "store",
    title: "Store Profile",
    description: "Endpoints to inspect the active merchant profile, operational currency, timezone, and configured warehouse fulfillment locations.",
    endpoints: [
      {
        id: "get-store-profile",
        method: "GET",
        path: "/store",
        title: "Get Store Profile",
        category: "store",
        scope: "store:read / any valid key",
        description: "Retrieve store identity, default currency (PKR), timezone, operational environment, and configured warehouse facilities.",
        headers: [
          { name: "Authorization", type: "string", required: true, description: "Bearer <YOUR_API_KEY>", example: "Bearer as_live_79a2f..." }
        ],
        responseStatus: 200,
        responseExample: {
          success: true,
          data: {
            id: "66ce3698ff8e3e449a622b10",
            name: "Luxe Couture Official",
            domain: "luxecouture.pk",
            currency: "PKR",
            timezone: "Asia/Karachi",
            environment: "LIVE",
            warehouses: [
              { id: "wh-khi-01", name: "Karachi Central Hub", city: "Karachi", isDefault: true },
              { id: "wh-lhr-02", name: "Lahore Regional Fulfillment", city: "Lahore", isDefault: false }
            ],
            supportedPaymentMethods: ["COD", "Prepaid"],
            supportedCouriers: ["TCS", "Trax", "PostEx", "Leopards", "M&P"],
            apiVersion: "2026-09-01"
          },
          meta: {
            requestId: "req_01J8K9X2M4...",
            timestamp: "2026-09-26T12:00:00.000Z"
          }
        },
        snippets: {
          curl: `curl -X GET "https://api-core.asanshipping.com/api/v1/store" \\
  -H "Authorization: Bearer as_live_YOUR_KEY" \\
  -H "Accept: application/json"`,
          node: `const response = await fetch("https://api-core.asanshipping.com/api/v1/store", {
  method: "GET",
  headers: {
    "Authorization": "Bearer as_live_YOUR_KEY",
    "Accept": "application/json"
  }
});
const result = await response.json();
console.log(result.data);`,
          python: `import requests

url = "https://api-core.asanshipping.com/api/v1/store"
headers = {
    "Authorization": "Bearer as_live_YOUR_KEY",
    "Accept": "application/json"
}

response = requests.get(url, headers=headers)
data = response.json()
print(data)`,
          php: `<?php
$ch = curl_init("https://api-core.asanshipping.com/api/v1/store");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Authorization: Bearer as_live_YOUR_KEY",
    "Accept: application/json"
]);

$response = curl_exec($ch);
curl_close($ch);
$result = json_decode($response, true);
print_r($result);
?>`
        }
      }
    ]
  },
  {
    id: "products",
    title: "Catalog & Products",
    description: "Manage catalog items, multi-variant SKUs, pricing, barcode attributes, and upload WebP images backed by Backblaze B2 object storage.",
    endpoints: [
      {
        id: "list-products",
        method: "GET",
        path: "/products",
        title: "List Products",
        category: "products",
        scope: "products:read",
        description: "Retrieve a paginated, filterable list of catalog products with variant stock and media URLs.",
        queryParams: [
          { name: "page", type: "integer", required: false, description: "Page number (default: 1)", example: "1" },
          { name: "limit", type: "integer", required: false, description: "Records per page (1-100, default: 25)", example: "25" },
          { name: "search", type: "string", required: false, description: "Search by title or SKU", example: "Cotton" },
          { name: "sku", type: "string", required: false, description: "Filter by exact SKU", example: "TS-BLK-M" },
          { name: "status", type: "string", required: false, description: "Product status: active | draft | archived", example: "active" },
          { name: "stockStatus", type: "string", required: false, description: "Stock filter: IN_STOCK | OUT_OF_STOCK", example: "IN_STOCK" },
          { name: "updatedSince", type: "string (ISO)", required: false, description: "Fetch only products modified after timestamp", example: "2026-09-01T00:00:00Z" }
        ],
        responseStatus: 200,
        responseExample: {
          success: true,
          data: [
            {
              id: "prod_01J8A9...",
              sku: "TS-BLK-M",
              title: "Signature Combed Cotton Crewneck",
              status: "active",
              price: 2499,
              compareAtPrice: 2999,
              costPrice: 1100,
              weightGrams: 280,
              totalStock: 85,
              images: [
                "https://f002.backblazeb2.com/file/asan-media/products/prod_01J8A9/main.webp"
              ],
              updatedAt: "2026-09-26T10:15:00.000Z"
            }
          ],
          pagination: {
            total: 142,
            page: 1,
            limit: 25,
            totalPages: 6
          }
        },
        snippets: {
          curl: `curl -X GET "https://api-core.asanshipping.com/api/v1/products?limit=10&status=active" \\
  -H "Authorization: Bearer as_live_YOUR_KEY"`,
          node: `const params = new URLSearchParams({ limit: "10", status: "active" });
const response = await fetch(\`https://api-core.asanshipping.com/api/v1/products?\${params}\`, {
  headers: { "Authorization": "Bearer as_live_YOUR_KEY" }
});
const { data, pagination } = await response.json();`,
          python: `import requests

response = requests.get(
    "https://api-core.asanshipping.com/api/v1/products",
    headers={"Authorization": "Bearer as_live_YOUR_KEY"},
    params={"limit": 10, "status": "active"}
)
print(response.json())`,
          php: `<?php
$ch = curl_init("https://api-core.asanshipping.com/api/v1/products?limit=10&status=active");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, ["Authorization: Bearer as_live_YOUR_KEY"]);
$response = json_decode(curl_exec($ch), true);
?>`
        }
      },
      {
        id: "create-product",
        method: "POST",
        path: "/products",
        title: "Create Product",
        category: "products",
        scope: "products:write",
        description: "Add a new product with variant definitions, initial inventory allocation, and dimensional weight metrics.",
        requiresIdempotency: true,
        headers: [
          { name: "Idempotency-Key", type: "string (UUIDv4)", required: true, description: "Unique key preventing duplicate creations", example: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d" },
          { name: "Content-Type", type: "string", required: true, description: "application/json", example: "application/json" }
        ],
        bodyParams: [
          { name: "sku", type: "string", required: true, description: "Unique stock keeping unit", example: "HD-EMR-XL" },
          { name: "title", type: "string", required: true, description: "Product display title", example: "Emerald Heavyweight Hoodie" },
          { name: "price", type: "number", required: true, description: "Retail selling price in PKR", example: "4999" },
          { name: "compareAtPrice", type: "number", required: false, description: "Original strike-through price", example: "5999" },
          { name: "costPrice", type: "number", required: false, description: "Internal unit cost for margin analytics", example: "2400" },
          { name: "weightGrams", type: "integer", required: true, description: "Parcel weight in grams (used for freight calculations)", example: "650" },
          { name: "inventory", type: "object", required: true, description: "{ warehouseId: string, quantity: number }", example: "{\"warehouseId\": \"wh-khi-01\", \"quantity\": 40}" }
        ],
        requestBodyExample: {
          sku: "HD-EMR-XL",
          title: "Emerald Heavyweight Hoodie",
          description: "Heavyweight 450 GSM fleece hoodie with embroidered crest.",
          price: 4999,
          compareAtPrice: 5999,
          costPrice: 2400,
          weightGrams: 650,
          inventory: {
            warehouseId: "wh-khi-01",
            quantity: 40
          },
          dimensions: {
            lengthCm: 35,
            widthCm: 28,
            heightCm: 6
          }
        },
        responseStatus: 201,
        responseExample: {
          success: true,
          data: {
            id: "prod_01J8B1...",
            sku: "HD-EMR-XL",
            title: "Emerald Heavyweight Hoodie",
            price: 4999,
            weightGrams: 650,
            status: "active",
            availableStock: 40,
            createdAt: "2026-09-26T12:30:00.000Z"
          },
          meta: {
            requestId: "req_01J8B1...",
            idempotencyKey: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d"
          }
        },
        snippets: {
          curl: `curl -X POST "https://api-core.asanshipping.com/api/v1/products" \\
  -H "Authorization: Bearer as_live_YOUR_KEY" \\
  -H "Idempotency-Key: $(uuidgen)" \\
  -H "Content-Type: application/json" \\
  -d '{
    "sku": "HD-EMR-XL",
    "title": "Emerald Heavyweight Hoodie",
    "price": 4999,
    "weightGrams": 650,
    "inventory": { "warehouseId": "wh-khi-01", "quantity": 40 }
  }'`,
          node: `const res = await fetch("https://api-core.asanshipping.com/api/v1/products", {
  method: "POST",
  headers: {
    "Authorization": "Bearer as_live_YOUR_KEY",
    "Idempotency-Key": crypto.randomUUID(),
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    sku: "HD-EMR-XL",
    title: "Emerald Heavyweight Hoodie",
    price: 4999,
    weightGrams: 650,
    inventory: { warehouseId: "wh-khi-01", quantity: 40 }
  })
});
const created = await res.json();`,
          python: `import requests, uuid

payload = {
    "sku": "HD-EMR-XL",
    "title": "Emerald Heavyweight Hoodie",
    "price": 4999,
    "weightGrams": 650,
    "inventory": {"warehouseId": "wh-khi-01", "quantity": 40}
}
headers = {
    "Authorization": "Bearer as_live_YOUR_KEY",
    "Idempotency-Key": str(uuid.uuid4()),
    "Content-Type": "application/json"
}

response = requests.post("https://api-core.asanshipping.com/api/v1/products", json=payload, headers=headers)
print(response.json())`,
          php: `<?php
$data = [
    "sku" => "HD-EMR-XL",
    "title" => "Emerald Heavyweight Hoodie",
    "price" => 4999,
    "weightGrams" => 650,
    "inventory" => ["warehouseId" => "wh-khi-01", "quantity" => 40]
];

$ch = curl_init("https://api-core.asanshipping.com/api/v1/products");
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Authorization: Bearer as_live_YOUR_KEY",
    "Idempotency-Key: " . uniqid(),
    "Content-Type: application/json"
]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$result = curl_exec($ch);
?>`
        }
      },
      {
        id: "upload-product-image",
        method: "POST",
        path: "/products/:id/images",
        title: "Upload Product Image",
        category: "products",
        scope: "products:write",
        description: "Upload a JPG/PNG/WebP image (up to 10MB). The server automatically compresses and optimizes the file to high-density WebP and stores it on Backblaze B2.",
        pathParams: [
          { name: "id", type: "string", required: true, description: "Product MongoDB ID or SKU", example: "prod_01J8B1..." }
        ],
        headers: [
          { name: "Content-Type", type: "string", required: true, description: "multipart/form-data", example: "multipart/form-data" }
        ],
        responseStatus: 200,
        responseExample: {
          success: true,
          data: {
            imageUrl: "https://f002.backblazeb2.com/file/asan-media/products/prod_01J8B1/hero.webp",
            width: 1200,
            height: 1200,
            format: "webp",
            sizeBytes: 142800
          }
        },
        snippets: {
          curl: `curl -X POST "https://api-core.asanshipping.com/api/v1/products/prod_01J8B1/images" \\
  -H "Authorization: Bearer as_live_YOUR_KEY" \\
  -F "image=@/path/to/hoodie-front.jpg"`,
          node: `const formData = new FormData();
formData.append("image", fileBlob, "hoodie.jpg");

const res = await fetch("https://api-core.asanshipping.com/api/v1/products/prod_01J8B1/images", {
  method: "POST",
  headers: { "Authorization": "Bearer as_live_YOUR_KEY" },
  body: formData
});
const uploadResult = await res.json();`,
          python: `import requests

files = {'image': open('hoodie.jpg', 'rb')}
headers = {'Authorization': 'Bearer as_live_YOUR_KEY'}

response = requests.post(
    "https://api-core.asanshipping.com/api/v1/products/prod_01J8B1/images",
    headers=headers,
    files=files
)
print(response.json())`,
          php: `<?php
$cfile = new CURLFile('/path/to/hoodie.jpg', 'image/jpeg', 'image');
$data = ['image' => $cfile];

$ch = curl_init("https://api-core.asanshipping.com/api/v1/products/prod_01J8B1/images");
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
curl_setopt($ch, CURLOPT_HTTPHEADER, ["Authorization: Bearer as_live_YOUR_KEY"]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$res = curl_exec($ch);
?>`
        }
      }
    ]
  },
  {
    id: "inventory",
    title: "Authoritative Inventory Ledger",
    description: "Multi-node warehouse stock synchronization. Perform atomic adjustments (restocks, cycle counts, damage writes) and cross-warehouse transfers with full audit logging.",
    endpoints: [
      {
        id: "get-inventory",
        method: "GET",
        path: "/inventory",
        title: "Query Inventory Ledger",
        category: "inventory",
        scope: "inventory:read",
        description: "Retrieve real-time available, reserved, and incoming stock balances grouped by warehouse and SKU.",
        queryParams: [
          { name: "sku", type: "string", required: false, description: "Filter by exact SKU", example: "TS-BLK-M" },
          { name: "warehouseId", type: "string", required: false, description: "Filter by warehouse node", example: "wh-khi-01" },
          { name: "lowStockOnly", type: "boolean", required: false, description: "Filter items below reorder threshold", example: "true" }
        ],
        responseStatus: 200,
        responseExample: {
          success: true,
          data: [
            {
              sku: "TS-BLK-M",
              warehouseId: "wh-khi-01",
              warehouseName: "Karachi Central Hub",
              onHand: 100,
              reserved: 15,
              available: 85,
              reorderPoint: 20,
              isLowStock: false
            }
          ]
        },
        snippets: {
          curl: `curl -X GET "https://api-core.asanshipping.com/api/v1/inventory?warehouseId=wh-khi-01" \\
  -H "Authorization: Bearer as_live_YOUR_KEY"`,
          node: `const res = await fetch("https://api-core.asanshipping.com/api/v1/inventory?warehouseId=wh-khi-01", {
  headers: { "Authorization": "Bearer as_live_YOUR_KEY" }
});
const inventory = await res.json();`,
          python: `import requests
res = requests.get(
    "https://api-core.asanshipping.com/api/v1/inventory",
    headers={"Authorization": "Bearer as_live_YOUR_KEY"},
    params={"warehouseId": "wh-khi-01"}
)
print(res.json())`,
          php: `<?php
$ch = curl_init("https://api-core.asanshipping.com/api/v1/inventory?warehouseId=wh-khi-01");
curl_setopt($ch, CURLOPT_HTTPHEADER, ["Authorization: Bearer as_live_YOUR_KEY"]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$data = json_decode(curl_exec($ch), true);
?>`
        }
      },
      {
        id: "post-adjustment",
        method: "POST",
        path: "/inventory/adjustments",
        title: "Adjust Stock Ledger",
        category: "inventory",
        scope: "inventory:write",
        description: "Submit an atomic delta change to a SKU stock ledger (e.g. +50 for inbound supplier restock, -2 for transit damage).",
        requiresIdempotency: true,
        bodyParams: [
          { name: "sku", type: "string", required: true, description: "Product SKU", example: "TS-BLK-M" },
          { name: "warehouseId", type: "string", required: true, description: "Target warehouse node", example: "wh-khi-01" },
          { name: "quantityDelta", type: "integer", required: true, description: "Positive or negative integer delta", example: "25" },
          { name: "reason", type: "string", required: true, description: "RESTOCK | CYCLE_COUNT | DAMAGE | RETURN | AUDIT", example: "RESTOCK" },
          { name: "referenceId", type: "string", required: false, description: "Supplier PO or Inspection Ticket ID", example: "PO-2026-992" }
        ],
        requestBodyExample: {
          sku: "TS-BLK-M",
          warehouseId: "wh-khi-01",
          quantityDelta: 25,
          reason: "RESTOCK",
          referenceId: "PO-2026-992",
          notes: "Inbound delivery from Faisalabad mill"
        },
        responseStatus: 200,
        responseExample: {
          success: true,
          data: {
            sku: "TS-BLK-M",
            warehouseId: "wh-khi-01",
            previousOnHand: 100,
            quantityDelta: 25,
            newOnHand: 125,
            available: 110,
            adjustedAt: "2026-09-26T12:45:00.000Z"
          }
        },
        snippets: {
          curl: `curl -X POST "https://api-core.asanshipping.com/api/v1/inventory/adjustments" \\
  -H "Authorization: Bearer as_live_YOUR_KEY" \\
  -H "Idempotency-Key: $(uuidgen)" \\
  -H "Content-Type: application/json" \\
  -d '{
    "sku": "TS-BLK-M",
    "warehouseId": "wh-khi-01",
    "quantityDelta": 25,
    "reason": "RESTOCK"
  }'`,
          node: `const res = await fetch("https://api-core.asanshipping.com/api/v1/inventory/adjustments", {
  method: "POST",
  headers: {
    "Authorization": "Bearer as_live_YOUR_KEY",
    "Idempotency-Key": crypto.randomUUID(),
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    sku: "TS-BLK-M",
    warehouseId: "wh-khi-01",
    quantityDelta: 25,
    reason: "RESTOCK"
  })
});`,
          python: `import requests, uuid

res = requests.post(
    "https://api-core.asanshipping.com/api/v1/inventory/adjustments",
    headers={"Authorization": "Bearer as_live_YOUR_KEY", "Idempotency-Key": str(uuid.uuid4())},
    json={"sku": "TS-BLK-M", "warehouseId": "wh-khi-01", "quantityDelta": 25, "reason": "RESTOCK"}
)`,
          php: `<?php
$ch = curl_init("https://api-core.asanshipping.com/api/v1/inventory/adjustments");
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    "sku" => "TS-BLK-M",
    "warehouseId" => "wh-khi-01",
    "quantityDelta" => 25,
    "reason" => "RESTOCK"
]));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Authorization: Bearer as_live_YOUR_KEY",
    "Idempotency-Key: " . uniqid(),
    "Content-Type: application/json"
]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$out = curl_exec($ch);
?>`
        }
      }
    ]
  },
  {
    id: "orders",
    title: "Canonical Orders & Idempotency",
    description: "Ingest e-commerce orders, validate recipient delivery addresses, reserve stock atomically, and execute order cancellations with automatic stock restoration.",
    endpoints: [
      {
        id: "create-order",
        method: "POST",
        path: "/orders",
        title: "Create Canonical Order",
        category: "orders",
        scope: "orders:write",
        description: "Submit a new customer order. Automatically validates destination city & subarea against AsanShipping directory, normalizes Pakistani mobile numbers to E.164 (+92), calculates order totals, reserves inventory, and logs an idempotent transaction.",
        requiresIdempotency: true,
        headers: [
          { name: "Idempotency-Key", type: "string (UUIDv4)", required: true, description: "Unique idempotency key (e.g. checkout session or cart ID)", example: "ord-idem-773a-44e" },
          { name: "Content-Type", type: "string", required: true, description: "application/json", example: "application/json" }
        ],
        bodyParams: [
          { name: "orderNumber", type: "string", required: true, description: "Storefront unique order identifier", example: "WEB-2026-9041" },
          { name: "customer", type: "object", required: true, description: "{ name, phone (03xx / +92), email }", example: "{\"name\": \"Bilal Ahmed\", \"phone\": \"03001234567\", \"email\": \"bilal@example.com\"}" },
          { name: "shippingAddress", type: "object", required: true, description: "{ address1, city, subarea, postalCode }", example: "{\"address1\": \"House 42, Street 5, DHA Phase 6\", \"city\": \"Lahore\", \"subarea\": \"DHA Phase 6\"}" },
          { name: "items", type: "array", required: true, description: "Array of [{ sku, quantity, unitPrice }]", example: "[{\"sku\": \"TS-BLK-M\", \"quantity\": 2, \"unitPrice\": 2499}]" },
          { name: "paymentMethod", type: "string", required: true, description: "COD | PREPAID", example: "COD" },
          { name: "shippingFee", type: "number", required: false, description: "Freight charged to customer", example: "250" }
        ],
        requestBodyExample: {
          orderNumber: "WEB-2026-9041",
          customer: {
            name: "Bilal Ahmed",
            phone: "03001234567",
            email: "bilal@example.com"
          },
          shippingAddress: {
            address1: "House 42, Street 5, DHA Phase 6",
            city: "Lahore",
            subarea: "DHA Phase 6",
            postalCode: "54000"
          },
          items: [
            {
              sku: "TS-BLK-M",
              title: "Signature Combed Cotton Crewneck",
              quantity: 2,
              unitPrice: 2499
            }
          ],
          paymentMethod: "COD",
          subtotal: 4998,
          shippingFee: 250,
          discountAmount: 0,
          totalAmount: 5248,
          notes: "Call customer before delivery"
        },
        responseStatus: 201,
        responseExample: {
          success: true,
          data: {
            id: "ord_01J8C8...",
            orderNumber: "WEB-2026-9041",
            trackingNumber: "ASN-PK-8921849",
            status: "PENDING_BOOKING",
            paymentMethod: "COD",
            totalAmount: 5248,
            customer: {
              name: "Bilal Ahmed",
              phone: "+923001234567",
              email: "bilal@example.com"
            },
            shippingAddress: {
              address1: "House 42, Street 5, DHA Phase 6",
              city: "Lahore",
              subarea: "DHA Phase 6"
            },
            createdAt: "2026-09-26T13:00:00.000Z"
          },
          meta: {
            requestId: "req_01J8C8...",
            idempotencyKey: "ord-idem-773a-44e"
          }
        },
        snippets: {
          curl: `curl -X POST "https://api-core.asanshipping.com/api/v1/orders" \\
  -H "Authorization: Bearer as_live_YOUR_KEY" \\
  -H "Idempotency-Key: ord-idem-773a-44e" \\
  -H "Content-Type: application/json" \\
  -d '{
    "orderNumber": "WEB-2026-9041",
    "customer": {
      "name": "Bilal Ahmed",
      "phone": "03001234567"
    },
    "shippingAddress": {
      "address1": "House 42, Street 5, DHA Phase 6",
      "city": "Lahore"
    },
    "items": [
      { "sku": "TS-BLK-M", "quantity": 2, "unitPrice": 2499 }
    ],
    "paymentMethod": "COD",
    "totalAmount": 5248
  }'`,
          node: `const newOrder = await fetch("https://api-core.asanshipping.com/api/v1/orders", {
  method: "POST",
  headers: {
    "Authorization": "Bearer as_live_YOUR_KEY",
    "Idempotency-Key": "ord-idem-773a-44e",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    orderNumber: "WEB-2026-9041",
    customer: { name: "Bilal Ahmed", phone: "03001234567" },
    shippingAddress: { address1: "House 42, DHA Phase 6", city: "Lahore" },
    items: [{ sku: "TS-BLK-M", quantity: 2, unitPrice: 2499 }],
    paymentMethod: "COD",
    totalAmount: 5248
  })
});
const orderResponse = await newOrder.json();`,
          python: `import requests

payload = {
    "orderNumber": "WEB-2026-9041",
    "customer": {"name": "Bilal Ahmed", "phone": "03001234567"},
    "shippingAddress": {"address1": "House 42, DHA Phase 6", "city": "Lahore"},
    "items": [{"sku": "TS-BLK-M", "quantity": 2, "unitPrice": 2499}],
    "paymentMethod": "COD",
    "totalAmount": 5248
}

res = requests.post(
    "https://api-core.asanshipping.com/api/v1/orders",
    headers={
        "Authorization": "Bearer as_live_YOUR_KEY",
        "Idempotency-Key": "ord-idem-773a-44e",
        "Content-Type": "application/json"
    },
    json=payload
)
print(res.json())`,
          php: `<?php
$order = [
    "orderNumber" => "WEB-2026-9041",
    "customer" => ["name" => "Bilal Ahmed", "phone" => "03001234567"],
    "shippingAddress" => ["address1" => "House 42, DHA Phase 6", "city" => "Lahore"],
    "items" => [["sku" => "TS-BLK-M", "quantity" => 2, "unitPrice" => 2499]],
    "paymentMethod" => "COD",
    "totalAmount" => 5248
];

$ch = curl_init("https://api-core.asanshipping.com/api/v1/orders");
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($order));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Authorization: Bearer as_live_YOUR_KEY",
    "Idempotency-Key: ord-idem-773a-44e",
    "Content-Type: application/json"
]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
?>`
        }
      },
      {
        id: "cancel-order",
        method: "POST",
        path: "/orders/:id/cancel",
        title: "Cancel Order",
        category: "orders",
        scope: "orders:cancel",
        description: "Cancel an unbooked order and immediately return reserved line item stock back to the warehouse ledger balance.",
        pathParams: [
          { name: "id", type: "string", required: true, description: "Order ID or orderNumber", example: "ord_01J8C8..." }
        ],
        bodyParams: [
          { name: "reason", type: "string", required: true, description: "CUSTOMER_REQUEST | FRAUD_SUSPECT | OUT_OF_STOCK | DUPLICATE", example: "CUSTOMER_REQUEST" },
          { name: "restockInventory", type: "boolean", required: false, description: "Whether to return reserved items to available inventory (default: true)", example: "true" }
        ],
        requestBodyExample: {
          reason: "CUSTOMER_REQUEST",
          restockInventory: true,
          notes: "Customer cancelled prior to courier booking"
        },
        responseStatus: 200,
        responseExample: {
          success: true,
          data: {
            id: "ord_01J8C8...",
            status: "CANCELLED",
            restocked: true,
            restockedItemsCount: 2,
            cancelledAt: "2026-09-26T13:15:00.000Z"
          }
        },
        snippets: {
          curl: `curl -X POST "https://api-core.asanshipping.com/api/v1/orders/ord_01J8C8/cancel" \\
  -H "Authorization: Bearer as_live_YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{ "reason": "CUSTOMER_REQUEST", "restockInventory": true }'`,
          node: `const res = await fetch("https://api-core.asanshipping.com/api/v1/orders/ord_01J8C8/cancel", {
  method: "POST",
  headers: {
    "Authorization": "Bearer as_live_YOUR_KEY",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ reason: "CUSTOMER_REQUEST", restockInventory: true })
});`,
          python: `import requests
res = requests.post(
    "https://api-core.asanshipping.com/api/v1/orders/ord_01J8C8/cancel",
    headers={"Authorization": "Bearer as_live_YOUR_KEY"},
    json={"reason": "CUSTOMER_REQUEST", "restockInventory": True}
)`,
          php: `<?php
$ch = curl_init("https://api-core.asanshipping.com/api/v1/orders/ord_01J8C8/cancel");
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(["reason" => "CUSTOMER_REQUEST", "restockInventory" => true]));
curl_setopt($ch, CURLOPT_HTTPHEADER, ["Authorization: Bearer as_live_YOUR_KEY", "Content-Type: application/json"]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$res = curl_exec($ch);
?>`
        }
      }
    ]
  },
  {
    id: "tracking",
    title: "Public Tracking",
    description: "Public and customer-facing shipment status lookup. Provides courier journey milestones, delivery timestamps, and real-time COD collection state.",
    endpoints: [
      {
        id: "get-tracking",
        method: "GET",
        path: "/tracking/:trackingNumber",
        title: "Get Tracking Milestones",
        category: "tracking",
        scope: "tracking:read / Public",
        description: "Fetch the chronological courier milestone timeline, courier dispatch info, and current delivery state for a tracking number.",
        pathParams: [
          { name: "trackingNumber", type: "string", required: true, description: "AsanTracking number or courier CN", example: "ASN-PK-8921849" }
        ],
        responseStatus: 200,
        responseExample: {
          success: true,
          data: {
            trackingNumber: "ASN-PK-8921849",
            courier: "Trax Logistics",
            courierTrackingNumber: "TRX-991204-PK",
            status: "OUT_FOR_DELIVERY",
            originCity: "Karachi",
            destinationCity: "Lahore",
            codAmount: 5248,
            estimatedDelivery: "2026-09-27T18:00:00.000Z",
            milestones: [
              {
                status: "BOOKED",
                location: "Karachi Hub",
                timestamp: "2026-09-25T14:20:00.000Z",
                description: "Electronic shipment data received"
              },
              {
                status: "IN_TRANSIT",
                location: "Lahore Sort Facility",
                timestamp: "2026-09-26T06:45:00.000Z",
                description: "Arrived at destination transit hub"
              },
              {
                status: "OUT_FOR_DELIVERY",
                location: "DHA Lahore Branch",
                timestamp: "2026-09-26T10:15:00.000Z",
                description: "Assigned to courier rider for final delivery"
              }
            ]
          }
        },
        snippets: {
          curl: `curl -X GET "https://api-core.asanshipping.com/api/v1/tracking/ASN-PK-8921849" \\
  -H "Authorization: Bearer as_live_YOUR_KEY"`,
          node: `const tracking = await fetch("https://api-core.asanshipping.com/api/v1/tracking/ASN-PK-8921849", {
  headers: { "Authorization": "Bearer as_live_YOUR_KEY" }
});
const result = await tracking.json();`,
          python: `import requests
res = requests.get(
    "https://api-core.asanshipping.com/api/v1/tracking/ASN-PK-8921849",
    headers={"Authorization": "Bearer as_live_YOUR_KEY"}
)
print(res.json())`,
          php: `<?php
$ch = curl_init("https://api-core.asanshipping.com/api/v1/tracking/ASN-PK-8921849");
curl_setopt($ch, CURLOPT_HTTPHEADER, ["Authorization: Bearer as_live_YOUR_KEY"]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$result = json_decode(curl_exec($ch), true);
?>`
        }
      }
    ]
  },
  {
    id: "webhooks",
    title: "Webhooks & Real-time Events",
    description: "Receive instant HTTP POST callbacks on your server when orders change state, tracking milestones update, or inventory falls below safety thresholds. Every webhook includes an HMAC-SHA256 signature header for payload verification.",
    endpoints: [
      {
        id: "create-webhook",
        method: "POST",
        path: "/webhooks",
        title: "Create Webhook Endpoint",
        category: "webhooks",
        scope: "webhooks:manage",
        description: "Register an HTTPS webhook URL with subscribed topics and custom HMAC secret.",
        bodyParams: [
          { name: "url", type: "string (HTTPS)", required: true, description: "Your server webhook listener URL", example: "https://myshop.com/api/webhooks/asan" },
          { name: "events", type: "array", required: true, description: "List of event names to subscribe to", example: "[\"order.created\", \"tracking.milestone_updated\"]" },
          { name: "secret", type: "string", required: false, description: "Custom HMAC signing secret (auto-generated if omitted)", example: "whsec_live_99a818e..." },
          { name: "description", type: "string", required: false, description: "Internal label for this endpoint", example: "Production Order Sync" }
        ],
        requestBodyExample: {
          url: "https://myshop.com/api/webhooks/asan",
          events: ["order.created", "order.cancelled", "tracking.milestone_updated"],
          description: "Production Order & Tracking Sync"
        },
        responseStatus: 201,
        responseExample: {
          success: true,
          data: {
            id: "wh_01J8D5...",
            url: "https://myshop.com/api/webhooks/asan",
            events: ["order.created", "order.cancelled", "tracking.milestone_updated"],
            secret: "whsec_live_99a818e7f10b2c3d4e5f6a",
            status: "active",
            createdAt: "2026-09-26T13:30:00.000Z"
          }
        },
        snippets: {
          curl: `curl -X POST "https://api-core.asanshipping.com/api/v1/webhooks" \\
  -H "Authorization: Bearer as_live_YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://myshop.com/api/webhooks/asan",
    "events": ["order.created", "tracking.milestone_updated"]
  }'`,
          node: `const sub = await fetch("https://api-core.asanshipping.com/api/v1/webhooks", {
  method: "POST",
  headers: {
    "Authorization": "Bearer as_live_YOUR_KEY",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    url: "https://myshop.com/api/webhooks/asan",
    events: ["order.created", "tracking.milestone_updated"]
  })
});`,
          python: `import requests
res = requests.post(
    "https://api-core.asanshipping.com/api/v1/webhooks",
    headers={"Authorization": "Bearer as_live_YOUR_KEY"},
    json={"url": "https://myshop.com/api/webhooks/asan", "events": ["order.created"]}
)`,
          php: `<?php
$ch = curl_init("https://api-core.asanshipping.com/api/v1/webhooks");
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    "url" => "https://myshop.com/api/webhooks/asan",
    "events" => ["order.created"]
]));
curl_setopt($ch, CURLOPT_HTTPHEADER, ["Authorization: Bearer as_live_YOUR_KEY", "Content-Type: application/json"]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$res = curl_exec($ch);
?>`
        }
      }
    ]
  }
];

export const WEBHOOK_EVENTS = [
  { event: "order.created", description: "Fired immediately after an order is accepted into the system." },
  { event: "order.updated", description: "Fired when customer details, delivery address, or consignments are updated." },
  { event: "order.cancelled", description: "Fired when an order is cancelled and items are returned to inventory." },
  { event: "tracking.milestone_updated", description: "Fired when courier pushes a new tracking scan (Booked, Transit, Out for Delivery, Delivered, RTO)." },
  { event: "inventory.low_stock", description: "Fired when stock on hand for any SKU drops below its configured reorder safety threshold." },
];
