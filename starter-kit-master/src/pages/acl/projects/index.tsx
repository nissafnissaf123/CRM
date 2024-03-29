// ** React Imports
import { useState, useEffect,  forwardRef, ReactElement, Ref, useCallback } from 'react'
import { useRouter } from 'next/router';
import { Select } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';

import toast from 'react-hot-toast'
import Tooltip from '@mui/material/Tooltip';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import DialogActions from '@mui/material/DialogActions'
import CardContent from '@mui/material/CardContent'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import LinearProgress from '@mui/material/LinearProgress'
import IconButton from '@mui/material/IconButton'
import Radio from '@mui/material/Radio'
import Button from '@mui/material/Button'
import TabPanel from '@mui/lab/TabPanel'
import Avatar from '@mui/material/Avatar'
import Dialog from '@mui/material/Dialog'
import Fade, { FadeProps } from '@mui/material/Fade'
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabContext from '@mui/lab/TabContext'
import DialogContent from '@mui/material/DialogContent'
import AvatarGroup from '@mui/material/AvatarGroup'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'

// ** Next Import
import Link from 'next/link'

// ** Config Import
import themeConfig from 'src/configs/themeConfig'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import axios from 'axios'

// ** Type Imports
import { ProjectListDataType } from 'src/types/apps/userTypes'
import CustomAvatar from 'src/@core/components/mui/avatar'



interface CellType {
  row: ProjectListDataType
}

interface Props {
  id: string;
}

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
      return '/images/pages/télécharger.jpg';
    }
  
    const lowercasedFramework = framework.toLowerCase();
  
    if (lowercasedFramework.includes('react')) {
      return '/images/icons/project-icons/react.png';
    } else if (lowercasedFramework.includes('vue')) {
      return '/images/icons/project-icons/vue.png';
    } else if (lowercasedFramework.includes('angular')) {
      return '/images/pages/angular.png';
    } else if (lowercasedFramework.includes('next')) {
      return '/images/pages/next.png';
    } else if (lowercasedFramework.includes('flutter')) {
      return '/images/pages/flutter.jpg';
    
    } else if (lowercasedFramework.includes('laraval')) {
      return '/images/pages/laraval2.jpg';
    } else {
      // Return the "télécharger.jpg" image for other frameworks
      return '/images/pages/télécharger.jpg';
    }
  };


  

    
  
    
  

