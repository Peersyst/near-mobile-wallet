import { createStore } from "zustand";
import { Settings } from "refactor/common/models";

export type SettingsState = Settings;

export const defaultSettingsState: SettingsState = {};

const settingsState = createStore<SettingsState>(() => defaultSettingsState);

export default settingsState;
