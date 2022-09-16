import { translate } from "test-utils";
import { handleErrorMessage } from "../../../../src/query/handleErrorMessage";

describe("handleErrorMessage tests", () => {
    test("Returns somethingWentWrong", () => {
        expect(handleErrorMessage({ body: { message: "Error", statusCode: 500 } }, translate)).toEqual({
            message: translate("somethingWentWrong"),
            type: "error",
        });
        expect(handleErrorMessage({ status: 500, message: "Error" }, translate)).toEqual({
            message: translate("somethingWentWrong"),
            type: "error",
        });
    });

    test("Returns sessionExpired", () => {
        expect(handleErrorMessage({ body: { message: "Error", statusCode: 401 } }, translate)).toEqual({
            message: translate("sessionExpired"),
            type: "warning",
        });
        expect(handleErrorMessage({ status: 401, message: "Error" }, translate)).toEqual({
            message: translate("sessionExpired"),
            type: "warning",
        });
    });

    test("Returns translated error", () => {
        expect(handleErrorMessage({ body: { message: "Error", statusCode: 403 } }, translate)).toEqual({
            message: translate("somethingWentWrong"),
            type: "error",
        });
    });
});
