import React, { useEffect, useState } from "react";
import Board from "src/pages/components/Board/Board";
import CustomInput from "src/pages/components/CustomInput/CustomInput";
import { ICard, IBoard } from "src/pages/components/Interfaces/Kanban";
import { fetchBoardList, updateLocalStorageBoards } from "src/pages/components//Helper/APILayers";
import { ProjectListDataType } from 'src/types/apps/userTypes'
import { useRouter } from "next/router";


// ** Next Import
import Link from 'next/link'
import { styled } from '@mui/material/styles'


// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'
import Typography from '@mui/material/Typography'




function Dashboard() {

  //Get projet by ID
  const router = useRouter();
  const { id } = router.query;

   const [project, setProject] = useState
   ({
    name:"",
    
  });
  const [projectId, setProjectId] = useState("");

      useEffect(() => {
        const fetchProjectById = async () => {
          try {
            const response = await fetch(`http://localhost:4001/project/${id}`);
            const data = await response.json();
            setProject(data.project);
            setProjectId(data.project.id);
            const tempBoardsList = [...boards];

            // Parcourez les cartes du projet de manière asynchrone
            await Promise.all(
              data.project.tasks.map(async (task: ICard) => {
                // Trouvez le tableau correspondant en fonction du statut de la carte
                const boardIndex = tempBoardsList.findIndex(
                  (item: IBoard) => item.title === task.status
                );
        
                // Si le tableau existe, ajoutez la carte à ce tableau
                if (boardIndex !== -1) {
                  tempBoardsList[boardIndex].cards.push(task);
                }
              })
            );
        
            setBoards(tempBoardsList);
          } catch (error) {
            console.log(error);
          }
        };
        fetchProjectById();
      }, [id]);


  //Board
  const [boards, setBoards] = useState<IBoard[]>([
    {
      id: 1,
      title: "Todo",
      cards: [],
      
    },
    {
      id: 2,
      title: "Doing",
      cards: [],
  
    },
    {
      id: 3,
      title: "Done",
      cards: [],
     
    },
  ]);



  

  const addboardHandler = (name: string) => {
    const tempBoardsList = [...boards];
    tempBoardsList.push({
      id: Date.now() + Math.random() * 2,
      title: name,
      cards: [],
     
    });
    setBoards(tempBoardsList);
  };

  const removeBoard = (boardId: number) => {
    const boardIndex = boards.findIndex((item: IBoard) => item.id === boardId);
    if (boardIndex < 0) return;

    const tempBoardsList = [...boards];
    tempBoardsList.splice(boardIndex, 1);
    setBoards(tempBoardsList);
  };


 // Card
 const addCardHandler = async (boardId: number, name: string) => {
  const boardIndex = boards.findIndex((item: IBoard) => item.id === boardId);
  if (boardIndex < 0) return;

  const tempBoardsList = [...boards];

  // Créez l'objet de la carte avec les données, y compris l'ID du projet
  const newCard = {
    name,
    projectId: projectId, // Assurez-vous que projectId est correctement défini
    status: tempBoardsList[boardIndex].title, // Ajoutez le statut du tableau à la carte

  };

  
  // Ajoutez la carte localement dans le tableau des cartes du tableau
  tempBoardsList[boardIndex].cards.push(newCard);
  setBoards(tempBoardsList);

  try {
    // Envoyez la requête POST au backend pour enregistrer la carte
    const response = await fetch("http://localhost:4001/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCard),
    });

    if (!response.ok) {
      throw new Error("Failed to add card");
    }
  } catch (error) {
    console.log(error);
    // Gérez les erreurs de requête POST ici
  }
};

