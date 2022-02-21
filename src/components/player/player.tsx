import React from "react";
import {  Card, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap";

interface IPlayer{
    player: {_id: string,
        name: string,
        symbol: string | null
    }
    current: string,
    playerText: string
}

const Player = (props: IPlayer) => {
    const text = props.current === props.player._id ? "You are player: " : "Player: "
    
    return (
        <div>
            <Card
            >
                <CardBody>
                    <CardTitle tag="h5">
                        {text} {props?.player.name}
                    </CardTitle>
                    <CardSubtitle
                        className="mb-2 text-muted"
                        tag="h6"
                    >
                       Symbol: {props?.player.symbol}
                    </CardSubtitle>
                    <CardText>
                        {props.playerText}
                    </CardText>
                </CardBody>
            </Card>
        </div>
    );
}

export default Player;