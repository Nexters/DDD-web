import { createContext, useCallback, useContext, useReducer } from "react";
import { ChatMessagesByRoomIdResponse } from "../apis/getChatMessagesByRoomId";
import { MessageType } from "../types/message";

type AddMessageAction = {
  type: "ADD_MESSAGE";
  payload: MessageType;
};

type CopyServerStateAction = {
  type: "COPY_SERVER_STATE";
  payload: ChatMessagesByRoomIdResponse["messages"];
};

type DeleteMessageAction = {
  type: "DELETE_MESSAGE";
  payload: MessageType["messageId"];
};

type EditMessageAction = {
  type: "EDIT_MESSAGE";
  payload: MessageType;
};

type Action = AddMessageAction | CopyServerStateAction | DeleteMessageAction | EditMessageAction;

const actionTypes = {
  ADD_MESSAGE: "ADD_MESSAGE",
  COPY_SERVER_STATE: "COPY_SERVER_STATE",
  DELETE_MESSAGE: "DELETE_MESSAGE",
  EDIT_MESSAGE: "EDIT_MESSAGE",
} as const;

const chatMessagesReducer = (state: MessageType[], action: Action) => {
  switch (action.type) {
    case actionTypes.ADD_MESSAGE:
      return [...state, action.payload];
    case actionTypes.COPY_SERVER_STATE:
      return action.payload;
    case actionTypes.DELETE_MESSAGE:
      return state.filter((message) => message.messageId !== action.payload);
    case actionTypes.EDIT_MESSAGE:
      return state.map((message) =>
        message.messageId === action.payload.messageId ? action.payload : message
      );
    default:
      return state;
  }
};

type ChatMessagesContextType = {
  state: MessageType[];
  addMessage: (message: MessageType) => void;
  copyServerState: (messages: ChatMessagesByRoomIdResponse["messages"]) => void;
  deleteMessage: (messageId: MessageType["messageId"]) => void;
  editMessage: (message: MessageType) => void;
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

  const copyServerState = useCallback((messages: ChatMessagesByRoomIdResponse["messages"]) => {
    dispatch({ type: actionTypes.COPY_SERVER_STATE, payload: messages });
  }, []);

  const deleteMessage = useCallback((messageId: MessageType["messageId"]) => {
    dispatch({ type: actionTypes.DELETE_MESSAGE, payload: messageId });
  }, []);

  const editMessage = useCallback((message: MessageType) => {
    dispatch({ type: actionTypes.EDIT_MESSAGE, payload: message });
  }, []);

  return (
    <ChatMessagesContext.Provider
      value={{ state, addMessage, copyServerState, deleteMessage, editMessage }}
    >
      {children}
    </ChatMessagesContext.Provider>
  );
};
