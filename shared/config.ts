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

// I want the serverpath to be expressed as something like...
// process.env.SERVER_URL but for some reason it keeps failing on build

const config: Config = {
  prodMode: prodServer && prodFrontend,
  serverUrl: prodServer
    ? "https://lui-croxxword.onrender.com"
    : `http://localhost:${PORT}`,
  serverPort: PORT,
  // serverPort: parseInt(process.env.SERVER_PORT || '4101', 10),
  // Set other properties
};

console.log(config);

export default config;
