import { Page } from "@playwright/test";

export const config = {
  target: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
  phases: [
    {
      duration: 1,
      arrivalCount: 3,
      name: "sustain",
    },
  ],
  engines: {
    playwright: {},
  },
};

export const scenarios = [
  {
    engine: "playwright",
    name: "performance-test-senario",
    testFunction: helloWorld,
  },
];

async function helloWorld(page: Page) {
  await page.goto(config.target);
  await page.waitForSelector('button:text("撮影")');
}
