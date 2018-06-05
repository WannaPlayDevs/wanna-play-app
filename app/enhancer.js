import { applyMiddleware } from 'redux';
import { navMiddleware } from './nav';

export default applyMiddleware(navMiddleware);