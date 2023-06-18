// ** React Imports
import { useState, useEffect, forwardRef , useCallback,   Ref, ReactElement} from 'react'

import Fade, { FadeProps } from '@mui/material/Fade'

// ** Next Import
import Link from 'next/link'

import toast from 'react-hot-toast'

// ** MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Tooltip from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { DataGrid, GridColDef, GridRowId } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import format from 'date-fns/format'
import DatePicker from 'react-datepicker'

// ** Store & Actions Imports
import { useDispatch, useSelector } from 'react-redux'


// ** Types Imports

import { ThemeColor } from 'src/@core/layouts/types'
import { InvoiceType } from 'src/types/apps/invoiceTypes'
import { DateType } from 'src/types/forms/reactDatepickerTypes'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import OptionsMenu from 'src/@core/components/option-menu'
import TableHeader from 'src/views/invoice/TableHeader'

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

interface InvoiceStatusObj {
  [key: string]: {
    icon: string
    color: ThemeColor
  }
}

interface CustomInputProps {
  dates: Date[]
  label: string
  end: number | Date
  start: number | Date
  setDates?: (value: Date[]) => void
}

interface CellType {
  row: InvoiceType
}

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})


// ** Styled component for the link in the dataTable
const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

// ** Vars
const invoiceStatusObj: InvoiceStatusObj = {
  Sent: { color: 'secondary', icon: 'mdi:send' },
  Paid: { color: 'success', icon: 'mdi:check' },

}

// ** renders client column
const renderClient = (row: InvoiceType) => {
  if (row.project.client?.avatar.length) {
    return <CustomAvatar src={row.project.client?.avatar} sx={{ mr: 3, width: 34, height: 34 }} />
  } else {
    return (
      <CustomAvatar
        skin='light'
        color={(row.avatarColor as ThemeColor) || ('primary' as ThemeColor)}
        sx={{ mr: 3, fontSize: '1rem', width: 34, height: 34 }}
      >
        {getInitials(row.project.client?.fullname || 'John Doe')}
      </CustomAvatar>
    )
  }
}

