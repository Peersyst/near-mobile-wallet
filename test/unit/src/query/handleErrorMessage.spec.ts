import { translate } from "locale";
import { handleErrorMessage } from "../../../../src/query/handleErrorMessage";

describe("handleErrorMessage tests", () => {
    test("Returns somethingWentWrong", () => {
        expect(handleErrorMessage({ body: { message: "Error", statusCode: 500 } })).toEqual({
            message: translate("somethingWentWrong"),
            type: "error",
        });
        expect(handleErrorMessage({ status: 500, message: "Error" })).toEqual({
            message: translate("somethingWentWrong"),
            type: "error",
        });
    });

    test("Returns sessionExpired", () => {
        expect(handleErrorMessage({ body: { message: "Error", statusCode: 401 } })).toEqual({
            message: translate("sessionExpired"),
            type: "warning",
        });
        expect(handleErrorMessage({ status: 401, message: "Error" })).toEqual({
            message: translate("sessionExpired"),
            type: "warning",
        });
    });

    test("Returns translated error", () => {
        expect(handleErrorMessage({ body: { message: "Error", statusCode: 403 } })).toEqual({
            message: translate("somethingWentWrong"),
            type: "error",
        });
    });
});
