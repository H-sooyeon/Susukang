import React from 'react';
import {createContext, useState} from 'react';

const STTContext = createContext();

export const STTContextProvider = ({children}) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: '안녕하세요',
      direction: 'right',
    },
  ]);

  const AddMessage = ({id, text, direction}) => {
    const message = {
      id: id,
      text: text,
      direction: direction,
    };

    //console.log(messages);
    setMessages(prevMessages => [...prevMessages, message]);
  };

  const RemoveMessages = () => {
    setMessages([
      {
        id: 1,
        text: '안녕하세요',
        direction: 'right',
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