const defaultColumns: GridColDef[] = [
  {
    flex: 0.1,
    field: 'id',
    minWidth: 80,
    headerName: '#',
    renderCell: ({ row }: CellType) => <LinkStyled href={`/apps/invoice/preview/${row.id}`}>{`#`}</LinkStyled>
  },
  {
    flex: 0.1,
    minWidth: 80,
    field: 'invoiceStatus',
    renderHeader: () => (
      <Box sx={{ display: 'flex', color: 'action.active' }}>
        <Icon icon='mdi:trending-up' fontSize={20} />
      </Box>
    ),
    renderCell: ({ row }: CellType) => {
      const { endDate, balance, status } = row;
      const isPaid = status === 'paid';
    
      const color = isPaid ? 'success' : 'secondary';
      const icon = isPaid ? 'mdi:check' : 'mdi:send';

      const date = new Date(row.issueDate);
      const day = date.getDate().toString().padStart(2, '0'); // Get the day and pad with leading zeros if necessary
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Get the month (+1 because it's zero-based) and pad with leading zeros if necessary
      const year = date.getFullYear(); // Get the year
  
      const dateString = `${day}-${month}-${year}`;
    
      return (
        <Tooltip
          title={
            <div>
              <Typography variant='caption' sx={{ color: 'common.white', fontWeight: 600 }}>
                Issue Date:
              </Typography>{' '}
              {dateString}
            </div>
          }
        >
          <CustomAvatar skin='light' color={color} sx={{ width: 30, height: 32 }}>
            <Icon icon={icon} fontSize='1.10rem' />
          </CustomAvatar>
        </Tooltip>
      );
    }
  },
  {
    flex: 0.25,
    field: 'project',
    minWidth: 300,
    headerName: 'Project',
    renderCell: ({ row }: CellType) => {
      const { name, companyEmail, project, category } = row;

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
     
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography
              noWrap
              variant='body2'
              sx={{ color: 'text.primary', fontWeight: 500, lineHeight: '22px', letterSpacing: '.1px' }}
            >
              {project?.name}
            </Typography>
            <Typography noWrap variant='caption'>
          {project.category}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.25,
    field: 'name',
    minWidth: 300,
    headerName: 'Customer',
    renderCell: ({ row }: CellType) => {
      const { name, email, client, user, project } = row;

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderClient(row)}
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography
              noWrap
              variant='body2'
              sx={{ color: 'text.primary', fontWeight: 500, lineHeight: '22px', letterSpacing: '.1px' }}
            >
              {project.client?.fullname}
            </Typography>
            <Typography noWrap variant='caption'>
            {project.client?.user?.email}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 90,
    field: 'total',
    headerName: 'Total',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{`$${row.total || 0}`}</Typography>
  },
  {
    flex: 0.15,
    minWidth: 125,
    field: 'endDate',
    headerName: 'End Date',
    renderCell: ({ row }: CellType) => {

    
      
      const date = new Date(row.endDate);
      const day = date.getDate().toString().padStart(2, '0'); // Get the day and pad with leading zeros if necessary
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Get the month (+1 because it's zero-based) and pad with leading zeros if necessary
      const year = date.getFullYear(); // Get the year
  
      const dateString = `${day}-${month}-${year}`;
  
      return (
        <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
         {dateString}
        </Typography>
      );
    }  },
 
]

/* eslint-disable */
const CustomInput = forwardRef((props: CustomInputProps, ref) => {
  const startDate = props.start !== null ? format(props.start, 'MM/dd/yyyy') : ''
  const endDate = props.end !== null ? ` - ${format(props.end, 'MM/dd/yyyy')}` : null

  const value = `${startDate}${endDate !== null ? endDate : ''}`
  props.start === null && props.dates.length && props.setDates ? props.setDates([]) : null
  const updatedProps = { ...props }
  delete updatedProps.setDates

  return <TextField fullWidth inputRef={ref} {...updatedProps} label={props.label || ''} value={value} />
})
/* eslint-enable */

const InvoiceList = () => {
  // ** State
  const [dates, setDates] = useState<Date[]>([])
  const [value, setValue] = useState<string>('')
  const [statusValue, setStatusValue] = useState<string>('')
  const [endDateRange, setEndDateRange] = useState<DateType>(null)
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([])
  const [startDateRange, setStartDateRange] = useState<DateType>(null)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  // ** Hooks
 

  const handleStatusValue = (e: SelectChangeEvent) => {
    setStatusValue(e.target.value)
  }

  const handleOnChangeRange = (dates: any) => {
    const [start, end] = dates
    if (start !== null && end !== null) {
      setDates(dates)
    }
    setStartDateRange(start)
    setEndDateRange(end)
  }

  const columns: GridColDef[] = [
    ...defaultColumns,
    {
      flex: 0.1,
      minWidth: 130,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }: CellType) =>{

        //Get invoice by id 
        
   useEffect(() => {
    const fetchInvoiceById = async () => {

      try {
        const response = await fetch(`http://localhost:4001/invoice/${row.id}`);
        const data = await response.json();
        setInvoice(data.invoice);
      } catch (error) {
        console.log(error);
      }
    };
    fetchInvoiceById();
  }, [row.id]);

        const [showDialog, setShowDialog] = useState<boolean>(false);

       //Edit invoice 

       const [price, setPrice] = useState("");
       const [cost, setCost] = useState("");
       const [project, setProject] = useState("");
       const [projectId, setProjectId] = useState('');
       const [endDate, setEndDate] = useState("");
       const [issueDate, setIssueDate] = useState("");
       const [total, setTotal] = useState("");
       const [status, setStatus] = useState("");
       const [jour, setJour] = useState("");

       const [invoice, setInvoice] = useState
       ({
         id: "",
         cost:"",
         project: {
          id:"",
          name: "",
          category: "",
          client: {
            userId: "",
            companyName: "",
            fullname:"",
            adresse:"",
            phone:"",
            user: {
              id: "",
              username: "",
              email:""
              }
            }
          },
         price:"",
         jour:"", 
         total:"",
        endDate:"",
        issueDate:"",
        status:"",
        
        });

       const handleEdit = useCallback(() => {
        setShowDialog(true);
        setCost(invoice.cost);
        setPrice(invoice.price);
        setStatus(invoice.status);
        setJour(invoice.jour);
        setTotal(invoice.total);
      setEndDate(invoice.endDate)
      setIssueDate(invoice.issueDate)
        setProject(invoice.project?.name)
        setProjectId(invoice.project?.id); 
      }, [setShowDialog, invoice]);

      

      //Update invoice 

      const handleUpdate = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
  
        const formattedEndDate = new Date(endDate).toISOString();
        const formattedIssueDate = new Date(issueDate).toISOString();

        try {
          const response = await fetch(`http://localhost:4001/invoice/${row.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              status: status,
              projectId: projectId,
              total:total,
              cost: cost,
              jour: jour,
              price: price,
              endDate: formattedEndDate,
              issueDate: formattedIssueDate
  
  
  
            }),
          });
          const data = await response.json();
          console.log(data.invoice);
         
  
  
          // Alert si la modification a réussi
          if (response.ok) {
            setShowDialog(false); // Close the dialog
            toast.success('Invoice updated successfully');
          } else {
            toast.error('An error occurred');
          }
  
        } catch (error) {
          console.log(error);
          // Alert en cas d'erreur
         toast.error("Une erreur s'est produite. Veuillez réessayer plus tard.");
        }
      };

        //Get projects
        const [projects, setProjects] = useState([]);

const fetchProjects = () => {
  fetch("http://localhost:4001/project")
    .then(response => response.json())
    .then(data => {
      setProjects(data.projects);

    })
    .catch(error => {
      console.error(error);
    });
}

useEffect(() => {
  fetchProjects()
}, []);


         

        return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          
         
          <OptionsMenu
            iconProps={{ fontSize: 20 }}
            iconButtonProps={{ size: 'small' }}
            menuProps={{ sx: { '& .MuiMenuItem-root svg': { mr: 2 } } }}
            options={[
              {
                text: 'View',
                href: `/admin/viewInvoice/${row.id}`,
                icon: <Icon icon='mdi:eye-outline' fontSize={20} />
              },
              {
                text: 'Edit',
             
                icon: <Icon icon='mdi:pencil-outline' onClick={handleEdit} fontSize={20} />
              }
              
            ]}
          />

<Dialog
        open={showDialog}
        maxWidth='md'
        scroll='body'
        onClose={() => setShowDialog(false)}
        TransitionComponent={Transition}
        onBackdropClick={() => setShowDialog(false)}
      ><form onSubmit={handleUpdate}>
        <DialogContent
          sx={{
            position: 'relative',
            pb: theme => `${theme.spacing(8)} !important`,
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <IconButton
            size='small'
            onClick={() => setShowDialog(false)}
            sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
          >
            <Icon icon='mdi:close' />
          </IconButton>
          <Box sx={{ mb: 8, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
              Edit  Invoice Information
            </Typography>
            <Typography variant='body2'></Typography>
          </Box>

          <Grid container spacing={6}>
            <Grid item sm={6} xs={12}>
              <TextField fullWidth  label='Customer' name="fullname" value={invoice.project?.client?.fullname}      placeholder='John' />
            </Grid>
            <Grid item sm={6} xs={12}>
            <FormControl fullWidth>
                <InputLabel id='project-select'>Select Project</InputLabel>
                <Select
                 inputProps={{ placeholder: 'Select Project' }} 
                 fullWidth 
                 labelId='project-select' 
               value={projectId}
                 name='employees'
                 onChange={(e) => setProjectId(e.target.value)}
                 label='Select Project'>

{projects.map((dep) => ( 
<MenuItem key={dep.id} value={dep.id}>
<Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Typography>{dep.name}</Typography>
  </Box>
  </MenuItem> // Use dep.id as the value
      ))}
                </Select>
              </FormControl>      </Grid>
              <Grid item sm={4} xs={12}>
              <TextField
            type="date"
            style={{width:"250px"}}
            value={issueDate ? new Date(issueDate).toISOString().substr(0, 10) : ""}
           onChange={(e) => setIssueDate(e.target.value)}
          id="outlined-issueDtae"
          label="IssueDate"
          InputLabelProps={{
            shrink: true,
          }}
          />     </Grid>
            <Grid item sm={4} xs={12}>
            <TextField
            type="date"
            style={{width:"250px"}}
          id="outlined-deadline"
          value={endDate ? new Date(endDate).toISOString().substr(0, 10) : ""}
          onChange={(e) => setEndDate(e.target.value)}
          label="Deadline"
          InputLabelProps={{
            shrink: true,
          }}
          />      </Grid>

           
            
            <Grid item sm={4} xs={12}>
              <FormControl fullWidth>
                <InputLabel  id='status-select'>Select Status</InputLabel>
                <Select
  inputProps={{ placeholder: 'Select Status' }}
  fullWidth
  labelId='status-select'
  label='Select Status'
  onChange={(e) => setStatus(e.target.value)}
  name='status'
 value={status}
>
  <MenuItem value=''>select status</MenuItem>
  <MenuItem value='paid'>Paid</MenuItem>
</Select>
              </FormControl>
            </Grid>

            <Grid item sm={3} xs={12}>
            <TextField fullWidth  label='Cost' name="cost" value={cost} onChange={(e) => setCost(e.target.value)}  placeholder='24' />
            </Grid>
            <Grid item sm={3} xs={12}>
            <TextField fullWidth  label='Days' name="days" value={jour} onChange={(e) => setJour(e.target.value)}  placeholder='24' />
            </Grid> 
            <Grid item sm={3} xs={12}>
            <TextField fullWidth  label='Price' name="price" value={price} onChange={(e) => setPrice(e.target.value)}  placeholder='24' />
            </Grid> 
            <Grid item sm={3} xs={12}>
            <TextField fullWidth  label='Total' name="total" value={total} onChange={(e) => setTotal(e.target.value)}  placeholder='0 DT' />
            </Grid> 

          

          

          </Grid>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Button variant='contained' sx={{ mr: 2 }} type='submit'  >
            Submit
          </Button>
          <Button variant='outlined' color='secondary' onClick={() => setShowDialog(false)}>
            Discard
          </Button>
        </DialogActions>
       </form>
      </Dialog>


        </Box>
    )
   }
    }
  ]




   //Get invoices 

   const [invoices, setInvoices] = useState("");


   useEffect(() => {
     fetchInvoices();
   }, []);
 
   const fetchInvoices = async () => {
    fetch("http://localhost:4001/invoice")
    .then(response => response.json())
    .then(data => {
      setInvoices(data.invoice);
      setFilteredInvoices(data.invoice);
    })
    .catch(error => {
      console.error(error);
    });
   };

   const [filteredInvoices, setFilteredInvoices] = useState([]);

   const handleFilter = (value: string) => {
    // Filter the invoices list based on the input value
    const filteredInvoices = invoices.filter((invoice: InvoiceType) => {
      return invoice.project.name.toLowerCase().includes(value.toLowerCase());
    });
  
    // Update the state with the filtered invoices
    setFilteredInvoices(filteredInvoices);
  
    // Update the value of the search input field
    setValue(value);
  };


  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title='Filters' />
            <CardContent>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id='invoice-status-select'>Invoice Status</InputLabel>

                    <Select
                      fullWidth
                      value={statusValue}
                      sx={{ mr: 4, mb: 2 }}
                      label='Invoice Status'
                      onChange={handleStatusValue}
                      labelId='invoice-status-select'
                    >
                      <MenuItem value=''>none</MenuItem>
                      <MenuItem value='downloaded'>Downloaded</MenuItem>
                      <MenuItem value='draft'>Draft</MenuItem>
                      <MenuItem value='paid'>Paid</MenuItem>
                      <MenuItem value='partial payment'>Partial Payment</MenuItem>
                      <MenuItem value='past due'>Past Due</MenuItem>
                      <MenuItem value='sent'>Sent</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DatePicker
                    isClearable
                    selectsRange
                    monthsShown={2}
                    endDate={endDateRange}
                    selected={startDateRange}
                    startDate={startDateRange}
                    shouldCloseOnSelect={false}
                    id='date-range-picker-months'
                    onChange={handleOnChangeRange}
                    customInput={
                      <CustomInput
                        dates={dates}
                        setDates={setDates}
                        label='Invoice Date'
                        end={endDateRange as number | Date}
                        start={startDateRange as number | Date}
                      />
                    }
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <TableHeader value={value} selectedRows={selectedRows} handleFilter={handleFilter} />
            <DataGrid
              autoHeight
              pagination
              rows={filteredInvoices}
              columns={columns}
            
              disableRowSelectionOnClick
              pageSizeOptions={[10, 25, 50]}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              onRowSelectionModelChange={rows => setSelectedRows(rows)}
            />
          </Card>
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

export default InvoiceList
