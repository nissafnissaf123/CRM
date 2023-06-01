// ** React Imports
import { useState, SyntheticEvent, Fragment, ReactNode, useEffect } from 'react'
import moment from 'moment';

// ** MUI Imports
import Box from '@mui/material/Box'
import Badge from '@mui/material/Badge'
import IconButton from '@mui/material/IconButton'
import { styled, Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import MuiMenu, { MenuProps } from '@mui/material/Menu'
import MuiMenuItem, { MenuItemProps } from '@mui/material/MenuItem'
import Typography, { TypographyProps } from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Components
import PerfectScrollbarComponent from 'react-perfect-scrollbar'

// ** Type Imports
import { ThemeColor } from 'src/@core/layouts/types'
import { Settings } from 'src/@core/context/settingsContext'
import { CustomAvatarProps } from 'src/@core/components/mui/avatar/types'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Util Import
import { getInitials } from 'src/@core/utils/get-initials'

export type NotificationsType = {
  meta: string
  title: string
  subtitle: string
} & (
  | { avatarAlt: string; avatarImg: string; avatarText?: never; avatarColor?: never; avatarIcon?: never }
  | {
      avatarAlt?: never
      avatarImg?: never
      avatarText: string
      avatarIcon?: never
      avatarColor?: ThemeColor
    }
  | {
      avatarAlt?: never
      avatarImg?: never
      avatarText?: never
      avatarIcon: ReactNode
      avatarColor?: ThemeColor
    }
)
interface Props {
  settings: Settings
  notifications: NotificationsType[]
}

// ** Styled Menu component
const Menu = styled(MuiMenu)<MenuProps>(({ theme }) => ({
  '& .MuiMenu-paper': {
    width: 380,
    overflow: 'hidden',
    marginTop: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  '& .MuiMenu-list': {
    padding: 0
  }
}))



// ** Styled MenuItem component
const MenuItem = styled(MuiMenuItem)<MenuItemProps>(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  '&:not(:last-of-type)': {
    borderBottom: `1px solid ${theme.palette.divider}`
  }
}))

// ** Styled PerfectScrollbar component
const PerfectScrollbar = styled(PerfectScrollbarComponent)({
  maxHeight: 344
})

// ** Styled Avatar component
const Avatar = styled(CustomAvatar)<CustomAvatarProps>({
  width: 38,
  height: 38,
  fontSize: '1.125rem'
})

// ** Styled component for the title in MenuItems
const MenuItemTitle = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontWeight: 600,
  flex: '1 1 100%',
  overflow: 'hidden',
  fontSize: '0.875rem',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  marginBottom: theme.spacing(0.75)
}))

// ** Styled component for the subtitle in MenuItems
const MenuItemSubtitle = styled(Typography)<TypographyProps>({
  flex: '1 1 100%',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis'
})

const ScrollWrapper = ({ children, hidden }: { children: ReactNode; hidden: boolean }) => {
  if (hidden) {
    return <Box sx={{ maxHeight: 349, overflowY: 'auto', overflowX: 'hidden' }}>{children}</Box>
  } else {
    return <PerfectScrollbar options={{ wheelPropagation: false, suppressScrollX: true }}>{children}</PerfectScrollbar>
  }
}

const NotificationDropdown = (props: Props) => {
  // ** Props
  const { settings, notifications } = props

  // ** States
  const [anchorEl, setAnchorEl] = useState<(EventTarget & Element) | null>(null)

  // ** Hook
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))

  // ** Vars
  const { direction } = settings

  const [isOpen, setIsOpen] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(0);


  const handleDropdownClose = () => {
    setIsOpen(false);
    setAnchorEl(null);

  };

  const handleDropdownOpen = (event: SyntheticEvent) => {
    setIsOpen(true);
    setAnchorEl(event.currentTarget);
  };



  const RenderAvatar = ({ notification }: { notification: NotificationsType }) => {
    const { avatarAlt, avatarImg, avatarIcon, avatarText, avatarColor } = notification

    if (avatarImg) {
      return <Avatar alt={avatarAlt} src={avatarImg} />
    } else if (avatarIcon) {
      return (
        <Avatar skin='light' color={avatarColor}>
          {avatarIcon}
        </Avatar>
      )
    } else {
      return (
        <Avatar skin='light' color={avatarColor}>
          {getInitials(avatarText as string)}
        </Avatar>
      )
    }
  }


  //Get notification
  const [employeeId, setEmployeeId] = useState<string | null>(null); // Nouvel état pour stocker l'ID de l'employé
  const [notification, setNotification] = useState([]);
  const [completedNotifications, setCompletedNotifications] = useState([]);
