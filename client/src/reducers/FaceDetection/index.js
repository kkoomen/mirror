import { DETECT_FACE } from '../../actions/FaceDetection';

const initialState = {
  detected: false,
};

export default function faceDetection(state = initialState, action) {
  switch (action.type) {
    case DETECT_FACE: {
      const newState = { ...state };
      newState.detected = action.detected;
      return newState;
    }

    default: {
      return state;
    }
  }
}
