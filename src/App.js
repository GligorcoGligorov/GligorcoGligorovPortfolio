import logo from './logo.svg';
import Navbar from './components/Navbar'; 
import Home from './components/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Create from './components/Create';
import ProjectDetails from './components/ProjectDetails'
import NotFound from './components/NotFound';
import Me from './components/firstViewComponent/Me';
import Details from './components/firstViewComponent/Details';
import Name from './components/firstViewComponent/Name';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Footer from './components/footerComponent/Footer';



function App() {

  
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <div className="content">
          <Switch>
            <Route exact path='/'>
              <div className="c1">

                <div className='firstC1'>
                  <Name />
                </div>
                <div className='details'>
                  <Details />
                </div>
                <div>
                  <Me />
                </div>
                
              </div>

              <div>
                    <Home/>
              </div>

              <div className="c2">
                <div>
                  <Skills />
                </div>
                <div>
                  <Experience />
                </div>
              </div>
              <div>
                <Footer />
              </div>
              
            </Route>
            <Route path='/create'>
              <Create/>
            </Route>
            <Route path='/projects/:id'>
              <ProjectDetails/>
            </Route>
            <Route path='*'>
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
