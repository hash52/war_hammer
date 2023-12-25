import { FC, PropsWithChildren, createContext, useContext, useState } from "react";
import { PlayerId } from "../types/Player";
import { Fighter } from "../types/fighter";


type GameInfo = {
  whichTurn: PlayerId;
  whichWon?: PlayerId;
  maxTurnNum: number;
  currentTurnNum: number;
  selectedFighterId?: number;
  setSelectedFighter: (fighterId: number | undefined) => void;
  targetFighter?: number;
  setTargetFighter: (fighterId: number | undefined) => void;
  switchTurn: () => void;
}

const GameInfoContext = createContext<GameInfo | null>(null);

export const GameInfoProvider: FC<PropsWithChildren> = ({ children }) => {
  const maxTurnNum = 10;
  const [currentTurnNum, setCurrentTurnNum] = useState(1);
  //NOTE: playerに持たせるべき・・？？考え中
  const [whichWon, setWhichWon] = useState<PlayerId>();
  const [whichTurn, setWhichTurn] = useState<PlayerId>("A");
  const [selectedFighter, setSelectedFighter] = useState<number | undefined>();
  const [targetFighter, setTargetFighter] = useState<number | undefined>();

  const switchTurn = () => {
    if (whichTurn === "A") {
      setWhichTurn("B");
    } else {
      setWhichTurn("A");
      setCurrentTurnNum((prevTurnNum) => prevTurnNum + 1);
    }
  }

  const value: GameInfo = {
    whichTurn,
    maxTurnNum,
    currentTurnNum,
    selectedFighterId: selectedFighter,
    setSelectedFighter,
    targetFighter,
    setTargetFighter,
    switchTurn
  }

  return (<GameInfoContext.Provider value={value}>
    {children}
  </GameInfoContext.Provider>)
}

export const useGameInfo = () => {
  const value = useContext(GameInfoContext);
  if (!value)
    throw new Error(
      "useGameInfo must be called in GameInfoProvider."
    );
  return value;
}