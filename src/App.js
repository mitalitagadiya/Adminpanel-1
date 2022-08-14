import logo from './logo.svg';
import './App.css';
import Layout from './Component/Layout/Layout';
import Medicines from './Containers/Medicines/Medicines';
import Patients from './Containers/Patients/Patients';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configurestore } from './Redux/store';
import Counter from './Containers/Medicines/Counter';
import PromiseExample from './Containers/PromiseExample/PromiseExample';


function App() {
  let store = configurestore()
  return (

    <>
    
    <Provider store={store}>

      <Layout>
      <Switch>
        
      <Route path={"/Medicines"} exact component={Medicines}/>
      <Route path={"/Patients"} exact component={Patients}/>
      <Route path={"/Counter"} exact component={Counter}/>
      <Route path={"/promise_Exmaple"} exact component={PromiseExample} />


      </Switch>
      </Layout>

      </Provider>
    
    </>
  );
}

export default App;