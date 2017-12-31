import { CLOCK_UPDATE } from '../../actions/Clock';

require('date-format-lite');

const initialState = {
  time: new Date().format('hh:mm'),
  weekday: new Date().format('DDDD'),
  fullDate: new Date().format('DD MMM, YYYY'),
};

export default function clock(state = initialState, action) {
  switch (action.type) {
    case CLOCK_UPDATE: {
      const newState = { ...state };
      newState.time = new Date().format('hh:mm');
      newState.weekday = new Date().format('DDDD');
      newState.date = new Date().format('DD MMM, YYYY');
      return newState;
    }

    default: {
      return state;
    }
  }
}
