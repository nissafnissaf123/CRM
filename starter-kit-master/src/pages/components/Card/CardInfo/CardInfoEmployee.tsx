import React, { useEffect, useState } from "react";
import { Calendar, CheckSquare, List, Tag, Trash, Type } from "react-feather";
import { colorsList } from "../../Helper/Util";
import CustomInput from "../../CustomInput/CustomInput";
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import Checkbox from '@mui/material/Checkbox'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableContainer from '@mui/material/TableContainer'
import Tooltip from '@mui/material/Tooltip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { AvatarGroup, Select } from "@mui/material";
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Switch from '@mui/material/Switch'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import FormControlLabel from '@mui/material/FormControlLabel'
import { EmployeesType } from "src/types/apps/employeeTypes";


// ** Icon Imports
import Icon from 'src/@core/components/icon'

import { ICard, ILabel, ITask } from "../../Interfaces/Kanban";

interface CardInfoProps {
  onClose: () => void;
  card: ICard;
  boardId: number;
  updateCard: (boardId: number, cardId: string, card: ICard) => void;
  text: string;
  onSubmit: (value: string) => void;
  displayClass?: string;
  editClass?: string;
  placeholder?: string;
  defaultValue?: string;
  buttonText?: string;
}
function CardInfo(props: CardInfoProps) {

  const {
    text,
    onSubmit,
    displayClass,
    editClass,
    placeholder,
    defaultValue,
    buttonText,
  } = props;

  const [isSectionOpen, setIsSectionOpen] = useState(false);
  const [areCheckboxesVisible, setAreCheckboxesVisible] = useState(false);

  // Get employees
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = () => {
    fetch("http://localhost:4001/employee")
      .then(response => response.json())
      .then(data => {
        setEmployees(data.employees);
        
     })
     .catch(error => {
       console.error(error);
     });
  }

  useEffect(() => {
    fetchEmployees()
  }, []);

  const { onClose, card, boardId, updateCard } = props;
  const [selectedColor, setSelectedColor] = useState("");
  const [cardValues, setCardValues] = useState<ICard>({
    ...card,
  });

  const [showSelect, setShowSelect] = useState(false);

  const updateTitle = (value: string) => {
    setCardValues({ ...cardValues, name: value });
  };

  const updateDesc = (value: string) => {
    setCardValues({ ...cardValues, description: value });
  };


  const addLabel = (label: ILabel) => {

      if (!cardValues.labels) {
        // Si cardValues.labels est undefined, initialisez-le avec un tableau vide
        setCardValues((prevCardValues) => ({
          ...prevCardValues,
          labels: [],
        }));
      }
    const index = cardValues.labels.findIndex(
      (item) => item.text === label.text,
    );
    if (index > -1) return; //if label text already exist then return

    setSelectedColor("");
    setCardValues({
      ...cardValues,
      labels: [...cardValues.labels, label],
    });
  };

  const removeLabel = (label: ILabel) => {
    const tempLabels = cardValues.labels.filter(
      (item) => item.text !== label.text,
    );

    setCardValues({
      ...cardValues,
      labels: tempLabels,
    });
  };


  
  const updateDate = (endDate: string) => {
    if (!endDate) return;
  
    const selectedDate = new Date(endDate); // Convertir la date en objet Date
  
    setCardValues({
      ...cardValues,
      endDate: selectedDate,
    });
    
  };
  
  useEffect(() => {
    if (updateCard) updateCard(boardId, cardValues.id, cardValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardValues]);



  const [inputText, setInputText] = useState(defaultValue || "");
  const [isCustomInput, setIsCustomInput] = useState(false);

  const submission = (e: any) => {
    e.preventDefault();
    if (inputText && onSubmit) {
      setInputText("");
      onSubmit(inputText);
    }
    setIsCustomInput(false);
  };


  
//Update employee
const [employee, setEmployee] = useState("");

const updateEmployee = (employeeId: string) => {
  setEmployee(employeeId); // Mettre à jour la valeur sélectionnée de l'employé

  const updatedEmployee = employees.find((dep) => dep.userId === employeeId);

  if (updatedEmployee) {
    // Mettre à jour l'employé dans le backend
    fetch(`http://localhost:4001/task/${cardValues.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ employeeId }),
    })
      .then(response => response.json())
      .then(data => {
        console.log("Employee updated:", data);
       
      })
      .catch(error => {
        console.error(error);
      });
  }

 
};

const [task, setTask]=useState({
  employee: { avatar: "" , fullname:""}
})
const getTaskById = () => {
  // Effectuez une requête pour récupérer la tâche spécifiée par son ID
  fetch(`http://localhost:4001/task/${cardValues.id}`)
    .then((response) => response.json())
    .then(data => {
      // Utilisez les données de la tâche
      
      setTask(data.task)
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });
};

useEffect(() => {
  getTaskById(); // Appeler la fonction pour récupérer les données de la tâche au chargement du composant
}, []);




  return (
    <Dialog fullWidth maxWidth='sm' scroll='body' open onClose={onClose}>
<DialogContent
           sx={{
            position: 'relative',
            pb: theme => `${theme.spacing(8)} !important`,
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <IconButton
            size='small'
            onClick={onClose}
            sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
          >
            <Icon icon='mdi:close'  />
          </IconButton>
          <Box sx={{ mb: 8, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
              Edit Task Information
            </Typography>
            <Typography variant='body2'>Updating Task details will receive a privacy audit.</Typography>
          </Box>

          
      
     
      <Grid container spacing={2}>
      <Grid item xs={8}>
      <TextField
    fullWidth
    sx={{ mb: 4 }}
    label="Name"
    id="outlined-name"
    defaultValue={cardValues.name}
    onChange={(event) => updateTitle(event.target.value)}
  />
      </Grid>
      <Grid item xs={4}>
        <FormControl fullWidth sx={{ mb: 4 }}>
         
        <TextField
  type="date"
  id="outlined-deadline"
  label="Deadline"
  InputLabelProps={{
    shrink: true,
  }}
  defaultValue={cardValues.endDate ? new Date(cardValues.endDate).toISOString().substr(0, 10) : ''}
   onChange={(event) => updateDate(event.target.value)}
  InputProps={{
    inputProps: {
      min: new Date().toISOString().substr(0, 10),
    },
  }}
 
/>

        </FormControl>
      </Grid>
    </Grid>

    <TextField
  fullWidth
  sx={{ mb: 4 }}
  label="Description"
  multiline
  rows={6}
  value={cardValues.description || ''}
  placeholder="Add a Description"
  onChange={(event) => updateDesc(event.target.value)}
/>

<div style={{marginTop:'-5px'}} className="cardinfo-box-title">
    <Tag />
    <p>Employees</p>

  </div>

    <p className="card-footer-item"  style={{marginTop:'-6px'}}>
    {task.employee && (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
    <CustomAvatar style={{marginRight: '0.5rem', width: '25px', height: '25px' }} src={task.employee.avatar} ></CustomAvatar>
    <Typography>{task.employee?.fullname}</Typography></Box>
  )}
   </p>
  

      
     

    
     
      </DialogContent>
    </Dialog>
  );
}

export default CardInfo;
