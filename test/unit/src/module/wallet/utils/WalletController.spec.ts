describe("Test for the WalletController", () => {
    test("Recover wallets", async () => {
        const accounts = [];
        expect(wallets).toHaveLength(2);
        expect(newStorageWallets).toHaveLength(2);
        expect(newSecureWallets).toHaveLength(1);
        expect(updateSecure).toBe(true);
    });
});
