// ** React Imports
import { useState, useEffect, MouseEvent, useCallback, forwardRef, Ref, ReactElement } from 'react'

import ReactPlayer from 'react-player';

// ** Next Imports
import Link from 'next/link'
import { GetStaticProps, InferGetStaticPropsType } from 'next/types'
import toast from 'react-hot-toast'


// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Switch from '@mui/material/Switch'
import Dialog from '@mui/material/Dialog'
import Fade, { FadeProps } from '@mui/material/Fade'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Menu from '@mui/material/Menu'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import FormControlLabel from '@mui/material/FormControlLabel'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import Select, { SelectChangeEvent } from '@mui/material/Select'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import CardStatisticsHorizontal from 'src/@core/components/card-statistics/card-stats-horizontal'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'



// ** Third Party Components
import axios from 'axios'

// ** Types Imports
import { ThemeColor } from 'src/@core/layouts/types'
import { TicketsType } from 'src/types/apps/ticketTypes'
import { CardStatsHorizontalProps } from 'src/@core/components/card-statistics/types'

// ** Custom Table Components Imports
import TableHeader from 'src/views/pages/tickets/list/TableHeader copy'


interface UserRoleType {
  [key: string]: { icon: string; color: string }
}

interface UserStatusType {
  [key: string]: ThemeColor
}

// ** Vars
const userRoleObj: UserRoleType = {
  admin: { icon: 'mdi:laptop', color: 'error.main' },
  author: { icon: 'mdi:cog-outline', color: 'warning.main' },
  editor: { icon: 'mdi:pencil-outline', color: 'info.main' },
  maintainer: { icon: 'mdi:chart-donut', color: 'success.main' },
  subscriber: { icon: 'mdi:account-outline', color: 'primary.main' }
}

interface CellType {
  row: TicketsType
}

const userStatusObj: UserStatusType = {
  resolved: 'success',
  pending: 'warning',
  readonly: 'secondary'
}


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



interface UserLevelType {
  [key: string]: { icon: string; color: string }
}


// ** Vars
const userLevelObj: UserLevelType = {
  High: { icon: 'mdi:alert-circle', color: 'error.main' },
  Medium: { icon: 'mdi:alert', color: 'warning.main' },
  Low: { icon: 'mdi:cog-outline', color: 'info.main' },
};

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})


// ** renders client column
const renderClient = (row: TicketsType) => {
  if (row.client?.avatar) {
    return <CustomAvatar src={row.client?.avatar} sx={{ mr: 3, width: 34, height: 34 }} />
  } else {
    return (
      <CustomAvatar
        skin='light'
        color={row.avatarColor || 'primary'}
        sx={{ mr: 3, width: 34, height: 34, fontSize: '1rem' }}
      >
        {getInitials(row.client?.fullname ? row.client?.fullname : 'John Doe')}
      </CustomAvatar>
    )
  }
} 




