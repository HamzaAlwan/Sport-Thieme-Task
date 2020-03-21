import React, { useState, useEffect } from "react";
import "./single_issue.css";

import TextField from "@material-ui/core/TextField";

const SingleIssue = () => {
  // State
  const [search_field, setSearchField] = useState("");
  const [issue, setIssue] = useState({});

  useEffect(() => {
    // Update the document title using the browser API
    // document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <TextField
        id="filled-basic"
        label="Filled"
        variant="filled"
        value={search_field}
        onChange={e => {
          setSearchField(e.target.value);
        }}
      />
    </div>
  );
};
export default SingleIssue;
