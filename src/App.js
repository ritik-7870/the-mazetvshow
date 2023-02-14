import logo from "./logo.svg";
import "./App.css";
import About from "./Components/About.js";
import ShowList from "./Components/ShowList";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
} from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<ShowList/>} />
          <Route exact path="/about/:id" element={<About/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
