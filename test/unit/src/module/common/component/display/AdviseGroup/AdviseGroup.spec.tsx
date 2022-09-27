import { AdviseProps } from "module/common/component/display/Advise/Advise";
import { render, translate } from "test-utils";
import AdviseGroup from "module/common/component/display/AdviseGroup/AdviseGroup";

describe("AdviseGroup", () => {
    const advises: Omit<AdviseProps, "number">[] = [
        { title: translate("advise1_title"), text: translate("advise1_text") },
        { title: translate("advise2_title"), text: translate("advise2_text") },
        { title: translate("advise3_title"), text: translate("advise3_text") },
    ];

    // Swipe events cannot be tested with jest, so we can't test that all pages are being rendered here. Nevertheless, that is mostly guaranteed by the PagerView component
    test("Renders correctly", () => {
        const screen = render(<AdviseGroup advises={advises} />);
        expect(screen.getByText(advises[0].title)).toBeDefined();
        expect(screen.getByText(advises[0].text!)).toBeDefined();
    });
});
