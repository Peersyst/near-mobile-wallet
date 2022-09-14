/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type LoginRequest = {
    email: string;
    /**
     * Min 8, at least 1 uppercase, 1 lowercase, 1 special( !@$%^&(){}[]:;<>,.?/~_+-=| ) characters
     */
    password: string;
};
