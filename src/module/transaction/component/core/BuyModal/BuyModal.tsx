import { createBackdrop, ExposedBackdropProps, TabPanel, Tabs } from "@peersyst/react-native-components";
import { useState } from "react";
import { useTranslate } from "module/common/hook/useTranslate";
import CardNavigatorModal from "module/common/component/navigation/CardNavigatorModal/CardNavigatorModal";
import Typography from "module/common/component/display/Typography/Typography";

export enum BuyScreens {
    SEND_TO_ADDRESS,
    AMOUNT_AND_MESSAGE,
    CONFIRMATION,
}

const BuyModal = createBackdrop(({ onExited, ...rest }: ExposedBackdropProps) => {
    const [activeIndex, setActiveIndex] = useState(BuyScreens.SEND_TO_ADDRESS);

    const translate = useTranslate();

    const handleExited = () => {
        onExited?.();
    };

    const handleOnBack = () => {
        setActiveIndex((oldIndex) => oldIndex - 1);
    };

    return (
        <CardNavigatorModal
            navbar={{
                back: true,
                title: translate("send"),
                onBack: activeIndex > 0 ? handleOnBack : undefined,
                steps: {
                    length: 3,
                    index: activeIndex,
                },
            }}
            onExited={handleExited}
            {...rest}
        >
            <Tabs index={activeIndex} onIndexChange={setActiveIndex}>
                <TabPanel index={BuyScreens.SEND_TO_ADDRESS}>
                    <Typography variant="body2Strong">{"Buy"}</Typography>
                </TabPanel>
                <TabPanel index={BuyScreens.AMOUNT_AND_MESSAGE}>
                    <Typography variant="body2Strong">{"Buy"}</Typography>
                </TabPanel>
            </Tabs>
        </CardNavigatorModal>
    );
});

export default BuyModal;
