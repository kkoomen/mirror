import { JOURNEYS_UPDATE } from '../../actions/JourneyPlanner';

const initialState = {
  departure: null,
  arrival: null,
  schedules: [],
};

export default function journeyPlanner(state = initialState, action) {
  switch (action.type) {
    case JOURNEYS_UPDATE: {
      return {
        ...state,
        departure: action.data.departure,
        arrival: action.data.arrival,
        schedules: action.data.schedules,
      };
    }

    default: {
      return state;
    }
  }
}
