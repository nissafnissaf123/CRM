// ** React Imports
import { ReactNode, useState } from 'react'

// ** Next Import
import Link from 'next/link'
import toast from 'react-hot-toast'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustrationsV1'

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: 450 }
}))

const ForgotPassword2 = () => {
  // ** Hook
  const theme = useTheme()

  const [email, setEmail] = useState('');

  const handleResetPassword = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4001/auth/reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        // Réinitialisation réussie
        toast.success('Password reset successful! Please check your email for the new password.');
      } else {
        // Réinitialisation échouée
        toast.error('Password reset failed. Please try again later.');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred. Please try again later.');
    }
  };

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ p: theme => `${theme.spacing(15.5, 7, 8)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg style={{marginTop:"-20px"}} width={40} fill='none' height={50} viewBox='0 0 268 150' xmlns='http://www.w3.org/2000/svg'>
            <image
             
              width='250'
              height='300'
              href='/images/pages/logo2.png'
              
            
            />
           
            <defs>
              <linearGradient
                y1='0'
                x1='25.1443'
                x2='25.1443'
                y2='143.953'
                id='paint0_linear_7821_79167'
                gradientUnits='userSpaceOnUse'
              >
                <stop />
                <stop offset='1' stopOpacity='0' />
              </linearGradient>
              <linearGradient
                y1='0'
                x1='25.1443'
                x2='25.1443'
                y2='143.953'
                id='paint1_linear_7821_79167'
                gradientUnits='userSpaceOnUse'
              >
                <stop />
                <stop offset='1' stopOpacity='0' />
              </linearGradient>
            </defs>
          </svg>
            <Typography variant='h6' sx={{ ml: 2, lineHeight: 1, fontWeight: 700, fontSize: '1.5rem !important' }}>
              {themeConfig.templateName}
            </Typography>
          </Box>
          <Box sx={{ mb: 6.5 }}>
            <Typography variant='h5' sx={{ mb: 1.5, letterSpacing: '0.18px', fontWeight: 600 }}>
              Forgot Password? 🔒
            </Typography>
            <Typography variant='body2'>
              Enter your email and we&prime;ll send you instructions to reset your password
            </Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={handleResetPassword}>
            <TextField autoFocus type='email' label='Email'value={email} onChange={e => setEmail(e.target.value)} sx={{ display: 'flex', mb: 4 }} />
            <Button fullWidth size='large' type='submit' variant='contained' sx={{ mb: 5.25 }}>
              Send reset link
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography
                component={Link}
                href='/pages/login2'
                sx={{
                  display: 'flex',
                  '& svg': { mr: 1.5 },
                  alignItems: 'center',
                  color: 'primary.main',
                  textDecoration: 'none',
                  justifyContent: 'center'
                }}
              >
              
                
              </Typography>
            </Box>
          </form>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
        </Box>
  )
}

ForgotPassword2.guestGuard = true
ForgotPassword2.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default ForgotPassword2
