import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';

import rootSagas from './sagas';
import reducer from './reducers';


const initialState = {
  data: []
}

const logger = createLogger({collapsed: true});

const ConfigureRedux = ()=>{
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(sagaMiddleware, logger),
  );

  sagaMiddleware.run(rootSagas);
  return store;
}

export default ConfigureRedux;