// removeCard
// removeCard
const removeCard = async (boardId: number, cardId: string) => {
  const boardIndex = boards.findIndex((item: IBoard) => item.id === boardId);
  if (boardIndex < 0) return;

  const tempBoardsList = [...boards];
  const cards = tempBoardsList[boardIndex].cards;

  const cardIndex = cards.findIndex((item) => item.id === cardId);
  if (cardIndex < 0) return;

  cards.splice(cardIndex, 1);
  setBoards(tempBoardsList);

  try {
    // Envoyez la requête DELETE au backend pour supprimer la carte
    const response = await fetch(`http://localhost:4001/task/${cardId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to remove card");
    }
  } catch (error) {
    console.log(error);
    // Gérez les erreurs de requête DELETE ici
  }
};

// updateCard
const updateCard = async (boardId: number, cardId: string, updatedCard: ICard) => {
  const boardIndex = boards.findIndex((item) => item.id === boardId);
  if (boardIndex < 0) return;

  const tempBoardsList = [...boards];
  const cards = tempBoardsList[boardIndex].cards;

  const cardIndex = cards.findIndex((item) => item.id === cardId);
  if (cardIndex < 0) return;

  tempBoardsList[boardIndex].cards[cardIndex] = updatedCard;
  setBoards(tempBoardsList);

  try {
    const response = await fetch(`http://localhost:4001/task/${cardId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedCard),
    });

    if (!response.ok) {
      throw new Error("Failed to update card");
    }
  } catch (error) {
    console.log(error);
    // Afficher un message d'erreur ou effectuer un traitement supplémentaire ici
  }
};

const LinkStyled = styled(Link)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '1rem',
  cursor: 'pointer',
  textDecoration: 'none',
  color: theme.palette.text.secondary,
  '&:hover': {
    color: theme.palette.primary.main
  }
}))
  

//Drag 

const [targetCard, setTargetCard] = useState({
  boardId: 0,
  cardId: "", // Updated type to string
});




const onDragEnd = async (boardId: number, cardId: string) => {
  const sourceBoardIndex = boards.findIndex((item: IBoard) => item.id === boardId);
  if (sourceBoardIndex < 0) return;

  const sourceCardIndex = boards[sourceBoardIndex]?.cards?.findIndex(
    (item) => item.id === cardId,
  );
  if (sourceCardIndex < 0) return;

  const targetBoardIndex = boards.findIndex((item: IBoard) => item.id === targetCard.boardId);
  if (targetBoardIndex < 0) return;

  const targetCardIndex = boards[targetBoardIndex]?.cards?.findIndex(
    (item) => item.id === targetCard.cardId,
  );
  if (targetCardIndex < 0) return;

  const tempBoardsList = [...boards];

  const sourceCard = tempBoardsList[sourceBoardIndex].cards[sourceCardIndex];
  sourceCard.status = tempBoardsList[targetBoardIndex].title; // Mettre à jour le statut de la carte avec le statut du tableau cible
  tempBoardsList[sourceBoardIndex].cards.splice(sourceCardIndex, 1);
  tempBoardsList[targetBoardIndex].cards.splice(targetCardIndex, 0, sourceCard);
  setBoards(tempBoardsList);

  try {
    // Enregistrer la modification du statut de la carte dans le backend
    const response = await fetch(`http://localhost:4001/task/${cardId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: sourceCard.status }), // Utilisez sourceCard.status pour mettre à jour le statut de la carte
    });

    if (!response.ok) {
      throw new Error("Failed to update card status");
    }
  } catch (error) {
    console.log(error);
    // Gérez les erreurs de requête PATCH ici
  }

  setTargetCard({
    boardId: 0,
    cardId: "", // Réinitialisez l'état targetCard après l'opération de glisser-déposer
  });
};

const onDragEnter = (boardId: number, cardId: string) => {
  if (targetCard.cardId === cardId) return;
  setTargetCard({
    boardId: boardId,
    cardId: cardId,
  });
};

  return (
    <div style={{marginTop:'20px'}} className="app">
      <div className="app-nav">
      <PageHeader
    
    title={<Typography variant='h6'>Project Name :<LinkStyled  href='/apps/user/view/overview/'> {project.name}</LinkStyled> </Typography>}
    
  />
      </div>
      <div className="app-boards-container"   >
        <div   className="app-boards" >
          {boards.map((item) => (
            <Board
              key={item.id}
              board={item}
              projectId={projectId}
              addCard={addCardHandler}
              removeBoard={ removeBoard}
              removeCard={removeCard}
              updateCard={updateCard}
              onDragEnd={onDragEnd}
              onDragEnter={onDragEnter}
            
            />
          ))}
          <div style={{marginTop:'-12px'}} className="app-boards-last">
            <CustomInput
              displayClass="app-boards-add-board"
              editClass="app-boards-add-board-edit"
              placeholder="Enter Board Name"
              text="Add Board"
              buttonText="Add Board"
              onSubmit={addboardHandler}
              
            />
          </div>
        </div>
      </div>
    </div>
  );
}



export default Dashboard;