const columns: GridColDef[] = [
  
  {
    flex: 0.1,
    field: 'name',
    minWidth: 150,
    headerName: 'ticket Name',

  },

  {
    flex: 0.15,
    minWidth: 230,
    field: 'fullName',
    headerName: 'Customer',
    renderCell: ({ row }: CellType) => {
      const { username } = row.client.user;
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {renderClient(row)}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            <LinkStyled href='/employee/view/'>{row.client?.fullname}</LinkStyled>
            <Typography noWrap variant='caption'>
              {row.client.user?.email}
            </Typography>
          </Box>
      </Box>
     
         
      )
    }
  },
  {
    flex: 0.1,
    field: 'emergencyLevel',
    minWidth: 150,
    headerName: 'emergencyLevel',
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 3, color: userLevelObj[row.emergencyLevel].color } }}>
          <Icon icon={userLevelObj[row.emergencyLevel].icon} fontSize={20} />
          <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
            {row.emergencyLevel}
          </Typography>
        </Box>
      )
    }
  },
  
 
 
  {
    flex: 0.1,
    minWidth: 110,
    field: 'status',
    headerName: 'Status',
    renderCell: ({ row }: CellType) => {
      return (
        <CustomChip
          skin='light'
          size='small'
          label={row.status}
          color={userStatusObj[row.status]}
          sx={{ textTransform: 'capitalize', '& .MuiChip-label': { lineHeight: '18px' } }}
        />
      )
    }
  },

  {
    flex: 0.1,
    field: 'createdAt',
    minWidth: 150,
    headerName: 'Date',
    renderCell: ({ row }: CellType) => {
      const date = new Date(row.createdAt);
      const day = date.getDate().toString().padStart(2, '0'); // Get the day and pad with leading zeros if necessary
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Get the month (+1 because it's zero-based) and pad with leading zeros if necessary
      const year = date.getFullYear(); // Get the year
  
      const dateString = `${day}-${month}-${year}`;
  
      return (
        <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
          {dateString}
        </Typography>
      );
    }
  },
  
  {
    flex: 0.1,
    minWidth: 90,
    sortable: false,
    field: 'actions',
    headerName: 'Actions',
    renderCell: ({ row }: CellType) => {
      const [showDialog, setShowDialog] = useState<boolean>(false);
      const [status, setStatus] = useState("");
      const [employee, setEmployee] = useState("");
      const [ticket, setTicket] = useState
  ({
    id: "",
    name:"",
    emergencyLevel: "",
    status: "",
    client: { fullname: "" },
    employee: {fullname:""},
    project:{name:""},
    video:"",
    description:""
    
   });
 

   useEffect(() => {
    const fetchTicketById = async () => {
      
      try {
        const response = await fetch(`http://localhost:4001/ticket/${row.id}`);
        const data = await response.json();
        setTicket(data.ticket);
        console.log(data.ticket)
      } catch (error) {
        console.log(error);
      }
    };
    fetchTicketById();
  }, [row.id]);

  const handleEdit = useCallback(() => {
    setShowDialog(true);
    setStatus(ticket.status);
  
  }, [setShowDialog, ticket]);

  

 
    const handleUpdate = async (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();

      
      try {
        const response = await fetch(`http://localhost:4001/ticket/${row.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: status,
           
     
          
          
          }),
        });
        const data = await response.json();
        console.log(data.ticket);
        console.log(employee)
       
        
        // Alert si la modification a réussi
        if (response.ok) {
          setShowDialog(false); // Close the dialog
          toast.success('Ticket updated successfully');
        } else {
          toast.error('An error occurred');
        }
        
      } catch (error) {
        console.log(error);
        // Alert en cas d'erreur
       toast.error("Une erreur s'est produite. Veuillez réessayer plus tard.");
      }
    };

    


   
    

      return (
      <>
      <IconButton onClick={handleEdit}>
        <Icon icon='mdi:eye-outline' />
      </IconButton>
      
        <Dialog
        open={showDialog}
        maxWidth='md'
        scroll='body'
        onClose={() => setShowDialog(false)}
        TransitionComponent={Transition}
        onBackdropClick={() => setShowDialog(false)}
      ><form onSubmit={handleUpdate}>
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
            onClick={() => setShowDialog(false)}
            sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
          >
            <Icon icon='mdi:close' />
          </IconButton>
          <Box sx={{ mb: 8, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
              View  Ticket Information
            </Typography>
            <Typography variant='body2'></Typography>
          </Box>
          
          <Grid container spacing={6}>
            <Grid item sm={6} xs={12}>
              <TextField fullWidth  label='Customer' name="fullname"    value={ticket.client?.fullname}   placeholder='John' />
            </Grid>
          
            <Grid item sm={6} xs={12}>
              <TextField fullWidth  label='Project Name' placeholder='Doe' name="name" value={ticket.project?.name} />
            </Grid>
            
            <Grid item sm={6} xs={12}>
              <TextField fullWidth  label='Ticket Name' name="name"    value={ticket.name} placeholder='johnDoe' />
            </Grid>
            
            <Grid item sm={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel  id='status-select'>Select Status</InputLabel>
                <Select
  inputProps={{ placeholder: 'Select Status' }} 
  fullWidth 
  labelId='status-select' 
  label='Select Status'
  value={status}
  name='status'
  onChange={(e) => setStatus(e.target.value)}
>
  <MenuItem value='pending'>pending</MenuItem>
  <MenuItem value='resolved'>resolved</MenuItem>
</Select>
              </FormControl>
            </Grid>
            
            <Grid item  xs={12}>
              <TextField
                fullWidth
                label='Ticket Description'
                value={ticket.descriprion}
                rows={4}
                multiline
                InputProps={{
                  style: {
                    height: 'auto'
                  }
                }}
              />
            </Grid>
           
            <Grid item sm={6} xs={12} >
  {ticket.video ? (
    <ReactPlayer url={ticket.video} controls style={{marginLeft:"75px"}} />
  ) : (
    <p>No video available !!</p>
  )}
</Grid>
            
           
          </Grid>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Button variant='contained' sx={{ mr: 2 }} type='submit'  >
            Submit
          </Button>
          <Button variant='outlined' color='secondary' onClick={() => setShowDialog(false)}>
            Discard
          </Button>
        </DialogActions>
       </form>
      </Dialog>
     
    </>
      )}
  }
]

const TicketList = () => {
  // ** State
  const [role, setRole] = useState<string>('')
  const [plan, setPlan] = useState<string>('')
  const [value, setValue] = useState<string>('')
  const [status, setStatus] = useState<string>('')
  
  const [addUserOpen, setAddUserOpen] = useState<boolean>(false)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })



  const handleFilter = useCallback((val: string) => {
    setValue(val)
  }, [])

  const handleRoleChange = useCallback((e: SelectChangeEvent) => {
    setRole(e.target.value)
  }, [])

  const handlePlanChange = useCallback((e: SelectChangeEvent) => {
    setPlan(e.target.value)
  }, [])

  const handleStatusChange = useCallback((e: SelectChangeEvent) => {
    setStatus(e.target.value)
  }, [])

  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)

  //Get Tickets
 

  const [tickets, setTickets] = useState([]);

useEffect(() => {
  fetchTickets();
}, []);

const fetchTickets = async () => {
    try {
      const response = await fetch('http://localhost:4001/ticket');
      if (response.ok) {
        const data = await response.json();
  
        // Récupération de l'ID de l'employé à partir du localStorage
        const userData = JSON.parse(localStorage.getItem('userData'));
        const employeeId = userData.id;
  
        console.log('Data:', data);
        console.log('Employee ID:', employeeId);
  
        // Filtrage des tickets pour ne récupérer que ceux correspondant à l'ID de l'employé
        const employeeTickets = data.tickets.filter(ticket => ticket.employeeId === userData.id);
  
        console.log('Employee Tickets:', employeeTickets);
  
        setTickets(employeeTickets);
      } else {
        console.error('Error fetching tickets:', response.status);
      }
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };

  return (
 
     
     <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title='Filters' />
            <CardContent>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id='tichet-status-select'>Ticket EmergencyLevel</InputLabel>

                    <Select
                      fullWidth
                   
                      sx={{ mr: 4, mb: 2 }}
                      label=' Ticket EmergencyLevel'
                      
                      labelId='Ticket-EmergencyLevel-select'
                    >
                      <MenuItem value=''>Hight</MenuItem>
                      <MenuItem value='downloaded'>Meduim</MenuItem>
                      <MenuItem value='draft'>Low</MenuItem>
                      
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                    <InputLabel id='invoice-status-select'>Ticket Status</InputLabel>

                    <Select
                      fullWidth
                   
                      sx={{ mr: 4, mb: 2 }}
                      label='Invoice Status'
                      
                      labelId='invoice-status-select'
                    >
                      <MenuItem value=''>Resolved</MenuItem>
                      <MenuItem value='downloaded'>Pending</MenuItem>
                      <MenuItem value='draft'>Readonly</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
       
          <DataGrid
            autoHeight
            rows={tickets}
            columns={columns}
           
            disableRowSelectionOnClick
            pageSizeOptions={[10, 25, 50]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
          />
        </Card>
      </Grid>

      
    </Grid>
  )
}



export default TicketList
