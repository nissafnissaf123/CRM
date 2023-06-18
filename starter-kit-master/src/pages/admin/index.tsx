

// ** React Imports
import { ReactElement, useState, useEffect } from 'react'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'


import TimelineDot from '@mui/lab/TimelineDot'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import MuiTimeline, { TimelineProps } from '@mui/lab/Timeline'


// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
// ** Styled Component Import
import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'
// ** Custom Components Imports
import CardStatisticsCharacter from 'src/@core/components/card-statistics/card-stats-with-image'
 
// ** Icon Imports
import Icon from 'src/@core/components/icon'


import Avatar from '@mui/material/Avatar'


// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
// ** MUI Imports

import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'


import Button from '@mui/material/Button'
import Grid, { GridProps } from '@mui/material/Grid'
import { styled, useTheme } from '@mui/material/styles'

// Styled Grid component
const StyledGrid = styled(Grid)<GridProps>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    order: -1,
    display: 'flex',
    justifyContent: 'center'
  }
}))

// Styled Timeline component
const Timeline = styled(MuiTimeline)<TimelineProps>({
  paddingLeft: 0,
  paddingRight: 0,
  '& .MuiTimelineItem-root': {
    width: '100%',
    '&:before': {
      display: 'none'
    }
  }
})

// Styled component for the image
const Img = styled('img')(({ theme }) => ({
  right: 0,
  bottom: 0,
  width: 298,
  position: 'absolute',
  [theme.breakpoints.down('sm')]: {
    width: 250,
    position: 'static'
  }
}))

// ** Types
import { ThemeColor } from 'src/@core/layouts/types'


interface SaleDataType {
  stats: string
  title: string
  color: ThemeColor
  icon: ReactElement
}

const salesData: SaleDataType[] = [
  {
    stats: '8,458',
    color: 'primary',
    title: 'Customers',
    icon: <Icon icon='mdi:account-outline' />
  },
  {
    stats: '$28.5k',
    color: 'warning',
    title: 'Total Profit',
    icon: <Icon icon='mdi:poll' />
  },
  {
    color: 'info',
    stats: '2,450k',
    title: 'Transactions',
    icon: <Icon icon='mdi:trending-up' />
  }
]

const renderStats = () => {
  return salesData.map((sale: SaleDataType, index: number) => (
    <Grid item xs={12} sm={4} key={index}>
      <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
        <CustomAvatar skin='light' variant='rounded' color={sale.color} sx={{ mr: 4 }}>
          {sale.icon}
        </CustomAvatar>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='h6' sx={{ fontWeight: 600 }}>
            {sale.stats}
          </Typography>
          <Typography variant='caption'>{sale.title}</Typography>
        </Box>
      </Box>
    </Grid>
  ))
}

