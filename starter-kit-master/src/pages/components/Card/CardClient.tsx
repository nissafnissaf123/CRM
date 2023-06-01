import React, { useState, useEffect } from "react";
import { AlignLeft, CheckSquare, Clock, MoreHorizontal } from "react-feather";
import { formatDate } from "../Helper/Util";
import Chip from "../Common/chip";
import Dropdown from "../DropDown/DropDown";
import { ICard } from "../Interfaces/Kanban";
import { useRouter } from "next/router";
import CustomAvatar from 'src/@core/components/mui/avatar'



import CardInfo from "./CardInfo/CardInfoClient";
interface CardProps {
  card: ICard;
  boardId: number;
  removeCard: (boardId: number, cardId: string) => void;
  updateCard: (boardId: number, cardId: string, card: ICard) => void;
  onDragEnd: (boardId: number, cardId: string) => void;
  onDragEnter: (boardId: number, cardId: string) => void;
}

function Card(props: CardProps) {
  const {  card, boardId, removeCard, updateCard, onDragEnd, onDragEnter } =
    props;
  const { id, name, description, endDate,  labels , employee} = card;
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);

 


  const handleDragEnd = () => {
    onDragEnd(boardId, id);
  };

  const handleDragEnter = () => {
    onDragEnter(boardId, id);
  };

  const renderTaskIcon = () => {
    if (card.status === "Done") {
      return <CheckSquare className="card-footer-icon" style={{ color: "#00FF00" }} />;
    } 
    
  };

  const getIconColor = () => {
    const currentDate = new Date();
    const cardEndDate = new Date(endDate);

    const differenceInDays = Math.floor(
      (cardEndDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24)
    );

    if (differenceInDays > 3) {
      return "#00FF00"; // Couleur verte pour une date éloignée
    } else if (differenceInDays > 0) {
      return "orange"; // Couleur orange pour une date proche
    } else {
      return "red"; // Couleur rouge pour une date passée
    }
  };

 
 



  return (
    <>
      {showModal && (
        <CardInfo
          onClose={() => setShowModal(false)}
          card={card}
          boardId={boardId}
          updateCard={updateCard}
        />
      )}
      
      <div
        className="card"
        key={card.id}
        draggable
        onDragEnd={handleDragEnd}
        onDragEnter={handleDragEnter}
        onClick={() => setShowModal(true)}
        style={{ height: '160px' }}
        
      >
        <div className="card-top">
          <div className="card-top-labels">
            {labels?.map((item, index) => (
              <Chip key={index} item={item} />
            ))}
          </div>
         
        </div>
        
        <div className="card-title">{name}</div>
        <div>
          <p style={{marginTop:"10px"}} title={description}>
            <AlignLeft />
          </p>
        </div>
        <div  className="card-footer" style={{marginTop:'-12px'}} >
        {endDate && (
        <p  style={{ color: getIconColor()  }} className="card-footer-item">
          <Clock
            className="card-footer-icon"
            
          />
          {formatDate(endDate)}
        </p>
      )}


     
          <p  className="card-footer-item">
       
            {renderTaskIcon()}
      
          </p>
      
      
       
        
          
        </div>
      </div>
  
    </>
  );
}

export default Card;
