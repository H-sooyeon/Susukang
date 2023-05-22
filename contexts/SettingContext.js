import React from 'react';
import {createContext} from 'react';

const SettingContext = createContext();

export function SettingContextProvider({children}) {
  const languages = [
    {label: '독일 독일어', value: 'de-DE'},
    {label: '미국 영어', value: 'en-US6'},
    {label: '미국 스페인어', value: 'es-US'},
    {label: '브라질 포르투갈어', value: 'pt-BR'},
    {label: '영국 영어', value: 'en-GB'},
    {label: '이탈리아 이탈리아어', value: 'it-IT'},
    {label: '인도 힌디어', value: 'hi-IN'},
    {label: '일본 일본어', value: 'ja-JP'},
    {label: '중국 중국어', value: 'zh-CN'},
    {label: '캐나다 프랑스어', value: 'fr-CA'},
    {label: '태국 태국어', value: 'th-TH'},
    {label: '프랑스 프랑스어', value: 'fr-FR'},
    {label: '한국 한국어', value: 'ko-KR'},
    {label: '호주 영어', value: 'en-AU'},
  ];

  const categorys = [
    {label: '항만', value: '1'},
    {label: '회계', value: '2'},
    {label: '소프트웨어 및 ICT', value: '3'},
  ];

  return (
    <SettingContext.Provider value={{languages, categorys}}>
      {children}
    </SettingContext.Provider>
  );
}

export default SettingContext;
