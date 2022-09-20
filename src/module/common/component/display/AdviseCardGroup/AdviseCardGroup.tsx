import { AdviseCardGroupProps } from "module/common/component/display/AdviseCardGroup/AdviseCardGroup.types";
import { useControlled } from "@peersyst/react-hooks";
import { TabPanel, Tabs } from "@peersyst/react-native-components";
import AdviseCard from "module/common/component/display/AdviseCard/AdviseCard";

const AdviseCardGroup = ({ index: indexProp, onIndexChange, advises }: AdviseCardGroupProps): JSX.Element => {
    const [index, setIndex] = useControlled(0, indexProp, onIndexChange);

    const totalAdvises = advises.length;

    return (
        <Tabs index={index} onIndexChange={setIndex}>
            {advises.map((advise, i) => {
                const { onNext, onBack, ...adviseProps } = advise;

                return (
                    <TabPanel index={i} key={i}>
                        <AdviseCard
                            number={i + 1}
                            totalAdvises={totalAdvises}
                            onNext={
                                i < totalAdvises - 1 || onNext
                                    ? () => {
                                          setIndex(i + 1);
                                          onNext?.();
                                      }
                                    : undefined
                            }
                            onBack={
                                i > 0 || onBack
                                    ? () => {
                                          setIndex(i - 1);
                                          onBack?.();
                                      }
                                    : undefined
                            }
                            {...adviseProps}
                        />
                    </TabPanel>
                );
            })}
        </Tabs>
    );
};

export default AdviseCardGroup;
