import { NewDate, NewsImage, NewTitle, SimpleNewsCardRoot, TextCont } from "./SimpleNewsCard.styles";
import { Linking, TouchableWithoutFeedback } from "react-native";
import { NewsType } from "module/news/types";
import formatDate from "utils/formatDate";
import { Row, withSkeleton } from "react-native-components";

const SimpleNewsCard = ({ uri, title, date, imageUri }: NewsType): JSX.Element => {
    return (
        <TouchableWithoutFeedback onPress={()=> Linking.openURL(uri)}>
            <SimpleNewsCardRoot>
                <Row gap={"5%"} alignItems="flex-start" justifyContent="flex-start">
                    <NewsImage source={{ uri: imageUri }} />
                    <TextCont>
                        <NewTitle variant="body2">{title}</NewTitle>
                    </TextCont>
                </Row>
                <NewDate variant="caption">{formatDate(new Date(date))}</NewDate>
            </SimpleNewsCardRoot>
        </TouchableWithoutFeedback>
    );
};

export default SimpleNewsCard;
