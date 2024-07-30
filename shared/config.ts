interface Config {
  prodMode: boolean;
  serverUrl: string;
  serverPort: number;
  // Add other shared config properties here
}

// CHANGE THESE TWO VARIABLES
const prodFrontend = true;
const prodServer = true;
const PORT = 4101;

const config: Config = {
  prodMode: prodServer && prodFrontend,
  serverUrl: prodServer
    ? process.env.SERVER_URL || `http://localhost:${PORT}`
    : `http://localhost:${PORT}`,
  serverPort: PORT,
  // serverPort: parseInt(process.env.SERVER_PORT || '4101', 10),
  // Set other properties
};

console.log(config);

export default config;
