// ** React Imports
import { useState, useEffect } from 'react'




// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'



interface SidebarAddUserType {
  open: boolean
  toggle: () => void
}

interface UserData {
  email: string
  company: string
  country: string
  contact: number
  fullName: string
  username: string
}

const showErrors = (field: string, valueLen: number, min: number) => {
  if (valueLen === 0) {
    return `${field} field is required`
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`
  } else {
    return ''
  }
}

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const schema = yup.object().shape({
  company: yup.string().required(),
  country: yup.string().required(),
  email: yup.string().email().required(),
  contact: yup
    .number()
    .typeError('Contact Number field is required')
    .min(10, obj => showErrors('Contact Number', obj.value.length, obj.min))
    .required(),
  fullName: yup
    .string()
    .min(3, obj => showErrors('First Name', obj.value.length, obj.min))
    .required(),
  username: yup
    .string()
    .min(3, obj => showErrors('Username', obj.value.length, obj.min))
    .required()
})

const defaultValues = {
  email: '',
  company: '',
  country: '',
  fullName: '',
  username: '',
  contact: Number('')
}

const SidebarAddUser = (props: SidebarAddUserType) => {
  // ** Props
  const { open, toggle } = props

  // ** State
  const [plan, setPlan] = useState<string>('basic')
  const [role, setRole] = useState<string>('subscriber')

  // ** Hooks
  
  const {
    reset,
    control,
    setValue,
    setError,
    
    formState: { errors }
  } = useForm({
    defaultValues,
    
    resolver: yupResolver(schema)
  })
  
   //Post Employee
   const [employee, setEmployee] = useState({department:'', email:'', fullname:'', phone:''})
   const [employees, setEmployees] = useState([]);

   const fetchEmployees = () => {
    fetch("http://localhost:4001/employee")
      .then(response => response.json())
      .then(data => {
        setEmployees(data.employee);
       

      })
      .catch(error => {
        console.error(error);
      });
  }

  useEffect(() => {
    fetchEmployees()
  }, []);

  const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
   
    const { department, email, fullname, phone } = employee;
    if (department && email && fullname && phone) {
      fetch("http://localhost:4001/employee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
      })
        .then((res) => res.json())
        .then(() => {
          fetchEmployees();
        })
    } else {
      alert("Invalid input");
    }
  };
  
   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
     const {name, value} = e.target
     setEmployee({
         ...employee,
         [name]: value
     })
 }

  const handleClose = () => {
    setPlan('basic')
    setRole('subscriber')
    setValue('contact', Number(''))
    toggle()
    reset()
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography variant='h6'>Add Employee</Typography>
        <IconButton size='small' onClick={handleClose} sx={{ color: 'text.primary' }}>
          <Icon icon='mdi:close' fontSize={20} />
        </IconButton>
      </Header>
      <Box sx={{ p: 5 }}>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth sx={{ mb: 6 }}>
           
                <TextField
                 onChange={handleChange}
                  label='FullName'
                  value={employee.fullname}
                  placeholder='John Doe'
                  error={Boolean(errors.fullName)}
                  name='fullname'
                />
            
            {errors.fullName && <FormHelperText sx={{ color: 'error.main' }}>{errors.fullName.message}</FormHelperText>}
          </FormControl>
         
          <FormControl fullWidth sx={{ mb: 6 }}>
    
                <TextField
                  type='email'
                  value={employee.email}
                  label='Email'
                  name='email'
             onChange={handleChange}
                  placeholder='johndoe@email.com'
                  error={Boolean(errors.email)}
                />
             
            {errors.email && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}
          </FormControl>
         
          
          <FormControl fullWidth sx={{ mb: 6 }}>
           
                <TextField
                  type='number'
                  value={employee.phone}
                  label='Phone'
                  name='phone'
                 onChange={handleChange}
                  placeholder='(397) 294-5153'
                  error={Boolean(errors.contact)}
                />
              
            {errors.contact && <FormHelperText sx={{ color: 'error.main' }}>{errors.contact.message}</FormHelperText>}
          </FormControl>
        
  <FormControl fullWidth sx={{ mb: 6 }}>
    <InputLabel id='role-select'>Select Departement</InputLabel>
    <Select
      fullWidth
      value={employee.department}
      id='select-Departement'
      label='Select Departement'
      labelId='departement-select'
      onChange={(e) => setEmployee({...employee, department: e.target.value})}
      inputProps={{ placeholder: 'Select Departement' }}
    >
      
    
      <MenuItem value='Developement'>Web Development</MenuItem>
      <MenuItem value='Security'>Mobile Development</MenuItem>
      <MenuItem value='Digital Marketing'>Digital Marketing</MenuItem>
      <MenuItem value='UI/UX Design'>UI/UX Design</MenuItem>
     
    </Select>
  </FormControl>

          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button size='large' type='submit' variant='contained' sx={{ mr: 3 }}>
              Submit
            </Button>
            <Button size='large' variant='outlined' color='secondary' onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

export default SidebarAddUser
