import { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import Home from './pages/Home';
import Error from './components/Error'
import Chat from './pages/Chat';
import { setMessage } from "./actions/index";
import Back from './components/Back';

function App() {
  const dispatch = useDispatch();
  const io = useSelector(state => state.io);
  const currentUserId = useSelector(state => state.currentLogin?._id);
  const counter = useSelector(state => state);

  io.on('connect', function () {
    console.log('connected!!');
  });

  io.on('chat', (data) => {
    console.log('from serve ', data);
    dispatch(setMessage({ 'data': data}));
    console.log('from server', data);
  })

  useEffect(() => {
    console.log('counter', counter);
    // const io = socket(endPoint);
  });

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          {counter.login ?
            <Fragment>
              <Back />
              <Route exact path='/' component={Home} />
              <Route exact path='/chat/:id' component={Chat} />
            </Fragment> :
            <Route exact path='/' component={Login} />}
          {!counter.login ?
            <Route component={Error} /> :
            // <Redirect to="/" /> :
            <Route component={Error} />}
        </Switch>
      </BrowserRouter>
      <ToastContainer position="bottom-right" autoClose={2000} />
    </div>
  );
}

export default App;
