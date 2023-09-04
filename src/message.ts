const messages = {
  "init-hr": "Initializing Hot-Reload.",
  "hr-ready": "Hot-Reload ready! Listening for changes.",
  "server-switch": "Server switching port",
  listen: "Server listening on port",
};

export type TypeOfMessages = typeof messages;
type Messages = [(key: keyof TypeOfMessages, value: string) => void, (key: keyof TypeOfMessages) => string];

const setMessage = (key: keyof TypeOfMessages, value: string) => (messages[key] = value);
const useMessage = (key: keyof TypeOfMessages) => messages[key];

export default () => [setMessage, useMessage] as Messages;
