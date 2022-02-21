import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle, Col, FormGroup, Input, Label } from "reactstrap";
import { IGame } from "../../interface/game";
import { create as createGameService } from "../../services/game";
import { create as createPlayerService } from "../../services/player";

const GameForm = () => {
	const [name, setName] = useState("");
	const [game, setGame] = useState<IGame | null>();
	const [currentPlayerId, setCurrentPlayerId] = useState("")

	const createGame = async () => {
		const player = await createPlayerService({ playerName: name });

		setCurrentPlayerId(player._id);

		const body = {
			playerName: player.playerName,
			id: player._id
		};

		const game = await createGameService(body);
		setGame(game);
	};

	return (
		<Fragment>
			<Card body color="info" outline className="card-body">
				<CardBody>
					<CardTitle tag="h5">
						Tic Tac Toe
					</CardTitle>
					<CardSubtitle
						className="mb-2 text-muted"
						tag="h6"
					>
						Crear partida
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
                                placeholder="Nombre jugador 1"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
								disabled={!!game}
                            />
                        </Col>
                    </FormGroup>


					{game && <p>Game hash: {game.hash}</p>}


					<div className="button-bar">
						<Link to="/">
							<Button
								color="primary"
							>
								Atras
							</Button>
						</Link>
						{!game ?
							<Button onClick={createGame}>Crear partida</Button>
							: <Link to={{
								pathname: `/game/${game.hash}`,
								state: {
									currentPlayer: currentPlayerId,
									isFirst: true
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
		</Fragment>
	);
};

export default GameForm;
