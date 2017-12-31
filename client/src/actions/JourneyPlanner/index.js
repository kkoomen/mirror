import { API_URL } from '../../config/constants';

export const JOURNEYS_UPDATE = 'JOURNEYS_UPDATE';
export function updateJourneys(departure, arrival) {
  return (dispatch) => {
    fetch(`${API_URL}/journey-planner/${departure}/${arrival}`)
      .then((response) => response.json())
      .then((journeys) => {
        dispatch({
          type: JOURNEYS_UPDATE,
          journeys,
        });
      });
  };
}
