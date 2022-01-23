import { AuthTokenStorage } from "../auth/AuthTokenStorage";
import { OpenAPI } from "./service";

OpenAPI.TOKEN = async () => (await AuthTokenStorage.get()) || "";
OpenAPI.WITH_CREDENTIALS = true;
OpenAPI.BASE = process.env.REACT_APP_BACKEND_URL || "";
