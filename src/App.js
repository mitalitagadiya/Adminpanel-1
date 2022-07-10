import logo from './logo.svg';
import './App.css';
import Layout from './Component/Layout/Layout';
import Medicines from './Containers/Medicines/Medicines';
import Patients from './Containers/Patients/Patients';
import { Route, Switch } from 'react-router-dom';



function App() {
  return (
    <>
    
      <Layout>

      <Switch>

      <Route path={"/Medicines"} exact component={Medicines}/>
      <Route path={"/Patients"} exact component={Patients}/>

      </Switch>

      </Layout>
    
    </>
  );
}

export default App;