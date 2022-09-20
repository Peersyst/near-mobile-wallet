import { OpenAPI } from "./service";
import { config } from "config";

OpenAPI.BASE = config.backendUrl || "";
