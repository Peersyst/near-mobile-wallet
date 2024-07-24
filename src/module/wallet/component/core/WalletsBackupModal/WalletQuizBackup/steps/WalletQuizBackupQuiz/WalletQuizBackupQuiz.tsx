import { Col, Form, Selector, SelectorGroup } from "@peersyst/react-native-components";
import Typography from "module/common/component/display/Typography/Typography";
import Button from "module/common/component/input/Button/Button";
import { QuizQuestion } from "../../WalletQuizBackup.stypes";
import WalletQuizBackupLayout from "../WalletQuizBackupLayout";
import useTranslate from "module/common/hook/useTranslate";
import { QuizResourceType } from "locale";
import { QuizRadionButton } from "./WalletQuizBackupQuiz.styles";

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
                    <Typography variant="body2Regular">{translateQuiz(currentQuestion.question as QuizResourceType)}</Typography>
                    <SelectorGroup<number, false, "column">
                        name={`question_${currentQuestionIndex}`}
                        onChange={handleAnswerChange}
                        key={currentQuestion.question}
                    >
                        {currentQuestion.responses.map((response, index) => (
                            <Selector<number>
                                key={index}
                                value={index}
                                renderController={({ selected, setSelected }) => (
                                    <QuizRadionButton
                                        value={index === selected}
                                        onChange={(v: any) => v && setSelected()}
                                        label={
                                            <Typography variant="body2Regular">{translateQuiz(response as QuizResourceType)}</Typography>
                                        }
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
