// ** React Imports
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import IconButton from '@mui/material/IconButton'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import Dialog from '@mui/material/Dialog'
import Select from '@mui/material/Select'
import Tooltip from '@mui/material/Tooltip';
import Switch from '@mui/material/Switch'
import Divider from '@mui/material/Divider'
import AvatarGroup from '@mui/material/AvatarGroup'
import Avatar from '@mui/material/Avatar'
import MenuItem from '@mui/material/MenuItem'
import CardHeader from '@mui/material/CardHeader'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import InputAdornment from '@mui/material/InputAdornment'
import LinearProgress from '@mui/material/LinearProgress'
import FormControlLabel from '@mui/material/FormControlLabel'
import DialogContentText from '@mui/material/DialogContentText'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'


// ** Types
import { ThemeColor } from 'src/@core/layouts/types'
import { UsersType } from 'src/types/apps/userTypes'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

interface ColorsType {
  [key: string]: ThemeColor
}

// ** Type Imports
import { ProjectListDataType } from 'src/types/apps/userTypes'

interface CellType {
  row: ProjectListDataType
}

interface Props {
  userId: string;
}

const data: UsersType = {
  id: 1,
  role: 'admin',
  status: 'active',
  username: 'gslixby0',
  avatarColor: 'primary',
  country: 'El Salvador',
  company: 'Yotz PVT LTD',
  contact: '(479) 232-9151',
  currentPlan: 'enterprise',
  fullName: 'Daisy Patterson',
  email: 'gslixby0@abc.net.au',
  avatar: '/images/avatars/4.png'
}

//Get User By ID

const roleColors: ColorsType = {
  admin: 'error',
  editor: 'info',
  author: 'warning',
  maintainer: 'success',
  subscriber: 'primary'
}

const statusColors: ColorsType = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
}

// ** Styled <sup> component
const Sup = styled('sup')(({ theme }) => ({
  top: '0.2rem',
  left: '-0.6rem',
  position: 'absolute',
  color: theme.palette.primary.main
}))

// ** Styled <sub> component
const Sub = styled('sub')({
  fontWeight: 300,
  fontSize: '1rem',
  alignSelf: 'flex-end'
})

