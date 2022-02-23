import LogoCol from "module/common/component/display/Logos/LogoCol/LogoCol";
import { render } from "test-utils";

describe("LogoCol test", ()=>{
    test("Renders correctly", ()=>{
        const screen = render(<LogoCol size={"md"} />)
    })
})