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
    const selectedDepartmentId = event.target.value;
    setDepartmentFilter(selectedDepartmentId);
    handleDepartmentFilter(selectedDepartmentId);
  };

  const handleFullnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFullname(event.target.value);
    handleFilter(event.target.value);
  };

  //Get Departments
  const [departments, setDepartments] = useState([]);
  
  
  const fetchDepartments = () => {
    fetch("http://localhost:4001/department")
      .then(response => response.json())
      .then(data => {
        setDepartments(data.departments);
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchDepartments()
  }, []);


  return (
    <Box sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
      <Grid item sm={4} xs={12}>
      <FormControl fullWidth sx={{ mb: 6 }}>
  <InputLabel id="departement-select">Select Department</InputLabel>
  <Select
    fullWidth
    id="select-departement"
    label="Select Department"
    labelId="departement-select"
    inputProps={{ placeholder: "Select Department" }}
    onChange={handleDepartmentChange}
   
  >
    <MenuItem value="">All Departments</MenuItem>
    {departments.map((dep) => (
      <MenuItem key={dep.id} value={dep.id}>{dep.name}</MenuItem> // Use dep.id as the value
    ))}
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
