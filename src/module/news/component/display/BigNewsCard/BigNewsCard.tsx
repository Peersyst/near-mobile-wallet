import { NewTitle, SimpleNewsCardRoot } from "../SimpleNewsCard/SimpleNewsCard.styles";
import { Linking, TouchableWithoutFeedback } from "react-native";
import formatDate from "utils/formatDate";
import { Col, withSkeleton } from "@peersyst/react-native-components";
import { BigNewsDate, BigNewsImage } from "./BigNewsCard.styles";
import { formatNews } from "module/news/utils/formatNews";
import { useTranslate } from "module/common/hook/useTranslate";

const BigNewsCard = (news: any): JSX.Element => {
    const { uri, title, imageUri, date } = formatNews(news);
    const t = useTranslate();
    return (
        <TouchableWithoutFeedback onPress={() => Linking.openURL(uri)}>
            <SimpleNewsCardRoot>
                <Col gap={"3%"}>
                    <BigNewsImage fadeDuration={300} source={{ uri: imageUri }} />
                    <NewTitle variant="caption">{title}</NewTitle>
                    <BigNewsDate variant="caption">{formatDate(new Date(date), "weekday", t("idiom"))}</BigNewsDate>
                </Col>
            </SimpleNewsCardRoot>
        </TouchableWithoutFeedback>
    );
};

export default withSkeleton(BigNewsCard);
