import { EventEmitter } from "refactor/common/events";

type AuthEvents = {
    logout: () => void;
    login: () => void;
};

const AuthEventEmitter = new EventEmitter<AuthEvents>();

export default AuthEventEmitter;