const ACLPage = () => {

   // ** Hook
   const theme = useTheme()

   //get projects 

   const [projectStats, setProjectStats] = useState([]);
   useEffect(() => {
    const fetchProjectStats = async () => {
      try {
        const response = await fetch('http://localhost:4001/project/project');
        const data = await response.json();
        setProjectStats(data);
      } catch (error) {
        console.error('Error retrieving project statistics:', error);
      }
    };
  
    fetchProjectStats();
  }, []);
  
  useEffect(() => {
    console.log('projectStats:', projectStats);
  }, [projectStats]);

  //Get employees

  const [employeeCount, setEmployeeCount] = useState(0);

  useEffect(() => {
    const fetchEmployeeCount = async () => {
      try {
        const response = await fetch('http://localhost:4001/employee/count'); // Assuming the endpoint is relative to the current domain
        const data = await response.json();
        setEmployeeCount(data.employeeCount);
      } catch (error) {
        console.error('Error retrieving employee count:', error);
      }
    };

    fetchEmployeeCount();
  }, []);

  //get client

  const [clientCount, setClientCount] = useState(null);

  useEffect(() => {
    const fetchClientCount = async () => {
      try {
        const response = await fetch('http://localhost:4001/client/count'); // Assuming the endpoint is relative to the current domain
        const data = await response.json();
        setClientCount(data.clientCount);
      } catch (error) {
        console.error('Error retrieving client count:', error);
      }
    };

    fetchClientCount();
  }, []);

  //Get notification 
  const [notification, setNotification] = useState([]);
const [isOpen, setIsOpen] = useState(false); // Nouvel état pour suivre si les notifications sont ouvertes ou fermées
const [unreadNotifications, setUnreadNotifications] = useState(0); // Initialise le nombre de nouvelles notifications à 0
const [employeeId, setEmployeeId] = useState<string | null>(null)
// ...

const [notifications, setNotifications] = useState([]);
const [employeeUnreadCount, setEmployeeUnreadNotificationCount] = useState(0);
const [adminUnreadCount, setAdminUnreadNotificationCount] = useState(0);
const [clientUnreadCount, setClientUnreadNotificationCount] = useState(0);
const [userRole, setUserRole] = useState('');



  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
      const userId = userData.id;
      const userRole = userData.role;
  
      const fetchNotifications = async (filterKey) => {
        try {
          const response = await fetch('http://localhost:4001/notification');
          const data = await response.json();
  
          // Récupérer les données de l'API
          const notifications = data.notifications.filter(notification => notification[filterKey] === userId);
          const employeeUnreadCount = data.employeeUnreadNotificationCount;
          const adminUnreadCount = data.adminUnreadNotificationCount;
          const clientUnreadCount = data.clientUnreadNotificationCount;
  
          // Mettre à jour les états de l'interface utilisateur
          setNotification(notifications);
          setEmployeeUnreadNotificationCount(employeeUnreadCount);
          setAdminUnreadNotificationCount(adminUnreadCount);
          setClientUnreadNotificationCount(clientUnreadCount);
        } catch (error) {
          console.error('Erreur lors de la récupération des notifications :', error);
        }
      };
  
      if (userRole === 'admin') {
        fetchNotifications('adminId');
      } else if (userRole === 'client') {
        fetchNotifications('clientId');
      } else if (userRole === 'Employee') {
        setEmployeeId(userId); // Définir l'ID de l'employé
        fetchNotifications('employeeId');
      }
    }
  }, []);

  

  return (
    <ApexChartWrapper>
      <KeenSliderWrapper>
        <Grid container spacing={6} className='match-height'>
          <Grid item xs={12} md={6}>
          <Card>
      <CardHeader
        sx={{ pb: 3.25 }}
        title='Welcome Back'
        titleTypographyProps={{ variant: 'h6' }}
       
        subheader={
          <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { color: 'success.main' } }}>
            <Typography variant='caption' sx={{ mr: 1.5 }}>
              Total 42.5k Sales
            </Typography>
            <Typography variant='subtitle2' sx={{ color: 'success.main' }}>
              +18%
            </Typography>
            <Icon icon='mdi:chevron-up' fontSize={20} />
          </Box>
        }
      />
      <CardContent>
        <Grid container spacing={6}>
        {renderStats()}
        </Grid>
      </CardContent>
    </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CardStatisticsCharacter
              data={{
                stats: employeeCount !== null ? employeeCount : 'Loading...',
                title: 'Employees',
                chipColor: 'primary',
                
                chipText: 'Year of 2023',
                src: '/images/pages/card-stats-img-1.png'
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CardStatisticsCharacter
              data={{
                stats: clientCount !== null ? clientCount : 'Loading...',
                trend: 'negative',
                title: 'Customers',
                chipColor: 'success',
                
                chipText: 'Year of 2023',
                src: '/images/pages/card-stats-img-2.png'
              }}
            />
          </Grid>
          
          <Grid item xs={12} md={4}>
          <Card>
      <CardHeader
        title='Project Statistics' 
      />
      
      <CardContent>
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography
            sx={{
              lineHeight: 2,
              fontWeight: 500,
              fontSize: '0.75rem',
              letterSpacing: '0.17px',
              textTransform: 'uppercase'
            }}
          >
            Name
          </Typography>
          <Typography
            sx={{
              lineHeight: 2,
              fontWeight: 500,
              fontSize: '0.75rem',
              letterSpacing: '0.17px',
              textTransform: 'uppercase'
            }}
          >
            Total
          </Typography>
        </Box>
      
       
            <Box
              
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <CustomAvatar skin='light' color='success' variant='rounded' sx={{ mr: 3, width: 48, height: 48 }}>
            <Icon icon='mdi:web' />
            </CustomAvatar>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
              <Typography sx={{ mb: 0.5, fontWeight: 600, color: 'text.primary' }}>Web Application</Typography>
<Box sx={{ mr: 2, display: 'flex', mb: 0.4, flexDirection: 'column' }}>
  <Typography variant='body2' sx={{ mb: 0.5, fontWeight: 600, color: 'text.primary' }}>
  
  </Typography>
  <Typography variant='caption'></Typography>
</Box>

  <CustomChip
    skin='light'
    size='small'
    color='primary'
      label={projectStats.filter(item => item.category === 'Web Application').length}
    sx={{ height: 20, fontSize: '0.75rem', fontWeight: 500 }}
  />

              </Box>
            </Box>
            <Box
              
              sx={{
                display: 'flex',
                alignItems: 'center',
                marginTop:"20px" 
              }}
            >
               <CustomAvatar skin='light' color='error' variant='rounded' sx={{ mr: 3, width: 48, height: 48 }}>
            <Icon icon='mdi:store' />
            </CustomAvatar>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              ><Typography sx={{ mb: 0.5, fontWeight: 600, color: 'text.primary' }}>Marketplace</Typography>
        
                <Box sx={{ mr: 2, display: 'flex', mb: 0.4, flexDirection: 'column' }}>
                  <Typography variant='body2' sx={{ mb: 0.5, fontWeight: 600, color: 'text.primary' }}>
                  
                  </Typography>
                  <Typography variant='caption'></Typography>
                </Box>
           
    <CustomChip
      skin='light'
      size='small'
      color='primary'
      label={projectStats.filter(item => item.category === 'Marketplace').length}
      sx={{ height: 20, fontSize: '0.75rem', fontWeight: 500 }}
    />
 
              </Box>
            </Box>

            <Box
              
              sx={{
                display: 'flex',
                alignItems: 'center',
                marginTop:"20px" 
              }}
            >
               <CustomAvatar skin='light' color='info' variant='rounded' sx={{ mr: 3, width: 48, height: 48 }}>
            <Icon icon='mdi:shopping' />
            </CustomAvatar>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >   <Typography sx={{ mb: 0.5, fontWeight: 600, color: 'text.primary' }}>E-commerce Site</Typography>
        
                <Box sx={{ mr: 2, display: 'flex', mb: 0.4, flexDirection: 'column' }}>
                  <Typography variant='body2' sx={{ mb: 0.5, fontWeight: 600, color: 'text.primary' }}>
                  
                  </Typography>
                  <Typography variant='caption'></Typography>
                </Box>
                <CustomChip
                  skin='light'
                  size='small'
                  color='primary'
                  label={projectStats.filter(item => item.category === 'E-commerce Site').length}   sx={{ height: 20, fontSize: '0.75rem', fontWeight: 500 }}
                />
              </Box>
            </Box>
            <Box
              
              sx={{
                display: 'flex',
                alignItems: 'center',
                marginTop:"20px" 
              }}
            >
             <CustomAvatar skin='light' color='secondary' variant='rounded' sx={{ mr: 3, width: 48, height: 48 }}>
             <Icon icon="mdi:star" /> {/* Replace 'heart' with the desired icon */}
</CustomAvatar>

              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              ><Typography sx={{ mb: 0.5, fontWeight: 600, color: 'text.primary' }}>Another Category</Typography>
        
                <Box sx={{ mr: 2, display: 'flex', mb: 0.4, flexDirection: 'column' }}>
                  <Typography variant='body2' sx={{ mb: 0.5, fontWeight: 600, color: 'text.primary' }}>
                  
                  </Typography>
                  <Typography variant='caption'></Typography>
                </Box>
                <CustomChip
                  skin='light'
                  size='small'
                  color='primary'
                  label={projectStats.filter(item => item.category !== 'E-commerce Site' && item.category !== 'Marketplace' && item.category !== 'Web Application').length}

                  sx={{ height: 20, fontSize: '0.75rem', fontWeight: 500 }}
                />
              </Box>
            </Box>
       
       
       
      </CardContent>
    </Card>
          </Grid>
          <Grid  item xs={12}  md={8}>

          <Card>
      <CardHeader
        title='Activity Timeline'
     
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(2.5)} !important` }}>
      <Timeline>
      {notifications.map(notification => (
        <TimelineItem key={notification.id}>
          <TimelineSeparator>
            <TimelineDot color="primary" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ mt: 0, overflow: 'hidden', mb: '16px !important' }}>
            <Box
              sx={{
                mb: 3,
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Typography>{notification.name}</Typography>
              <Typography variant='caption' sx={{ color: 'text.disabled' }}>{notification.date}</Typography>
            </Box>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
      </CardContent>
    </Card>
         
          </Grid>
         
       
          
        </Grid>
      </KeenSliderWrapper>
    </ApexChartWrapper>
 
  )
}


export default ACLPage
