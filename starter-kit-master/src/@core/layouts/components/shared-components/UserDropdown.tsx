// ** React Imports
import { useState, SyntheticEvent, Fragment, useEffect } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import Badge from '@mui/material/Badge'
import Avatar, { avatarClasses } from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Context
import { useAuth } from 'src/hooks/useAuth'

// ** Type Imports
import { Settings } from 'src/@core/context/settingsContext'

interface Props {
  settings: Settings
  id: string;
}

// ** Styled Components
const BadgeContentSpan = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))

const UserDropdown = (props: Props) => {
  // ** Props
  const { settings } = props

  // ** States
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)

  // ** Hooks
  const router = useRouter()
  const { logout } = useAuth()

  // ** Vars
  const { direction } = settings

  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = (url?: string) => {
    if (url) {
      router.push(url)
    }
    setAnchorEl(null)
  }

  const styles = {
    py: 2,
    px: 4,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    color: 'text.primary',
    textDecoration: 'none',
    '& svg': {
      mr: 2,
      fontSize: '1.375rem',
      color: 'text.primary'
    }
  }

  const handleLogout = () => {
    logout()
    handleDropdownClose()
  }


  //Get Employee 
  //Get Employee
  const [client, setClient] = useState({
    id: "",
    fullname: "",
    phone: "",
    user: { email: "", username: "" },
    department: { name: "" },
    departmentRole:"",
    adresse:"",
    facebook:"",
    instagram:"",
    slack:"",
    github:"",
    gitlab:"", 
    createdAt:"",
    avatar:""
  });

  const [avatar, setAvatar] = useState('')
  const [fullname, setFullname] = useState('')
  const [email, setEmail] = useState('')
  const [departmentRole, setDepartmentRole] = useState('')
  const [companyName, setCompanyName] = useState('')

  const [employee, setEmployee] = useState({
    id: "",
    fullname: "",
    phone: "",
    user: { email: "", username: "" },
    department: { name: "" },
    departmentRole:"",
    adresse:"",
    facebook:"",
    instagram:"",
    slack:"",
    github:"",
    gitlab:"", 
    createdAt:"",
    avatar:""
  });


  const [admin, setAdmin] = useState({
    id: "",
    fullname: "",
    
    user: { email: "", username: "" },
   
    avatar:""
  });


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        console.log(userData);
  
        if (userData.role === 'client') {
          const clientId = userData.id;
          console.log(clientId);
          const response = await fetch(`http://localhost:4001/client/${clientId}`);
          const data = await response.json();
  
          setClient(data.client);
          console.log(data.client);
  
          // Extraire l'avatar du client si disponible
          const clientAvatar = data.client.avatar;
          setAvatar(clientAvatar);
  
          const clientFullname = data.client.fullname;
          setFullname(clientFullname);
  
          const clientCompany = data.client.companyName;
          setCompanyName(clientCompany);
        } else if (userData.role === 'Employee') {
          const employeeId = userData.id;
          console.log(employeeId);
          const response = await fetch(`http://localhost:4001/employee/${employeeId}`);
          const data = await response.json();
          setEmployee(data.employee);
          console.log(data.employee);
  
          // Extraire l'avatar de l'employé si disponible
          const employeeAvatar = data.employee.avatar;
          setAvatar(employeeAvatar);
          console.log(employeeAvatar);
  
          const employeeFullname = data.employee.fullname;
          setFullname(employeeFullname);
  
          const employeeRole = data.employee.departmentRole;
          setDepartmentRole(employeeRole);
        } else if (userData.role === 'admin') {
          // Logique spécifique pour l'administrateur
          const adminId = userData.id;
          console.log(adminId);
          const response = await fetch(`http://localhost:4001/admin/${adminId}`);
          const data = await response.json();
          setAdmin(data.admin);
          console.log(data.admin);
  
          // Extraire l'avatar de l'administrateur si disponible
          const adminAvatar = data.admin.avatar;
          setAvatar(adminAvatar);
          console.log(adminAvatar);
  
          const adminFullname = data.admin.fullname;
          setFullname(adminFullname);

          const adminEmail = data.admin.user?.email;
          setEmail(adminEmail);
  
          // Ajoutez d'autres données spécifiques à l'administrateur si nécessaire
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchUserData();
  }, []);

  return (
    <Fragment>
      <Badge
        overlap='circular'
        onClick={handleDropdownOpen}
        sx={{ ml: 2, cursor: 'pointer' }}
        badgeContent={<BadgeContentSpan />}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
      >
       
        <Avatar
          src={avatar}
          onClick={handleDropdownOpen}
          sx={{ width: 40, height: 40 }}
        />
    
      </Badge>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{ '& .MuiMenu-paper': { width: 230, mt: 4 } }}
        anchorOrigin={{ vertical: 'bottom', horizontal: direction === 'ltr' ? 'right' : 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: direction === 'ltr' ? 'right' : 'left' }}
      >
        <Box sx={{ pt: 2, pb: 3, px: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Badge
              overlap='circular'
              badgeContent={<BadgeContentSpan />}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
            >
              <Avatar alt='John Doe' src={avatar}  sx={{ width: '2.5rem', height: '2.5rem' }} />
            </Badge>
            <Box sx={{ display: 'flex', ml: 3, alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography sx={{ fontWeight: 600 }}>{fullname}</Typography>
              <Typography variant='body2' sx={{ fontSize: '0.8rem', color: 'text.disabled' }}>
            {departmentRole}{companyName}{admin.user?.email}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ mt: '0 !important' }} />
       
        
     
        <MenuItem
          onClick={handleLogout}
          sx={{ py: 2, '& svg': { mr: 2, fontSize: '1.375rem', color: 'text.primary' } }}
        >
          <Icon icon='mdi:logout-variant' />
          Logout
        </MenuItem>
      </Menu>
    </Fragment>
  )
}

export default UserDropdown
