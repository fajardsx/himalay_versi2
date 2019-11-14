import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

import reducer from './reducers/reducers';

const presistConfig = {
  timeout: null,
  key: 'root',
  storage: AsyncStorage
};

const presistreducer = persistReducer(presistConfig, reducer);

export default () => {
  let store = createStore(presistreducer);
  let presistor = persistStore(store);
  return { store, presistor };
};
