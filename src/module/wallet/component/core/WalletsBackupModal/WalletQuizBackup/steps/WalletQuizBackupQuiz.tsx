import { Col, Form, RadioButton, Selector, SelectorGroup } from "@peersyst/react-native-components";
import Typography from "module/common/component/display/Typography/Typography";
import Button from "module/common/component/input/Button/Button";
import { QuizQuestion } from "../WalletQuizBackup.stypes";
import WalletQuizBackupLayout from "./WalletQuizBackupLayout";
import useTranslate from "module/common/hook/useTranslate";
import { QuizResourceType } from "locale";

export interface WalletQuizBackupQuizProps {
    handleAnswerChange: (value: number) => void;
    currentQuestionIndex: number;
    quizQuestions: QuizQuestion[];
    handleNextQuestion: () => void;
}

const WalletQuizBackupQuiz = ({
    handleNextQuestion,
    handleAnswerChange,
    currentQuestionIndex,
    quizQuestions,
}: WalletQuizBackupQuizProps) => {
    const translate = useTranslate();
    const translateQuiz = useTranslate("quiz");
    const currentQuestion = quizQuestions[currentQuestionIndex] as QuizQuestion;

    return (
        <WalletQuizBackupLayout>
            <Form onSubmit={handleNextQuestion} style={{ flex: 1 }}>
                <Col flex={1} gap={24}>
                    <Typography variant="body2Regular">{translateQuiz(currentQuestion.answer as QuizResourceType)}</Typography>
                    <SelectorGroup<number, false, "column"> name={`question_${currentQuestionIndex}`} onChange={handleAnswerChange}>
                        {currentQuestion.response.map((response, index) => (
                            <Selector<number>
                                key={index}
                                value={index}
                                renderController={({ selected, setSelected }) => (
                                    <RadioButton
                                        value={index === selected}
                                        onChange={(v) => v && setSelected()}
                                        label={translateQuiz(response as QuizResourceType)}
                                    />
                                )}
                            />
                        ))}
                    </SelectorGroup>

                    <Col flex={1} style={{ justifyContent: "flex-end" }}>
                        <Button type="submit" variant="primary" fullWidth>
                            {translate("next")}
                        </Button>
                    </Col>
                </Col>
            </Form>
        </WalletQuizBackupLayout>
    );
};

export default WalletQuizBackupQuiz;
