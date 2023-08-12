This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


## DB API
This project connects to a DB API that must be manually set up. The API URL must be decleared in the `.env.local` file as `API_ROUTE`. The endpoints that are used are the ones in the routes folder found in the backend. If you are using the localhost, there is a default API_ROUTE decleared in the constants folder with the value `https://localhost:8080/api`. Note that the `/api` is included in the default value. If you are using a different port, you must change set the `API_ROUTE` in the `.env.local` file to the correct port (and add the /api at the end <u>always</u>).
REMEMBER TO NOT COMMIT THE `.env.local` FILE TO THE REPO (IT IS BEING IGNORE IN THE .gitignore FILE, DO NOT CHANGE THAT).


