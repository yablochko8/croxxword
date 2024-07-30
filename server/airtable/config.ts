import { getEnv } from "../utils/getEnv";

export const rootPath = "https://api.airtable.com/v0";
// on an Airtable URL: baseId starts with 'app', tableId starts with 'tbl', viewId starts with 'viw'
export const baseId = "appKt0Zoe7tx4IWk9";
export const AIRTABLE_TOKEN = getEnv("AIRTABLE_TOKEN");
