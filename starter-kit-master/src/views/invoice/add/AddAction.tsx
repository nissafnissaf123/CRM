// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import Switch from '@mui/material/Switch'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import InputLabel from '@mui/material/InputLabel'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const OptionsWrapper = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
}))

const AddActions = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Button fullWidth sx={{ mb: 3.5 }} variant='contained' startIcon={<Icon icon='mdi:send-outline' />}>
              Send Invoice
            </Button>
            <Button fullWidth component={Link} sx={{ mb: 3.5 }} variant='outlined' href='/admin/invoice/preview'>
              Preview
            </Button>
           
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel id='payment-select'>Accept payments via</InputLabel>
          <Select
            fullWidth
            defaultValue='Internet Banking'
            label='Accept payments via'
            labelId='payment-select'
            sx={{ mb: 4 }}
          >
            <MenuItem value='Internet Banking'>Internet Banking</MenuItem>
            <MenuItem value='Debit Card'>Debit Card</MenuItem>
            <MenuItem value='Credit Card'>Credit Card</MenuItem>
            <MenuItem value='Paypal'>Paypal</MenuItem>
            <MenuItem value='UPI Transfer'>UPI Transfer</MenuItem>
          </Select>
        </FormControl>
        
       
       
      </Grid>
    </Grid>
  )
}

export default AddActions
