// ** React Imports
import { useState, forwardRef, SyntheticEvent, ForwardedRef, useEffect } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Tooltip from '@mui/material/Tooltip'
import Link from 'next/link'
import TableRow from '@mui/material/TableRow'
import Collapse from '@mui/material/Collapse'
import TableBody from '@mui/material/TableBody'
import toast from 'react-hot-toast'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import Box, { BoxProps } from '@mui/material/Box'
import Grid, { GridProps } from '@mui/material/Grid'
import InputAdornment from '@mui/material/InputAdornment'
import TableContainer from '@mui/material/TableContainer'
import { styled, alpha, useTheme } from '@mui/material/styles'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem, { MenuItemProps } from '@mui/material/MenuItem'
import TableCell, { TableCellBaseProps } from '@mui/material/TableCell'
import CardContent, { CardContentProps } from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Types
import { DateType } from 'src/types/forms/reactDatepickerTypes'
import { InvoiceClientType } from 'src/types/apps/invoiceTypes'

// ** Custom Component Imports
import Repeater from 'src/@core/components/repeater'

interface PickerProps {
  label?: string
}

interface Props {
  toggleAddCustomerDrawer: () => void
  invoiceNumber: number
  clients: InvoiceClientType[] | undefined
  selectedClient: InvoiceClientType | null
  setSelectedClient: (val: InvoiceClientType | null) => void
}

const CustomInput = forwardRef(({ ...props }: PickerProps, ref: ForwardedRef<HTMLElement>) => {
  return (
    <TextField
      size='small'
      inputRef={ref}
      sx={{ width: { sm: '250px', xs: '170px' }, '& .MuiInputBase-input': { color: 'text.secondary' } }}
      {...props}
    />
  )
})

const MUITableCell = styled(TableCell)<TableCellBaseProps>(({ theme }) => ({
  borderBottom: 0,
  padding: `${theme.spacing(1, 0)} !important`
}))

const CalcWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  '&:not(:last-of-type)': {
    marginBottom: theme.spacing(2)
  }
}))

const RepeatingContent = styled(Grid)<GridProps>(({ theme }) => ({
  paddingRight: 0,
  display: 'flex',
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  '& .col-title': {
    top: '-1.5rem',
    position: 'absolute'
  },
  '& .MuiInputBase-input': {
    color: theme.palette.text.secondary
  },
  [theme.breakpoints.down('lg')]: {
    '& .col-title': {
      top: '0',
      position: 'relative'
    }
  }
}))

const RepeaterWrapper = styled(CardContent)<CardContentProps>(({ theme }) => ({
  paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(5.5),
  '& .repeater-wrapper + .repeater-wrapper': {
    marginTop: theme.spacing(12)
  }
}))

const InvoiceAction = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  padding: theme.spacing(2, 1),
  borderLeft: `1px solid ${theme.palette.divider}`
}))

const CustomSelectItem = styled(MenuItem)<MenuItemProps>(({ theme }) => ({
  color: theme.palette.success.main,
  backgroundColor: 'transparent !important',
  '&:hover': { backgroundColor: `${alpha(theme.palette.success.main, 0.1)} !important` }
}))

const now = new Date()
const tomorrowDate = now.setDate(now.getDate() + 7)

