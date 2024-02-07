console.log("BEFORE IMPORT CONFIG");

import { config } from "../../config";

console.log("AFTER IMPORT CONFIG");

import { OpenAPI } from "./service";

console.log("CONFIG", config);

OpenAPI.BASE = "config.signerFeature.backendUrl";
