import { CancelablePromise } from "module/api/service";

export const SuccessApiCall = <T>(data: T): CancelablePromise<T> => new CancelablePromise((resolve) => resolve(data));
