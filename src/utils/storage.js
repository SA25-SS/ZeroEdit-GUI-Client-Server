// src/utils/storage.js

// Read from localStorage
const loadSaved = (key) => localStorage.getItem(key);
const save = (key, value) => localStorage.setItem(key, value);
const clear = (key) => localStorage.removeItem(key)
const reset = (key) => localStorage.clear()

// Read/Write Theme from localStorage
export const loadSavedGlobalTheme = () => loadSaved('GlobalThemeDark') === 'true';
export const loadSavedEditorTheme = () => loadSaved('EditorThemeDark') === 'true';
//
export const saveGlobalTheme = (globalThemeDark) => save('GlobalThemeDark', globalThemeDark === true);
export const saveEditorTheme = (editorThemeDark) => save('EditorThemeDark', editorThemeDark === true);

// Read/Write settings from localStorage
export const loadSavedSettings = () => JSON.parse(loadSaved("settings"));;
export const saveSettings = (settings) => save("settings", JSON.stringify(settings));

// Read/Write auth.token
export const loadSavedAuthToken = () => JSON.parse(loadSaved("auth.token"));;
export const saveAuthToken = (token) => save("auth.token", JSON.stringify(token));
export const clearAuthToken = () => clear("auth.token");

// Read/Write username
export const loadSavedUsername = () => JSON.parse(loadSaved("username"));;
export const saveUsername = (token) => save("username", JSON.stringify(token));
export const clearUsername = () => clear("username");