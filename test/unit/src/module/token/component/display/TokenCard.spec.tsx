import { token } from "mocks/tokens"
import TokenCard from "module/token/component/display/TokenCard/TokenCard"
import { render } from "test-utils"

describe("Test for the Token Card", () => {
    test("Renders correctly", () => {
        const screen = render(<TokenCard token={token}  />)
    })
})