// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { useRouter } from 'next/router';

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
import { EmployeesType } from 'src/types/apps/employeeTypes'

// ** Custom Table Components Imports
import TableHeader from 'src/views/pages/employees/list/TableHeader'
import AddUserDrawer from 'src/views/pages/employees/list/AddUserDrawer'

// ** Icon Imports
import Icon from 'src/@core/components/icon'


interface UserRoleType {
    [key: string]: { icon: string; color: string }
  }
  
  interface UserStatusType {
    [key: string]: ThemeColor
  }
  
  
  // ** Vars
  interface CellType {
    row: EmployeesType
  }
  
  interface Props {
    userId: string;
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
  const renderClient = (row: EmployeesType) => {
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



const RowOptions = ({ userId }: Props) => {


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
    const [department, setDepartment] = useState("");
    const [departments, setDepartments] = useState([]);
    const [departmentId, setDepartmentId] = useState('');
    const [employee, setEmployee] = useState({
      id: "",
      fullname: "",
      user: { email: "" , username:""},
      phone: "",
      department:{ id:"" , name:""}
    });
    
    //Get employee by userid
    useEffect(() => {
      fetch(`http://localhost:4001/employee/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          setEmployee(data.employee);
        })
        .catch((error) => {
          console.error(error);
        });
    }, [userId]);
   
  
  

    //Get department
     const fetchDepartments = () => {
      fetch("http://localhost:4001/department")
        .then(response => response.json())
        .then(data => {
          setDepartments(data.departments);
        })
        .catch(error => {
          console.error(error);
        });
    };
  
    useEffect(() => {
      fetchDepartments()
    }, []);
  
    const router = useRouter();
    const handleKanbanClick = () => {
      router.push(`/admin/view/${userId}`);
    };
  
   
    
    const handleEdit = useCallback(() => {
      setShow(true);
      setFullname(employee.fullname);
      setEmail(employee.user?.email);
      setPhone(employee.phone);
      setDepartmentId(employee.department?.id);
      handleRowOptionsClose();
    }, [setShow, handleRowOptionsClose, employee]);
    

    const handleUpdate = async (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();

      
      try {
        const response = await fetch(`http://localhost:4001/employee/${userId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
           fullname: fullname,
            email: email,
            phone:phone,
            departmentId: departmentId,

          }),
        });
        const data = await response.json();
        console.log(data.employee);
        console.log(employee)
       
        
        // Alert si la modification a réussi
        if (response.ok) {
          setShow(false); // Close the dialog
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
            href={`/admin/view/${userId}`}
          >
            <Icon icon='mdi:eye-outline'    fontSize={20} />
            View
          </MenuItem>
          <MenuItem  onClick={handleEdit}  sx={{ '& svg': { mr: 2 } }}>
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
              
            <FormControl fullWidth sx={{ mb: 6 }}>
    <InputLabel id="departement-select">Select Department</InputLabel>
    <Select
      fullWidth
      id="select-departement"
      label="Select Department"
      labelId="departement-select"
      inputProps={{ placeholder: "Select Department" }}
      value={departmentId} // Use the department property of the employee state
      onChange={(e) => setDepartmentId(e.target.value)}
    >
      {departments.map((dep) => (
        <MenuItem key={dep.id} value={dep.id}>{dep.name}</MenuItem> // Use dep.id as the value
      ))}
    </Select>
  </FormControl> </Grid>
  
  
  
              </Grid>
            
          
          </DialogContent>
          <DialogActions
            sx={{
              justifyContent: 'center',
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
              pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
            }}
          >
            <Button variant='contained' sx={{ mr: 2 }} type='submit' >
              Submit
            </Button>
            <Button variant='outlined' color='secondary' onClick={() => setShow(false)}>
              Discard
            </Button>
          </DialogActions>
          </form>
        </Dialog>
      </>
    )
  }
  
  const columns: GridColDef[] = [
    {
      flex: 0.15,
      minWidth: 150,
      field: 'fullName',
      headerName: 'FullName',
      renderCell: ({ row }: CellType) => {

        const [employee, setEmployee] = useState(null);
        const userId = row.userId;

        useEffect(() => {
          fetch(`http://localhost:4001/employee/${userId}`)
            .then((response) => response.json())
            .then((data) => {
              setEmployee(data.employee);
            })
            .catch((error) => {
              console.error(error);
            });
        }, [userId]);
        
        const {user } = row
        
        const router = useRouter();
        const handleKanbanClick = () => {
          router.push(`/admin/view/${row.userId}`);
        };
        return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderClient(row)}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <LinkStyled href={`/admin/view/${row.userId}`} onClick={handleKanbanClick}>{row.fullname}</LinkStyled>
              <Typography noWrap variant='caption'>
                {`@${user.username}`}
              </Typography>
            </Box>
        </Box>
        )
      }
    },
   
    
    {
      flex: 0.15,
      minWidth: 150,
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
      flex: 0.13,
      minWidth: 150,
      field: 'phone',
      headerName: 'Phone',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography noWrap variant='body2'>
            {row.phone}
          </Typography>
        )
      }
    },
    
    
    {
      flex: 0.15,
      minWidth: 150,
      field: 'name',
      headerName: 'department',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography variant='subtitle1' noWrap sx={{ textTransform: 'capitalize' }}>
          {row.department?.name}
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
      renderCell: ({ row }: CellType) => <RowOptions   userId={row.userId} />
    }
  ]

