// ** Type import
import { HorizontalNavItemsType } from 'src/@core/layouts/types'





import { useAuth } from 'src/hooks/useAuth'
import { useRouter } from 'next/router'

const navigation = (): HorizontalNavItemsType => {
  let items = [
    {
      title: 'Dashboard',
      icon: 'mdi:home-outline',
      path: '/dashboards/crm',
      type:'employee'

    },
     {
      title: 'Dashboard',
      icon: 'mdi:home-outline',
      path: '/dashboards/crm',
      type:'admin'

    },
    {
      sectionTitle: 'Apps & Pages',
      type:'employee'
    },

    {
      title: 'Employees',
      icon: 'mdi:face-agent',
      path: '/employee/projects',
      type:'admin'
    },
    {
      title: 'Customers',
      icon: 'mdi:account-group',
      path: '/employee/tickets',
      type:'admin'
    },
    {
      title: 'Trainees',
      icon: 'mdi:account-group-outline',
      path: ''

    },
    {
      title: 'Projects',
      icon:  'mdi:view-dashboard-outline',
      path: '/apps/projects/list',
      type:'employee'


    },

    {
      title: 'Invoice',
      icon: 'mdi:file-document-outline',
      path: '/apps/invoice/list'
    },
    {
      title: 'Tickets',
      icon:  'mdi:ticket-outline',
      path: '/apps/tickets/list',
      type:'employee'

    },
    {
      title: 'Departments',
      icon: 'mdi:office-building',
      path: '/apps/department/list'

    },


    {
      sectionTitle: 'User Interface'
    },
    {
      title: 'User Profile',
      icon: 'mdi:account-circle',
      path: '/pages/user-profile/profile',
         type:'employee'
    },
    {
      title: 'Account Settings',
      path: '/pages/account-settings/account',
      icon: 'mdi:cog'

    },
  ]

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const auth = useAuth()
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const router = useRouter()

  // modify the items array based on some condition
  if (auth.user?.role == 'Employee') {
    items = items.filter(item => item.type == 'employee')
  } else if (auth.user?.role === 'client') {
    items = items.filter(item => item.type == 'client')
  } else if (auth.user?.role === 'trainner') {
    items = items.filter(item => item.type == 'trainer')
  } else {
    items = items.filter(item => item.type == 'admin')
  }

  return items
}
export default navigation
