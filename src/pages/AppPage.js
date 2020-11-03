import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../css/AppPage.css";

const AppPageBase = (props) => {
  const history = useHistory();

  useEffect(() => {
    props.firebase.auth.onAuthStateChanged((user) => {
      if (!user) {
        history.push("/login");
      }
    });
  }, []);
  return (
    <div>
      <h1>App page</h1>
      <p>Search event by email, name, see "more bought" items suggestions</p>
    </div>
  );
};

export { AppPageBase as AppPage };
