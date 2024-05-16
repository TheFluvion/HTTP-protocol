/* eslint-disable no-console */
import { isProduction } from '../services/constants';

/** A simple wrapper around `console.log` that only logs in development mode. */
const logger = {
  error: (...text: any[]) => !isProduction && console.error(...text),
  debug: (...text: any[]) => !isProduction && console.log('[DEBUG]', ...text),
};

export default logger;
