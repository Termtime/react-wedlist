import React from "react";
import { withFirebase } from "../components/Firebase/consumer";

const WeddingCreatePageBase = (props) => {
  return (
    <div>
      <h1>Wedding create page</h1>
      <p>Set location, set event details, create wish list</p>
    </div>
  );
};
export { WeddingCreatePageBase as WeddingCreatePage };
