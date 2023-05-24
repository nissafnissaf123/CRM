// ** React Imports
import { useState, useEffect,  forwardRef, ReactElement, Ref } from 'react'
import { useRouter } from 'next/router';

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
      const [showDialog, setShowDialog] = useState<boolean>(false);

      const [project, setProject] = useState
      ({
        id: "",
        name:"",
        client: { fullname: "" }
        
       
       
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

   return(
    <>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
         {getIconSrc(row.framework) && (
          <Img src={getIconSrc(row.framework)} alt="Project Icon" style={{ marginLeft: '10px' }} />
        )}
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <LinkStyled href='' sx={{ fontWeight: 500, fontSize: '0.875rem' }} onClick={() => setShowDialog(true)}>{row.name}</LinkStyled >
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
              <TextField fullWidth   label='Project Name' name="fullname"      placeholder='John' />
            </Grid>
            <Grid item sm={6} xs={12}>
            <TextField
            type="date"
            style={{width:"375px"}}
            id="outlined-deadline"
          label="Deadline"
          InputLabelProps={{
            shrink: true,
          }}
          />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth  label='Customer' name="name" value={project.name}   placeholder='johnDoe' />
            </Grid>
            
            <Grid item  xs={12}>
            <TextField
        fullWidth
        sx={{ mb: 4 }}
        label='Description'
        multiline
        rows={4}
        
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
          <Button variant='contained' sx={{ mr: 2 }} type='submit'  >
            Submit
          </Button>
          <Button variant='outlined' color='secondary' onClick={() => setShowDialog(false)}>
            Discard
          </Button>
        </DialogActions>
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
        <AvatarGroup className='pull-up'>
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
        router.push(`/admin/kanban/${row.id}`);
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
  const [value, setValue] = useState<string>('')
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


  //Get projects 

  const [projects, setProjects] = useState([]);


  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:4001/project'); 
      const data = await response.json();
      setProjects(data.projects);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  //Post Project 
  const [name, setName] = useState('');
  const [framework, setFramework] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = async () => {
   
    if (name === '') {
      toast.error('Please enter a project name');
      return;
    }

    if (framework === '') {
      toast.error('Please select a framework');
      return;
    }
    
    if (category === '') {
      toast.error('Please select a category');
      return;
    }

    try {
      const response = await fetch('http://localhost:4001/project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, category, framework }),
      });
      
      const data = await response.json();
      console.log(data); // Affiche la réponse du serveur
      handleClose();
      toast.success('Project added successfully');
    } catch (error) {
      console.error(error);
      toast.error('Failed to add employee'); // Display error toast notification
    }
  };
  

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(event.target.value)
  }

  const handleChangeFramework = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFramework(event.target.value)
  }

  //Get categories

  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  const handleAddCategoryClick = () => {
    setIsAddingCategory(true);
  };

  const handleAddCategory = () => {
    // Add logic to handle adding the new category to your data or API
    console.log('New category:', newCategoryName);
    // Reset the input field and state
    setNewCategoryName('');
    setIsAddingCategory(false);
  };


  return (
    <>
   <Grid  style={{marginBottom:'15px'}}>
    <PageHeader
    
        title={<Typography variant='h5'>Projects List</Typography>}
        subtitle={
          <Typography variant='body2'>
          Find all of your Projects accounts and their owner, tasks and her.
          </Typography>
        }
      />
    </Grid>
  
    <Card>
      <CardContent>
      
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
        
          <TextField sx={{ mr: 6, mb: 2 }} size='small' placeholder='Search Project' value={value} onChange={e => setValue(e.target.value)} />
          <Button sx={{ mb: 2 }}  variant='contained' onClick={() => setShow(true)}>
          Add Project
        </Button>
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




<Dialog
        fullWidth
        open={show}
        scroll='body'
        maxWidth='md'
        onClose={handleClose}
        onBackdropClick={handleClose}
        TransitionComponent={Transition}
      >
        <DialogContent
          sx={{
            position: 'relative',
            pr: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pl: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(11)} !important`],
            py: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <IconButton size='small' onClick={handleClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
            <Icon icon='mdi:close' />
          </IconButton>
          <Box sx={{ mb: 3, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
              Create App
            </Typography>
            <Typography variant='body2'>Provide data with this form to create your app.</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: { xs: 'wrap', md: 'nowrap' } }}>
            <TabContext value={activeTab}>
              <TabList
                orientation='vertical'
                onChange={(e, newValue: string) => setActiveTab(newValue)}
                sx={{
                  border: 0,
                  minWidth: 200,
                  '& .MuiTabs-indicator': { display: 'none' },
                  '& .MuiTabs-flexContainer': {
                    alignItems: 'flex-start',
                    '& .MuiTab-root': {
                      width: '100%',
                      alignItems: 'flex-start'
                    }
                  }
                }}
              >
                <Tab
                  disableRipple
                  value='detailsTab'
                  label={
                    <TabLabel
                      title='Details'
                      subtitle='Enter Details'
                      icon={<Icon icon='mdi:clipboard-outline' />}
                      active={activeTab === 'detailsTab'}
                    />
                  }
                />
                
                <Tab
                  disableRipple
                  value='DatabaseTab'
                  label={
                    <TabLabel
                      title='Categories'
                      active={activeTab === 'DatabaseTab'}
                      subtitle='Select Category'
                      icon={<Icon icon='mdi:chart-donut' />}
                    />
                  }
                />

                <Tab
                  disableRipple
                  value='frameworkTab'
                  label={
                    <TabLabel
                      title='Frameworks'
                      icon={<Icon icon='mdi:star-outline' />}
                      subtitle='Select Framework'
                      active={activeTab === 'frameworkTab'}
                    />
                  }
                />
                
                <Tab
                  disableRipple
                  value='submitTab'
                  label={
                    <TabLabel
                      title='Submit'
                      subtitle='Submit'
                      icon={<Icon icon='mdi:check' />}
                      active={activeTab === 'submitTab'}
                      
                    />
                  }
                />
              </TabList>
              <TabPanel value='detailsTab' sx={{ flexGrow: 1, p: '0 !important' }}>
              <div>
      <TextField style={{marginTop:"20px"}} fullWidth sx={{ mb: 4 }} label='Application Name'  value={name} onChange={(e) => setName(e.target.value)}  />
      <br/>

      <TextField
        fullWidth
        sx={{ mb: 4 }}
        label='Description'
        multiline
        rows={6}
        
      />
      
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <TextField
          fullWidth
          sx={{ mb: 4 }}
          label="Customer Name"
          value={name}
         
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
          />
        </FormControl>
      </Grid>
    </Grid>
  
    
    </div>
                {renderTabFooter()}
              </TabPanel>
              <TabPanel value='frameworkTab' sx={{ flexGrow: 1, p: '0 !important' }}>
              <div>
      <Typography variant='h6' sx={{ mb: 4 , marginTop:'15px'  }}>
        Select Framework
      </Typography>
      <Box sx={{ mb: 8 }}>
        <Box
          onClick={() => setValue('react')}
          sx={{ mb: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CustomAvatar skin='light' color='info' variant='rounded' sx={{ mr: 3, width: 48, height: 48 }}>
              <Icon icon='mdi:react' />
            </CustomAvatar>
            <div>
              <Typography sx={{ color: 'text.secondary' }}>React Native</Typography>
              <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                Create truly native apps
              </Typography>
            </div>
          </Box>
          <Radio value='react' onChange={handleChangeFramework} checked={framework === 'react'} />
        </Box>

        <Box
          onClick={() => setValue('angular')}
          sx={{ mb: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CustomAvatar skin='light' color='error' variant='rounded' sx={{ mr: 3, width: 48, height: 48 }}>
              <Icon icon='mdi:angular' />
            </CustomAvatar>
            <div>
              <Typography sx={{ color: 'text.secondary' }}>Angular</Typography>
              <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                Most suited for your application
              </Typography>
            </div>
          </Box>
          <Radio value='angular' onChange={handleChangeFramework} checked={framework === 'angular'} />
        </Box>
        <Box
          onClick={() => setValue('vuejs')}
          sx={{ mb: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CustomAvatar skin='light' color='success' variant='rounded' sx={{ mr: 3, width: 48, height: 48 }}>
              <Icon icon='mdi:vuejs' />
            </CustomAvatar>
            <div>
              <Typography sx={{ color: 'text.secondary' }}>Vue</Typography>
              <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                Progressive Framework
              </Typography>
            </div>
          </Box>
          <Radio value='vuejs' onChange={handleChangeFramework} checked={framework === 'vuejs'} />
        </Box>
        <Box
          onClick={() => setValue('laravel')}
          sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CustomAvatar skin='light' color='warning' variant='rounded' sx={{ mr: 3, width: 48, height: 48 }}>
              <Icon icon='mdi:laravel' />
            </CustomAvatar>
            <div>
              <Typography sx={{ color: 'text.secondary' }}>Laravel</Typography>
              <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                PHP web frameworks
              </Typography>
            </div>
          </Box>
          <Radio value='laravel' onChange={handleChangeFramework} checked={framework === 'laravel'} />
        </Box>
      </Box>
    </div>
                {renderTabFooter()}
              </TabPanel>
              <TabPanel value='DatabaseTab' sx={{ flexGrow: 1, p: '0 !important' }}>
              <div>
         <Typography variant='h6' sx={{ mb: 4, marginTop:'15px' }}>
       Select Category
      </Typography>
      <Box sx={{ mb: 8 }}>
        <Box
          onClick={() => setCategory('Marketplace')}
          sx={{ mb: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CustomAvatar skin='light' color='error' variant='rounded' sx={{ mr: 3, width: 48, height: 48 }}>
            <Icon icon='mdi:store' />
            </CustomAvatar>
            <div>
              <Typography sx={{ color: 'text.secondary' }}>Marketplace </Typography>
              <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                Scales with any business
              </Typography>
            </div>
          </Box>
          <Radio value='Marketplace' onChange={handleChange} checked={category === 'Marketplace'} />
        </Box>
        
        <Box
          onClick={() => setCategory('Web Application')}
          sx={{ mb:6, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CustomAvatar skin='light' color='success' variant='rounded' sx={{ mr: 3, width: 48, height: 48 }}>
            <Icon icon='mdi:web' />
            </CustomAvatar>
            <div>
              <Typography sx={{ color: 'text.secondary' }}>Web Application</Typography>
              <Typography variant='caption' sx={{ color: 'text.disabled' }}>
              Grow Your Business With App
              </Typography>
            </div>
          </Box>
          <Radio value='Web Application' onChange={handleChange} checked={category === 'Web Application'} />
        </Box>

        <Box
          onClick={() => setCategory('E-commerce Site')}
          sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CustomAvatar skin='light' color='info' variant='rounded' sx={{ mr: 3, width: 48, height: 48 }}>
            <Icon icon='mdi:shopping' />
            </CustomAvatar>
            <div>
              <Typography sx={{ color: 'text.secondary' }}>E-commerce Site</Typography>
              <Typography variant='caption' sx={{ color: 'text.disabled' }}>
              Grow Your Business With App
              </Typography>
            </div>
          </Box>
          <Radio value='E-commerce Site' onChange={handleChange} checked={category === 'E-commerce Site'} />
        </Box>
        {isAddingCategory ? (
        <Box sx={{  display: 'flex', alignItems: 'center', mt: 3 }}>
          <TextField
            
            onChange={handleChange}
            placeholder="Enter category name"
            fullWidth
            sx={{ mr: 2, marginTop:"18px"  }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAddCategory();
                
              }
            }}
          />
         
        </Box>
      ) : (
        <Box
          onClick={handleAddCategoryClick}
          sx={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'underline',
            color: 'info',
            marginTop:"20px",
            ml: '5px', 
          }}>
          <Icon icon="mdi:plus" style={{ mr: 2, color:"info", fontSize: 15 }}/> {/* Icon for "Autre" */}
          <Typography variant="body2">Add another Category</Typography>
        </Box>
      )}

        
      </Box>

    </div>
                {renderTabFooter()}
              </TabPanel>
              
              <TabPanel value='submitTab' sx={{ flexGrow: 1, p: '0 !important' }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant='h6'>Submit</Typography>
                  <Typography variant='body2'>Submit to kickstart your project.</Typography>

                  <Box sx={{ mt: 5, display: 'flex', justifyContent: 'center' }}>
                    <img alt='submit-img' src={`/images/pages/create-app-dialog-illustration-${settings.mode}.png`} />
                  </Box>
                </Box>
                {renderTabFooter()}
              </TabPanel>
            </TabContext>
          </Box>
        </DialogContent>
      </Dialog>








    </Card>
   
    </>
  )
}

export default ProjectListTable
