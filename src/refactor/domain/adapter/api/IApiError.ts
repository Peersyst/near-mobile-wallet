import { ApiError } from "refactor/data-access/api/service";
export type IApiError = Omit<ApiError, "body"> & {
    body: {
        statusCode: number;
        message: string;
    };
};
