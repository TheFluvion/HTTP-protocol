This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) and node@18.2.0.

## Getting Started

First time you open this repo, install dependencies:

```bash
npm install
# or
yarn install
```

Then you can run the development server anytime you need:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000/template](http://localhost:3000/template) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Scaffolding

Add files in the `/pages` folder and they will be automatically mapped to new routes.

Put common use components in the `/components` folder and use the `/views` folder to save components related to a single view or page.

Use the `/services` folder to save your services related files and global constants files. Services should fetch from API routes and then API routes should interact with Backend endpoints. All API routes are in the `/pages/api` folder and each file is mapped to an API route endpoint.

The `/utils` folder can be used to store common use functions or custom libraries.

If you create custom React Hooks, you can save them on a `/hooks` folder.
