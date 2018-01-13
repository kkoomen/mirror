import { DETECT_FACE } from '../../actions/FaceDetection';

const initialState = {
  detected: false,
};

export default function faceDetection(state = initialState, action) {
  switch (action.type) {
    case DETECT_FACE: {
      return {
        ...state,
        detected: action.detected,
      };
    }

    default: {
      return state;
    }
  }
}
