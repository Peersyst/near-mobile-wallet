import BaseMock from "mocks/common/base.mock";
import * as useShowSignerRequest from "module/signer/hooks/useShowSignerRequest";

export class UseShowSignerRequestMock extends BaseMock {
    constructor() {
        super();
        this.mock = jest.spyOn(useShowSignerRequest, "default").mockReturnValue(jest.fn);
    }
}
