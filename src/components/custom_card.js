import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";

function CustomCard({ data, issue = null }) {
  return (
    <Card className="card">
      <CardContent>
        <Typography variant="body1" component="p">
          Title: {data.title}
        </Typography>
        <Typography variant="body2" component="p">
          Author: {"name" in data.author ? data.author.name : data.author.login}
        </Typography>
        <Typography variant="body2" component="p">
          Created At: {new Date(data.createdAt).toLocaleString()}
        </Typography>
        {"state" in data && (
          <Typography variant="body2" component="p">
            State: {data.state}
          </Typography>
        )}
        {"bodyText" in data && data.bodyText && (
          <Typography variant="body2" component="p">
            Issue body: {data.bodyText}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

export default CustomCard;
