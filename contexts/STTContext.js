import React from 'react';
import {createContext, useState} from 'react';

const STTContext = createContext();

export const STTContextProvider = ({children}) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: '안녕하세요',
      direction: 'right',
      languageCode: 'ko-KR',
      translateText: 'hello',
    },
  ]);

  const AddMessage = ({id, text, direction, languageCode, translateText}) => {
    const message = {
      id: id,
      text: text,
      direction: direction,
      languageCode: languageCode,
      translateText: translateText,
    };

    setMessages(prevMessages => [...prevMessages, message]);
  };

  const RemoveMessages = () => {
    setMessages([
      {
        id: 1,
        text: '안녕하세요',
        direction: 'right',
        languageCode: 'ko-KR',
        translateText: 'hello',
      },
    ]);
  };

  return (
    <STTContext.Provider value={{messages, AddMessage, RemoveMessages}}>
      {children}
    </STTContext.Provider>
  );
};

export default STTContext;
