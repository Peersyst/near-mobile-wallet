import { CancelablePromise } from "module/api/service";

export const FailApiCall = <T>(reason?: unknown): CancelablePromise<T> => new CancelablePromise((_resolve, rejects) => rejects(reason));
