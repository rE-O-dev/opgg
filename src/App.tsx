import Layout from './common/layout';

import Player from './component/player';

import Info from './component/info';

import {Route, Switch} from 'react-router-dom'

function App() {
  
  
  return (
    <Layout>
      <Switch>
        <Route exact={true} path={`/:summonerId`}>
          <div className="App">
            <Player />
            <Info />
          </div>
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
