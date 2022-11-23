export type MockFnType = jest.Mock<any, any>;

class BaseMock {
    mock?: jest.SpyInstance;

    clear(): void {
        Object.values(this).forEach((v) => ((v as any)?.mockClear ? v.mockClear() : undefined));
    }

    restore(): void {
        this.mock?.mockRestore();
    }
}

export default BaseMock;