const [deletedNotifications, setDeletedNotifications] = useState(0);


  useEffect(() => {
    // Récupérer les données d'utilisateur depuis localStorage
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (userData) {
      // Extraire l'ID de l'employé à partir des données d'utilisateur
      const employeeId = userData.id;
      setEmployeeId(employeeId);

      // Appeler l'API pour récupérer les notifications filtrées par l'ID de l'employé
      fetch(`http://localhost:4001/notification`)
        .then(response => response.json())
        .then(data => {
          // Filtrer les notifications pour obtenir celles avec l'employeeId correspondant
          const filteredNotifications = data.filter(notification => notification.employeeId === employeeId);

          // Filtrer les notifications pour obtenir celles qui sont encore actives
          const activeNotifications = filteredNotifications.filter(notification => !notification.completed);

          // Filtrer les notifications pour obtenir celles qui sont complétées
          const completedNotifications = filteredNotifications.filter(notification => notification.completed);

          setNotification(activeNotifications);
          setCompletedNotifications(completedNotifications);

          // Calculer le nombre de nouvelles notifications non lues
          const newNotificationsCount = activeNotifications.filter(notification => !notification.read).length;
          setUnreadNotifications(newNotificationsCount);
          console.log(filteredNotifications);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, []);


  const formatDate = (createdAt) => {
    const currentDate = moment();
    const notificationDate = moment(createdAt);

    // Vérifier si la date est aujourd'hui
    if (notificationDate.isSame(currentDate, 'day')) {
      return 'Today';
    }

    // Vérifier si la date est hier
    if (notificationDate.isSame(currentDate.clone().subtract(1, 'day'), 'day')) {
      return 'Yesterday';
    }

    // Formater la date au format "jour mois" (par exemple, "11 Aug")
    return notificationDate.format('DD MMM');
  };



  return (
    <Fragment>
      <IconButton color='inherit' aria-haspopup='true' onClick={handleDropdownOpen} aria-controls='customized-menu'>
      <Badge
     color='error'
     variant='standard'
     badgeContent={unreadNotifications}
     sx={{
       '& .MuiBadge-badge': {
         top: 4,
         right: 2,
         fontSize: '0.75rem',
         width: 16,
         height: 16,
         borderRadius: '50%',
         display: 'flex',
         alignItems: 'center',
         justifyContent: 'center',
         boxShadow: theme => `0 0 0 2px ${theme.palette.background.paper}`,
         visibility: unreadNotifications > 0 && !isOpen ? 'visible' : 'hidden'
       }
     }}
   >
  <Icon icon='mdi:bell-outline' />
</Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleDropdownClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: direction === 'ltr' ? 'right' : 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: direction === 'ltr' ? 'right' : 'left' }}
      >
        <MenuItem
          disableRipple
          disableTouchRipple
          sx={{ cursor: 'default', userSelect: 'auto', backgroundColor: 'transparent !important' }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <Typography sx={{ cursor: 'text', fontWeight: 600 }}>Notifications</Typography>

          </Box>
        </MenuItem>
       <ScrollWrapper hidden={hidden}>
  {notification
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort notifications by createdAt date in descending order
    .map((notification: NotificationsType, index: number) => {
      const createdAtDate = new Date(notification.createdAt);
      const today = new Date(); // Get today's date

      // Check if the createdAt date is today
      const isToday = (
        createdAtDate.getDate() === today.getDate() &&
        createdAtDate.getMonth() === today.getMonth() &&
        createdAtDate.getFullYear() === today.getFullYear()
      );

      return (
        <MenuItem key={index} onClick={handleDropdownClose}>
          <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
            <Box sx={{ mx: 4, flex: '1 1', display: 'flex', overflow: 'hidden', flexDirection: 'column' }}>
              <MenuItemTitle>{notification.name}</MenuItemTitle>
              <MenuItemSubtitle variant='body2'>{notification.subtitle}</MenuItemSubtitle>
            </Box>
            <Typography variant='caption' sx={{ color: 'text' }}>
              {formatDate(notification.createdAt)}
            </Typography>
          </Box>
        </MenuItem>
      );
    })
  }
</ScrollWrapper>
        <MenuItem
          disableRipple
          disableTouchRipple
          sx={{
            py: 3.5,
            borderBottom: 0,
            cursor: 'default',
            userSelect: 'auto',
            backgroundColor: 'transparent !important',
            borderTop: theme => `1px solid ${theme.palette.divider}`
          }}
        >

        </MenuItem>
      </Menu>
    </Fragment>
  )
}

export default NotificationDropdown
