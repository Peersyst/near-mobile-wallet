export const mockedUseWallet = {
    state: {
        hasWallet: true,
        isAuthenticated: true,
        isFirstTime: false,
        cells: [{ address: "address", balance: "1" }],
        selectedAccount: 0,
    },
    setAuthenticated: jest.fn(),
    setCells: jest.fn(),
    setSelectedAccount: jest.fn(),
    setState: jest.fn(),
    reset: jest.fn(),
};
