import dotenv from "dotenv";

dotenv.config();

export function getEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
}

// When you run an app locally, you need the dotenv library to access variables
// stored in a .env file.

// In production, env variables are set directly in the environment where the app
// runs. You don't need dotenv. So only install it as a dev dependency:

// npm install dotenv --save-dev

// If you use bun, dotenv will treat the present working directory as the root.
// If you move to a sub-directory and run
//      bun thisFile.ts
// ...this will fail. You can get round this by calling it from the root directory
// and specifying the path in the command. E.g.:
//      bun thisFolder/thisFile.ts
