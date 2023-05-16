import React from 'react';
import {createContext, useState} from 'react';

const SettingContext = createContext();

export function SettingContextProvider({children}) {
  const [languages, setLanguages] = useState([
    {label: '한국어(Korean)', value: '1'},
    {label: '영어(English)', value: '2'},
    {label: '중국어(Chinese)', value: '3'},
    {label: '일본어(Japanese)', value: '4'},
    {label: '독일어(German)', value: '5'},
    {label: '몽골어(Mongolian)', value: '6'},
    {label: '베트남어(Vietnamese)', value: '7'},
    {label: '프랑스어(French)', value: '8'},
  ]);

  const [categorys, setCategorys] = useState([
    {label: '항만', value: '1'},
    {label: '회계', value: '2'},
    {label: '소프트웨어 및 ICT', value: '3'},
  ]);
  return (
    <SettingContext.Provider value={{languages, categorys}}>
      {children}
    </SettingContext.Provider>
  );
}

export default SettingContext;
