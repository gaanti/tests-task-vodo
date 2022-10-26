import sliceExample from './slices/sliceExample';
import { serviceExample } from './services/serviceExample';

export default {
  sliceExample: sliceExample,
  [serviceExample.reducerPath]: serviceExample.reducer,
};
