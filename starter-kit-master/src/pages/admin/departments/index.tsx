// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'

// ** Demo Components Imports
import RoleCards from 'src/views/pages/department/RoleCards'

const DepartmentComponent = () => {
  return (
    <Grid container spacing={6}>
      <PageHeader
        title={<Typography variant='h5'>Departments List</Typography>}
        subtitle={
          <Typography variant='body2'>
            
          </Typography>
        }
      />
      <Grid item xs={12} sx={{ mb: 5 }}>
        <RoleCards />
      </Grid>
      
     
    </Grid>
  )
}

export default DepartmentComponent
