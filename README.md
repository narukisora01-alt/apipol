# Polytoria Store Viewer

A simple Vercel app that fetches and displays Polytoria user store assets.

## Features

- Fetches user store from Polytoria API
- Organizes assets by category (SHIRT, DECAL, GAMEPASS, etc.)
- Beautiful responsive UI
- CORS enabled for external use

## Files

- `index.html` - Frontend interface
- `api/store.js` - Vercel serverless function (API endpoint)
- `vercel.json` - Vercel configuration

## API Endpoint

Once deployed, your API will be available at:

```
https://your-vercel-app.vercel.app/api/store?userId=308475
```

### Parameters

- `userId` (required) - The Polytoria user ID
- `page` (optional, default: 1) - Page number
- `limit` (optional, default: 50) - Items per page

### Response Format

```json
{
  "userId": 308475,
  "total": 9,
  "categories": {
    "SHIRT": [
      {
        "id": 70388,
        "name": "Jacket",
        "price": "Free",
        "thumbnail": "https://..."
      }
    ],
    "DECAL": [...],
    "GAMEPASS": [...]
  }
}
```

## Deployment

### Option 1: Deploy with Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

### Option 2: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import this repository
4. Deploy!

### Option 3: Deploy via GitHub

1. Push these files to a GitHub repo
2. Connect the repo to Vercel
3. Auto-deploy on push!

## Usage in Polytoria

Once deployed, you can use this in Polytoria scripts:

```lua
local userId = 308475
local url = "https://your-vercel-app.vercel.app/api/store?userId=" .. userId

Http:Get(url, function(data, error, errmsg)
    if not error then
        local jsonData = json.parse(data)
        
        for category, assets in pairs(jsonData.categories) do
            print("=== " .. category .. " ===")
            for i, asset in ipairs(assets) do
                print(asset.name .. " | ID: " .. asset.id .. " | Price: " .. asset.price)
            end
        end
    end
end, {})
```

## Local Testing

You can't really test Vercel functions locally without the Vercel dev server, but you can:

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel dev`
3. Open: `http://localhost:3000`

## Notes

- The API proxies Polytoria's API to avoid CORS issues
- Data is formatted and categorized server-side
- Free for personal use on Vercel's hobby plan
- No database needed - fetches live data from Polytoria

Enjoy! 🎮✨
