import {createStore} from 'redux'
import reducers from './reducers/login.reducer'

const store = createStore(reducers);

export default store;