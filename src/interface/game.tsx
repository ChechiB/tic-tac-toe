 export interface IBoard{
    cell0: string | null,
    cell1: string | null,
    cell2: string | null,
    cell3: string | null,
    cell4: string | null,
    cell5: string | null,
    cell6: string | null,
    cell7: string | null,
    cell8: string | null,
}

export interface IPlayerGame{
    playerOneId: string,
    playerTwoId: string | null,
    nextPlayer: string | null
}

export interface IGame{
    id: string
    hash: string,
    board: IBoard,
    players: IPlayerGame,
    status: boolean,
    statusType: string
}