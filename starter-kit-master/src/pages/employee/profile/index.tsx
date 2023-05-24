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


// ** Third Party Imports
import axios from 'axios'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Types
import { ProfileHeaderType } from 'src/@fake-db/types'

interface Props {
    teams: ProfileTeamsType[]
    about: ProfileTabCommonType[]
    contacts: ProfileTabCommonType[]
    overview: ProfileTabCommonType[]
  }

const ProfilePicture = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  borderRadius: theme.shape.borderRadius,
  border: `5px solid ${theme.palette.common.white}`,
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(4)
  }
}))

import { ProfileTeamsType, ProfileTabCommonType } from 'src/@fake-db/types'

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

  


const UserProfileHeader = () => {

     const router = useRouter();
      
        const handleClickAccountSettings = () => {
          router.push('/employee/profile/TabAccount');
        };
   

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
        <ProfilePicture src='/images/pages/1.png'  alt='profile-picture' />
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
             Nissaf Dhahri
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
                <Typography sx={{ color: 'text.secondary', fontWeight: 600 }}>Web Develpment</Typography>
              </Box>
              <Box sx={{ mr: 4, display: 'flex', alignItems: 'center', '& svg': { mr: 1, color: 'text.secondary' } }}>
                <Icon icon='mdi:map-marker-outline' />
                <Typography sx={{ color: 'text.secondary', fontWeight: 600 }}>Nabeul</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 1, color: 'text.secondary' } }}>
                <Icon icon='mdi:calendar-blank-outline' />
                <Typography sx={{ color: 'text.secondary', fontWeight: 600 }}>Joined April 2001 </Typography>
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
              Nissaf dhahri
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
              nissafdhahri2
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
          <Icon icon='mdi:briefcase-account-outline' />
          </Box>

          <Box sx={{ columnGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
            <Typography sx={{ fontWeight: 600, color: 'text.secondary' }}>
            Role: 
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
            Backend Developer
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
             95071382
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
            nissafdhahri2@gmail.com
            </Typography>
          </Box>

        </Box>

        
       
      </Box>
      <Box sx={{ mb: 7 }}>
        <Typography variant='body2' sx={{ mb: 4, color: 'text.disabled', textTransform: 'uppercase' }}>
         Projects
        </Typography>

        <Box
          
          sx={{
            display: 'flex',
            '&:not(:last-of-type)': { mb: 4 },
            '& svg': { color: 'text.secondary' }
          }}
        >
          <Box sx={{ display: 'flex', mr: 2 }}>
          <Icon icon='mdi:checkbox-marked-circle-outline' />
          </Box>

          <Box sx={{ columnGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
            <Typography sx={{ fontWeight: 600, color: 'text.secondary' }}>
            Task to Compiled : 
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
          4
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
          <Icon icon='mdi:view-dashboard-outline' />
          </Box>

          <Box sx={{ columnGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
            <Typography sx={{ fontWeight: 600, color: 'text.secondary' }}>
            Projects Compiled :
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
            3
            </Typography>
          </Box>

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
                          @http:facebook/nissafdhahri2
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
                          @http:facebook/nissafdhahri2
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
                      <img  height='30' src= '/images/pages/slack.png' />
                    </Box>
                    <div>
                    <Typography sx={{ fontWeight: 500 }}>Slack</Typography>
                    <Typography
                          href='/'
                          component={Link}
                         
                          sx={{ color: 'primary.main', textDecoration: 'none' }}
                        >
                          @http:slack/nissafdhahri123
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
                      <img  height='30' src= '/images/pages/github.png' />
                    </Box>
                    <div>
                    <Typography sx={{ fontWeight: 500 }}>GitHub</Typography>
                    <Typography
                          href='/'
                          component={Link}
                         
                          sx={{ color: 'primary.main', textDecoration: 'none' }}
                        >
                          @http:github/nissafdhahri2
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
                 style={{marginTop:"25px", marginBottom:'15px'}}
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
                      <img  height='30' src= '/images/pages/git.jpg' />
                    </Box>
                    <div>
                    <Typography sx={{ fontWeight: 500 }}>GitLab</Typography>
                    <Typography
                          href='/'
                          component={Link}
                         
                          sx={{ color: 'primary.main', textDecoration: 'none' }}
                        >
                          @http:whatsapp/nissafdhahri2
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
<Grid item xs={12} md={4} >
  <Card>
    <CardContent>
      <div>
        <Typography variant='body2' sx={{ mb: 4, color: 'text.disabled', textTransform: 'uppercase' }}>
          Departments
        </Typography>
        <Box
          
          sx={{
            display: 'flex',
            '&:not(:last-of-type)': { mb: 4 },
            '& svg': { color: 'text.secondary' }
          }}
        >
          <Box sx={{ display: 'flex', mr: 2 }}>
          
          </Box>

          <Box sx={{ columnGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
            <Typography sx={{ fontWeight: 600, color: 'text.secondary' }}>
            Web Develpment:
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
           (126 Members)
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
          
          </Box>

          <Box sx={{ columnGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
            <Typography sx={{ fontWeight: 600, color: 'text.secondary' }}>
            Mobile Develpment:
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
           (15 Members)
            </Typography>
          </Box>
          

        </Box>
      </div>
    </CardContent>
  </Card>
</Grid>






    </Grid>
</>
  )
}

export default UserProfileHeader
