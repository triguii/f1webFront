## F1Web Frontend

This repository holds the code for the front-end of the F1 webpage (https://f1web-rose.vercel.app), developed using React and NextJS.

## Directory distribution

```bash
├───app
  ├───(components)
  └───alovet
      ├───1
      ├───2
      ├───3
      ├───4
      ├───5
      └───6
└───config
└───public
  └───alovet
```

app : here we can find all the .jsx code for the webpage, as well as the css. Inside the components folder there are all the react components for the different visualizations of the page. In the alovet folder we find the main source code for the different pages inside the web.

config : here we can find different helpers and global variables for the page, such as colors for the different pilots in the graphics.

public : here we can find images and other resources that the web uses.


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
