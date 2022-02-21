import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, CardSubtitle, CardTitle, Col, FormGroup, Input, Label } from "reactstrap";
import { IGame } from "../../interface/game";
import { getStatus as getGameStatusService, join as joinGameService } from "../../services/game";
import { create as createPlayerService, setSymbols } from "../../services/player";

const JoinGame = (props: any) => {
    const [name, setName] = useState("");
    const [hash, setHash] = useState("");
    const [game, setGame] = useState<IGame | null>();
    const [currentPlayerId, setCurrentPlayerId] = useState("")

    const joinGame = async () => {
        const playerReponse = await createPlayerService({ playerName: name });
        // search game
        const gameResponse = await getGameStatusService(hash);
        const { _id } = playerReponse;
        setCurrentPlayerId(playerReponse._id)
        // create symbols
        await setSymbols(gameResponse.players.playerOneId, _id);

        const game = await joinGameService(hash, _id);
        setGame(game);
    };


    return (
        <div>
            <Card body color="info" outline className="card-body">
                <CardBody>
                    <CardTitle tag="h5">
                        Tic Tac Toe
                    </CardTitle>
                    <CardSubtitle
                        className="mb-2 text-muted"
                        tag="h6"
                    >
                        Unirse a una partida
                    </CardSubtitle>
                    <FormGroup row>
                        <Label
                            for="name"
                            sm={2}
                        >
                            Nombre
                        </Label>
                        <Col sm={10}>
                            <Input
                                id="name"
                                name="name"
                                placeholder="Nombre jugador 2"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                disabled={!!game}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label
                            for="hash"
                            sm={2}
                        >
                            Hash
                        </Label>
                        <Col sm={10}>
                            <Input
                                id="hash"
                                name="hash"
                                placeholder="Hash de la partida"
                                type="text"
                                value={hash}
                                onChange={(e) => setHash(e.target.value)}
                                disabled={!!game}
                            />
                        </Col>
                    </FormGroup>

                    <div className="button-bar">
                        <Link to="/">
                            <Button>
                                Atras
                            </Button>
                        </Link>
                        {!game ?
                            <Button onClick={joinGame} color="primary" >Unirme</Button>
                            : <Link to={{
                                pathname: `/game/${game.hash}`,
                                state: {
                                    currentPlayer: currentPlayerId,
                                    isFirst: false
                                }
                            }} >
                                <Button
                                    color="success"
                                >
                                    Comenzar partida
                                </Button>
                            </Link>
                        }
                    </div>
                </CardBody>
            </Card>


        </div>
    );
}

export default JoinGame;


