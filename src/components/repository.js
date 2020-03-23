import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";

import axios from "axios";

import {
  Container,
  TextField,
  Paper,
  Tabs,
  Tab,
  Typography,
  Box,
  Button,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from "@material-ui/core";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import CustomCard from "./custom_card";

const Repository = () => {
  // State
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [repoName, setRepoName] = useState("");
  const [repository, setRepository] = useState(null);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(null);

  // Detect repository changes
  useEffect(() => {}, [repository]);

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

  // Custom Validation
  const tokenInvalid = token.length > 0 && token.length < 40;
  const usernameInvalid = username.length < 1 && submitted;
  const repoNameInvalid = repoName.length < 1 && submitted;

  // Submit request to Github Graphql
  function onSubmit() {
    setSubmitted(true);
    // Create Github graphql request
    const axiosGitHubGraphQL = axios.create({
      baseURL: process.env.REACT_APP_GITHUB_API,
      headers: {
        Authorization: `bearer ${
          token && token.length === 40
            ? token
            : process.env.REACT_APP_TASK_TOKEN
        }`
      }
    });

    // Graphql Query
    const query = `
      {
        repository(owner: "${username}", name: "${repoName}") {
          pull: pullRequests(last: 6) {
            nodes {
              id
              title
              createdAt
              state
              author {
                name: login
              }
            }
          }
          closed: issues(last: 6, states: CLOSED) {
            nodes {
              id
              title
              bodyText
              createdAt
              state
              author {
                login
                url
              }
              comments(last: 6) {
                nodes {
                  id
                  url
                  author {
                    login
                  }
                  bodyText
                  createdAt
                }
              }
            }
          }
          open: issues(last: 6, states: OPEN) {
            nodes {
              id
              title
              bodyText
              createdAt
              state
              author {
                login
              }
              comments(last: 6) {
                nodes {
                  id
                  url
                  author {
                    login
                    url
                  }
                  bodyText
                  createdAt
                }
              }
            }
          }
        }
      }
    `;

    // Send a request to Github Graphql
    axiosGitHubGraphQL
      .post("", { query })
      .then(async result => {
        let response = result.data.data.repository;
        if (!response) throw new Error("Repository Not Found!");
        setError(null);
        setRepository(response);
      })
      .catch(err => {
        console.log(err.toString());
        setError(err.toString());
        setRepository(null);
      });
  }

  return (
    <Container maxWidth="sm" className="home">
      <h2>Search for a repositry</h2>
      {/* Repository Form */}
      <form className="form" noValidate autoComplete="off">
        <TextField
          className="text-field"
          label="Username"
          placeholder="Enter Username"
          variant="filled"
          value={username}
          error={usernameInvalid}
          helperText={usernameInvalid && `Please Enter a Valid Username`}
          onChange={e => {
            setUsername(e.target.value);
          }}
        />
        <TextField
          className="text-field"
          label="Repo Name"
          placeholder="Enter Repository Name"
          variant="filled"
          value={repoName}
          error={repoNameInvalid}
          helperText={repoNameInvalid && `Please Enter a Valid Repository Name`}
          onChange={e => {
            setRepoName(e.target.value);
          }}
        />
        <br></br>

        {/* Token Expansion Panel */}
        <ExpansionPanel className="token_expansion">
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Add your own token</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <TextField
              className="text-field token-field"
              label="Token (Optional)"
              placeholder="Enter Your Token "
              variant="filled"
              value={token}
              error={tokenInvalid}
              helperText={
                tokenInvalid && `Please Enter a Valid Token or Keep it Empty`
              }
              onChange={e => {
                setToken(e.target.value);
              }}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
        {error && <Typography className="error">{error}</Typography>}
        <Button
          disabled={!username.length || !repoName.length || tokenInvalid}
          onClick={onSubmit}
          variant="contained"
          color="primary"
        >
          GET DATA
        </Button>
      </form>
      {/* Tabs */}
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

          <TabPanel className="tab-panel" value={value} index={0}>
            {repository.pull.nodes.map((req, i) => (
              <CustomCard data={req} key={req.id} />
            ))}
          </TabPanel>
          <TabPanel value={value} index={1}>
            {repository.open.nodes.map((req, i) => (
              <Link
                to={{
                  pathname: `/issue`,
                  state: {
                    issue: req
                  }
                }}
                key={req.id}
              >
                <CustomCard data={req} />
              </Link>
            ))}
          </TabPanel>
          <TabPanel value={value} index={2}>
            {repository.closed.nodes.map((req, i) => (
              <Link
                to={{
                  pathname: `/issue`,
                  state: {
                    issue: req
                  }
                }}
                key={req.id}
              >
                <CustomCard data={req} />
              </Link>
            ))}
          </TabPanel>
        </Container>
      )}
    </Container>
  );
};
export default withRouter(Repository);
