import { observer, inject } from "mobx-react";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar";

const App = inject("ShoppingStore")(
  observer((props) => {
    return (
      <div>
        <NavBar></NavBar>
      </div>
    );
  })
);

export default App;
