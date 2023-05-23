import React, {createContext} from 'react';
const AWS = require('../node_modules/aws-sdk/lib/aws');

// AWS SDK 초기화
AWS.config.update({
  accessKeyId: 'AKIAUD4GICP7S3CJ2BZS',
  secretAccessKey: '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',
  region: 'ap-northeast-2',
});

const STTContext = createContext();

// AWS Transcribe 객체 생성
const transcribe = new AWS.TranscribeService();
// AWS Comprehend 객체 생성
const comprehend = new AWS.Comprehend();

export const STTContextProvider = ({children}) => {
  // userLanguage = 상대방 언어, 기본 언어는 한국어
  const processTranscript = (transcript, languageCode, userLanguage) => {
    console.log('Processing Transcript:', transcript);
    console.log(
      `languageCode: ${languageCode}, userLanguageCode: ${userLanguage}`,
    );

    if (languageCode === userLanguage) {
      // 영어로 감지된 경우에 대한 작업 수행
      // 예: 텍스트를 분석하거나 특정 동작을 수행합니다.
      console.log('User Transcript Detected:', transcript);
    } else if (languageCode === 'ko') {
      // 한국어로 감지된 경우에 대한 작업 수행
      // 예: 텍스트를 번역하거나 특정 동작을 수행합니다.
      console.log('Korean Transcript Detected:', transcript);
    } else {
      // 기타 언어로 감지된 경우에 대한 작업 수행
      console.log('Other Language Transcript Detected:', transcript);
    }
  };

  const startRealtimeTranscription = async ({userLanguage}) => {
    // 언어 감지 결과를 저장할 변수
    let detectedLanguageCode = null;

    // AWS Transcribe 실시간 트랜스크립션 시작
    const params = {
      LanguageCode: 'ko-KR', // 기본 언어 설정
      MediaSampleRateHertz: 16000,
      MediaEncoding: 'pcm',
    };

    try {
      const response = await transcribe
        .startStreamTranscription(params)
        .promise();
      const transcriptionJobName = response.TranscriptionJobName;
      console.log('Transcription Job Name:', transcriptionJobName);

      // 텍스트 변환 결과 수신을 위한 이벤트 핸들러 등록
      transcribe.on('Transcript', async event => {
        const transcript =
          event.Transcript.Results[0].Alternatives[0].Transcript;
        console.log('Transcript:', transcript);

        // 음성에서 감지된 언어 정보 활용
        if (!detectedLanguageCode) {
          // 최초 감지된 언어 정보 설정
          try {
            const comprehendParams = {
              Text: transcript,
            };
            const languageResponse = await comprehend
              .detectDominantLanguage(comprehendParams)
              .promise();
            detectedLanguageCode = languageResponse.Languages[0].LanguageCode;
            console.log('Detected Language:', detectedLanguageCode);

            // AWS Transcribe 언어 설정 변경
            transcribe.updateStreamTranscription({
              LanguageCode: detectedLanguageCode,
            });
          } catch (error) {
            console.error('Error detecting language:', error);
          }
        }

        // 변환된 텍스트를 처리하는 로직을 추가할 수 있습니다.
        // 변환된 텍스트는 음성에서 감지된 언어로 출력됩니다.
        processTranscript(transcript, detectedLanguageCode, userLanguage);
      });

      // 오류 발생을 위한 이벤트 핸들러 등록
      transcribe.on('Error', error => {
        console.error('Error:', error);
      });
    } catch (error) {
      console.error('Error starting realtime transcription:', error);
    }
  };
  return (
    <STTContext.Provider value={{startRealtimeTranscription}}>
      {children}
    </STTContext.Provider>
  );
};

export default STTContext;
