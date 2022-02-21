import React, { Fragment, useEffect, useState } from "react";
import { getStatus as getGameStatus } from '../../services/game';
import Board from "../board/board";
import HeaderDashboard from "../headerDashoard/headerDashoard";
import Player from "../player/player";
import { IGame } from '../../interface/game';
import { get } from "../../services/player";
import { IPlayer } from '../../interface/player';
import MsgModal from "../msgModal/msgModal";
import { Col, Row } from "reactstrap";

const Dashboard = (props: any) => {
    const { hash } = props.match.params;
    const { currentPlayer } = props.location?.state;
    const [gameStatus, setGameStatus] = useState<IGame | null>();
    const [nextPlayer, setNextPlayer] = useState<IPlayer>();

    const [playerOne, setPlayerOne] = useState<IPlayer | null>(null);
    const [playerTwo, setPlayerTwo] = useState<IPlayer | null>(null);
    const [modal, setModal] = useState<{
        title: string,
        msg: string
        show: boolean
    }|null>();

    const getNexPlayerData = (playerOne: IPlayer, playerTwo: IPlayer, nextPlayerId: string): IPlayer => {
        if (!nextPlayerId || !playerOne || !playerTwo){
            return {
                name: "",
                symbol: null,
                _id: ""
            }
        }

        return playerOne._id === nextPlayerId ? playerOne: playerTwo;
    }

    useEffect(() => {
        const callingStatus = async (hash: string) => {
            const gameStatusResponse = await getGameStatus(hash);
            setGameStatus(gameStatusResponse);
        }
        if (hash) {
            const refreshIntervalId = setInterval(async () => {
                if (modal){
                    clearInterval(refreshIntervalId)
                }
                callingStatus(hash);
            }, 5000);
        }
    }, [])

    useEffect( () => {
        const getPlayersData = async () => {
            if( !playerOne && !playerTwo && !!gameStatus && gameStatus.players.playerTwoId) {
                const playerOneResponse = await get(gameStatus.players.playerOneId)
                const playerTwoResponse = await get(gameStatus.players.playerTwoId)
                
                setPlayerOne(playerOneResponse);
                setPlayerTwo(playerTwoResponse);
                if(gameStatus.players.nextPlayer) {
                    setNextPlayer(getNexPlayerData(playerOneResponse, playerTwoResponse, gameStatus.players.nextPlayer))
                }
            }

            if(playerOne && playerTwo && gameStatus && gameStatus.players.nextPlayer) {
                setNextPlayer(getNexPlayerData(playerOne, playerTwo,gameStatus.players.nextPlayer))
            }
        }
        getPlayersData();
        if (gameStatus && gameStatus.statusType && nextPlayer){
            const modalData = checkWinner(gameStatus?.statusType, nextPlayer.name)
            setModal(modalData);
        }
        
    }, [gameStatus])

    const checkWinner = (statusType: string, playerName: string)=> {
        let modal = null;
        switch (statusType) {
            case "tie":
                modal = {
                    title: "It's a tie!",
                    msg: `Do you wanna play again?`,
                    show:true
                } 
                break;
            case "winner":
                modal = {
                    title: "Game Over",
                    msg: `${playerName} has won!! Do you wanna play again?`,
                    show: true
                } 
                break;
            default:
                break;
        }

        return modal;
    }

    return <Fragment>
        {!!nextPlayer && <HeaderDashboard hash={hash} nextPlayerName={nextPlayer?.name} />}
        <Row>
            <Col className="bg-light">
            {!!playerOne && <Player player={playerOne} current={currentPlayer} playerText="Player 1"></Player>}
            </Col>
            <Col className="bg-light">
            {!!gameStatus && !!nextPlayer && !!nextPlayer.symbol && <Board board={gameStatus.board} hash={hash} currentPlayerId={currentPlayer} currentPlayerSymbol={nextPlayer?.symbol} />}
            </Col>
            <Col className="bg-light">
            {!!playerTwo && <Player player={playerTwo} current={currentPlayer} playerText="Player 2"></Player>}
            </Col>
        </Row>
        
        {!!modal && <MsgModal {...modal}/>}
    </Fragment>;
}

export default Dashboard;