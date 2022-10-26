import sliceExample from './slices/cart/cartSlice';
import { serviceExample } from './services/serviceExample';

export default {
  sliceExample: sliceExample,
  [serviceExample.reducerPath]: serviceExample.reducer,
};
