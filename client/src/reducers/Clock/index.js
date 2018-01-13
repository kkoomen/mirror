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
      return {
        ...state,
        time: new Date().format('hh:mm'),
        weekday: new Date().format('DDDD'),
        date: new Date().format('DD MMM, YYYY'),
      };
    }

    default: {
      return state;
    }
  }
}
