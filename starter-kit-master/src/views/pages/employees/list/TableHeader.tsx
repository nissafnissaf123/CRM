// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

// ** React Imports
import { useState, useEffect, MouseEvent, useCallback } from 'react'

// ** Icon Imports
import Icon from 'src/@core/components/icon'



interface TableHeaderProps {
  value: string
  toggle: () => void
  handleFilter: (value: string) => void
  handleDepartmentFilter: (value: string) => void;
}

const TableHeader = (props: TableHeaderProps) => {
  // ** Props
  const { handleFilter, handleDepartmentFilter, toggle, value } = props

  const [departmentFilter, setDepartmentFilter] = useState('');
  const [fullname, setFullname] = useState('')

  const handleDepartmentChange = (event: SelectChangeEvent) => {
    setDepartmentFilter(event.target.value);
    handleDepartmentFilter(event.target.value);
  };

  const handleFullnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFullname(event.target.value);
    handleFilter(event.target.value);
  };


  return (
    <Box sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
      <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='department-select'>Select Department</InputLabel>
                  <Select
                    fullWidth
                    value={departmentFilter}
                    id='select-department'
                    label='Select Department'
                    labelId='department-select'
                    onChange={handleDepartmentChange}
                    inputProps={{ placeholder: 'Select Departement' }}
                  >
                    <MenuItem value=''>Select Department</MenuItem>
                    <MenuItem value='admin'>Web Development</MenuItem>
                    <MenuItem value='author'>Mobile Development</MenuItem>
                    <MenuItem value='editor'>UI/UX Design</MenuItem>
                    <MenuItem value='maintainer'>Digital Marketing</MenuItem>
                    
                  </Select>
                </FormControl>
              </Grid>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField
          size='small'
          value={fullname}
          sx={{ mr: 6, mb: 2 }}
          placeholder='Search FullName'
          onChange={ handleFullnameChange}
        />

        <Button sx={{ mb: 2 }} onClick={toggle} variant='contained'>
          Add Employee
        </Button>
      </Box>
    </Box>
  )
}

export default TableHeader
