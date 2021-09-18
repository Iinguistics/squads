import React from "react";
import { withRouter } from "react-router-dom";
import Main from "./Main";
import Header from "./Header";

const App = withRouter((props) => (
    <div>
        <Header />
        <main className="pt-5">
            <Main {...props} />
        </main>
    </div>
));

export default App;
