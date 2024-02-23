import { config } from "refactor/common/config";
import { OpenAPI } from "./service";

OpenAPI.BASE = config.signerFeature.backendUrl;
