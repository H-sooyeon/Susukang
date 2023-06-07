import {
  TranscribeStreamingClient,
  StartStreamTranscriptionCommand,
} from '@aws-sdk/client-transcribe-streaming';
import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';
import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';
import {Buffer} from 'buffer';
//import MicStream from 'react-native-microphone-stream';
import LiveAudioStream from 'react-native-live-audio-stream';

const SAMPLE_RATE = 44100;
let microphoneStream = undefined;
let transcribeClient = undefined;

const YOUR_REGION = 'ap-northeast-2'; // 사용하려는 AWS 지역으로 변경
const ACCESSKEYID = 'AKIAUD4GICP7S3CJ2BZS';
const SECRETACCESSKEY = 'JKT5p3SWKTXJ4adz9hyTHp2g/75UL4o0RvIgJltS';
const YOUR_LANGUAGE_CODE = 'ko-KR'; // 원하는 언어 코드로 변경
const YOUR_MEDIA_ENCODING = 'pcm'; // 사용하는 미디어 인코딩으로 변경
const YOUR_SAMPLE_RATE = 16000; // 샘플 속도로 변경

const credentials = {
  accessKeyId: ACCESSKEYID,
  secretAccessKey: SECRETACCESSKEY,
};

// 음성 인식 시작
export const startRecording = async (language, callback) => {
  if (!language) {
    return false;
  }
  if (microphoneStream || transcribeClient) {
    stopRecording();
  }
  await createTranscribeClient();
  //console.log(transcribeClient);
  //console.log(microphoneStream);
  await startStreaming(language, callback);
};

export const stopRecording = function () {
  if (microphoneStream) {
    microphoneStream.stop();
    microphoneStream.destroy();
    microphoneStream = undefined;
  }
  if (transcribeClient) {
    transcribeClient.destroy();
    transcribeClient = undefined;
  }
};

const createTranscribeClient = () => {
  const accessKeyId = ACCESSKEYID;
  const secretAccessKey = SECRETACCESSKEY;
  transcribeClient = new TranscribeStreamingClient({
    region: YOUR_REGION,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });
};

const createMicrophoneStream = async () => {
  const options = {
    bufferSize: 4096,
    sampleRate: 44100,
    bitsPerSample: 16,
    channels: 1,
  };
  await LiveAudioStream.init(options);
  microphoneStream = LiveAudioStream;
  //microphoneStream = LiveAudioStream;
  await LiveAudioStream.start();
};

const startStreaming = async (language, callback) => {
  createMicrophoneStream();
  console.log('Before calling getAudioStream');
  const audioStream = await getAudioStream();
  const chunks = [];
  for await (const chunk of audioStream) {
    chunks.push(chunk);
  }
  console.log(chunks);
  const command = new StartStreamTranscriptionCommand({
    LanguageCode: language,
    MediaEncoding: 'pcm',
    MediaSampleRateHertz: SAMPLE_RATE,
    AudioStream: chunks,
  });
  transcribeClient
    .send(command)
    .then(data => {
      data.TranscriptResultStream.on('data', event => {
        for (const result of event.TranscriptEvent.Transcript.Results || []) {
          if (result.IsPartial === false) {
            const noOfResults = result.Alternatives[0].Items.length;
            for (let i = 0; i < noOfResults; i++) {
              console.log(result.Alternatives[0].Items[i].Content);
              callback(result.Alternatives[0].Items[i].Content + ' ');
            }
          }
        }
      });
    })
    .catch(error => {
      console.error('An error occurred while streaming:', error);
    });
  //   for await (const event of data.TranscriptResultStream) {
  //     for (const result of event.TranscriptEvent.Transcript.Results || []) {
  //       if (result.IsPartial === false) {
  //         const noOfResults = result.Alternatives[0].Items.length;
  //         for (let i = 0; i < noOfResults; i++) {
  //           console.log(result.Alternatives[0].Items[i].Content);
  //           callback(result.Alternatives[0].Items[i].Content + ' ');
  //         }
  //       }
  //     }
  //   }
};

async function* getAudioStream() {
  console.log('helelel');
  for await (const chunk of microphoneStream) {
    console.log('뇽뇽');
    //if (chunk.length <= SAMPLE_RATE) {
    yield {
      AudioEvent: {
        AudioChunk: encodePCMChunk(chunk),
      },
    };
    //}
  }
}

const encodePCMChunk = chunk => {
  const input = LiveAudioStream.toRaw(chunk);
  let offset = 0;
  const buffer = new ArrayBuffer(input.length * 2);
  const view = new DataView(buffer);
  for (let i = 0; i < input.length; i++, offset += 2) {
    let s = Math.max(-1, Math.min(1, input[i]));
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
  }
  return Buffer.from(buffer);
};
