import { Col, Label } from "@peersyst/react-native-components";
import faqs from "../../../../../../src/locale/locales/en/faqs.json";
import { Trans } from "react-i18next";
import FAQ from "../FAQ/FAQ";
import useTranslate from "module/common/hook/useTranslate";
import { ResourceType } from "locale/i18n.types";
import TransExternalLink from "module/common/component/navigation/TransExternalLink/TransExternalLink";
import { FAQsRoot } from "./FAQs.styles";

const FAQs = (): JSX.Element => {
    const translateFAQ = useTranslate("faqs");

    return (
        <FAQsRoot variant="default">
            <Col gap={12} flex={1} style={{ width: "100%" }}>
                {Object.entries(faqs).map(([key, { questions }]) => (
                    <Label
                        style={{ alignItems: "stretch" }}
                        key={key}
                        variant="body2Strong"
                        label={translateFAQ(`${key as keyof ResourceType["faqs"]}.label`)}
                    >
                        <Col gap={12}>
                            {questions.map((_, questionIndex) => (
                                <FAQ
                                    key={questionIndex}
                                    question={translateFAQ(`${key}.questions.${questionIndex}.question` as any)}
                                    answer={
                                        <Trans
                                            i18nKey={`faqs:${key}.questions.${questionIndex}.answer` as any}
                                            components={{ a: <TransExternalLink variant="body4Strong" /> }}
                                        />
                                    }
                                />
                            ))}
                        </Col>
                    </Label>
                ))}
            </Col>
        </FAQsRoot>
    );
};

export default FAQs;
