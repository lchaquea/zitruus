# Zitruus Website

This is the codebase for the Zitruus website, a Next.js application built with TypeScript and Tailwind CSS.

## Features

- 🌙 Dark mode design
- 📱 Mobile-first, responsive layout
- 🎨 Modern UI with animations
- ⚡ Built with Next.js and TypeScript
- 🎯 Optimized for performance
- 🔍 SEO friendly

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Framer Motion
- Headless UI
- Lucide Icons

## Project Structure

- `src/app`: Contains the Next.js application code
  - `components`: Reusable UI components
  - `services`: API services and utilities
  - Various page directories following Next.js App Router structure

## Development

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/lchaquea/zitruusweb.git
   cd zitruusweb
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Deployment to Vercel

### Option 1: Deploy from GitHub

1. Log in to [Vercel](https://vercel.com)
2. Click "Add New" > "Project"
3. Import your GitHub repository
4. Configure the project:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: npm run build
   - Output Directory: .next
5. Click "Deploy"

### Option 2: Deploy with Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Log in to Vercel:
   ```bash
   vercel login
   ```

3. Deploy the project:
   ```bash
   vercel
   ```

## Configuration Files

- `next.config.js`: Next.js configuration
- `vercel.json`: Vercel deployment configuration
- `.vercelignore`: Files to ignore during Vercel deployment
- `tailwind.config.ts`: Tailwind CSS configuration

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_API_URL=your_api_url
```

## License

This project is proprietary and confidential.

## Contact

- Website: [zitruus.com](https://zitruus.com)
- Email: contact@zitruus.com
- LinkedIn: [Zitruus](https://linkedin.com/company/zitruus)
