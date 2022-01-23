/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiException } from '../models/ApiException';
import type { AuthCredentialsDto } from '../models/AuthCredentialsDto';
import type { LoginRequest } from '../models/LoginRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class AuthenticateService {

    /**
     * Authenticate user
     * @param requestBody
     * @returns ApiException Error
     * @returns AuthCredentialsDto
     * @throws ApiError
     */
    public static authControllerLogin(
        requestBody: LoginRequest,
    ): CancelablePromise<ApiException | AuthCredentialsDto> {
        return __request({
            method: 'POST',
            path: `/api/auth/login`,
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}