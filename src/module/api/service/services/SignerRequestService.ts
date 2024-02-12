/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateSignerRequest } from '../models/CreateSignerRequest';
import type { CreateSignMessageRequest } from '../models/CreateSignMessageRequest';
import type { SignerRequestDto } from '../models/SignerRequestDto';
import type { SignerRequestStatusDto } from '../models/SignerRequestStatusDto';
import type { SignMessageRequestDto } from '../models/SignMessageRequestDto';
import type { SignMessageRequestPayload } from '../models/SignMessageRequestPayload';
import type { SignRequest } from '../models/SignRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SignerRequestService {
    /**
     * Create signer request
     * @param requestBody
     * @returns SignerRequestDto
     * @throws ApiError
     */
    public static createSignerRequest(
        requestBody: CreateSignerRequest,
    ): CancelablePromise<SignerRequestDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/signer-request',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get signer request status
     * @param id
     * @returns SignerRequestStatusDto
     * @throws ApiError
     */
    public static getSignerRequestStatus(
        id: string,
    ): CancelablePromise<SignerRequestStatusDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/signer-request/{id}/status',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Approve signer request
     * @param id
     * @param requestBody
     * @returns SignerRequestDto
     * @throws ApiError
     */
    public static approveSignerRequest(
        id: string,
        requestBody: SignRequest,
    ): CancelablePromise<SignerRequestDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/signer-request/{id}/approve',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Reject signer request
     * @param id
     * @returns SignerRequestDto
     * @throws ApiError
     */
    public static rejectSignerRequest(
        id: string,
    ): CancelablePromise<SignerRequestDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/signer-request/{id}/reject',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Get signer request
     * @param id
     * @returns SignerRequestDto
     * @throws ApiError
     */
    public static getSignerRequest(
        id: string,
    ): CancelablePromise<SignerRequestDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/signer-request/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Send message to signer
     * @param requestBody
     * @returns SignMessageRequestDto
     * @throws ApiError
     */
    public static createSignMessageRequest(
        requestBody: CreateSignMessageRequest,
    ): CancelablePromise<SignMessageRequestDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/signer-request/message',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get signer message request
     * @param id
     * @returns SignMessageRequestDto
     * @throws ApiError
     */
    public static getSignMessageRequest(
        id: string,
    ): CancelablePromise<SignMessageRequestDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/signer-request/message/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns SignMessageRequestDto
     * @throws ApiError
     */
    public static signMessageRequest(
        id: string,
        requestBody: SignMessageRequestPayload,
    ): CancelablePromise<SignMessageRequestDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/signer-request/message/{id}/sign',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns SignMessageRequestDto
     * @throws ApiError
     */
    public static rejectMessageRequest(
        id: string,
    ): CancelablePromise<SignMessageRequestDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/signer-request/message/{id}/reject',
            path: {
                'id': id,
            },
        });
    }
}