const columns: GridColDef[] = [
  {
    flex: 0.15,
    minWidth: 230,
    field: 'name',
    headerName: 'Project',
    
    renderCell: ({ row }: CellType) => {
      const [showDialog, setShowDialog] = useState<boolean>(false);
      const [name, setName] = useState("");
      const [framework, setFramework] = useState("");
      const [client, setClient] = useState("");
      const [clientId, setClientId] = useState('');
      const [endDate, setEndDate] = useState("");
      const [description, setDescription] = useState("");
      const [category, setCategory] = useState("");
      
      const [project, setProject] = useState
      ({
        id: "",
        name:"",
        client: { fullname: "", userId:"" },
        category:"",
        framework:"", 
        description:"",
       endDate:"",
       
       
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

 //Update project 
 const handleUpdate = async (e: React.ChangeEvent<HTMLInputElement>) => {
  e.preventDefault();

  try {
    const formattedEndDate = new Date(endDate).toISOString(); // Format the endDate
    const response = await fetch(`http://localhost:4001/project/${row.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        
        name: name,
        category: category,
      framework:framework,
      description: description,
      endDate: formattedEndDate, // Use the formatted endDate
      clientId: clientId,
      }),
    });
    
    const data = await response.json();
    console.log(data.project);

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

const handleEdit = useCallback(() => {
  setShowDialog(true);
  setName(project.name);
  setCategory(project.category);
  setFramework(project.framework);
setEndDate(project.endDate)
  setDescription(project.description);
  setClient(project.client?.fullname)
  setClientId(project.client?.userId); 
}, [setShowDialog, project]);



// Get clients
const [clients, setClients] = useState([]);

const fetchClients = () => {
  fetch("http://localhost:4001/client")
    .then(response => response.json())
    .then(data => {
      setClients(data.client);

    })
    .catch(error => {
      console.error(error);
    });
}

useEffect(() => {
  fetchClients()
}, []);
         

   return(
    <>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
         {getIconSrc(row.framework) && (
          <Img src={getIconSrc(row.framework)} alt="Project Icon" style={{ marginLeft: '10px' }} />
        )}
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <LinkStyled href='' sx={{ fontWeight: 500, fontSize: '0.875rem' }} onClick={handleEdit}>{row.name}</LinkStyled >
          <Typography variant='caption' sx={{ color: 'text.disabled' }}>
           {row.framework}
          </Typography>
        </Box> 
      </Box>

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
              View  Project Information
            </Typography>
            <Typography variant='body2'></Typography>
          </Box>
          
          <Grid container spacing={6}>
            <Grid item sm={6} xs={12}>
              <TextField fullWidth   label='Project Name' name="name" value={name}  onChange={(e) => setName(e.target.value)}
     placeholder='John' />
            </Grid>
            <Grid item sm={6} xs={12}>
             <FormControl fullWidth>
                <InputLabel id='status-select'>Select Customer</InputLabel>
                <Select
                 inputProps={{ placeholder: 'Select Customer' }} 
                 fullWidth 
                 labelId='customer-select' 
                 value={clientId}
                 name='employees'
              
                 label='Select Customer'>

{clients.map((dep) => ( 
<MenuItem key={dep.id} value={dep.userId}>
<Box sx={{ display: 'flex', alignItems: 'center' }}>
    <CustomAvatar src={dep.avatar} sx={{ marginRight: '0.5rem', width: '20px', height: '20px' }} />
    <Typography>{dep.fullname}</Typography>
  </Box>
  </MenuItem> // Use dep.id as the value
      ))}
                </Select>
              </FormControl>
            </Grid>
            

            <Grid item sm={4} xs={12}>
            <TextField
            type="date"
            style={{width:"250px"}}
            value={endDate ? new Date(endDate).toISOString().substr(0, 10) : ""}

 id="outlined-deadline"
          label="Deadline"
          InputLabelProps={{
            shrink: true,
          }}
          /> 

         </Grid>
         <Grid item sm={4} xs={12}>
         <TextField fullWidth  label='Category' name="name" value={category} 
         ></TextField></Grid>
         <Grid item sm={4} xs={12}>
         <TextField fullWidth  label='Framework' name="name" value={framework} 

    placeholder='johnDoe' />
          </Grid>
           
            
            <Grid item  xs={12}>
            <TextField
        fullWidth
        sx={{ mb: 4 }}
        label='Description'
        multiline
        rows={4}
        value={description}
      
        
      />
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
      
          <Button variant='outlined' color='secondary' onClick={() => setShowDialog(false)}>
            Discard
          </Button>
        </DialogActions>
        </form>
        </Dialog>
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

  {
    flex: 0.1,
    minWidth: 100,
    sortable: false,
    field: 'actions',
    headerName: 'Kanban',
    renderCell: ({ row }: CellType) => {
      const router = useRouter();
      const handleKanbanClick = () => {
        router.push(`/acl/kanban/${row.id}`);
      };
    
      return (
        <IconButton   onClick={handleKanbanClick}>
          <Icon  icon='mdi:eye-outline' />
        </IconButton>
      );
    }
  },
  
]


// ** Hook Imports
import { useSettings } from 'src/@core/hooks/useSettings'


interface TabLabelProps {
  title: string
  active: boolean
  subtitle: string
  icon: ReactElement
}

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

const TabLabel = (props: TabLabelProps) => {
  const { icon, title, subtitle, active } = props

  return (
    <div>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          variant='rounded'
          sx={{
            mr: 3.5,
            ...(active ? { color: 'common.white', backgroundColor: 'primary.main' } : { color: 'text.primary' })
          }}
        >
          {icon}
        </Avatar>
        <Box sx={{ textAlign: 'left' }}>
          <Typography variant='body2'>{title}</Typography>
          <Typography variant='caption' sx={{ color: 'text.disabled', textTransform: 'none' }}>
            {subtitle}
          </Typography>
        </Box>
      </Box>
    </div>
  )
}

const tabsArr = ['detailsTab',  'DatabaseTab', 'frameworkTab',  'submitTab']

const ProjectListTable = ({ id }: Props) => {
  // ** State
 
  const [data, setData] = useState<ProjectListDataType[]>([])
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 })

  // ** States
  const [show, setShow] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<string>('detailsTab')

  // ** Hook
  const { settings } = useSettings()

  // ** Var
  const { direction } = settings

  const handleClose = () => {
    setShow(false)
    setActiveTab('detailsTab')
  }

  const nextArrow = direction === 'ltr' ? 'mdi:arrow-right' : 'mdi:arrow-left'
  const previousArrow = direction === 'ltr' ? 'mdi:arrow-left' : 'mdi:arrow-right'

  const renderTabFooter = () => {
    const prevTab = tabsArr[tabsArr.indexOf(activeTab) - 1]
    const nextTab = tabsArr[tabsArr.indexOf(activeTab) + 1]

    return (
      <Box sx={{ mt: 8.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button
          variant='outlined'
          color='secondary'
          disabled={activeTab === 'detailsTab'}
          onClick={() => setActiveTab(prevTab)}
          startIcon={<Icon icon={previousArrow} />}
        >
          Previous
        </Button>
        <Button
          variant='contained'
          color={activeTab === 'submitTab' ? 'success' : 'primary'}
          endIcon={<Icon icon={activeTab === 'submitTab' ? 'mdi:check' : nextArrow} />}
          onClick={() => {
            if (activeTab !== 'submitTab') {
              setActiveTab(nextTab);
            } else {
              handleSubmit(); // Appel de la fonction de soumission
            }
          }}
        >
          {activeTab === 'submitTab' ? 'Submit' : 'Next'}
        </Button>
      </Box>
    )
  }


 
  const [value, setValue] = useState('');
 
//Get projects 

const [projects, setProjects] = useState([]);


useEffect(() => {
  fetchProjects();
}, []);

const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:4001/project');
      if (response.ok) {
        const data = await response.json();
  
        // Récupération de l'ID du client à partir du localStorage
        const userData = JSON.parse(localStorage.getItem('userData'));
        const clientId = userData.id;
  
        // Filtrage des projets pour ne récupérer que ceux correspondant à l'ID du client
        const clientProjects = data.projects.filter((project) => project.clientId === clientId);
  
        setProjects(clientProjects);
      } else {
        console.error('Error fetching projects:', response.status);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredProjects = projects.filter((project) =>
  project.name.toLowerCase().includes(searchTerm.toLowerCase())
);


  return (
    <>
   <Grid  style={{marginBottom:'15px'}}>
   
    </Grid>
  
    <Card>
      <CardContent>
      
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
        <PageHeader
    
    title={<Typography variant='h5' style={{marginRight:"780px"}}>My Projects</Typography>}
    
  />
          <TextField sx={{ mr: 6, mb: 2 }} size='small' placeholder='Search Project' value={searchTerm}
              onChange={handleSearchTermChange}  />
         </Box>
       
      </CardContent>
      <DataGrid
        autoHeight
        rows={filteredProjects}
        columns={columns}
        disableRowSelectionOnClick
        pageSizeOptions={[7, 10, 25, 50]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
      />


    </Card>
   
    </>
  )
}

export default ProjectListTable
