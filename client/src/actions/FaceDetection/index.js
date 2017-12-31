import { API_URL } from '../../config/constants';

export const DETECT_FACE = 'DETECT_FACE';
export function detectFace() {
  return (dispatch) => {
    fetch(`${API_URL}/activity`)
      .then((response) => response.json())
      .then((response) => {
        dispatch({
          type: DETECT_FACE,
          detected: response.detected,
        });
      });
  };
}
