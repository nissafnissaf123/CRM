// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import Divider from '@mui/material/Divider'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'


import { format , parseISO } from 'date-fns';

import { useRouter } from 'next/router'

import { useState, useEffect } from 'react'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

import { useRef } from 'react';

import Link from 'next/link'
import { styled, useTheme } from '@mui/material/styles'
import TableContainer from '@mui/material/TableContainer'
import TableCell, { TableCellBaseProps } from '@mui/material/TableCell'
import Button from '@mui/material/Button'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Types
import { SingleInvoiceType } from 'src/types/apps/invoiceTypes'

interface Props {
  data: SingleInvoiceType
}

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

const PreviewCard = ({ data }: Props) => {
  // ** Hook
  const theme = useTheme()

  const printRef = useRef();

  const handlePrint = () => {
    const printContent = printRef.current.innerHTML;
    const originalContent = document.body.innerHTML;

    // Masquer tous les autres éléments de la page sauf la carte à imprimer
    document.body.innerHTML = printContent;

    // Imprimer la carte
    window.print();

    // Restaurer le contenu original de la page
    document.body.innerHTML = originalContent;
  };

  const router = useRouter();
  const { id } = router.query;

  //Get invoice by id 

  const [invoice, setInvoice] = useState({
    endDate:"",
    project: {
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
    issueDate:"",
    total:"",
    days:"",
    price:"",

  });
   

   useEffect(() => {
     fetch(`http://localhost:4001/invoice/${id}`)
       .then((response) => response.json())
       .then((data) => {
         setInvoice(data.invoice);
         console.log(data.invoice);
      
       })
       .catch((error) => {
         console.error(error);
       });
   }, [ ]);

   const handleBackToList = () => {
    router.push('/admin/invoice'); // Remplacez '/link-to-list' par le lien vers la liste souhaitée
  };

  
    return (
      <>
  <Grid container spacing={6}>
<Grid item xl={9} md={8} xs={12}>
<div ref={printRef}>
      <Card>
        <CardContent>
          <Grid container>
            <Grid item sm={6} xs={12} sx={{ mb: { sm: 0, xs: 4 } }}>
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
                <Box>
                  <Typography variant='body2' sx={{ mb: 1 }}>
                    Office 149, 450 South Brand Brooklyn
                  </Typography>
                  <Typography variant='body2' sx={{ mb: 1 }}>
                    San Diego County, CA 91905, USA
                  </Typography>
                  <Typography variant='body2'>+1 (123) 456 7891, +44 (876) 543 2198</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item sm={6} xs={12}>
              <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
                <Table sx={{ maxWidth: '200px' }}>
                  <TableBody>
                    <TableRow>
                      <MUITableCell>
                        <Typography variant='h6'>Invoice</Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography variant='h6'></Typography>
                      </MUITableCell>
                    </TableRow>
                    <TableRow>
                      <MUITableCell>
                        <Typography variant='body2'>Date Issued:</Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography variant='body2'>
                           {invoice.issueDate && format(parseISO(invoice.endDate), 'dd MMMM yyyy')}
                    </Typography>
                      </MUITableCell>
                    </TableRow>
                    <TableRow>
                      <MUITableCell>
                        <Typography variant='body2'>Date Due:</Typography>
                      </MUITableCell>
                      <MUITableCell>
                        <Typography variant='body2'>
                        {invoice.endDate && format(parseISO(invoice.endDate), 'dd MMMM yyyy')}
 
                        </Typography>
                      </MUITableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Grid>
          </Grid>
        </CardContent>

        <Divider
          sx={{ mt: theme => `${theme.spacing(6.5)} !important`, mb: theme => `${theme.spacing(5.5)} !important` }}
        />

        <CardContent>
          <Grid container>
            <Grid item xs={12} sm={6} sx={{ mb: { lg: 0, xs: 4 } }}>
              <Typography variant='subtitle2' sx={{ mb: 3, color: 'text.primary', letterSpacing: '.1px' }}>
                Invoice To:
              </Typography>
              <Typography variant='body2' sx={{ mb: 2 }}>
               {invoice.project?.client?.fullname}
              </Typography>
              <Typography variant='body2' sx={{ mb: 2 }}>
            {invoice.project?.client?.user?.email}
              </Typography>
              <Typography variant='body2' sx={{ mb: 2 }}>
              {invoice.project?.client?.phone}
              </Typography>
           
             
            </Grid>
            <Grid item xs={12} sm={5} sx={{ display: 'flex' , justifyContent: ['flex-start', 'flex-end'] }}>
              <div>
                <Typography variant='subtitle2' sx={{ mb: 3, color: 'text.primary', letterSpacing: '.1px' }}>
                 Company :
                </Typography>
                <TableContainer>
                  <Table>
                    <TableBody>
                      <TableRow>
                     
                      
                      </TableRow>
                      <TableRow>
                        
                        <MUITableCell>
                          <Typography variant='body2'style={{marginLeft:"6px"}}>{invoice.project.client?.companyName}</Typography>
                        </MUITableCell>
                      </TableRow>
                      <TableRow>
                        
                        <MUITableCell>
                          <Typography variant='body2'>Nabeul </Typography>
                        </MUITableCell>
                      </TableRow>
                      <TableRow>
                        
                        <MUITableCell>
                          <Typography variant='body2'>Darchaben Elfihri</Typography>
                        </MUITableCell>
                      </TableRow>
                      <TableRow>
                     
                        <MUITableCell>
                          <Typography variant='body2'>aftercodeCRM@gmail.com</Typography>
                        </MUITableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </Grid>
          </Grid>
        </CardContent>

        <Divider sx={{ mt: theme => `${theme.spacing(6.5)} !important`, mb: '0 !important' }} />

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Project</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Framework</TableCell>
                <TableCell>Coste</TableCell>
                <TableCell>Days</TableCell>
                <TableCell>Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Premium </TableCell>
                <TableCell>Branding </TableCell>
                <TableCell>48</TableCell>
                <TableCell>1</TableCell>
                <TableCell>$32</TableCell>
                <TableCell>$32</TableCell>
              </TableRow>
             
             
            </TableBody>
          </Table>
        </TableContainer>

        <CardContent sx={{ pt: 8 }}>
          <Grid container>
            <Grid item xs={12} sm={7} lg={9} sx={{ order: { sm: 1, xs: 2 } }}>
              <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <Typography
                  variant='body2'
                  sx={{ mr: 2, color: 'text.primary', fontWeight: 600, letterSpacing: '.25px' }}
                >
                  Salesperson:
                </Typography>
                <Typography variant='body2'>Wael Majdoub</Typography>
              </Box>

              <Typography variant='body2'>Thanks for your business</Typography>
            </Grid>
            <Grid item xs={12} sm={5} lg={3} sx={{ mb: { sm: 0, xs: 4 }, order: { sm: 2, xs: 1 } }}>
             
              
              <CalcWrapper>
                <Typography variant='body2'>Total: </Typography>
                <Typography variant='body2' sx={{ color: 'text.primary',  fontWeight: 600, marginRight:"100px" }}>
                  {invoice.total} DT
                </Typography>
              </CalcWrapper>
            </Grid>
          </Grid>
        </CardContent>

        <Divider sx={{ mt: theme => `${theme.spacing(4.5)} !important`, mb: '0 !important' }} />

        <CardContent>
          <Typography variant='subtitle2' sx={{ color: 'text.primary' }}>
            <strong>Note:</strong> It was a pleasure working with you and your team. We hope you will keep us in mind
            for future freelance projects. Thank You!
          </Typography>
        </CardContent>

        
      </Card>
</div>

      
</Grid>

<Grid item xl={3} md={4} xs={12}>
<Card >
      <CardContent>
        <Button
          fullWidth
          sx={{ mb: 3.5 }}
          variant='contained'
          onClick={handlePrint}
          startIcon={<Icon icon='mdi:send-outline' />}
        >
          Print Invoice
        </Button>
        <Button fullWidth sx={{ mb: 3.5 }} color='secondary' variant='outlined' onClick={handleBackToList}>
        Back to the list
        </Button>
       
       
      </CardContent>
    </Card></Grid>
</Grid>
      </>
    )
  
}

export default PreviewCard
