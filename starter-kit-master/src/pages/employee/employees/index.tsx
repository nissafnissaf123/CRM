// ** Next Import
import Link from 'next/link'

import { useState, useEffect } from 'react'


// ** MUI Components
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Types
import { ConnectionsTabType } from 'src/@fake-db/types'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import OptionsMenu from 'src/@core/components/option-menu'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'
import Tooltip  from '@mui/material/Tooltip'

const Connections = () => {

     // Get employees
 const [employees, setEmployees] = useState([]);
 const [employee, setEmployee] = useState({ email:'', fullname:'', phone:'', department: {name:" "}, avatar:''})

  const fetchEmployees = () => {
    fetch("http://localhost:4001/employee")
      .then((response) => response.json())
      .then((data) => {
        setEmployees(data.employees);
        console.log(data.employees);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const getRandomColor = () => {
    const colors = ['primary', 'secondary',  'warning', 'info', 'success'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  return (
    <Grid container spacing={6}>
      
      <PageHeader
        title={<Typography variant='h5'>Employees List</Typography>}
        subtitle={
          <Typography variant='body2'>
            A role provided access to predefined menus and features so that depending on assigned role an administrator
            can have access to what he need
          </Typography>
        }
      />
            {employees.map((employee) => (
        <Grid item xs={12} sm={6} md={4} key={employee.id}>
          <Card sx={{ position: 'relative' }}>
           
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <Avatar sx={{ mb: 4, width: 100, height: 100 }} src={employee.avatar} />
                <Typography variant='h6' sx={{ fontWeight: 500 }}>
                  {employee.fullname}
                </Typography>
                <CustomChip style={{marginTop:"10px"}} size='small' skin='light' label={employee.departmentRole} color={getRandomColor()} />
                   
                 <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: ['center', 'flex-start']
              }}
              style={{marginTop:"20px"}}
            >
              <Box  sx={{ mr: 4, display: 'flex', alignItems: 'center', '& svg': { mr: 1, color: 'text.secondary' } }}>
              <Icon icon='mdi:home-outline' />
                <Typography sx={{ color: 'text.secondary', fontWeight: 600 }}>{employee.department?.name}</Typography>
              </Box>
              <Box sx={{ mr: 4, display: 'flex', alignItems: 'center', '& svg': { mr: 1, color: 'text.secondary' } }}>
                <Icon icon='mdi:map-marker-outline' />
                <Typography sx={{ color: 'text.secondary', fontWeight: 600 }}>{employee.adresse}</Typography>
              </Box>
          
            </Box>
                <Box sx={{ mb: 8, display: 'flex', alignItems: 'center' }}>
                  <Box
                    href='/'
                    component={Link}
                    onClick={e => e.preventDefault()}
                    sx={{
                      textDecoration: 'none',
                      '&:not(:last-of-type)': { mr: 3 },
                      '& .MuiChip-root': { cursor: 'pointer' }
                    }}
                  >
                   
                  </Box>
                </Box>
              
             
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Tooltip title={employee.facebook}>
                <IconButton
                  href='/'
                  component={Link}
                  sx={{ color: '#497ce2' }}
              
                > 
                  <Icon icon='mdi:facebook' />
                </IconButton>
                </Tooltip>
                <Tooltip title={employee.instagram}>
                <IconButton
                  href={employee}
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
                <Tooltip title={employee.linkedin}>
                <IconButton
                  href='/'
                  component={Link}
                  sx={{ color: '#db4437' }}
                
                >
                  <img  height='20' src= '/images/pages/in5.png' />
                </IconButton></Tooltip>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    
    </Grid>
  )
}

export default Connections
