import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import store from './redux/store'
import Layout from './pages/Layout';
import { Provider } from 'react-redux'
export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route path="/" component={Layout} />
      </Router>
    </Provider>
  )
}
