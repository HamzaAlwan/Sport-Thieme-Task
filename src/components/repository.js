import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import "./repository.css";

import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

const Repository = () => {
  // State
  const [username, setUsername] = useState("");
  const [repo_name, setRepoName] = useState("");
  const [repository, setrepository] = useState("null");

  // Tabs
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`wrapped-tabpanel-${index}`}
        aria-labelledby={`wrapped-tab-${index}`}
        {...other}
      >
        {value === index && <Box p={3}>{children}</Box>}
      </Typography>
    );
  }

  function submit() {}

  return (
    <Container maxWidth="sm">
      <h2>Search for a repositry</h2>
      <form className="form" noValidate autoComplete="off">
        <TextField
          className="text_field"
          label="Username"
          placeholder="Enter Username"
          variant="filled"
          value={username}
          onChange={e => {
            setUsername(e.target.value);
          }}
        />
        <TextField
          className="text_field"
          label="Repo Name"
          placeholder="Enter Repository Name"
          variant="filled"
          value={repo_name}
          onChange={e => {
            setRepoName(e.target.value);
          }}
        />
        <Button onClick={submit} variant="contained" color="primary">
          Search
        </Button>
      </form>
      {repository !== null && (
        <Container>
          <Paper square className="tabs">
            <Tabs
              variant="fullWidth"
              value={value}
              indicatorColor="primary"
              textColor="primary"
              onChange={handleChange}
              aria-label="disabled tabs example"
            >
              <Tab value={0} wrapped label="Pull Requests" />
              <Tab value={1} wrapped label="Open Issues" />
              <Tab value={2} wrapped label="Closed Issues" />
            </Tabs>
          </Paper>

          <TabPanel value={value} index={0}>
            <Container>Pull Requests</Container>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Container>Open Issues</Container>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Container>Closed Issues</Container>
          </TabPanel>
        </Container>
      )}
    </Container>
  );
};
export default withRouter(Repository);
