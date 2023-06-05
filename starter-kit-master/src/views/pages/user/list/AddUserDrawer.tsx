// ** React Imports
import { useState, useEffect } from 'react'
import axios from 'axios'
import React from 'react'
import toast from 'react-hot-toast'

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


import { UsersType } from 'src/types/apps/userTypes'

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


  const handleClose = () => {
    setPlan('basic')
    setRole('subscriber')
    
    toggle()
    
  }


 //Post Employee
 const [client, setClient] = useState({companyName:'', email:'', fullname:'', phone:''})
 const [clients, setClients] = useState([]);
 const [filteredClients, setFilteredClients] = useState([]);

 const fetchClients = () => {
  fetch("http://localhost:4001/client")
    .then(response => response.json())
    .then(data => {
      setClients(data.client);
      setFilteredClients(data.client);
    })
    .catch(error => {
      console.error(error);
    });
}

useEffect(() => {
  fetchClients()
}, []);
 const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
   e.preventDefault();
 
   const { companyName, email, fullname, phone } = client;
   if ( phone && companyName && email && fullname  ) {
     fetch("http://localhost:4001/client", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(client),
     })
       .then((res) => res.json())
       .then((data) => {
        handleClose();
        toast.success('Employee added successfully');
        
         
       })
       .catch((error) => {
        handleClose();
        console.error(error);
        toast.error('Failed to add customer'); // Display error toast notification
       });
   } else {
    handleClose();
    toast.error("Please fill out all the fields"); // Display error toast notification
   }
 };
 
 const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
   const {name, value} = e.target
   setClient({
       ...client,
       [name]: value
   })
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
        <Typography variant='h6'>Add Customer</Typography>
        <IconButton size='small' onClick={handleClose} sx={{ color: 'text.primary' }}>
          <Icon icon='mdi:close' fontSize={20} />
        </IconButton>
      </Header>
      <Box sx={{ p: 5 }}>
        <form onSubmit={handleSubmit} >
         
          <FormControl fullWidth sx={{ mb: 6 }}>
           
          <TextField
                 onChange={handleChange}
                  label='FullName'
                  value={client.fullname}
                  placeholder='John Doe'
                  
                  name='fullname'
                />
             
            
          </FormControl>

          <FormControl fullWidth sx={{ mb: 6 }}>
           
          <TextField
                  type='email'
                  value={client.email}
                  label='Email'
                  name='email'
             onChange={handleChange}
                  placeholder='johndoe@email.com'
                
                />
             
            
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
           
          <TextField
                  type='number'
                  value={client.phone}
                  label='Phone'
                  name='phone'
                  onChange={handleChange}
                  placeholder='(397) 294-5153'
                
                />
             
            
          </FormControl>

          <FormControl fullWidth sx={{ mb: 6 }}>
           
                <TextField
                name='companyName'
                  value={client.companyName}
                  label='Company'
                  onChange={handleChange}
                  placeholder='Company ' 
                />
             
            
          </FormControl>
         
         
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button size='large' type='submit'   variant='contained' sx={{ mr: 3 }}>
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
