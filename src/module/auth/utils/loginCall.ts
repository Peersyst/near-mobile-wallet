/* istanbul ignore file */

export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    auth_token: string;
}

export async function loginCall(req: LoginRequest): Promise<LoginResponse> {
    return new Promise((resolve, reject) =>
        setTimeout(() => {
            if (req) {
                if (req.password !== "1234") reject({ code: 403, message: "Invalid credentials" });
                resolve({ auth_token: "auth_token" });
            }
        }, 100),
    );
}
