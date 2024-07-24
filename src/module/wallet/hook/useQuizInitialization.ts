import { useMemo } from "react";
import { useConfig } from "@peersyst/react-native-components";
import { QuizQuestion } from "../component/core/WalletsBackupModal/WalletQuizBackup/WalletQuizBackup.stypes";

function shuffleArray<T>(array: T[]) {
    return array.sort(() => 0.5 - Math.random());
}

const initializeQuizQuestions = (questions: QuizQuestion[], length: number) => {
    const shuffledQuestions = shuffleArray([...questions]);
    const originalShuffledQuestions = shuffledQuestions.slice(0, length);
    return originalShuffledQuestions;
};

const initializeQuizQuestionsShuffled = (questions: QuizQuestion[], length: number) => {
    const originalShuffledQuestions = initializeQuizQuestions(questions, length);
    return originalShuffledQuestions.map((question) => {
        const shuffledResponses = shuffleArray([...question.responses]);
        return { ...question, responses: shuffledResponses };
    });
};

const useQuizInitialization = () => {
    const questions = useConfig("securityQuizList");
    const quizNumberOfQuestions = useConfig("quizNumberOfQuestions");

    return useMemo(() => {
        const quizQuestions = initializeQuizQuestions(questions, quizNumberOfQuestions);
        const quizQuestionsShuffled = initializeQuizQuestionsShuffled(quizQuestions, quizNumberOfQuestions);
        return { quizQuestions, quizQuestionsShuffled };
    }, [questions, quizNumberOfQuestions]);
};

export default useQuizInitialization;
