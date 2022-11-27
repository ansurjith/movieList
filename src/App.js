import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import Entry from "./entry";
import mainReducer from "./store/main.reducer";

const store = configureStore({
    reducer: {mainReducer}
  });


const App = () => {
    return (
        <div>
        <Provider store={store}>
            <Entry />
        </Provider>
        </div>   
            
    )
}
export default App;