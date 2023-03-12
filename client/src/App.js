import './App.css';
import { Route } from 'react-router-dom';
import { Landing, Home, Details, Create, About } from "./pages-view"

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Landing} />
      <Route path="/home" component={Home} />
      <Route path="/dogs/:id" component={Details} />
      <Route path="/create" component={Create} />
      <Route path="/about" component={About} />
    </div>
  );
}

export default App;
