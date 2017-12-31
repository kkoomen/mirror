import { WEATHER_UPDATE } from '../../actions/Weather';

const initialState = {
  forecast: {},
};

export default function weather(state = initialState, action) {
  switch (action.type) {
    case WEATHER_UPDATE: {
      const newState = { ...state };
      newState.forecast = action.forecast;
      return newState;
    }

    default: {
      return state;
    }
  }
}
