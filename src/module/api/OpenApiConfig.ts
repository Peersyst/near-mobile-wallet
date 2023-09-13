import { config } from "config";
import { OpenAPI } from "./service";

OpenAPI.BASE = config.signerFeature.backendUrl;
