import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";

import Home from "../../routes/Home/Home";
import EditContact from "../../routes/EditContact/EditContact";
import AddContact from "../../routes/AddContact/AddContact";
import NotFound from "../../routes/NotFound/NotFound";
import ContactDetails from "../../routes/ContactDetails/ContactDetails";

const App = () => (
  <Router>
    <Switch>
      <Route path="/" exact render={(props) => <Home {...props} />} />
      <Route
        path="/add-contact"
        render={(props) => <AddContact {...props} />}
      />
      <Route
        path="/edit-contact/:id"
        render={(props) => <EditContact {...props} />}
      />
      <Route
        path="/details/:id"
        render={(props) => <ContactDetails {...props} />}
      />
      <Route path="/not-found" render={(props) => <NotFound {...props} />} />
      <Redirect to="/not-found" />
    </Switch>
  </Router>
);

export default App;
