import { Backdrop, Col, ThemeOverrideProvider, Typography } from "@peersyst/react-native-components";
import { UpdatingAppModalProps } from "./UpdatingAppModal.types";
import { UpdatingAppContainer, UpdatingAppModalPage } from "./UpdatingAppModal.styles";
import useTranslate from "module/common/hook/useTranslate";
import { Loading } from "../../display/Loading/Loading";

export function UpdatingAppModal({ open }: UpdatingAppModalProps): JSX.Element {
    const translate = useTranslate();

    return (
        <ThemeOverrideProvider theme="dark">
            <Backdrop open={open} closable={false} swipeable={false} animationIn="fadeIn" animationOut="fadeOut" closeOnBackdropTap={false}>
                <UpdatingAppModalPage>
                    <UpdatingAppContainer gap={30}>
                        <Loading />
                        <Col gap={12} alignItems="center">
                            <Typography variant="body1Strong" color="text">
                                {translate("updatingApp")}
                            </Typography>
                            <Typography variant="body3Regular" color="overlay.80%">
                                {translate("pleaseWaitAMoment")}
                            </Typography>
                        </Col>
                    </UpdatingAppContainer>
                </UpdatingAppModalPage>
            </Backdrop>
        </ThemeOverrideProvider>
    );
}
