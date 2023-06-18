// ** React Imports
import { useContext, useEffect, useState } from 'react'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

import Box from '@mui/material/Box'

import Button from '@mui/material/Button'


import { GridProps } from '@mui/material/Grid'
import { styled, useTheme } from '@mui/material/styles'

// Styled Grid component
const StyledGrid = styled(Grid)<GridProps>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    order: -1,
    display: 'flex',
    justifyContent: 'center'
  }
}))

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


const ACLPage = () => {
  // ** Hooks
  const ability = useContext(AbilityContext)
  const theme = useTheme()

  const [employee, setEmployee] = useState({
    id: "",
    fullname: "",
    phone: "",
    user: { email: "", username: "" },
    department: { name: "" },
    departmentRole:"",
    adresse:"",
    facebook:"",
    instagram:"",
    slack:"",
    github:"",
    gitlab:"", 
    createdAt:"",
    avatar:""
  });

  useEffect(() => {
    const fetchEmployeeById = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        console.log(userData)
        const employeeId = userData.id;
        console.log(employeeId)
        
       // Retrieve the employee data from local storage or from an API
      const response = await fetch(`http://localhost:4001/employee/${employeeId}`);
      const data = await response.json();

      // Set the employee state with the retrieved data
      setEmployee(data.employee);
      console.log(data.employee);
      } catch (error) {
        console.log(error);
      }
    };
    
    fetchEmployeeById();
  }, []);

  return (
    <Grid container spacing={6} className='match-height'>
    <Grid item xs={12} md={9}>
    <Card sx={{ position: 'relative' }}>
    <CardContent sx={{ p: theme => `${theme.spacing(6.75, 7.5)} !important` }}>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={6}>
          <Typography variant='h5' sx={{ mb: 4.5 }}>
            Welcome Back{' '}
            <Box component='span' sx={{ fontWeight: 'bold' }}>
            {employee.fullname}
            </Box>
            ! 👋🏻
          </Typography>
          <Typography variant='body2'>
           
       We are so happy to be a part of our company after using the code.
       We hope you enjoy our services.🎉
             
          </Typography>
          <Typography sx={{ mb: 4.5 }} variant='body2'>
         
          </Typography>
          <Typography sx={{ mb: 4.5 }} variant='body2'>
            
        Please don't forget to complete your profile.
          </Typography>
        </Grid>
        <StyledGrid item xs={12} sm={6}>
          <Img alt='Congratulations John' src={`/images/pages/illustration-john-${theme.palette.mode}.png`} />
        </StyledGrid>
      </Grid>
    </CardContent>
  </Card>
      </Grid>

  </Grid>
  )
}

ACLPage.acl = {
  action: 'read',
  subject: 'acl-page'
}

export default ACLPage
