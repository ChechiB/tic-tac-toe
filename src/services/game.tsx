import { IGame } from '../interface/game';

interface IPlayer {
    playerName: string,
    symbol?: string,
    id: string
}


export async function create( player: IPlayer): Promise<IGame>{
    return await fetch("http://localhost:8080/game/new", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        cache: "no-cache",
        body: JSON.stringify(player),
      }).then( res => {
          return res.json();
      }
      ).then(
        res => res.data
      ).catch( error => console.log(error));
};

/* export async function init(hash: string, player: IPlayer){
    return await fetch(`http://localhost:8080/game/init?${hash}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        cache: "no-cache",
        body: JSON.stringify(player),
      }).then( res => {
          return res.json()
      }
      ).catch( error => console.log(error));
} */
//player con dos
export async function join(hash: string, playerId: string): Promise<any>{
  const body = {
    playerId
  };
    return await fetch(`http://localhost:8080/game/join/${hash}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        cache: "no-cache",
        body: JSON.stringify(body),
      }).then( res => {
          return res.json()
      }
      ).then(
        res => res.data
      ).catch( error => console.log(error));
}

export async function getStatus(hash: string): Promise<IGame>{
  return await fetch(`http://localhost:8080/game/status/${hash}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        cache: "no-cache",
      }).then( res => {
          return res.json()
      }
      ).then(
        res => res.data
      ).catch( error => console.log(error));
}

export async function update(hash: string, playerId: string, playerSymbol:string, cellPosition: number): Promise<any>{
  const body = {
    player: {
      id: playerId,
      symbol: playerSymbol
    },
    cellPosition
  };

  return await fetch(`http://localhost:8080/game/${hash}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      cache: "no-cache",
      body: JSON.stringify(body),
    }).then( res => {
      return res.json()
  }
  ).then(
    res => res.data
  ).catch( error => console.log(error));
}