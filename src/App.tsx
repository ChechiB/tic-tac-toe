import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle } from 'reactstrap';
import './App.css';

function App() {
	return (
		<div className="App">
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
							Yesica Barroso Leg. 33201
						</CardSubtitle>
						<CardText>
							Selecciona una de las opciones para comenzar
						</CardText>
						<div className="button-bar">
							<Link to="/new">
								<Button
									color="primary"
									className="button-start"
								>
									New game
								</Button>
							</Link>
							<Link to="/join">
								<Button
									color="primary"
									className="button-start"
								>
									Join game
								</Button>
							</Link>
						</div>
					</CardBody>
				</Card>
			</div>
		</div>
	);
}

export default App;
