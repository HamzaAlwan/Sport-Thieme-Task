import React, { useState } from "react";

import {
  Container,
  TextField,
  Typography,
  Card,
  CardContent
} from "@material-ui/core";
import CustomCard from "./custom_card";

const SingleIssue = props => {
  const { issue } = props.location.state;

  // State
  const [filteredComments, filterComments] = useState(issue.comments.nodes);

  const updateComments = value => {
    if (value.length === 0) filterComments(issue.comments.nodes);
    else {
      const comments = issue.comments.nodes.slice();
      filterComments(
        comments.filter(
          comment =>
            comment.bodyText.toLowerCase().indexOf(value.toLowerCase()) > -1
        )
      );
    }
  };

  return (
    <Container maxWidth="sm">
      <h2>Issue ID: "{issue.id}"</h2>
      <TextField
        className="text-field"
        label="Filter Comments"
        variant="filled"
        onChange={e => {
          updateComments(e.target.value);
        }}
      />
      <br />
      <CustomCard data={issue} />

      <br />

      <Container>
        <Typography>Comments</Typography>
        {filteredComments.map((comment, i) => (
          <Card className="card" key={comment.id}>
            <CardContent>
              <Typography variant="body1" component="p">
                Author:{" "}
                <a
                  href={comment.author.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {comment.author.login}
                </a>
              </Typography>
              <Typography variant="body2" component="p">
                Comment Body: {comment.bodyText}
              </Typography>
              <Typography variant="body2" component="p">
                Created At: {new Date(comment.createdAt).toLocaleString()}
              </Typography>

              <Typography variant="body2" component="p">
                Link:{" "}
                <a href={comment.url} target="_blank" rel="noopener noreferrer">
                  {comment.url}
                </a>
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Container>
    </Container>
  );
};
export default SingleIssue;
