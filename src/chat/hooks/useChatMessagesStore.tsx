import { createContext, useCallback, useContext, useReducer } from "react";
import { ChatMessagesByRoomIdData } from "../apis/getChatMessagesByRoomId";
import { MessageType } from "../models/message";

type AddMessageAction = {
  type: "ADD_MESSAGE";
  payload: MessageType;
};

type CopyServerStateAction = {
  type: "COPY_SERVER_STATE";
  payload: ChatMessagesByRoomIdData["messages"];
};

type DeleteMessageAction = {
  type: "DELETE_MESSAGE";
  payload: MessageType["messageId"];
};

type Action = AddMessageAction | CopyServerStateAction | DeleteMessageAction;

const actionTypes = {
  ADD_MESSAGE: "ADD_MESSAGE",
  COPY_SERVER_STATE: "COPY_SERVER_STATE",
  DELETE_MESSAGE: "DELETE_MESSAGE",
} as const;

const chatMessagesReducer = (state: MessageType[], action: Action) => {
  switch (action.type) {
    case actionTypes.ADD_MESSAGE:
      return [...state, action.payload];
    case actionTypes.COPY_SERVER_STATE:
      return action.payload;
    case actionTypes.DELETE_MESSAGE:
      return state.filter((message) => message.messageId !== action.payload);
    default:
      return state;
  }
};

type ChatMessagesContextType = {
  state: MessageType[];
  addMessage: (message: MessageType) => void;
  copyServerState: (messages: ChatMessagesByRoomIdData["messages"]) => void;
  deleteMessage: (messageId: MessageType["messageId"]) => void;
};

const ChatMessagesContext = createContext<ChatMessagesContextType | null>(null);

export const useChatMessagesContext = () => {
  const context = useContext(ChatMessagesContext);
  if (!context) {
    throw new Error("useChatMessagesContext는 ChatMessagesProvider 내부에서 사용해야 합니다.");
  }
  return context;
};

export const ChatMessagesProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(chatMessagesReducer, []);

  const addMessage = useCallback((message: MessageType) => {
    dispatch({ type: actionTypes.ADD_MESSAGE, payload: message });
  }, []);

  const copyServerState = useCallback((messages: ChatMessagesByRoomIdData["messages"]) => {
    dispatch({ type: actionTypes.COPY_SERVER_STATE, payload: messages });
  }, []);

  const deleteMessage = useCallback((messageId: MessageType["messageId"]) => {
    dispatch({ type: actionTypes.DELETE_MESSAGE, payload: messageId });
  }, []);

  return (
    <ChatMessagesContext.Provider value={{ state, addMessage, copyServerState, deleteMessage }}>
      {children}
    </ChatMessagesContext.Provider>
  );
};
