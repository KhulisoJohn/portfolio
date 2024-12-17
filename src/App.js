
import './App.css';
import Header from './componets/header';
import Home from './componets/home';
import About from './componets/about';
import Project from './componets/project';
import Contact from './componets/contact';

function App() {
  return (
    <div className="App">
      <Header />
      <Home />
      <About />
      <Project />
      <Contact />
    </div>
  );
}

export default App;
