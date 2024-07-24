import { useState, useMemo } from "react";
import { config } from "config";
import { QuizQuestion } from "../component/core/WalletsBackupModal/WalletQuizBackup/WalletQuizBackup.stypes";

const useQuizInitialization = () => {
    const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
    const [quizQuestionsShuffled, setQuizQuestionsShuffled] = useState<QuizQuestion[]>([]);

    useMemo(() => {
        const shuffledQuestions = [...config.securityQuizList].sort(() => 0.5 - Math.random());
        const originalShuffledQuestions = shuffledQuestions.slice(0, config.quizNumberOfQuestions);
        setQuizQuestions(originalShuffledQuestions);

        const shuffledQuestionsWithShuffledResponses = originalShuffledQuestions.map((question) => {
            const shuffledResponses = [...question.responses].sort(() => 0.5 - Math.random());
            return { ...question, responses: shuffledResponses };
        });

        setQuizQuestionsShuffled(shuffledQuestionsWithShuffledResponses);
    }, []);

    return { quizQuestions, quizQuestionsShuffled };
};

export default useQuizInitialization;
