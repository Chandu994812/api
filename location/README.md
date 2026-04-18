# Andhra Pradesh Location API

Simple Node.js + Express + MongoDB API for Andhra Pradesh hierarchical location data.

## What this API gives you

- `GET /`
- `GET /health`
- `GET /api/states`
- `GET /api/state/:stateName`
- `GET /api/district/:districtName`
- `GET /api/mandal/:mandalName?page=1&limit=25`

## Folder structure

```text
config/
controllers/
models/
routes/
server.js
seed.js
```

## 1. Install dependencies

```bash
npm install
```

## 2. Create environment file

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Edit `.env` and set your MongoDB connection string:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

## 3. Seed sample data

```bash
npm run seed
```

## 4. Run locally

```bash
npm start
```

Local test URLs:

```bash
curl http://localhost:5000/
curl http://localhost:5000/health
curl http://localhost:5000/api/states
curl "http://localhost:5000/api/state/Andhra%20Pradesh"
curl "http://localhost:5000/api/district/Guntur"
curl "http://localhost:5000/api/mandal/Mangalagiri?page=1&limit=2"
```

On PowerShell, if `curl` behaves differently, use:

```powershell
curl.exe "http://localhost:5000/api/states"
```

## 5. Deploy on Render

This project includes `render.yaml` to make deployment easier.

### Step A: Put the code on GitHub

Create a GitHub repository and push this project.

### Step B: Create MongoDB Atlas database

1. Create a free account on MongoDB Atlas.
2. Create a cluster.
3. Create a database user.
4. Get the connection string.
5. Replace password and database name in that string.

Example:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/andhra-pradesh-locations?retryWrites=true&w=majority
```

### Step C: Deploy on Render

1. Sign in to Render.
2. Click `New +`.
3. Choose `Blueprint` if Render detects `render.yaml`, or create a `Web Service`.
4. Select your GitHub repo.
5. Add environment variable:
   - `MONGODB_URI` = your Atlas connection string
6. Deploy.

### Step D: Seed production database

After deployment, run the seed once against the same MongoDB Atlas connection string.

You can do that locally by setting `.env` to the Atlas URI and running:

```bash
npm run seed
```

## 6. Replace with your live URL

Once Render gives you a URL like:

```text
https://andhra-pradesh-location-api.onrender.com
```

Use these commands:

```bash
curl https://andhra-pradesh-location-api.onrender.com/
curl https://andhra-pradesh-location-api.onrender.com/health
curl https://andhra-pradesh-location-api.onrender.com/api/states
curl "https://andhra-pradesh-location-api.onrender.com/api/state/Andhra%20Pradesh"
curl "https://andhra-pradesh-location-api.onrender.com/api/district/Guntur"
curl "https://andhra-pradesh-location-api.onrender.com/api/mandal/Mangalagiri?page=1&limit=2"
```

## Notes

- This sample seed data is intentionally small and realistic in structure.
- The schema is designed so you can expand it with more districts, mandals, and villages later.
- For very large datasets, consider moving villages into their own collection in a future version.
