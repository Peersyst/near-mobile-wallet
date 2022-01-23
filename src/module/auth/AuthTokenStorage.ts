import { BaseStorageService } from "module/common/service/BaseStorageService";

export const AuthTokenStorage = new (class extends BaseStorageService<string> {
    constructor() {
        super("auth_token");
    }
})();
