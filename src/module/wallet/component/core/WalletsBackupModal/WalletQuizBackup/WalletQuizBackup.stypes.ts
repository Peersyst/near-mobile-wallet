export enum SecutiryQuizFormDataFields {
    RESPONSE = "RESPONSE",
}

export interface WalletQuizBackupProps {
    onClose: () => void;
    onSubmit: () => void;
}

export interface QuizQuestion {
    question: string;
    responses: string[];
    correctResponse: number;
}

export enum QuizStep {
    Welcome,
    Questions,
    Error,
}
