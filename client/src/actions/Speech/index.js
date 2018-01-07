export const SPEECH_QUEUE_ADD = 'SPEECH_QUEUE_ADD';
export function queueSpeechText(speechType, text) {
  return {
    type: SPEECH_QUEUE_ADD,
    text,
    speechType,
  };
}

export const SPEECH_QUEUE_DELETE_INDEX = 'SPEECH_QUEUE_DELETE_INDEX';
export function deleteSpeechQueueIndex(index) {
  return {
    type: SPEECH_QUEUE_DELETE_INDEX,
    index,
  };
}

export const SPEECH_QUEUE_REFRESH = 'SPEECH_QUEUE_REFRESH';
export function refreshSpeechQueue() {
  return {
    type: SPEECH_QUEUE_REFRESH,
  };
}
