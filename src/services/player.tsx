import { IPlayer } from "../interface/player";

interface PlayerName {
    playerName: string
}

//agregar manejo de errores
export async function create( player: PlayerName): Promise<any>{
    return await fetch("http://localhost:8080/player/new", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        cache: "no-cache",
        body: JSON.stringify(player),
      }).then( res => {
          return res.json()
      }
      ).then(
        res => res.data
      ).catch( error => console.log(error));
};

export async function setSymbols( playerOneId: string, playerTwoId: string){
    const body = {
      players:
      {
        playerOneId,
        playerTwoId
      }
    }
    return await fetch("http://localhost:8080/player/symbol", {
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
      ).catch( error => console.log(error));
}

export async function get(id: string): Promise<IPlayer>{
  return await fetch(`http://localhost:8080/player/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      cache: "no-cache"
    }).then( res => {
      
        return res.json()
    }
    ).then(
      res => {        
        return res.data}
    ).catch( error => console.log(error));
}