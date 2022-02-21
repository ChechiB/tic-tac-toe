import React, { Fragment, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Card, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap";

interface IHeaderDashboard{
    hash: string,
    nextPlayerName: string | null
}

const HeaderDashboard= ({hash, nextPlayerName}: IHeaderDashboard) => {
    return (
        <div>
          <Card
          >
            <CardBody>
              <CardTitle tag="h5">
                Tic tac toe
              </CardTitle>
              <CardSubtitle
                className="mb-2 text-muted"
                tag="h6"
              >
                Share hash: {hash}
              </CardSubtitle>
              <CardSubtitle
                className="mb-2 text-muted"
                tag="h6"
              >
                Playing: {nextPlayerName}
              </CardSubtitle>

            </CardBody>
          </Card>
        </div>
    );
}

export default HeaderDashboard;