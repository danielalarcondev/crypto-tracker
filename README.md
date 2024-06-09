# Crypto Tracker

Crypto tracker is a tracker to follow cryptocurrencies data and prices in real time.

-   Developed with Next.js, React and TypeScript.
-   Responsive with a mobile-first approach, styled with Tailwind.
-   Lint, to reduce errors and improve the overall quality of the code.
-   Husky to use git hooks to ensure integration by running operations on commit and push.
-   Tested with unit tests written in Jest, component tests written in Jest-React Testing Library and End-To-End tests written in Playwright.

## Open official deployment:

Find the url attached in the "about" section

## Set up locally

### 1. Install dependencies

-   Node Js: v18 or later.

### 2. Run the following commands in the project root

```sh
npm i
```

```sh
npm run build
```

```sh
npm run start
```

### 3. Open in a browser

```sh
http://localhost:3000
```

### 4. All Commands

All commands are run from the root of the project, from a terminal:

| Command                              | Action                                      |
| :----------------------------------- | :------------------------------------------ |
| `npm install`                        | Installs dependencies                       |
| `npm run start`                      | Starts local server at `localhost:3000`     |
| `npm run start:dev`                  | Starts local dev server at `localhost:3000` |
| `npm run build`                      | Build production site to `./next/`          |
| `npm run lint`                       | Check if lint rules are followed            |
| `npm run prepare`                    | Prepare husky                               |
| `npm run test`                       | Run unit tests and component tests          |
| `npm run test:e2e`                   | Run e2e tests in headed mode                |
| `npm run test:e2e-ui`                | Run e2e tests in UI mode                    |
| `npm run test:all`                   | Run all tests                               |
| `npm run update:minimum-node-engine` | Check minimum node version required         |
