import rootReducer from "./reducers";
import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from "redux-thunk";
import logger from "./middleware/logger";

const persistConfig = {
  key: 'root', // Storage key
  storage, // Storage method (e.g., localStorage)
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
    persistedReducer, // Use persistedReducer instead of rootReducer
    compose(
      applyMiddleware(thunk, logger),
      window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : (f) => f
    )
);
const persistor = persistStore(store);

export { store, persistor };
