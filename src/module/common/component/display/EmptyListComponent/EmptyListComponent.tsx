import { Col } from "@peersyst/react-native-components";
import Advise, { AdviseProps } from "../Advise/Advise";
import useTranslate from "module/common/hook/useTranslate";

export type EmptyListComponentProps = Pick<AdviseProps, "title" | "text">;

const EmptyListComponent = ({ title, text }: EmptyListComponentProps): JSX.Element => {
    const translate = useTranslate("error");
    return (
        <Col alignItems="center" style={{ paddingTop: "10%", paddingHorizontal: "5%" }}>
            <Advise gap="2%" title={title || translate("nothing_to_show")} text={text} />
        </Col>
    );
};

export default EmptyListComponent;
