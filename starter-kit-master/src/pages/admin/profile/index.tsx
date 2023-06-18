// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Components
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Link from 'next/link'
import { useRouter } from 'next/router'

import toast from 'react-hot-toast'
import Tooltip from '@mui/material/Tooltip';


// ** Third Party Imports
import axios from 'axios'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Types
import { ProfileHeaderType } from 'src/@fake-db/types'

interface Props {
  id: string;
}

interface Props {
    teams: ProfileTeamsType[]
    about: ProfileTabCommonType[]
    contacts: ProfileTabCommonType[]
    overview: ProfileTabCommonType[]
  }

  const DefaultProfilePicture = styled('img')(({ theme }) => ({
    width: 120,
    height: 120,
    borderRadius: theme.shape.borderRadius,
    border: `5px solid ${theme.palette.common.white}`,
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(4)
    }
  }));
  
  const ProfilePicture = ({ src, alt }) => {
    const defaultImage = '/images/pages/avatar3.png'; // Remplacez '/images/pages/avatar.png' par le chemin de votre image par défaut
  
    return <DefaultProfilePicture src={src || defaultImage} alt={alt} />;
  };





import { ProfileTeamsType, ProfileTabCommonType } from 'src/@fake-db/types'
import { Avatar, AvatarGroup } from '@mui/material'

const renderList = (arr: ProfileTabCommonType[]) => {
    if (arr && arr.length) {
      return arr.map((item, index) => {
        return (
          <Box
            key={index}
            sx={{
              display: 'flex',
              '&:not(:last-of-type)': { mb: 4 },
              '& svg': { color: 'text.secondary' }
            }}
          >
            <Box sx={{ display: 'flex', mr: 2 }}>
              <Icon icon={item.icon} />
            </Box>
  
            <Box sx={{ columnGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
              <Typography sx={{ fontWeight: 600, color: 'text.secondary' }}>
                {`${item.property.charAt(0).toUpperCase() + item.property.slice(1)}:`}
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                {item.value.charAt(0).toUpperCase() + item.value.slice(1)}
              </Typography>
            </Box>
          </Box>
        )
      })
    } else {
      return null
    }
  }


   

  
  


const UserProfileHeader = ({ id }: Props) => {

     const router = useRouter();
      
        const handleClickAccountSettings = () => {
          router.push('/admin/profile/TabAccount');
        };


        //Get Employee

        const [admin, setAdmin] = useState({
          id: "",
          fullname: "",
       
          user: { email: "", username: "", phone:"" },
          
          adresse:"",
          facebook:"",
          instagram:"",
          whatsapp:"", 
          createdAt:"",
          avatar:"",
          linkedin:""
        });
      
        useEffect(() => {
          const fetchAdminById = async () => {
            try {
              const userData = JSON.parse(localStorage.getItem('userData'));
              console.log(userData)
              const adminId = userData.id;
              console.log(adminId)
              
             // Retrieve the employee data from local storage or from an API
            const response = await fetch(`http://localhost:4001/admin/${adminId}`);
            const data = await response.json();
      
            // Set the employee state with the retrieved data
            setAdmin(data.admin);
            console.log(data.admin);
            } catch (error) {
              console.log(error);
            }
          };
          
          fetchAdminById();
        }, [id]);
   
        const joinDate = new Date(admin.createdAt);
        const formattedJoinDate = joinDate.toLocaleString('default', { month: 'long', year: 'numeric' });
        const capitalizedMonth = formattedJoinDate.charAt(0).toUpperCase() + formattedJoinDate.slice(1);

//Get Departments 
const [departments, setDepartments] = useState([]);

useEffect(() => {
  fetch("http://localhost:4001/department")
    .then((response) => response.json())
    .then((data) => {
      setDepartments(data.departments);
    })
   
    .catch((error) => {
      console.error(error);
    });
}, []);

      

return  (
    <>
    <Card>
      <CardMedia
        component='img'
        alt='profile-header'
        image='/images/pages/profile-banner.png'
        sx={{
          height: { xs: 150, md: 250 }
        }}
      />
      <CardContent
        sx={{
          pt: 0,
          mt: -8,
          display: 'flex',
          alignItems: 'flex-end',
          flexWrap: { xs: 'wrap', md: 'nowrap' },
          justifyContent: { xs: 'center', md: 'flex-start' }
        }}
      >
        <ProfilePicture src={admin.avatar}  alt='profile-picture' />
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            ml: { xs: 0, md: 6 },
            alignItems: 'flex-end',
            flexWrap: ['wrap', 'nowrap'],
            justifyContent: ['center', 'space-between']
          }}
        >
          <Box sx={{ mb: [6, 0], display: 'flex', flexDirection: 'column', alignItems: ['center', 'flex-start'] }}>
            <Typography variant='h5' sx={{ mb: 4, fontSize: '1.375rem' }}>
            {admin.fullname}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: ['center', 'flex-start']
              }}
            >
              <Box sx={{ mr: 4, display: 'flex', alignItems: 'center', '& svg': { mr: 1, color: 'text.secondary' } }}>
              <Icon icon='mdi:home-outline' />
                <Typography sx={{ color: 'text.secondary', fontWeight: 600 }}>Manager</Typography>
              </Box>
              <Box sx={{ mr: 4, display: 'flex', alignItems: 'center', '& svg': { mr: 1, color: 'text.secondary' } }}>
                <Icon icon='mdi:map-marker-outline' />
                <Typography sx={{ color: 'text.secondary', fontWeight: 600 }}>{admin.adresse}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 1, color: 'text.secondary' } }}>
                <Icon icon='mdi:calendar-blank-outline' />
                <Typography sx={{ color: 'text.secondary', fontWeight: 600 }}>Joined {capitalizedMonth} </Typography>
              </Box>
            </Box>
          </Box>
          <Button variant='contained' onClick={handleClickAccountSettings} startIcon={<Icon icon='mdi:account-cog-outline' fontSize={20} />}>
            Account Settings
          </Button>
        </Box>
      </CardContent>
    </Card>

