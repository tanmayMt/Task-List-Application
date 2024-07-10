// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import TaskList from './components/Task/TaskList';
import TaskForm from './components/Task/TaskForm';
import SharedTaskList from './components/SharedTasks/SharedTaskList';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/tasks" component={TaskList} />
            <Route path="/new-task" component={TaskForm} />
            <Route path="/shared-tasks" component={SharedTaskList} />
            <Route path="/" exact component={Login} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
