import { Col } from "@peersyst/react-native-components";
import Advise, { AdviseProps } from "../Advise/Advise";
import useTranslate from "module/common/hook/useTranslate";
import { ViewStyle } from "react-native";

export type EmptyListComponentProps = Pick<AdviseProps, "title" | "text"> & {
    style?: ViewStyle;
};

const EmptyListComponent = ({ title, text, style }: EmptyListComponentProps): JSX.Element => {
    const translate = useTranslate("error");
    return (
        <Col alignItems="center" style={{ paddingTop: "10%", paddingHorizontal: "5%", ...style }}>
            <Advise gap="2%" title={title || translate("nothing_to_show")} text={text} />
        </Col>
    );
};

export default EmptyListComponent;