<Grid  container spacing={6}>
<Grid style={{marginTop:"30px"}} item xs={12} md={4}>
  <Card>
    <CardContent>
      <Box sx={{ mb: 7 }}>
        <Typography variant='body2' sx={{ mb: 4, color: 'text.disabled', textTransform: 'uppercase' }}>
          About
        </Typography>
        <Box
          
          sx={{
            display: 'flex',
            '&:not(:last-of-type)': { mb: 4 },
            '& svg': { color: 'text.secondary' }
          }}
        >
          <Box sx={{ display: 'flex', mr: 2 }}>
          <Icon icon='mdi:account-outline' />
          </Box>

          <Box sx={{ columnGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
            <Typography sx={{ fontWeight: 600, color: 'text.secondary' }}>
            FullName: 
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              {admin.fullname}
            </Typography>
          </Box>
        </Box>
      
        <Box
          
          sx={{
            display: 'flex',
            '&:not(:last-of-type)': { mb: 4 },
            '& svg': { color: 'text.secondary' }
          }}
        >
          <Box sx={{ display: 'flex', mr: 2 }}>
          <Icon icon='ri:star-line' />
          </Box>

          <Box sx={{ columnGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
            <Typography sx={{ fontWeight: 600, color: 'text.secondary' }}>
            UserName :
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              {admin.user?.username}
            </Typography>
          </Box>
        </Box>
       
      </Box>

      
      
      <Box sx={{ mb: 7 }}>
        <Typography variant='body2' sx={{ mb: 4, color: 'text.disabled', textTransform: 'uppercase' }}>
          Contacts
        </Typography>

        <Box
          
          sx={{
            display: 'flex',
            '&:not(:last-of-type)': { mb: 4 },
            '& svg': { color: 'text.secondary' }
          }}
        >
          <Box sx={{ display: 'flex', mr: 2 }}>
          <Icon icon='mdi:phone' />
          </Box>

          <Box sx={{ columnGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
            <Typography sx={{ fontWeight: 600, color: 'text.secondary' }}>
            Phone :
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
             +{admin.user?.phone}
            </Typography>
          </Box>

        </Box>
        <Box
          
          sx={{
            display: 'flex',
            '&:not(:last-of-type)': { mb: 4 },
            '& svg': { color: 'text.secondary' }
          }}
        >
          <Box sx={{ display: 'flex', mr: 2 }}>
          <Icon icon='mdi:email-outline' />
          </Box>

          <Box sx={{ columnGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
            <Typography sx={{ fontWeight: 600, color: 'text.secondary' }}>
            Email :
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
            {admin.user?.email}
            </Typography>
          </Box>

        </Box>

        
       
      </Box>
      <Box sx={{ mb: 7 }}>
      

        

        
        
  
    <Box>
     
    </Box>
 


        

        
       
      </Box>
   
    </CardContent>
  </Card>
</Grid>
<Grid container  style={{marginTop:"30px", marginLeft:'-5px', width:"550px"}} spacing={6} md={8} >
      {/* Connected Accounts Cards */}
      
      {/* Social Accounts Cards */}
      <Grid item xs={12} md={12}>
        <Card>
      <CardHeader title='Social Accounts' 
    
       titleTypographyProps={{ sx: { color: 'text.primary' } }} />
          <CardContent>
            <Typography sx={{ mb: 4, color: 'text.secondary' }}>
              
            </Typography>

            
           
                <Box
                 
                  sx={{
                    gap: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    '&:not(:last-of-type)': { mb: 4 }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ mr: 4, minWidth: 45, display: 'flex', justifyContent: 'center' }}>
                      <img  height='30' src= '/images/pages/facebook.png' />
                    </Box>
                    <div>
                    <Typography sx={{ fontWeight: 500 }}>Facebook</Typography>
                    <Typography
                          href='/'
                          component={Link}
                         
                          sx={{ color: 'primary.main', textDecoration: 'none' }}
                        >
                          {admin.facebook}
                        </Typography>
                        
                     
                    </div>
                  </Box>
                  <Button
                    variant='outlined'
                    sx={{ p: 1.5, minWidth: 38 }}
                    color={'secondary'}
                  >
                    <Icon icon={  'mdi:link-variant'} />
                  </Button>
                </Box>
                <Box
                 style={{marginTop:"25px"}}
                  sx={{
                    gap: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    '&:not(:last-of-type)': { mb: 4 }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ mr: 4, minWidth: 45, display: 'flex', justifyContent: 'center' }}>
                      <img  height='30' src= '/images/pages/instagram.png' />
                    </Box>
                    <div>
                    <Typography sx={{ fontWeight: 500 }}>Instagram</Typography>
                    <Typography
                          href='/'
                          component={Link}
                         
                          sx={{ color: 'primary.main', textDecoration: 'none' }}
                        >
                            {admin.instagram}
                        </Typography>
                        
                     
                    </div>
                  </Box>
                  <Button
                    variant='outlined'
                    sx={{ p: 1.5, minWidth: 38 }}
                    color={'secondary'}
                  >
                    <Icon icon={  'mdi:link-variant'} />
                  </Button>
                </Box>
                <Box
                 style={{marginTop:"25px"}}
                  sx={{
                    gap: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    '&:not(:last-of-type)': { mb: 4 }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ mr: 4, minWidth: 45, display: 'flex', justifyContent: 'center' }}>
                      <img  height='30' src= '/images/pages/in5.png' />
                    </Box>
                    <div>
                    <Typography sx={{ fontWeight: 500 }}>LinkedIn</Typography>
                    <Typography
                          href='/'
                          component={Link}
                         
                          sx={{ color: 'primary.main', textDecoration: 'none' }}
                        >
                           {admin.linkedin}
                        </Typography>
                        
                     
                    </div>
                  </Box>
                  <Button
                    variant='outlined'
                    sx={{ p: 1.5, minWidth: 38 }}
                    color={'secondary'}
                  >
                    <Icon icon={  'mdi:link-variant'} />
                  </Button>
                </Box>

                
                
           
              
       
          </CardContent>
        </Card>
      </Grid>
    </Grid>







    </Grid>
</>
  )
}

export default UserProfileHeader
