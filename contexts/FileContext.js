import React from 'react';
import {createContext, useState} from 'react';
import {v4 as uuidv4} from 'uuid';

const FileContext = createContext();

export const FileContextProvider = ({children}) => {
  const [files, setFiles] = useState([
    {
      id: uuidv4(),
      title: 'Test1',
      department: 'test',
      content: 'hello my name is sooyeon!!',
      date: '2023.5.10',
    },
  ]);

  const onCreate = ({title, department, content, date}) => {
    const file = {
      id: uuidv4(),
      title,
      department,
      content,
      date,
    };
    setFiles([file, ...files]);
  };

  const onModify = modified => {
    //id가 일치하면 교체, 그렇지 않으면 유지
    const nextFiles = files.map(file =>
      file.id === modified.id ? modified : file,
    );
    setFiles(nextFiles);
  };

  const onRemove = id => {
    const nextFiles = files.filter(file => file.id !== id);
    setFiles(nextFiles);
  };

  return (
    <FileContext.Provider value={{files, onCreate, onModify, onRemove}}>
      {children}
    </FileContext.Provider>
  );
};

export default FileContext;
