import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

import reducer from './reducers/reducers';

const presistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['serviceProvidedDetails'] // will not be persisted
};

const presistreducer = persistReducer(presistConfig, reducer);

export default () => {
  let store = createStore(presistreducer);
  let presistor = persistStore(store);
  return { store, presistor };
};
