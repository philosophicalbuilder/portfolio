# Deploying to Vercel

This Next.js project can be deployed to Vercel in several ways. Choose the method that works best for you.

## Method 1: Deploy via Vercel Dashboard (Recommended for beginners)

1. **Push your code to GitHub/GitLab/Bitbucket**
   - If you haven't already, initialize git and push to a repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com) and sign in
   - Click "Add New Project"
   - Import your Git repository
   - Vercel will auto-detect Next.js settings
   - Click "Deploy"

3. **Configure Build Settings** (if needed)
   - Build Command: `pnpm build` (or `npm run build`)
   - Output Directory: `.next`
   - Install Command: `pnpm install` (or `npm install`)

## Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   # or
   pnpm add -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```
   
   - Follow the prompts to link your project
   - For production deployment, use:
   ```bash
   vercel --prod
   ```

## Method 3: Deploy via GitHub Integration (Recommended for continuous deployment)

1. **Push to GitHub** (same as Method 1, step 1)

2. **Connect Repository in Vercel**
   - Go to Vercel Dashboard
   - Click "Add New Project"
   - Select your repository
   - Configure settings:
     - Framework Preset: Next.js (auto-detected)
     - Root Directory: `./` (default)
     - Build Command: `pnpm build`
     - Output Directory: `.next`
     - Install Command: `pnpm install`

3. **Automatic Deployments**
   - Every push to `main` branch = production deployment
   - Every push to other branches = preview deployment

## Important Notes

- **Package Manager**: This project uses `pnpm`. Make sure Vercel is configured to use `pnpm`:
  - In Vercel Dashboard → Project Settings → General → Install Command: `pnpm install`
  - Or add a `.npmrc` file with `package-manager=pnpm`

- **Environment Variables**: If you have any environment variables, add them in:
  - Vercel Dashboard → Project Settings → Environment Variables

- **Build Settings**: Vercel should auto-detect Next.js, but verify:
  - Framework Preset: Next.js
  - Build Command: `pnpm build` (or `npm run build`)
  - Output Directory: `.next`

## Troubleshooting

- If build fails, check the build logs in Vercel Dashboard
- Ensure all dependencies are in `package.json`
- Check that Node.js version is compatible (Vercel uses Node 18+ by default)


