import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import journeyPlanner from './JourneyPlanner';
import weather from './Weather';
import clock from './Clock';
import faceDetection from './FaceDetection';

export default combineReducers({
  routing: routerReducer,
  journeyPlanner,
  weather,
  clock,
  faceDetection,
});
