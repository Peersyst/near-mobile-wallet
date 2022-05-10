import { CKBSDKService } from "module/common/service/CkbSdkService";
import { render, SuccessApiCall } from "test-utils";
import synchronizeMock from "mocks/synchronize";
import RefreshButton from "module/wallet/component/input/RefreshButton/RefreshButton";
import { fireEvent } from "@testing-library/react-native";
import { MnemonicMocked } from "mocks/MnemonicMocked";
import { serviceInstancesMap } from "module/wallet/state/WalletState";

describe("RefreshButton tests", () => {
    const sdkInstance = new CKBSDKService(MnemonicMocked);
    afterAll(() => {
        jest.restoreAllMocks();
    });
    test("Refreshes correctly", () => {
        serviceInstancesMap.set(0, sdkInstance);
        jest.spyOn(sdkInstance, "synchronize").mockImplementation(() => SuccessApiCall(synchronizeMock as any));
        const screen = render(<RefreshButton />);
        fireEvent.press(screen.getByTestId("RefreshIcon"));
        expect(sdkInstance.synchronize).toHaveBeenCalled();
        serviceInstancesMap.clear();
    });
});
