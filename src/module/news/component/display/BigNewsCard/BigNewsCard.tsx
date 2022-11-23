import { NewTitle, SimpleNewsCardRoot } from "../SimpleNewsCard/SimpleNewsCard.styles";
import { Linking, TouchableWithoutFeedback } from "react-native";
import { Col, withSkeleton } from "@peersyst/react-native-components";
import { BigNewsDate, BigNewsImage } from "./BigNewsCard.styles";
import { formatNews } from "module/news/utils/formatNews";
import useFormatDate from "module/common/hook/useFormatDate";

const BigNewsCard = (news: any): JSX.Element => {
    const { uri, title, imageUri, date } = formatNews(news);
    const formattedDate = useFormatDate(date);
    return (
        <TouchableWithoutFeedback onPress={() => Linking.openURL(uri)}>
            <SimpleNewsCardRoot>
                <Col gap={"3%"}>
                    <BigNewsImage fadeDuration={300} source={{ uri: imageUri }} />
                    <NewTitle variant="body4Regular">{title}</NewTitle>
                    <BigNewsDate variant="body4Regular">{formattedDate}</BigNewsDate>
                </Col>
            </SimpleNewsCardRoot>
        </TouchableWithoutFeedback>
    );
};

export default withSkeleton(BigNewsCard);
