import logo from './logo.svg';
import './App.css';
import Layout from './Component/Layout/Layout';
import Medicines from './Containers/Medicines/Medicines';
import Patients from './Containers/Patients/Patients';
import { Route, Switch } from 'react-router-dom';
import Counter from './Containers/Medicines/Counter';



function App() {
  return (
    <>
    
      <Layout>

      <Switch>

      <Route path={"/Medicines"} exact component={Medicines}/>
      <Route path={"/Patients"} exact component={Patients}/>
      <Route path={"/Counter"} exact component={Counter}/>


      </Switch>

      </Layout>
    
    </>
  );
}

export default App;