const ListEmployee = () => {

    // ** State
  const [role, setRole] = useState<string>('')
  const [plan, setPlan] = useState<string>('')
  const [department, setDepartment] = useState('')
  const [value, setValue] = useState<string>('')
  const [status, setStatus] = useState<string>('')
  const [addUserOpen, setAddUserOpen] = useState<boolean>(false)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  

  const Header = styled(Box)<BoxProps>(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(3, 4),
    justifyContent: 'space-between',
    backgroundColor: theme.palette.background.default
  }))

  

 
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

  
  const handleClose = () => {
    setAddUserOpen(false);
  }

  //Get Employees
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [name, setName] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [employee, setEmployee] = useState({ email:'', fullname:'', phone:'', department: {name:" "}, avatar:''})


  // Get employees

  const fetchEmployees = () => {
    fetch("http://localhost:4001/employee")
      .then((response) => response.json())
      .then((data) => {
        setEmployees(data.employees);
        setFilteredEmployees(data.employees);
        console.log(data.employees);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  //Get departments

  const fetchDepartments = () => {
    fetch("http://localhost:4001/department")
      .then(response => response.json())
      .then(data => {
        setDepartments(data.departments);
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchDepartments()
  }, []);


  //Post employee

  const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
  
    const { email, fullname, phone } = employee;
    if (email && fullname && phone && department) {
      const newEmployee = { ...employee, departmentId: department };
      fetch("http://localhost:4001/employee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEmployee),
      })
        .then((res) => res.json())
        .then(() => {
          handleClose();
          toast.success('Employee added successfully');
        })
        .catch((error) => {
          handleClose();
          console.error(error);
          toast.error('Failed to add employee'); // Display error toast notification
        });
    } else {
      handleClose();
      toast.error("Please fill out all the fields"); // Display error toast notification
    }
  };
  
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const {name, value} = e.target
    setEmployee({
        ...employee,
        [name]: value
    })
}




const handleDepartmentFilter = (value: string) => {
  const trimmedValue = value.trim();
  if (trimmedValue === '') {
    setFilteredEmployees(employees);
  } else {
    const filtered = employees.filter((employee: EmployeeType) => employee.department?.id === trimmedValue);
    setFilteredEmployees(filtered);
  }
};

  const handleFilter = (value: string) => {
    // Filter the employees list based on the input value
    const filteredEmployees = employees.filter((employee: EmployeesType) => {
      return employee.fullname.toLowerCase().includes(value.toLowerCase());
    });

    // Update the state with the filtered employees
    setFilteredEmployees(filteredEmployees);

    // Update the value of the search input field
    setValue(value);
  };

  return (
    <Grid container spacing={6}>
         
      <Grid item xs={12}>    
   

           <br/>
        <Card>
          <CardHeader title='Employees List' sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }} />
          <CardContent>
            <Grid container spacing={6}>
          
            </Grid>
          </CardContent>
          <Divider />

          <TableHeader value={value} handleFilter={handleFilter} handleDepartmentFilter={handleDepartmentFilter} toggle={toggleAddUserDrawer} filteredEmployees={filteredEmployees} setFilteredEmployees={setFilteredEmployees} />
           <DataGrid
            autoHeight
            rows={filteredEmployees} 
            columns={columns}
            disableRowSelectionOnClick
            pageSizeOptions={[10, 25, 50]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
          />
        </Card>
      </Grid>
      
      <Drawer
      open={addUserOpen}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography variant='h6'>Add Employee</Typography>
        <IconButton size='small' onClick={handleClose} sx={{ color: 'text.primary' }}>
          <Icon icon='mdi:close' fontSize={20} />
        </IconButton>
      </Header>
      <Box sx={{ p: 5 }}>
        <form onSubmit={handleSubmit} >
          <FormControl fullWidth sx={{ mb: 6 }}>
           
                <TextField
               
                  label='FullName'
                  onChange={handleChange}
                  placeholder='John Doe'
                  value={employee.fullname}
                  name='fullname'
                />
            
          </FormControl>

          <FormControl fullWidth sx={{ mb: 6 }}>
           
                <TextField
               
                  label='Email'
                  onChange={handleChange}
                  placeholder='after@gmail.com'
                  value={employee.email}
                  name='email'
                />
            
          </FormControl>

          

          <FormControl fullWidth sx={{ mb: 6 }}>
           
                <TextField
               
                  label='Phone'
                  onChange={handleChange}
                  placeholder='95 071 382'
                 type='number'
                 value={employee.phone}
                  name='phone'
                />
            
          </FormControl>

          <FormControl fullWidth sx={{ mb: 6 }}>
  <InputLabel id="departement-select">Select Department</InputLabel>
  <Select
    fullWidth
    id="select-departement"
    label="Select Department"
    labelId="departement-select"
    inputProps={{ placeholder: "Select Department" }}
    value={department}
    onChange={(e: SelectChangeEvent) => setDepartment(e.target.value)}
  >
    {departments.map((dep) => (
      <MenuItem key={dep.id} value={dep.id}>{dep.name}</MenuItem> // Use dep.id as the value
    ))}
  </Select>
</FormControl>

         
         
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button size='large' type='submit' variant='contained' sx={{ mr: 3 }}>
              Submit
            </Button>
        
            <Button size='large' variant='outlined' color='secondary' onClick={handleClose}>
              Cancel
            </Button>
          
      
          </Box>
        </form>
      </Box>
    </Drawer>
      
      
    </Grid>
  )
}

export default ListEmployee
