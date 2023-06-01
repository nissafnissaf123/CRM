import React, { useState } from "react";
import { MoreHorizontal } from "react-feather";

import Card from "../Card/CardClient";
import Dropdown from "../DropDown/DropDown";
import CustomInput from "../CustomInput/CustomInput";



import { IBoard, ICard } from "../Interfaces/Kanban";

interface BoardProps {
  board: IBoard;
  addCard: (boardId: number, name: string) => void;
  removeBoard: (boardId: number) => void;
  removeCard: (boardId: number, cardId: string) => void;
  onDragEnd: (boardId: number, cardId: string) => void;
  onDragEnter: (boardId: number, cardId: string) => void;
  updateCard: (boardId: number, cardId: string, card: ICard) => void;
  projectId: string;
}


function Board(props: BoardProps) {
  const {
    board,
    addCard,
    removeBoard,
    removeCard,
    updateCard,
    onDragEnter,
    onDragEnd,
  } = props;
  const [showDropdown, setShowDropdown] = useState(false);

  
  const handleMoreButtonClick = () => {
    setShowDropdown(!showDropdown);
  };

 

  return (
    <div className="board"  onDragEnter={() => onDragEnter(board.id, "")}>
      <div className="board-inner " key={board?.id} >
        <div className="board-header " >
          <p className="board-header-title">
           {board?.title}
            <span>{board?.cards?.length || 0}</span>
            
          </p>
         
        </div>
        <div className="board-cards custom-scroll ">
          
          {board?.cards?.map((item) => (
            <Card
              key={item.id}
              card={item}
              boardId={board.id}
              removeCard={removeCard}
              updateCard={updateCard}
              onDragEnd={onDragEnd}
              onDragEnter={() => onDragEnter(board.id, item.id)}
            />
          ))}
          
      
        </div>
      </div>
    </div>
  );
}
export default Board;
