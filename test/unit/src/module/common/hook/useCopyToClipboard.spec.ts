import { useCopyToClipboard } from "module/common/hook/useCopyToClipboard";
import { UseToastMock } from "test-mocks";
import { renderHook } from "test-utils";
import * as Clipboard from "expo-clipboard";

export const renderUseCopyToClipboard = () => {
    const { result } = renderHook(() => useCopyToClipboard());
    return result.current;
};

describe("useCopyToClipboard", () => {
    test("should be defined", () => {
        const { showToast } = new UseToastMock();
        const copyToClipboard = renderUseCopyToClipboard();
        const mockedCopied = jest.fn();
        jest.spyOn(Clipboard, "setStringAsync").mockImplementation(mockedCopied);
        copyToClipboard({ message: "test", toastMessage: "customMsg" });
        expect(showToast).toBeCalledWith("customMsg", { type: "success" });
        expect(mockedCopied).toBeCalledWith("test");
    });
});
