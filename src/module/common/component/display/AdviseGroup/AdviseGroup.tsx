import { useControlled } from "@peersyst/react-hooks";
import { PagerView } from "@peersyst/react-native-components";
import Advise, { AdviseProps } from "module/common/component/display/Advise/Advise";

export interface AdviseGroupProps {
    index?: number;
    onIndexChange?: (index: number) => unknown;
    advises: Omit<AdviseProps, "number">[];
}

const AdviseGroup = ({ index: indexProp, onIndexChange, advises }: AdviseGroupProps): JSX.Element => {
    const [index, setIndex] = useControlled(0, indexProp, onIndexChange);

    return (
        <PagerView page={index} onPageSelected={setIndex} showPageIndicator height={270} gap={24} onStartShouldSetResponder={() => true}>
            {advises.map((advise, i) => {
                return <Advise key={i} {...advise} />;
            })}
        </PagerView>
    );
};

export default AdviseGroup;
