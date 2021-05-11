import Layout from './common/layout';

import Player from './component/player';

import Info from './component/info';

function App() {
  return (
    <Layout>
      <div className="App">
        <Player />
        <Info />
      </div>
    </Layout>
  );
}

export default App;
