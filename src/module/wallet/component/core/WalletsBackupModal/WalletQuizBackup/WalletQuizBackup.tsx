import { useState, useEffect } from "react";
import { config } from "config";
import WalletQuizBackupError from "./steps/WalletQuizBackupError";
import WalletQuizBackupWelcome from "./steps/WalletQuizBackupWelcome";
import { QuizQuestion, QuizStep, WalletQuizBackupProps } from "./WalletQuizBackup.stypes";
import WalletQuizBackupQuiz from "./steps/WalletQuizBackupQuiz";
import useTranslate from "module/common/hook/useTranslate";
import ConfirmPinModal from "module/settings/components/core/ConfirmPinModal/ConfirmPinModal";
import { TabPanel, Tabs } from "@peersyst/react-native-components";
import { NotificationFeedbackType, notificationAsync } from "expo-haptics";

const WalletQuizBackup = ({ onClose, onSubmit }: WalletQuizBackupProps): JSX.Element => {
    const translateError = useTranslate("error");
    const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [answers, setAnswers] = useState<number[]>([]);
    const [error, setError] = useState<string>("");
    const [quizStep, setQuizStep] = useState<QuizStep>(QuizStep.Welcome);
    const [showModal, setShowModal] = useState(false);
    const [quizQuestionsShuffled, setQuizQuestionsShuffled] = useState<QuizQuestion[]>([]);

    useEffect(() => {
        const shuffledQuestions = [...config.securityQuizList].sort(() => 0.5 - Math.random());
        const originalShuffledQuestions = shuffledQuestions.slice(0, 3);
        setQuizQuestions(originalShuffledQuestions);
        const shuffledQuestionsWithShuffledResponses = originalShuffledQuestions.map((question) => {
            const shuffledResponses = [...question.response].sort(() => 0.5 - Math.random());
            return { ...question, response: shuffledResponses };
        });

        setQuizQuestionsShuffled(shuffledQuestionsWithShuffledResponses);
    }, []);

    const handleAnswerChange = (value: number) => {
        const updatedAnswers = [...answers];
        updatedAnswers[currentQuestionIndex] = value;
        setAnswers(updatedAnswers);
    };

    const handleNextQuestion = () => {
        const currentQuestion = quizQuestions.find((question) => question.answer === quizQuestionsShuffled[currentQuestionIndex].answer);
        const userResponse = quizQuestionsShuffled[currentQuestionIndex].response[answers[currentQuestionIndex]];

        if (currentQuestion?.response[currentQuestion.correctResponse] !== userResponse) {
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
        setError("");
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
                        key={currentQuestionIndex}
                    />
                </TabPanel>
                <TabPanel index={QuizStep.Error}>
                    <WalletQuizBackupError error={error} onClose={onClose} />
                </TabPanel>
            </Tabs>
            <ConfirmPinModal open={showModal} onPinConfirmed={onSubmit} onClose={() => setShowModal(false)} />
        </>
    );
};

export default WalletQuizBackup;
