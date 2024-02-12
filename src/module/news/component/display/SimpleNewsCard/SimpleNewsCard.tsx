import { NewDate, NewsImage, NewTitle, SimpleNewsCardRoot } from "./SimpleNewsCard.styles";
import { Linking, TouchableWithoutFeedback } from "react-native";
import { Col, WithSkeleton, withSkeleton } from "@peersyst/react-native-components";
import { formatNews } from "module/news/utils/formatNews";
import { NewsDto } from "module/news/types";
import useFormatDate from "module/common/hook/useFormatDate";
import { near_bg_0, near_bg_1 } from "refactor/ui/assets/images";
import { useRef } from "react";

export const NEWS_BG_IMAGES = [near_bg_0, near_bg_1];

const SimpleNewsCard = ({ ...news }: WithSkeleton<NewsDto>): JSX.Element => {
    const { uri, title, imageUri, date } = formatNews(news);
    const formatDate = useFormatDate();

    const randomImage = useRef(NEWS_BG_IMAGES[Math.floor(Math.random() * NEWS_BG_IMAGES.length)]).current;

    return (
        <TouchableWithoutFeedback onPress={() => Linking.openURL(uri)}>
            <SimpleNewsCardRoot elevation={0}>
                <Col gap={12} justifyContent="center">
                    <NewsImage source={imageUri !== "" ? { uri: imageUri } : randomImage} />
                    <Col gap={2}>
                        <NewDate variant="body3Regular">{formatDate(date)}</NewDate>
                        <NewTitle variant="body3Strong">{title}</NewTitle>
                    </Col>
                </Col>
            </SimpleNewsCardRoot>
        </TouchableWithoutFeedback>
    );
};

export default withSkeleton(SimpleNewsCard);
