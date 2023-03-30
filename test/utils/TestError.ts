export class TestError extends Error {
    constructor(message: string, testName?: string) {
        super(message);
        this.name = testName || "TestError";
    }
}
