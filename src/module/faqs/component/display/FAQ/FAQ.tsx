import { Expandable, Typography } from "@peersyst/react-native-components";
import { FAQProps } from "./FAQ.types";

const FAQ = ({ question, answer }: FAQProps): JSX.Element => {
    return (
        <Expandable>
            <Expandable.Display>{question}</Expandable.Display>
            <Expandable.Content>
                <Typography variant="body3Strong" color="gray.300">
                    {answer}
                </Typography>
            </Expandable.Content>
        </Expandable>
    );
};

export default FAQ;
