import { JOURNEYS_UPDATE } from '../../actions/JourneyPlanner';

const initialState = {
  journeys: [],
};

export default function journeyPlanner(state = initialState, action) {
  switch (action.type) {
    case JOURNEYS_UPDATE: {
      const newState = { ...state };
      newState.journeys = action.journeys;
      return newState;
    }

    default: {
      return state;
    }
  }
}
