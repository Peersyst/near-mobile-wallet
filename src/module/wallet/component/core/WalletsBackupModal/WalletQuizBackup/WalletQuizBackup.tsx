import { useState } from "react";
import WalletQuizBackupError from "./steps/WalletQuizBackupError";
import WalletQuizBackupWelcome from "./steps/WalletQuizBackupWelcome";
import { QuizStep, WalletQuizBackupProps } from "./WalletQuizBackup.stypes";
import WalletQuizBackupQuiz from "./steps/WalletQuizBackupQuiz/WalletQuizBackupQuiz";
import useTranslate from "module/common/hook/useTranslate";
import ConfirmPinModal from "module/settings/components/core/ConfirmPinModal/ConfirmPinModal";
import { TabPanel, Tabs } from "@peersyst/react-native-components";
import { NotificationFeedbackType, notificationAsync } from "expo-haptics";
import useQuizInitialization from "module/wallet/hook/useQuizInitialization";

const WalletQuizBackup = ({ onClose, onSubmit }: WalletQuizBackupProps): JSX.Element => {
    const translateError = useTranslate("error");
    const { quizQuestions, quizQuestionsShuffled } = useQuizInitialization();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [answers, setAnswers] = useState<number[]>([]);
    const [error, setError] = useState<string | undefined>("");
    const [quizStep, setQuizStep] = useState<QuizStep>(QuizStep.Welcome);
    const [showModal, setShowModal] = useState(false);

    const handleAnswerChange = (value: number) => {
        setAnswers((answers) => {
            answers[currentQuestionIndex] = value;
            return answers;
        });
    };

    const handleNextQuestion = () => {
        const currentQuestion = quizQuestions.find(
            (question) => question.question === quizQuestionsShuffled[currentQuestionIndex].question,
        );
        const userResponse = quizQuestionsShuffled[currentQuestionIndex].responses[answers[currentQuestionIndex]];

        if (currentQuestion?.responses[currentQuestion.correctResponse] !== userResponse) {
            setQuizStep(QuizStep.Error);
            notificationAsync(NotificationFeedbackType.Error);
            setError(translateError("errorSecurityQuiz"));
            return;
        }

        setError("");
        if (currentQuestionIndex < quizQuestions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setAnswers([...answers.slice(0, currentQuestionIndex + 1), 0]);
        } else {
            setShowModal(true);
        }
    };

    const handleStartQuiz = () => {
        setQuizStep(QuizStep.Questions);
        setCurrentQuestionIndex(0);
        setAnswers([]);
        setError(undefined);
    };

    return (
        <>
            <Tabs index={quizStep} onIndexChange={setQuizStep}>
                <TabPanel index={QuizStep.Welcome}>
                    <WalletQuizBackupWelcome onNext={handleStartQuiz} />
                </TabPanel>
                <TabPanel index={QuizStep.Questions}>
                    <WalletQuizBackupQuiz
                        handleNextQuestion={handleNextQuestion}
                        handleAnswerChange={handleAnswerChange}
                        currentQuestionIndex={currentQuestionIndex}
                        quizQuestions={quizQuestionsShuffled}
                    />
                </TabPanel>
                <TabPanel index={QuizStep.Error}>
                    <WalletQuizBackupError error={error || ""} onClose={onClose} />
                </TabPanel>
            </Tabs>
            <ConfirmPinModal open={showModal} onPinConfirmed={onSubmit} onClose={() => setShowModal(false)} />
        </>
    );
};

export default WalletQuizBackup;
