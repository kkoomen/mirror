/* ---------------------------
 * GENERAL
 * ---------------------------
 */

// Our raspberrypi is the production environment.
export const API_URL = (process.env.NODE_ENV === 'production')
  ? 'http://localhost:5000'
  : 'http://192.168.0.109:5000';



/* ---------------------------
 * SPEECH
 * ---------------------------
 */
export const SPEECH_TYPE_WEATHER = 'WEATHER';
export const SPEECH_TYPE_JOURNEY_PLANNER = 'JOURNEY_PLANNER';
export const SPEECH_TYPE_GREETING = 'GREETING';
