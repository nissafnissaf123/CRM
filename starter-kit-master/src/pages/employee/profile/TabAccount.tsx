// ** React Imports
import { useState, ElementType, ChangeEvent } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Select from '@mui/material/Select'
import Dialog from '@mui/material/Dialog'
import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import OutlinedInput from '@mui/material/OutlinedInput'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import CardHeader from '@mui/material/CardHeader'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import Button, { ButtonProps } from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Third Party Imports
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

interface Data {
  email: string
  state: string
  address: string
  country: string
  lastName: string
  currency: string
  language: string
  timezone: string
  firstName: string
  organization: string
  number: number | string
  zipCode: number | string
}

const initialData: Data = {
  state: '',
  number: '',
  address: '',
  zipCode: '',
  lastName: 'Doe',
  currency: 'usd',
  firstName: 'John',
  language: 'arabic',
  timezone: 'gmt-12',
  country: 'australia',
  email: 'john.doe@example.com',
  organization: 'Pixinvent'
}

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(5),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)<ButtonProps & { component?: ElementType; htmlFor?: string }>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
  marginLeft: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

const TabAccount = () => {
  // ** State
  const [open, setOpen] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>('')
  const [userInput, setUserInput] = useState<string>('yes')
  const [formData, setFormData] = useState<Data>(initialData)
  const [imgSrc, setImgSrc] = useState<string>('/images/avatars/1.png')
  const [secondDialogOpen, setSecondDialogOpen] = useState<boolean>(false)

  // ** Hooks
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues: { checkbox: false } })

  const handleClose = () => setOpen(false)

  const handleSecondDialogClose = () => setSecondDialogOpen(false)

  const onSubmit = () => setOpen(true)

  const handleConfirmation = (value: string) => {
    handleClose()
    setUserInput(value)
    setSecondDialogOpen(true)
  }

  const handleInputImageChange = (file: ChangeEvent) => {
    const reader = new FileReader()
    const { files } = file.target as HTMLInputElement
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result as string)
      reader.readAsDataURL(files[0])

      if (reader.result !== null) {
        setInputValue(reader.result as string)
      }
    }
  }
  const handleInputImageReset = () => {
    setInputValue('')
    setImgSrc('/images/avatars/1.png')
  }

  const handleFormChange = (field: keyof Data, value: Data[keyof Data]) => {
    setFormData({ ...formData, [field]: value })
  }

  return (
    <Grid container spacing={6}>
      {/* Account Details Card */}
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Account Details' />
          <form>
            <CardContent sx={{ pt: 0 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ImgStyled src={imgSrc} alt='Profile Pic' />
                <div>
                  <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                    Upload New Photo
                    <input
                      hidden
                      type='file'
                      value={inputValue}
                      accept='image/png, image/jpeg'
                      onChange={handleInputImageChange}
                      id='account-settings-upload-image'
                    />
                  </ButtonStyled>
                  <ResetButtonStyled color='secondary' variant='outlined' onClick={handleInputImageReset}>
                    Reset
                  </ResetButtonStyled>
                  <Typography sx={{ mt: 5, color: 'text.disabled' }}>Allowed PNG or JPEG. Max size of 800K.</Typography>
                </div>
              </Box>
            </CardContent>
            <Divider />
            <CardContent>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label='First Name'
                    placeholder='John'
                    value={formData.firstName}
                    onChange={e => handleFormChange('firstName', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label='Last Name'
                    placeholder='Doe'
                    value={formData.lastName}
                    onChange={e => handleFormChange('lastName', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type='email'
                    label='Email'
                    value={formData.email}
                    placeholder='john.doe@example.com'
                    onChange={e => handleFormChange('email', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label='Organization'
                    placeholder='Pixinvent'
                    value={formData.organization}
                    onChange={e => handleFormChange('organization', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type='number'
                    label='Phone Number'
                    value={formData.number}
                    placeholder='202 555 0111'
                    onChange={e => handleFormChange('number', e.target.value)}
                    InputProps={{ startAdornment: <InputAdornment position='start'>US (+1)</InputAdornment> }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label='Address'
                    placeholder='Address'
                    value={formData.address}
                    onChange={e => handleFormChange('address', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label='State'
                    placeholder='California'
                    value={formData.state}
                    onChange={e => handleFormChange('state', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type='number'
                    label='Zip Code'
                    placeholder='231465'
                    value={formData.zipCode}
                    onChange={e => handleFormChange('zipCode', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Country</InputLabel>
                    <Select
                      label='Country'
                      value={formData.country}
                      onChange={e => handleFormChange('country', e.target.value)}
                    >
                      <MenuItem value='australia'>Australia</MenuItem>
                      <MenuItem value='canada'>Canada</MenuItem>
                      <MenuItem value='france'>France</MenuItem>
                      <MenuItem value='united-kingdom'>United Kingdom</MenuItem>
                      <MenuItem value='united-states'>United States</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Language</InputLabel>
                    <Select
                      label='Language'
                      value={formData.language}
                      onChange={e => handleFormChange('language', e.target.value)}
                    >
                      <MenuItem value='arabic'>Arabic</MenuItem>
                      <MenuItem value='english'>English</MenuItem>
                      <MenuItem value='french'>French</MenuItem>
                      <MenuItem value='german'>German</MenuItem>
                      <MenuItem value='portuguese'>Portuguese</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Timezone</InputLabel>
                    <Select
                      label='Timezone'
                      value={formData.timezone}
                      onChange={e => handleFormChange('timezone', e.target.value)}
                    >
                      <MenuItem value='gmt-12'>(GMT-12:00) International Date Line West</MenuItem>
                      <MenuItem value='gmt-11'>(GMT-11:00) Midway Island, Samoa</MenuItem>
                      <MenuItem value='gmt-10'>(GMT-10:00) Hawaii</MenuItem>
                      <MenuItem value='gmt-09'>(GMT-09:00) Alaska</MenuItem>
                      <MenuItem value='gmt-08'>(GMT-08:00) Pacific Time (US & Canada)</MenuItem>
                      <MenuItem value='gmt-08-baja'>(GMT-08:00) Tijuana, Baja California</MenuItem>
                      <MenuItem value='gmt-07'>(GMT-07:00) Chihuahua, La Paz, Mazatlan</MenuItem>
                      <MenuItem value='gmt-07-mt'>(GMT-07:00) Mountain Time (US & Canada)</MenuItem>
                      <MenuItem value='gmt-06'>(GMT-06:00) Central America</MenuItem>
                      <MenuItem value='gmt-06-ct'>(GMT-06:00) Central Time (US & Canada)</MenuItem>
                      <MenuItem value='gmt-06-mc'>(GMT-06:00) Guadalajara, Mexico City, Monterrey</MenuItem>
                      <MenuItem value='gmt-06-sk'>(GMT-06:00) Saskatchewan</MenuItem>
                      <MenuItem value='gmt-05'>(GMT-05:00) Bogota, Lima, Quito, Rio Branco</MenuItem>
                      <MenuItem value='gmt-05-et'>(GMT-05:00) Eastern Time (US & Canada)</MenuItem>
                      <MenuItem value='gmt-05-ind'>(GMT-05:00) Indiana (East)</MenuItem>
                      <MenuItem value='gmt-04'>(GMT-04:00) Atlantic Time (Canada)</MenuItem>
                      <MenuItem value='gmt-04-clp'>(GMT-04:00) Caracas, La Paz</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Currency</InputLabel>
                    <Select
                      label='Currency'
                      value={formData.currency}
                      onChange={e => handleFormChange('currency', e.target.value)}
                    >
                      <MenuItem value='usd'>USD</MenuItem>
                      <MenuItem value='eur'>EUR</MenuItem>
                      <MenuItem value='pound'>Pound</MenuItem>
                      <MenuItem value='bitcoin'>Bitcoin</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Button variant='contained' sx={{ mr: 3 }}>
                    Save Changes
                  </Button>
                  <Button type='reset' variant='outlined' color='secondary' onClick={() => setFormData(initialData)}>
                    Reset
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </form>
        </Card>
      </Grid>

       {/* Deactivate Account Dialogs */}
       <Grid item xs={12}>
       <Card>
      <CardHeader title='Change Password' />
      <CardContent>
        <form >
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor='input-current-password' >
                  Current Password
                </InputLabel>
               
                    <OutlinedInput
                   
                      label='Current Password'
                     
                      id='input-current-password'
                     
                      type={ 'password'}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onMouseDown={e => e.preventDefault()}
                      
                          >
                            <Icon icon={ 'mdi:eye-off-outline'} />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                 
              
                  <FormHelperText sx={{ color: 'error.main' }}></FormHelperText>
             
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={6} sx={{ mt: 0 }}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor='input-new-password' >
                  New Password
                </InputLabel>
    
                    <OutlinedInput
                     
                      label='New Password'
                     
                      id='input-new-password'
                     
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                           
                            onMouseDown={e => e.preventDefault()}
                          >
                            <Icon icon={  'mdi:eye-off-outline'} />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                
              
           
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor='input-confirm-new-password' >
                  Confirm New Password
                </InputLabel>
              
                    <OutlinedInput
                      
                      label='Confirm New Password'
                    
                      id='input-confirm-new-password'
                    
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onMouseDown={e => e.preventDefault()}
                          
                          >
                            <Icon icon={  'mdi:eye-off-outline'} />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                
              
                  <FormHelperText sx={{ color: 'error.main' }}></FormHelperText>
              
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Typography sx={{ fontWeight: 600, color: 'text.secondary' }}>Password Requirements:</Typography>
              <Box component='ul' sx={{ pl: 4, mb: 0, '& li': { mb: 1, color: 'text.secondary' } }}>
                <li>Minimum 8 characters long - the more, the better</li>
                <li>At least one lowercase & one uppercase character</li>
                <li>At least one number, symbol, or whitespace character</li>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Button variant='contained' type='submit' sx={{ mr: 3 }}>
                Save Changes
              </Button>
              <Button type='reset' variant='outlined' color='secondary' >
                Reset
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
    </Grid>
    </Grid>
    

   
  )
}

export default TabAccount
