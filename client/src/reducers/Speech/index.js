import 'date-format-lite';

import {
  SPEECH_QUEUE_ADD,
  SPEECH_QUEUE_DELETE_INDEX,
  SPEECH_QUEUE_REFRESH,
} from '../../actions/Speech';

const initialState = {
  queue: [],
};

export default function speech(state = initialState, action) {
  switch (action.type) {
    case SPEECH_QUEUE_ADD: {
      return {
        ...state,
        queue: [
          ...state.queue,
          {
            type: action.speechType,
            text: action.text.replace(/\s+/g, ' ').trim(),
            timestamp: (new Date().toISOString()),
          },
        ],
      };
    }

    case SPEECH_QUEUE_DELETE_INDEX: {
      return {
        ...state,
        queue: state.queue.filter((item, index) => index !== action.index),
      };
    }

    case SPEECH_QUEUE_REFRESH: {
      return {
        ...state,
        queue: state.queue.filter((item, index) => {
          const past = new Date().add(-5, 'minutes').getTime();
          return item.timestamp.date().getTime() > past;
        }),
      };
    }

    default: {
      return state;
    }
  }
}
