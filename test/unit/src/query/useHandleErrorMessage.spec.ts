import { useHandleErrorMessage } from "query/useHandleErrorMessage";
import { act } from "react-test-renderer";
import { renderHook, translate } from "test-utils";

const renderHandleErrorMessage = () =>
    renderHook(() => {
        return useHandleErrorMessage();
    });

describe("handleErrorMessage tests", () => {
    test("Returns somethingWentWrong", () => {
        act(() => {
            const handleErrorMessage = renderHandleErrorMessage().result.current;
            expect(handleErrorMessage({ body: { message: "Error", statusCode: 500 } })).toEqual({
                message: translate("somethingWentWrong"),
                type: "error",
            });
            expect(handleErrorMessage({ status: 500, message: "Error" })).toEqual({
                message: translate("somethingWentWrong"),
                type: "error",
            });
        });
    });

    test("Returns sessionExpired", () => {
        act(() => {
            const handleErrorMessage = renderHandleErrorMessage().result.current;
            expect(handleErrorMessage({ body: { message: "Error", statusCode: 401 } })).toEqual({
                message: translate("sessionExpired"),
                type: "warning",
            });
            expect(handleErrorMessage({ status: 401, message: "Error" })).toEqual({
                message: translate("sessionExpired"),
                type: "warning",
            });
        });
    });

    test("Returns translated error", () => {
        act(() => {
            const handleErrorMessage = renderHandleErrorMessage().result.current;
            expect(handleErrorMessage({ body: { message: "Error", statusCode: 403 } })).toEqual({
                message: translate("somethingWentWrong"),
                type: "error",
            });
        });
    });
});
