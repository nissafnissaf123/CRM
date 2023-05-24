// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** React Imports
import { useState, forwardRef, Ref, useEffect, MouseEvent, useCallback, ReactElement } from 'react'
import { useParams } from 'react-router-dom'

import toast from 'react-hot-toast'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Next Imports
import Link from 'next/link'
import { GetStaticProps, InferGetStaticPropsType } from 'next/types'

// ** MUI Imports
import Box, { BoxProps } from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import Alert from '@mui/material/Alert'
import TextField from '@mui/material/TextField'
import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Drawer from '@mui/material/Drawer'
import CustomAvatar from 'src/@core/components/mui/avatar'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'

import { ThemeColor } from 'src/@core/layouts/types'
import { UsersType } from 'src/types/apps/userTypes'

// ** Custom Table Components Imports
import TableHeader from 'src/views/pages/user/list/TableHeader copy'
import AddUserDrawer from 'src/views/pages/user/list/AddUserDrawer'

// ** Icon Imports
import Icon from 'src/@core/components/icon'


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
    row: UsersType
  }
  
  interface Props {
    id: string;
  }
  const userStatusObj: UserStatusType = {
    active: 'success',
    pending: 'warning',
    inactive: 'secondary'
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
  
  const Transition = forwardRef(function Transition(
    props: FadeProps & { children?: ReactElement<any, any> },
    ref: Ref<unknown>
  ) {
    return <Fade ref={ref} {...props} />
  })
  
  // ** renders client column
  const renderClient = (row: UsersType) => {
    if (row.avatar) {
      return <CustomAvatar src={row.avatar} sx={{ mr: 3, width: 34, height: 34 }} />
    } else {
      return (
        <CustomAvatar
          skin='light'
          color={row.avatarColor || 'primary'}
          sx={{ mr: 3, width: 34, height: 34, fontSize: '1rem' }}
        >
          {getInitials(row.fullname ? row.fullname : 'John Doe')}
        </CustomAvatar>
      )
    }
  }



  const RowOptions = ({ id }: Props) => {


    // ** State
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  
    const rowOptionsOpen = Boolean(anchorEl)
  
    const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget)
    }
    const handleRowOptionsClose = () => {
      setAnchorEl(null)
    }
  
    //Get employee by id
  
    const [show, setShow] = useState<boolean>(false)
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [companyName, setCompanyName] = useState("");
    
    const [client, setClient] = useState
    ({
      id: "",
      fullname: "",
      user: { email: "" , username:""},
      phone: "",
      companyName: "",
     
     });
  
    
    useEffect(() => {
      const fetchEmployeeById = async () => {
        try {
          const response = await fetch(`http://localhost:4001/client/${id}`);
          const data = await response.json();
          setClient(data.client);
        } catch (error) {
          console.log(error);
        }
      };
      fetchEmployeeById();
    }, [id]);
    
  
  
    const handleEdit = useCallback(() => {
      setShow(true);
      setFullname(client.fullname);
      setEmail(client.user.email);
      setPhone(client.phone);
      setCompanyName(client.companyName);
      handleRowOptionsClose();
    }, [setShow, handleRowOptionsClose, client]);
  
  
     //Edit Employee by Id
     const handleUpdate = async () => {
      try {
        const response = await fetch(`http://localhost:4001/client/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullname: fullname,
            email: email,
            phone: phone,
            companyName: companyName,
          }),
        });
        const data = await response.json();
        console.log(data.client);
        
        // Alert si la modification a réussi
        if (response.ok) {
          alert("La modification a été effectuée avec succès !");
        } else {
          alert("La modification a échoué.");
        }
        
      } catch (error) {
        console.log(error);
        // Alert en cas d'erreur
        alert("Une erreur s'est produite. Veuillez réessayer plus tard.");
      }
    };
   
  
    return (
      <>
        <IconButton size='small' onClick={handleRowOptionsClick}>
          <Icon icon='mdi:dots-vertical' />
        </IconButton>
        <Menu
          keepMounted
          anchorEl={anchorEl}
          open={rowOptionsOpen}
          onClose={handleRowOptionsClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          PaperProps={{ style: { minWidth: '8rem' } }}
        >
          <MenuItem
            component={Link}
            sx={{ '& svg': { mr: 2 } }}
            onClick={handleRowOptionsClose}
            href={`/apps/user/view/overview/`}
          >
            <Icon icon='mdi:eye-outline' fontSize={20} />
            View
          </MenuItem>
          <MenuItem onClick={handleEdit}  sx={{ '& svg': { mr: 2 } }}>
            <Icon icon='mdi:pencil-outline' fontSize={20} />
            Edit
          </MenuItem>
      
        </Menu>
  
        <Dialog
          fullWidth
          open={show}
          maxWidth='sm'
          scroll='body'
          onClose={() => setShow(false)}
          TransitionComponent={Transition}
          onBackdropClick={() => setShow(false)}
        >
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
              onClick={() => setShow(false)}
              sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
            >
              <Icon icon='mdi:close' />
            </IconButton>
            <Box sx={{ mb: 8, textAlign: 'center' }}>
              <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
                Edit User Information
              </Typography>
              <Typography variant='body2'>Updating user details will receive a privacy audit.</Typography>
            </Box>
  
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <TextField fullWidth  label='FullName' value={fullname} onChange={(e) => setFullname(e.target.value)}  placeholder='John' ></TextField>
              </Grid>
  
              <Grid item xs={12}>
                <TextField fullWidth  label='Email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='John'   ></TextField>
              </Grid>
  
              <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name='number'
                      autoComplete='off'
                      label='Phone Number'
                      placeholder='00 000 000'
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    ></TextField>
                  </Grid>
  
                  <Grid item xs={12}>
                <TextField fullWidth  label='CompanyName' placeholder='' value={companyName} onChange={(e) => setCompanyName(e.target.value)}></TextField>
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
            <Button variant='contained' sx={{ mr: 2 }} onClick={handleUpdate}>
              Submit
            </Button>
            <Button variant='outlined' color='secondary' onClick={() => setShow(false)}>
              Discard
            </Button>
          </DialogActions>
        </Dialog>
      </>
    )
  }
  
  
  const columns: GridColDef[] = [
    {
      flex: 0.2,
      minWidth: 250,
      field: 'firstName',
      headerName: 'FullName',
      renderCell: ({ row }: CellType) => {
        const {user } = row
        const username = user?.email?.split('@')[0];
        return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderClient(row)}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <LinkStyled href='/apps/employees/view/overview/'>{row.fullname}</LinkStyled>
              <Typography noWrap variant='caption'>
                {`@${username}`}
              </Typography>
            </Box>
        </Box>
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 250,
      field: 'email',
      headerName: 'Email',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography noWrap variant='body2'>
           {row.user?.email}
          </Typography>
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 250,
      field: 'phone',
      headerName: 'phone',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography noWrap variant='body2'>
            {row.phone}
          </Typography>
        )
      }
    },
    
    
    {
      flex: 0.2,
      minWidth: 250,
      field: 'companyName',
      headerName: 'CompanyName ',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography variant='subtitle1' noWrap sx={{ textTransform: 'capitalize' }}>
            {row.companyName}
          </Typography>
        )
      }
    },
    
    {
      flex: 0.1,
      minWidth: 90,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }: CellType) => <RowOptions id={row.id} />
    }
  ]

const ListClient = () => {

  // ** State
  const [role, setRole] = useState<string>('')
  const [plan, setPlan] = useState<string>('')
  const [value, setValue] = useState<string>('')
  const [status, setStatus] = useState<string>('')
  const [addUserOpen, setAddUserOpen] = useState<boolean>(false)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

 

  

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


  //Get Clients
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  

  const fetchClients = () => {
    fetch("http://localhost:4001/client")
      .then(response => response.json())
      .then(data => {
        setClients(data.client);
        setFilteredClients(data.client);
      })
      .catch(error => {
        console.error(error);
      });
  }

  useEffect(() => {
    fetchClients()
  }, []);

  const handleFilter = (value: string) => {
    // Filter the employees list based on the input value
    const filteredClients = clients.filter((employee: UsersType) => {
      return employee.fullname.toLowerCase().includes(value.toLowerCase());
    });

    // Update the state with the filtered employees
    setFilteredClients(filteredClients);

    // Update the value of the search input field
    setValue(value);
  };

  return (
    <Grid container spacing={6}>
      
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Customers List' sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }} />
          <CardContent>
            <Grid container spacing={6}>
              
              
              
            </Grid>
          </CardContent>
          <Divider />
         
          <TableHeader value={value} handleFilter={handleFilter} toggle={toggleAddUserDrawer} />
          <DataGrid
            autoHeight
            rows={filteredClients}
            columns={columns}
            disableRowSelectionOnClick
            pageSizeOptions={[10, 25, 50]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
          />
        </Card>
      </Grid>

      <AddUserDrawer open={addUserOpen} toggle={toggleAddUserDrawer} />
    </Grid>
  )
}

export default ListClient
