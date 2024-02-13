import authState from "refactor/domain/auth/state/authState";
import { useStore } from "zustand";

const useAuthState = () => useStore(authState);

export default useAuthState;
