import { API_URL } from '../../config/constants';

export const JOURNEYS_UPDATE = 'JOURNEYS_UPDATE';
export function updateJourneys() {
  return (dispatch) => {
    fetch(`${API_URL}/journey-planner`)
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: JOURNEYS_UPDATE,
          data,
        });
      });
  };
}
