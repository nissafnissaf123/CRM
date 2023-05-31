// ** React Imports
import { useState, ElementType, ChangeEvent, useEffect } from 'react'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';


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
import toast from 'react-hot-toast'


// ** Third Party Imports
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

interface Props {
  id: string;
}

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
  userId: string
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

const schema = yup.object().shape({
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(/^(?=.*[\d\s!@#$%^&*])[\w\d\s!@#$%^&*]+$/, 'Password must contain at least one number, symbol, or whitespace character'),
});

const ResetButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
  marginLeft: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

const TabAccount = ({ id }: Props) => {
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
  } = useForm({   resolver: yupResolver(schema),})

  const handleClose = () => setOpen(false)

  const handleSecondDialogClose = () => setSecondDialogOpen(false)

  const onSubmit = () => setOpen(true)

  const handleConfirmation = (value: string) => {
    handleClose()
    setUserInput(value)
    setSecondDialogOpen(true)
  }

  const handleInputImageChange = (file: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    const { files } = file.target;
    if (files && files.length !== 0) {
      reader.onload = async () => {
        const base64Image = reader.result as string;
        setAvatar(base64Image);
        
        try {
          // Convert the base64 image to a Blob object
          const base64Response = await fetch(base64Image);
          const blob = await base64Response.blob();
  
          // Create a FormData object and append the blob image
          const formData = new FormData();
          formData.append('avatar', blob);

          const userData = JSON.parse(localStorage.getItem('userData'));
          const employeeId = userData.id;
  
          // Send the FormData to the backend using fetch
          const response = await fetch(`http://localhost:4001/employee/${employeeId}`, {
            method: 'PATCH',
            headers: {
              // No need to set the 'Content-Type' header, it will be automatically set by fetch
            },
            body: formData,
          });
  
          const updatedEmployee = await response.json();
          console.log(updatedEmployee);
  
          toast.success('Employee updated successfully!');
          // Handle the updated employee data as needed
        } catch (error) {
          console.error('Error updating employee:', error);
          toast.error('Error updating employee');
          // Handle update errors as needed
        }
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleInputImageReset = () => {
    setInputValue('')
    setAvatar('/images/avatars/1.png')
  }

 


  //Get Employee: 

  
  const [avatar, setAvatar]= useState<string>('')
  const [employee, setEmployee] = useState({
    id: "",
    fullname: "",
    phone: "",
    user: { email: "", username: "", password:"" },
    department: { name: "" },
    departmentRole:"",
    adresse:"",
    facebook:"",
    instagram:"",
    slack:"",
    github:"",
    gitlab:"",
    avatar:"",
    password:""
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
  }, [id]);

  const handleUpdateEmployee = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    try {
      const userData = JSON.parse(localStorage.getItem('userData'));
      const employeeId = userData.id;

     
  
      const response = await fetch(`http://localhost:4001/employee/${employeeId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employee),
      });
  
      const updatedEmployee = await response.json();
      console.log(updatedEmployee);
  
      toast.success('Employee updated successfully!');
      // Handle the updated employee data as needed
  
    } catch (error) {
      console.error('Error updating employee:', error);
      toast.error('Error updating employee');
      // Handle update errors as needed
    }
  };


  const handleInputChange = (field: string, value: string) => {
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [field]: value,
    }));
  };

  const [confirmPassword, setConfirmPassword] = useState('');


  //Update Password
  const [newPassword, setNewPassword] = useState('');
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const validatePassword = (password) => {
    // Vérifiez ici si le mot de passe respecte les exigences
    // Par exemple, en utilisant des expressions régulières
    
    // Exemple : Au moins 8 caractères, au moins un chiffre et un caractère spécial
    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/;
    
    return passwordRegex.test(password);
  };
 
  const handleUpdatePaswword = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    try {
      const userData = JSON.parse(localStorage.getItem('userData'));
      const employeeId = userData.id;
  
      // Vérifiez si le nouveau mot de passe est valide en utilisant la fonction de validation
      const isValid = validatePassword(newPassword);
  
      if (isValid && newPassword === confirmPassword) {
        const response = await fetch(`http://localhost:4001/employee/${employeeId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...employee, password: newPassword }), // Inclure le nouveau mot de passe dans les données envoyées
        });
  
        const updatedEmployee = await response.json();
        console.log(updatedEmployee);
  
        toast.success('Password updated successfully!');
        // Gérez les données de l'employé mis à jour si nécessaire
      } else if (!isValid) {
        toast.error('Invalid password. Please check the password requirements.');
      } else {
        toast.error("Passwords don't match. Please confirm your new password.");
      }
    } catch (error) {
      console.error('Error updating employee:', error);
      toast.error('Error updating employee');
      // Gérez les erreurs de mise à jour si nécessaire
    }
  };

  

  return (
    <Grid container spacing={6}>
      {/* Account Details Card */}
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Account Details' />
          <form>
            <CardContent sx={{ pt: 0 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ImgStyled src={employee.avatar} alt='Profile Pic' />
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
                    label='FullName'
                    placeholder='John'
                    value={employee.fullname}
                    onChange={(e) => handleInputChange('fullname', e.target.value)}
                    
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label='UserName'
                    placeholder='Doe'
                    value={employee.user?.username}
                    
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label='Email'
                    placeholder='John'
                    value={employee.user?.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type='number'
                    label='Phone Number'
                    value={employee.phone}
                    placeholder='202 555 0111'
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type='text'
                    label='Department'
                    value={employee.department?.name}
                    placeholder='Department'
                   
                     />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label='Role'
                    placeholder='Role'
                    value={employee.departmentRole}
                    onChange={(e) => handleInputChange('departmentRole', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label='Adresse'
                    placeholder='Adresse'
                    value={employee.adresse}
                    onChange={(e) => handleInputChange('adresse', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type='Lien'
                    label='Lien Facebook'
                    placeholder='Lien Facebook'
                    value={employee.facebook}
                    onChange={(e) => handleInputChange('facebook', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    type='Lien'
                    label='Lien Instagram'
                    placeholder='Lien instagram'
                    value={employee.instagram}
                    onChange={(e) => handleInputChange('instagram', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    type='Lien'
                    label='Lien  LinkedIn'
                    placeholder='Lien LinkedIn'
                   
                  />
                </Grid>
                <Grid item xs={12} sm={6}>

                <TextField
                    fullWidth
                    type='Lien'
                    label='Lien Slack'
                    placeholder='Lien slack'
                    value={employee.slack}
                    onChange={(e) => handleInputChange('slack', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    type='Lien'
                    label='Lien GitHub'
                    placeholder='Lien GitHub'
                    value={employee.github}
                    onChange={(e) => handleInputChange('github', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    type='Lien'
                    label='Lien GitLab'
                    placeholder='Lien Gitlab'
                    value={employee.gitlab}
                    onChange={(e) => handleInputChange('gitlab', e.target.value)}
                  />
                </Grid>
                

                <Grid item xs={12}>
                  <Button variant='contained' sx={{ mr: 3 }} onClick={handleUpdateEmployee}>
                    Save Changes
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
        <form onSubmit={handleUpdatePaswword}>
          <Grid container spacing={6}>
            
          </Grid>
          <Grid container spacing={6} sx={{ mt: 0 }}>
            <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
  <InputLabel htmlFor='input-new-password'>New Password</InputLabel>
  <OutlinedInput
    label='New Password'
    onChange={(e) => setNewPassword(e.target.value)} // Mettre à jour l'état newPassword
    id='input-new-password'
    type={showPassword ? 'text' : 'password'}
    endAdornment={
      <InputAdornment position='end'>
        <IconButton
          edge='end'
          onMouseDown={e => e.preventDefault()}
          onClick={() => setShowPassword(!showPassword)}
        >
          <Icon icon={showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} fontSize={20} />
        </IconButton>
      </InputAdornment>
    }
  />
 
</FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
      <InputLabel htmlFor='input-confirm-new-password'>Confirm New Password</InputLabel>
      <OutlinedInput
        label='Confirm New Password'
        id='input-confirm-new-password'
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        type={showPassword ? 'text' : 'password'}
        endAdornment={
          <InputAdornment position='end'>
            <IconButton
              edge='end'
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setShowPassword(!showPassword)}
            >
              <Icon icon={showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} fontSize={20} />
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Typography sx={{ fontWeight: 600, color: 'text.secondary' }}>Password Requirements:</Typography>
              <Box component='ul' sx={{ pl: 4, mb: 0, '& li': { mb: 1, color: 'text.secondary' } }}>
                <li>Minimum 8 characters long - the more, the better</li>
                
                <li>At least one number, symbol, or whitespace character</li>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Button variant='contained' type='submit'  sx={{ mr: 3 }}>
                Save Changes
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
