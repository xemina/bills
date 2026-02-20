# 🚀 Deploy Grocery Tracker to Vercel

## What's in this folder
```
grocery-vercel/
├── api/
│   └── bills.js        ← backend (reads/writes database)
├── public/
│   └── index.html      ← your grocery tracker website
├── package.json
└── vercel.json
```

---

## Step 1 — Create a GitHub account (if you don't have one)
Go to github.com and sign up for free.

## Step 2 — Upload this project to GitHub
1. Go to github.com/new
2. Name your repo: `grocery-bills`
3. Keep it Public, click **Create repository**
4. Click **uploading an existing file**
5. Upload ALL files keeping the folder structure:
   - `api/bills.js`
   - `public/index.html`
   - `package.json`
   - `vercel.json`
6. Click **Commit changes**

## Step 3 — Deploy to Vercel
1. Go to vercel.com and sign up with your GitHub account
2. Click **Add New Project**
3. Find and import your `grocery-bills` repo
4. Click **Deploy** (no changes needed)
5. Wait ~1 minute → you get a live URL! 🎉

## Step 4 — Add the Database
1. In your Vercel dashboard, open your project
2. Go to the **Storage** tab
3. Click **Create Database** → choose **Postgres**
4. Name it `grocery-db`, click **Create**
5. Click **Connect** to link it to your project
6. Go to **Deployments** → click **Redeploy** (so it picks up the database)

## Done! ✅
Your grocery tracker is now live with a real database.
Every entry you add is saved permanently and loads on every visit.

---

## Troubleshooting
- If the page loads but data doesn't save → make sure you redeployed after adding the database
- If you see a 500 error → check the Vercel **Functions** logs tab
