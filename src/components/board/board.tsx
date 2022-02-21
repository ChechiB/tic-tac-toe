import React from "react";
import { IBoard } from "../../interface/game";
import { update as updateGameService } from "../../services/game";
import './board.css';

interface BoardProps {
    board: IBoard,
    hash: string,
    currentPlayerId: string,
    currentPlayerSymbol: string
}

const Board = ({board, hash, currentPlayerId, currentPlayerSymbol}: BoardProps) => {
    const handler = async(hash: string, playerId: string, playerSymbol: string, cellPosition: number) => {                
        await updateGameService(hash, playerId, playerSymbol, cellPosition )
    }

    return (
        <div className="board-component">
            <div className="board">
                {Object.values(board).map((value: string, index) => {
                    return (
                        <button
                            key={`cell-${index}`}
                            value={index}
                            className="box"
                            onClick={() => { handler(hash, currentPlayerId, currentPlayerSymbol, index)}}
                        >
                            {value ? value : "-"}
                        </button>
                    );
                })}
            </div>
        </div>
    )
}

export default Board;