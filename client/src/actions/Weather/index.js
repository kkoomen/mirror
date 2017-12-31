import { API_URL } from '../../config/constants';

export const WEATHER_UPDATE = 'WEATHER_UPDATE';
export function updateWeather() {
  return (dispatch) => {
    fetch(`${API_URL}/weather`)
      .then((response) => response.json())
      .then((forecast) => {
        dispatch({
          type: WEATHER_UPDATE,
          forecast,
        });
      });
  };
}
