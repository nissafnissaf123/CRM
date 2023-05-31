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
      type:'client'

    },
     {
      title: 'Dashboard',
      icon: 'mdi:home-outline',
      path: '/admin',
      type:'admin'

    },
    {
      sectionTitle: 'Apps & Pages',
      type:'admin'
    },
    {
      sectionTitle: 'Apps & Pages',
      type:'employee'
    },
    {
      title: 'Dashboard',
      icon: 'mdi:home-outline',
      path: '/employee',
      type:'employee'

    },

    {
      title: 'Employees',
      icon: 'mdi:face-agent',
      path: '/admin/employees/list',
      type:'admin'
    },
    {
      title: 'Customers',
      icon: 'mdi:account-group',
      path: '/admin/clients/list',
      type:'admin'
    },
    {
      title: 'Trainees',
      icon: 'mdi:account-group-outline',
      path: '/admin/trainnes/list',
      type:'admin'
    },
    {
      title: 'Projects',
      icon:  'mdi:view-dashboard-outline',
      path: '/admin/projects', 
      type:'admin'
      
    },
    {
      title: 'Invoice',
      icon: 'mdi:file-document-outline',
      path: '/admin/invoice',
      type:'admin'
    },
    {
      title: 'Tickets',
      icon:  'mdi:ticket-outline',
      path: '/admin/tickets',
      type:'admin'
      
    },
    {
      title: 'Departments',
      icon: 'mdi:office-building',
      path: '/admin/departments',
      type:'admin'
     
    },
   
    
    {
      title: 'Projects',
      icon:  'mdi:view-dashboard-outline',
      path: '/employee/projects',
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
      path: '/employee/tickets',
      type:'employee'

    },
    
    {
      title: 'Employees',
      icon: 'mdi:account-group',
      path: '/employee/employees',
      type:'employee'
    },
    


    
     
      {
        sectionTitle: 'User Interface',
         type:'admin'
      },
      {
        sectionTitle: 'User Interface',
         type:'employee'
      },
    
    {
      title: 'User Profile',
      icon: 'mdi:account-circle',
      path: '/admin/profile',
         type:'admin'
    },
    {
      title: 'User Profile',
      icon: 'mdi:account-circle',
      path: '/employee/profile',
         type:'employee'
    },
    {
      title: 'Account Settings',
      path: '/admin/account',
      icon: 'mdi:cog',
      type:'admin'

    },
    {
      title: 'Account Settings',
      path: '/employee/profile/TabAccount',
      icon: 'mdi:cog',
      type:'employee'

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
