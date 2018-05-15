import allRoutes from './index-route';
import allReducers from './index-reducer';
import {createLogger} from 'redux-logger';
import 'style/style';

var {createStore, applyMiddleware} = Redux;
var {persistStore, autoRehydrate} = ReduxPersist;
var middlewares = [ReduxThunk.default];

if(['local','localhost','127.0.0.1'].indexOf(location.hostname) !== -1) {
    const loggerMiddleware = createLogger();
    middlewares.push(loggerMiddleware);
}

const STORE = createStore(allReducers, applyMiddleware(...middlewares), autoRehydrate());

ReactDOM.render(
    <ReactRedux.Provider store={STORE}>
        {allRoutes}
    </ReactRedux.Provider>
  , document.getElementById('container')
);

persistStore(STORE);
