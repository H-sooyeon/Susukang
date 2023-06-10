import React from 'react';
import {createContext, useState} from 'react';

const STTContext = createContext();

export const STTContextProvider = ({children}) => {
  const [channer, setChanner] = useState('');
  const [message, setMessages] = useState(['']);

  const AddMessage = text => {
    setMessages(prevMessages => [...prevMessages, text]);
    console.log('message: ', message);
  };

  const RemoveMessages = () => {
    setMessages(['']);
  };

  return (
    <STTContext.Provider
      value={{message, channer, setChanner, AddMessage, RemoveMessages}}>
      {children}
    </STTContext.Provider>
  );
};

export default STTContext;
