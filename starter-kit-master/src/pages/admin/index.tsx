

// ** React Imports
import { ReactElement } from 'react'

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

  return (
    <ApexChartWrapper>
      <KeenSliderWrapper>
        <Grid container spacing={6} className='match-height'>
          <Grid item xs={12} md={6}>
          <Card>
      <CardHeader
        sx={{ pb: 3.25 }}
        title='Sales Overview'
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
                stats: '8.14k',
                title: 'Ratings',
                chipColor: 'primary',
                trendNumber: '+15.6%',
                chipText: 'Year of 2022',
                src: '/images/pages/card-stats-img-1.png'
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CardStatisticsCharacter
              data={{
                stats: '12.2k',
                trend: 'negative',
                title: 'Sessions',
                chipColor: 'success',
                trendNumber: '-25.5%',
                chipText: 'Last Month',
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
              <Avatar variant='rounded' sx={{ mr: 3, width: 50, height: 42, backgroundColor: 'background.default' }}>
                <img alt='avatar'  />
              </Avatar>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Box sx={{ mr: 2, display: 'flex', mb: 0.4, flexDirection: 'column' }}>
                  <Typography variant='body2' sx={{ mb: 0.5, fontWeight: 600, color: 'text.primary' }}>
                  
                  </Typography>
                  <Typography variant='caption'></Typography>
                </Box>
                <CustomChip
                  skin='light'
                  size='small'
                  color='primary'
                 
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
        <Timeline sx={{ my: 0, py: 0 }}>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color='error' />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ mt: 0, overflow: 'hidden', mb: theme => `${theme.spacing(2)} !important` }}>
              <Box
                sx={{
                  mb: 3,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Typography sx={{ mr: 2, fontWeight: 600 }}>Create youtube video for next product 😎</Typography>
                <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                  Tomorrow
                </Typography>
              </Box>
              <Typography variant='body2' sx={{ mb: 2 }}>
                Product introduction and details video
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 2.5, color: 'error.main' } }}>
                <Icon icon='mdi:play-circle' />
                <Typography noWrap variant='subtitle2' sx={{ fontWeight: 600 }}>
                  www.youtube.com/channel/UCuryo5s0CW4aP83itLjIdZg
                </Typography>
              </Box>
            </TimelineContent>
          </TimelineItem>

          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color='primary' />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ mt: 0, mb: theme => `${theme.spacing(2)} !important` }}>
              <Box
                sx={{
                  mb: 3,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Typography sx={{ mr: 2, fontWeight: 600 }}>Received payment from USA client 😍</Typography>
                <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                  January, 18
                </Typography>
              </Box>
              <Typography variant='body2'>Received payment $1,490 for banking ios app</Typography>
            </TimelineContent>
          </TimelineItem>

          <TimelineItem sx={{ minHeight: 0 }}>
            <TimelineSeparator>
              <TimelineDot color='info' />
              <TimelineConnector sx={{ mb: 4 }} />
            </TimelineSeparator>
            <TimelineContent sx={{ mt: 0, mb: theme => `${theme.spacing(2)} !important` }}>
              <Box
                sx={{
                  mb: 3,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Typography sx={{ mr: 2, fontWeight: 600 }}>Meeting with joseph morgan for next project</Typography>
                <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                  April, 23
                </Typography>
              </Box>
              <Typography variant='body2' sx={{ mb: 2 }}>
                Meeting Video call on zoom at 9pm
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <img width={24} height={24} alt='invoice.pdf' src='/images/icons/file-icons/pdf.png' />
                <Typography variant='subtitle2' sx={{ ml: 2, fontWeight: 600 }}>
                  presentation.pdf
                </Typography>
              </Box>
            </TimelineContent>
          </TimelineItem>
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
