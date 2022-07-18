import logo from './logo.svg';
import './App.css';
import Layout from './Component/Layout/Layout';
import Medicines from './Containers/Medicines/Medicines';
import Patients from './Containers/Patients/Patients';
import { Route, Switch } from 'react-router-dom';
import Doctors from './Containers/Doctors/Doctors';



function App() {
  return (
    <>

      <Layout>

        <Switch>

          <Route path={"/Medicines"} exact component={Medicines} />
          <Route path={"/Patients"} exact component={Patients} />
          <Route path={"/Doctors"} exact component={Doctors} />

        </Switch>

      </Layout>

    </>
  );
}

export default App;