const AddCard = (props: Props) => {
  // ** Props
  const { clients, invoiceNumber, selectedClient, setSelectedClient, toggleAddCustomerDrawer } = props

  // ** States
  const [count, setCount] = useState<number>(1)
  const [selected, setSelected] = useState<string>('')
  const [issueDate, setIssueDate] = useState<DateType>(new Date())
  const [dueDate, setDueDate] = useState<DateType>(new Date(tomorrowDate))

  // ** Hook
  const theme = useTheme()

  // ** Deletes form
  const deleteForm = (e: SyntheticEvent) => {
    e.preventDefault()

    // @ts-ignore
    e.target.closest('.repeater-wrapper').remove()
  }

  // ** Handle Invoice To Change
  const handleInvoiceChange = (event: SelectChangeEvent) => {
    setSelected(event.target.value)
    if (clients !== undefined) {
      setSelectedClient(clients.filter(i => i.name === event.target.value)[0])
    }
  }

  const handleAddNewCustomer = () => {
    toggleAddCustomerDrawer()
  }

  //Get Projects
  const [projects, setProjects] = useState([]);


  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:4001/project'); 
      const data = await response.json();
      setProjects(data.projects);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  //Post invoice

   //Post Project 

   const [invoice, setInvoice] = useState({ endDate:'', issueDate:'', cost:'',jour:'',price:'',total:'', project: {name:" "}})

   const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
  
    const { endDate,issueDate, total, jour, cost, price, project  } = invoice;
    if (endDate && issueDate && total && project) {
      const newInvoice = { ...invoice, projectId: project };
      fetch("http://localhost:4001/employee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newInvoice),
      })
        .then((res) => res.json())
        .then(() => {
         
          toast.success('Invoice added successfully');
            // Fetch the updated employee list
       
        })
        .catch((error) => {
         
          console.error(error);
          toast.error('Failed to add invoice'); // Display error toast notification
        });
    } else {
    
      toast.error("Please fill out all the fields"); // Display error toast notification
    }
  };

  return (
    <>

<Grid container spacing={6}>
<Grid item xl={9} md={8} xs={12}>
    <Card>
      <CardContent>
        <Grid container>
          <Grid item xl={6} xs={12} sx={{ mb: { xl: 0, xs: 4 } }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ mb: 6, display: 'flex', alignItems: 'center' }}>
              <svg style={{marginTop:"-20px"}} width={40} fill='none' height={50} viewBox='0 0 268 150' xmlns='http://www.w3.org/2000/svg'>
            <image
             
              width='250'
              height='300'
              href='/images/pages/logo2.png'
              
            
            />
           
            <defs>
              <linearGradient
                y1='0'
                x1='25.1443'
                x2='25.1443'
                y2='143.953'
                id='paint0_linear_7821_79167'
                gradientUnits='userSpaceOnUse'
              >
                <stop />
                <stop offset='1' stopOpacity='0' />
              </linearGradient>
              <linearGradient
                y1='0'
                x1='25.1443'
                x2='25.1443'
                y2='143.953'
                id='paint1_linear_7821_79167'
                gradientUnits='userSpaceOnUse'
              >
                <stop />
                <stop offset='1' stopOpacity='0' />
              </linearGradient>
            </defs>
          </svg>
                <Typography variant='h6' sx={{ ml: 2, fontWeight: 700, lineHeight: 1.2 }}>
                  {themeConfig.templateName}
                </Typography>
              </Box>
              <div>
                <Typography variant='body2' sx={{ mb: 1 }}>
                  Office 149, 450 South Brand Brooklyn
                </Typography>
                <Typography variant='body2' sx={{ mb: 1 }}>
                  San Diego County, CA 91905, USA
                </Typography>
                <Typography variant='body2'>+1 (123) 456 7891, +44 (876) 543 2198</Typography>
              </div>
            </Box>
          </Grid>
          <Grid item xl={6} xs={12}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xl: 'flex-end', xs: 'flex-start' } }}>
              <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
                <Typography variant='h6' sx={{ mr: 1, width: '105px' }}>
                  Invoice
                </Typography>
                <TextField
                  size='small'
                  value={invoiceNumber}
                  sx={{ width: { sm: '250px', xs: '170px' } }}
                  InputProps={{
                    disabled: true,
                    startAdornment: <InputAdornment position='start'>#</InputAdornment>
                  }}
                />
              </Box>
              <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
                <Typography variant='body2' sx={{ mr: 2, width: '100px' }}>
                  Date Issued:
                </Typography>
                <DatePicker
                  id='issue-date'
                  selected={issueDate}
                  customInput={<CustomInput />}
                  onChange={(date: Date) => setIssueDate(date)}
                />
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Typography variant='body2' sx={{ mr: 2, width: '100px' }}>
                  Date Due:
                </Typography>
                <DatePicker
                  id='due-date'
                  selected={dueDate}
                  customInput={<CustomInput />}
                  onChange={(date: Date) => setDueDate(date)}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardContent>

  

     

      <Divider sx={{ mb: theme => `${theme.spacing(1.25)} !important` }} />

      <RepeaterWrapper>
        <Repeater count={count}>
          {(i: number) => {
            const Tag = i === 0 ? Box : Collapse

            return (
              <Tag key={i} className='repeater-wrapper' {...(i !== 0 ? { in: true } : {})}>
                <Grid container>
                  <RepeatingContent item xs={12}>
                    <Grid container sx={{ py: 4, width: '100%', pr: { lg: 0, xs: 4 } }}>
                      <Grid item lg={6} md={5} xs={12} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
                        <Typography
                          variant='subtitle2'
                          className='col-title'
                          sx={{ mb: { md: 2, xs: 0 }, color: 'text.primary' }}
                        >
                        Project
                        </Typography>
                        <Select fullWidth size='small' defaultValue='Projects'>
                        {projects.map((project) => (
          <MenuItem key={project.id} value={project.name}>
            {project.name}
          </MenuItem>
        ))}
                        </Select>
                        <TextField
                          rows={2}
                          fullWidth
                          multiline
                          size='small'
                          sx={{ mt: 3.5 }}
                          defaultValue='Customization & Bug Fixes'
                        />
                      </Grid>
                      <Grid item lg={2} md={3} xs={12} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
                        <Typography
                          variant='subtitle2'
                          className='col-title'
                          sx={{ mb: { md: 2, xs: 0 }, color: 'text.primary' }}
                        >
                          Cost
                        </Typography>
                        <TextField
                          size='small'
                          type='number'
                          placeholder='24'
                          defaultValue='24'
                          InputProps={{ inputProps: { min: 0 } }}
                        />
                        
                      </Grid>
                      <Grid item lg={2} md={2} xs={12} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
                        <Typography
                          variant='subtitle2'
                          className='col-title'
                          sx={{ mb: { md: 2, xs: 0 }, color: 'text.primary' }}
                        >
                          Hours
                        </Typography>
                        <TextField
                          size='small'
                          type='number'
                          placeholder='1'
                          defaultValue='1'
                          InputProps={{ inputProps: { min: 0 } }}
                        />
                      </Grid>
                      <Grid item lg={2} md={2} xs={12} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
                        <Typography
                          variant='subtitle2'
                          className='col-title'
                          sx={{ mb: { md: 2, xs: 0 }, color: 'text.primary' }}
                        >
                          Price
                        </Typography>
                        <TextField
                          size='small'
                          type='number'
                          placeholder='1'
                          defaultValue='1'
                          InputProps={{ inputProps: { min: 0 } }}
                        />
                      </Grid>
                    </Grid>
                  
                  </RepeatingContent>
                </Grid>
              </Tag>
            )
          }}
        </Repeater>

       
      </RepeaterWrapper>

      <Divider />

      <CardContent>
        <Grid container>
          <Grid item xs={12} sm={9} sx={{ order: { sm: 1, xs: 2 } }}>
            <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
              <Typography
                variant='body2'
                sx={{ mr: 2, color: 'text.primary', fontWeight: 600, letterSpacing: '.25px' }}
              >
                Salesperson:
              </Typography>
              <TextField
                size='small'
                defaultValue='Tommy Shelby'
                sx={{ maxWidth: '150px', '& .MuiInputBase-input': { color: 'text.secondary' } }}
              />
            </Box>
            <TextField
              size='small'
              placeholder='Thanks for your business'
              sx={{ maxWidth: '300px', '& .MuiInputBase-input': { color: 'text.secondary' } }}
            />
          </Grid>
          <Grid item xs={12} sm={3} sx={{ mb: { sm: 0, xs: 4 }, order: { sm: 2, xs: 1 } }}>

          <Typography
                variant='body2'
                sx={{ mr: 2, color: 'text.primary', fontWeight: 600, letterSpacing: '.25px' }}
              >
                Total:
              </Typography>
              <TextField
                size='small'
             defaultValue="120DT"
                sx={{ maxWidth: '150px', '& .MuiInputBase-input': { color: 'text.secondary' } }}
              />
          </Grid>
        </Grid>
      </CardContent>

      <Divider sx={{ my: theme => `${theme.spacing(1)} !important` }} />

      <CardContent sx={{ pt: 4 }}>
        <InputLabel htmlFor='invoice-note'>Note:</InputLabel>
        <TextField
          rows={2}
          fullWidth
          multiline
          id='invoice-note'
          sx={{ '& .MuiInputBase-input': { color: 'text.secondary' } }}
          defaultValue='It was a pleasure working with you and your team. We hope you will keep us in mind for future freelance projects. Thank You!'
        />
      </CardContent>
      
    </Card>

</Grid>

<Grid item xl={3} md={4} xs={12}>
<Card>
      <CardContent>
        <Button
          fullWidth
          sx={{ mb: 3.5 }}
          variant='contained'
       
          startIcon={<Icon icon='mdi:send-outline' />}
        >
          Send Invoice
        </Button>
        <Button fullWidth sx={{ mb: 3.5 }} color='secondary' variant='outlined'>
          Download
        </Button>
        <Button
          fullWidth
          target='_blank'
          sx={{ mb: 3.5 }}
          component={Link}
          color='secondary'
          variant='outlined'
          href='#'
        >
          Print
        </Button>
        <Button
          fullWidth
          sx={{ mb: 3.5 }}
          component={Link}
          color='secondary'
          variant='outlined'
 href='#'
        >
          Edit Invoice
        </Button>
       
      </CardContent>
    </Card></Grid>


</Grid>

    </>
  )
}

export default AddCard