const Img = styled('img')(({ theme }) => ({
    width: 32,
    height: 32,
    borderRadius: '50%',
    marginRight: theme.spacing(3)
  }))

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

  
  const getIconSrc = (framework) => {
    if (framework === null) {
      // Return a default icon source path if the framework is null
      return '/images/icons/project-icons/default.png';
    }
  
    const lowercasedFramework = framework.toLowerCase();
  
    if (lowercasedFramework.includes('react')) {
      return '/images/icons/project-icons/react.png';
    } else if (lowercasedFramework.includes('vue')) {
      return '/images/icons/project-icons/vue.png';
    } else if (lowercasedFramework.includes('angular')) {
      return '/images/icons/project-icons/angular.png';
    }
  
    // Return a default icon source path if no matching keywords are found
    return '/images/icons/project-icons/default.png';
  };

  const columns: GridColDef[] = [
    {
      flex: 0.15,
      minWidth: 230,
      field: 'name',
      headerName: 'Project',
      
      renderCell: ({ row }: CellType) => {
        
  
     return(
      <>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
           {getIconSrc(row.framework) && (
            <Img src={getIconSrc(row.framework)} alt="Project Icon" style={{ marginLeft: '10px' }} />
          )}
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <LinkStyled href='' sx={{ fontWeight: 500, fontSize: '0.875rem' }} >{row.name}</LinkStyled >
            <Typography variant='caption' sx={{ color: 'text.disabled' }}>
             {row.framework}
            </Typography>
          </Box> 
        </Box>
  
        
      </>
      )}
    },
    {
      flex: 0.12,
      field: 'team',
      minWidth: 120,
      headerName: 'Team',
      renderCell: ({ row }: CellType) => {
        const [tasks, setTasks] = useState([]);
  
        useEffect(() => {
          const fetchTasksByProjectId = async () => {
            try {
              const response = await fetch(`http://localhost:4001/project/${row.id}/tasks`);
              const data = await response.json();
              setTasks(data.tasks);
            } catch (error) {
              console.log(error);
            }
          };
          fetchTasksByProjectId();
        }, [row.id]);
  
        
        const [displayedEmployees, setDisplayedEmployees] = useState([]);
  
        useEffect(() => {
          const displayedEmployeeIds = new Set();
        
          setDisplayedEmployees(
            tasks.reduce((employees, task) => {
              if (task.employee && !displayedEmployeeIds.has(task.employee.id)) {
                displayedEmployeeIds.add(task.employee.id);
                employees.push(task.employee);
              }
              return employees;
            }, [])
          );
        }, [tasks]);
  
        return(
          <AvatarGroup className='pull-up' sx={{ '& .MuiAvatar-root': { width: '25px',fontSize: '15px', height: '25px' } }} >
           {displayedEmployees.map((employee) => (
         <Tooltip title={employee.fullname} key={employee.id}>
         <Avatar
           style={{ width: '25px', height: '25px' }}
           alt={employee.fullname}
           src={employee.avatar}
         />
       </Tooltip>
      ))}
        </AvatarGroup>
      )}
    },
    {
      flex: 0.15,
      minWidth: 200,
      headerName: 'Progress',
      field: 'Progress',
      renderCell: ({ row }: CellType) => {
  
        const [project, setProject] = useState
    ({
      id: "",
      progress: "",
     
     
     });
  
        useEffect(() => {
          const fetchProjectById = async () => {
            try {
              const response = await fetch(`http://localhost:4001/project/${row.id}`);
              const data = await response.json();
              setProject(data.project);
            } catch (error) {
              console.log(error);
            }
          };
          fetchProjectById();
        }, [row.id]);
  
        const getColorByProgress = (progress) => {
          if (progress >= 80) {
            return 'success';
          } else if (progress >= 30) {
            return 'warning';
          } else {
            return 'error';
          }
        };
  
        return(
        <Box sx={{ width: '100%' }}>
          <Typography variant='body2'>{project.progress}%</Typography>
          <LinearProgress
            variant='determinate'
            value={project.progress}
            color={getColorByProgress(project.progress)}
            sx={{ height: 6, mt: 1, borderRadius: '5px' }}
          />
        </Box>
        )
        }
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'endDate',
      headerName: 'Deadline',
      renderCell: ({ row }: CellType) => {
  
      
        
        const date = new Date(row.endDate);
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
  
    
    
  ]

const UserViewLeft = () => {
  // ** States
  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const [openPlans, setOpenPlans] = useState<boolean>(false)
  const [suspendDialogOpen, setSuspendDialogOpen] = useState<boolean>(false)
  const [subscriptionDialogOpen, setSubscriptionDialogOpen] = useState<boolean>(false)

  // Handle Edit dialog
  const handleEditClickOpen = () => setOpenEdit(true)
  const handleEditClose = () => setOpenEdit(false)

  // Handle Upgrade Plan dialog
  const handlePlansClickOpen = () => setOpenPlans(true)
  const handlePlansClose = () => setOpenPlans(false)

   // ** State
   const [value, setValue] = useState<string>('')
   const [data, setData] = useState<ProjectListDataType[]>([])
   const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 })

   const router = useRouter();
   const { userId } = router.query;
   
   const [employee, setEmployee] = useState({
    fullname:"",
    user:{email:"", username:""},
    phone:"",
    department:{name:""},
    departmentRole:"",
    adresse:"",

  });
   

   useEffect(() => {
     fetch(`http://localhost:4001/employee/${userId}`)
       .then((response) => response.json())
       .then((data) => {
         setEmployee(data.employee);
         console.log(data.employee);
         console.log(userId)
       })
       .catch((error) => {
         console.error(error);
       });
   }, [ ]);


  const [projects, setProjects] = useState([]);

useEffect(() => {
  fetchProjects();
}, []);

   const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:4001/project'); 
      if (response.ok) {
        const data = await response.json();
        console.log(data) 
        
  
         // Filtrage des projets pour ne récupérer que ceux correspondant à l'ID de l'employé
         const employeeProjects = data.projects.filter((project) => {
          console.log(project.tasks); // Ajout du console.log ici pour vérifier les tâches de chaque projet
          return project.tasks.some((task) => task.employeeId === userId);
        });
      
  
        setProjects(employeeProjects);
        console.log(employeeProjects)
      } else {
        console.error('Error fetching projects:', response.status);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };
   const getRandomColor = () => {
    const colors = ['primary', 'secondary',  'warning', 'info', 'success'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

   

  if (data) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ pt: 15, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            
                <CustomAvatar
                  skin='light'
                  variant='rounded'
                  src={employee.avatar}
                  sx={{ width: 120, height: 120, fontWeight: 600, mb: 4, fontSize: '3rem' }}
                >
                  
                </CustomAvatar>
           
              <Typography variant='h6' sx={{ mb: 2 }}>
            
              </Typography>
              <CustomChip
                skin='light'
                size='small'
                label= {employee.fullname}
                color={getRandomColor()} 
                sx={{
                  height: 20,
                  fontWeight: 600,
                  borderRadius: '5px',
                  fontSize: '0.875rem',
                  textTransform: 'capitalize',
                  '& .MuiChip-label': { mt: -0.25 }
                }}
              />
            </CardContent>

         

            <CardContent>
              <Typography variant='h6'>Details</Typography>
              <Divider sx={{ mt: theme => `${theme.spacing(4)} !important` }} />
              <Box sx={{ pt: 2, pb: 1 }}>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Username: 
                  </Typography>
                  <Typography variant='body2'>@{employee.user?.username}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Email:
                  </Typography>
                  <Typography variant='body2'>{employee.user?.email}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Department: 
                  </Typography>
                  <CustomChip
                    skin='light'
                    size='small'
                   color={getRandomColor()} 
              label={employee.department?.name}
                    sx={{
                      height: 20,
                      fontWeight: 500,
                      fontSize: '0.75rem',
                      borderRadius: '5px',
                      textTransform: 'capitalize'
                    }}
                  />
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Role:</Typography>
                  <Typography variant='body2' sx={{ textTransform: 'capitalize' }}>
              {employee.departmentRole}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Phone:</Typography>
                  <Typography variant='body2'>{employee.phone}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>adresse:</Typography>
                  <Typography variant='body2'>{employee.adresse}</Typography>
                </Box>
                
                
              </Box>
            </CardContent>

            <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Tooltip title={employee.facebook}>
                <IconButton
                  href='/'
                  component={Link}
                  sx={{ color: '#497ce2' }}
              
                >
                  <Icon icon='mdi:facebook' />
                </IconButton></Tooltip>
                <Tooltip title={employee.instagram}>
                <IconButton
                  href='/'
                  component={Link}
                  sx={{ color: '#1da1f2' }}
                  
                >
                  <img  height='20' src= '/images/pages/instagram.png' />
                </IconButton></Tooltip>
                <Tooltip title={employee.github}>
                <IconButton
                  href='/'
                  component={Link}
                 
                  sx={{ color: theme => (theme.palette.mode === 'light' ? '#272727' : 'grey.300') }}
                >
                   <img  height='20' src= '/images/pages/github.png' />
                </IconButton></Tooltip>
                <Tooltip title={employee.instagram}>
                <IconButton
                  href='/'
                  component={Link}
                  sx={{ color: '#db4437' }}
                
                >
                  <img  height='20' src= '/images/pages/in5.png' />
                </IconButton></Tooltip>
                <Tooltip title={employee.slack}>
                <IconButton
                  href='/'
                  component={Link}
                  sx={{ color: '#db4437' }}
                
                >
                  <img  height='20' src= '/images/pages/slack.png' />
                </IconButton></Tooltip>
                <Tooltip title={employee.gitlab}>

                <IconButton
                  href='/'
                  component={Link}
                  sx={{ color: '#db4437' }}
                
                >
                  <img  height='20' src= '/images/pages/gitlab2.png' />
                </IconButton></Tooltip>
              </Box>
            </CardActions>

            <Dialog
              open={openEdit}
              onClose={handleEditClose}
              aria-labelledby='user-view-edit'
              aria-describedby='user-view-edit-description'
              sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650 } }}
            >
              <DialogTitle
                id='user-view-edit'
                sx={{
                  textAlign: 'center',
                  fontSize: '1.5rem !important',
                  px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                  pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
                }}
              >
                Edit User Information
              </DialogTitle>
              <DialogContent
                sx={{
                  pb: theme => `${theme.spacing(8)} !important`,
                  px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
                }}
              >
                <DialogContentText variant='body2' id='user-view-edit-description' sx={{ textAlign: 'center', mb: 7 }}>
                  Updating user details will receive a privacy audit.
                </DialogContentText>
                <form>
                  <Grid container spacing={6}>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='Full Name'  />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label='Username'
                      
                        InputProps={{ startAdornment: <InputAdornment position='start'>@</InputAdornment> }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth type='email' label='Billing Email' />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id='user-view-status-label'>Status</InputLabel>
                        <Select
                          label='Status'
                         
                          id='user-view-status'
                          labelId='user-view-status-label'
                        >
                          <MenuItem value='pending'>Pending</MenuItem>
                          <MenuItem value='active'>Active</MenuItem>
                          <MenuItem value='inactive'>Inactive</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='TAX ID' defaultValue='Tax-8894' />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='Contact' defaultValue={`+1 $`} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id='user-view-language-label'>Language</InputLabel>
                        <Select
                          label='Language'
                          defaultValue='English'
                          id='user-view-language'
                          labelId='user-view-language-label'
                        >
                          <MenuItem value='English'>English</MenuItem>
                          <MenuItem value='Spanish'>Spanish</MenuItem>
                          <MenuItem value='Portuguese'>Portuguese</MenuItem>
                          <MenuItem value='Russian'>Russian</MenuItem>
                          <MenuItem value='French'>French</MenuItem>
                          <MenuItem value='German'>German</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id='user-view-country-label'>Country</InputLabel>
                        <Select
                          label='Country'
                          defaultValue='USA'
                          id='user-view-country'
                          labelId='user-view-country-label'
                        >
                          <MenuItem value='USA'>USA</MenuItem>
                          <MenuItem value='UK'>UK</MenuItem>
                          <MenuItem value='Spain'>Spain</MenuItem>
                          <MenuItem value='Russia'>Russia</MenuItem>
                          <MenuItem value='France'>France</MenuItem>
                          <MenuItem value='Germany'>Germany</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        label='Use as a billing address?'
                        control={<Switch defaultChecked />}
                        sx={{ '& .MuiTypography-root': { fontWeight: 500 } }}
                      />
                    </Grid>
                  </Grid>
                </form>
              </DialogContent>
              <DialogActions
                sx={{
                  justifyContent: 'center',
                  px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                  pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
                }}
              >
                <Button variant='contained' sx={{ mr: 2 }} onClick={handleEditClose}>
                  Submit
                </Button>
                <Button variant='outlined' color='secondary' onClick={handleEditClose}>
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>

           </Card>
        </Grid>
        <Grid item spacing={6} xs={12} md={8}>
        <Grid item xs={12} >
        <Card>
      <CardHeader title="Employee Projects List" />
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          
        </Box>
      </CardContent>
      <DataGrid
        autoHeight
        rows={projects}
        columns={columns}
        disableRowSelectionOnClick
        pageSizeOptions={[7, 10, 25, 50]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
      />
    </Card>
        </Grid>

         {/* Social Accounts Cards */}
     
      </Grid>
      </Grid>
    )
  } else {
    return null
  }
}

export default UserViewLeft
