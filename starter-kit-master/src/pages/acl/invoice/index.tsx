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
    flex: 0.12,
    field: 'project',
    minWidth: 250,
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
    flex: 0.15,
    minWidth: 90,
    field: 'total',
    headerName: 'Total',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{`$${row.total || 0}`}</Typography>
  },
  {
    flex: 0.15,
    minWidth: 125,
    field: 'issueDate',
    headerName: 'Issue Date',
    renderCell: ({ row }: CellType) => {

    
      
      const date = new Date(row.issueDate);
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
 

  

  const handleFilter = (val: string) => {
    setValue(val)
  }

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

        return (
            <IconButton href={`/acl/viewInvoice/${row.id}`}>
            <Icon icon="mdi:eye-outline" />
          </IconButton>
       
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
    try {
      const response = await fetch('http://localhost:4001/invoice');
      if (response.ok) {
        const data = await response.json();
  
        // Récupération de l'ID du client à partir du localStorage
        const userData = JSON.parse(localStorage.getItem('userData'));
        const clientId = userData.id;
  
        // Filtrage des factures pour ne récupérer que celles correspondant à l'ID du client
        const clientInvoices = data.invoice.filter((invoice) => invoice.project.clientId === clientId);
  
        setInvoices(clientInvoices);
      } else {
        console.error('Error fetching invoices:', response.status);
      }
    } catch (error) {
      console.error('Error fetching invoices:', error);
    }
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
              rows={invoices}
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
