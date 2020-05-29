import React, {useState,useEffect} from 'react';
import { getAllQueries } from '../../core/helper/queryHelper';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Skeleton from 'react-loading-skeleton';
import Pagination from '@material-ui/lab/Pagination';




const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

    const useStyles = makeStyles((theme) => ({
      root: {
        display: 'flex',
      }
    }))



function Row(props) {
    const { query,preload} = props;
  
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
   
  
  
    
  
  
    const formatDate = (date) => {
      let tempDate = date;
    const dateOnly = tempDate.slice(8,10)
    const monthOnly = tempDate.slice(5,7)
    const yearOnly = tempDate.slice(0,4)
    const fullDate = `${dateOnly}-${monthOnly}-${yearOnly}`
    const partTime = tempDate.slice(11,19)
    const finalResult = `${fullDate} ${partTime}`
  
    return finalResult;
    }
  
  
    
  
  
  
    return (
      <React.Fragment>
  
        <StyledTableRow className={classes.root} >
        
          <TableCell >
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row" className="text-left">
            {query.firstname}
          </TableCell>
          <TableCell align="right" className="text-left">{query.lastname}</TableCell>
          <TableCell align="right" className="text-left" >{query._id}</TableCell>
          <TableCell align="right" className="text-left" >{query.email}</TableCell>
          <TableCell align="right" className="text-left" >{formatDate(query.createdAt)}</TableCell>
        </StyledTableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Typography variant="h6" gutterBottom component="div">
                  Details
                </Typography>
                <Table size="small" aria-label="purchases" className="table-bordered mt-1 mb-1" >
                  <caption style={{captionSide:"top"}} className="mt-1 mb-1"><strong>Query Details</strong></caption>
                  <TableHead>
                    <TableRow>
                      <TableCell>Subject</TableCell>
                      <TableCell >Query</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    
                      <TableRow >
                        <TableCell component="th" scope="row">{query.subject}</TableCell>
                        <TableCell>{query.query}</TableCell>
                      </TableRow>
                   
                  </TableBody>
                  </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  
    
  const QueryManagement = () => {
    const classes = useStyles();
  
      const [queries, setQueries] = useState([]);
  
    const [loading,setLoading] = useState(true)
    const [lowerBound,setLowerBound] = useState(0)
    const [upperBound,setUpperBound] = useState(5)
    const [page, setPage] = useState(1);
    
  
      const preload = () => {
          getAllQueries().then(data => {
            if (data?.error) {
              console.log(data.error);
            } else {
                setQueries(data);
              setLoading(false)
            }
          });
        };
      
        useEffect(() => {
          preload();
        }, []);
      
      
      const GetSkeleton = () => {
        if(loading){
          return(
            <React.Fragment>
            <TableRow className="text-left">
              <TableCell ><Skeleton variant="rect" width={24} height={24} /></TableCell>
              <TableCell><Skeleton variant="rect" width={80} height={24} /></TableCell>
              <TableCell><Skeleton variant="rect" width={24} height={24} /></TableCell>  
              <TableCell align="right" className="text-left" ><Skeleton variant="rect" width={24} height={24} /></TableCell>
              <TableCell align="right" className="text-left"  ><Skeleton variant="rect" width={95} height={40} /></TableCell>
              <TableCell align="right" className="text-left" ><Skeleton variant="rect" width={95} height={40} /></TableCell>
            </TableRow>
            <TableRow className="text-left">
            <TableCell ><Skeleton variant="rect" width={24} height={24} /></TableCell>
            <TableCell><Skeleton variant="rect" width={80} height={24} /></TableCell>
            <TableCell><Skeleton variant="rect" width={24} height={24} /></TableCell>  
            <TableCell align="right" className="text-left" ><Skeleton variant="rect" width={24} height={24} /></TableCell>
            <TableCell align="right" className="text-left"  ><Skeleton variant="rect"  width={95} height={40} /></TableCell>
            <TableCell align="right" className="text-left" ><Skeleton variant="rect"  width={95} height={40} /></TableCell>
          </TableRow>
          <TableRow className="text-left">
          <TableCell ><Skeleton variant="rect" width={24} height={24} /></TableCell>
          <TableCell><Skeleton variant="rect" width={80} height={24} /></TableCell>
          <TableCell><Skeleton variant="rect" width={24} height={24} /></TableCell>  
          <TableCell align="right" className="text-left" ><Skeleton variant="rect" width={24} height={24} /></TableCell>
          <TableCell align="right" className="text-left"  ><Skeleton variant="rect"  width={95} height={40} /></TableCell>
          <TableCell align="right" className="text-left" ><Skeleton variant="rect"  width={95} height={40} /></TableCell>
        </TableRow>
        <TableRow className="text-left">
        <TableCell ><Skeleton variant="rect" width={24} height={24} /></TableCell>
        <TableCell><Skeleton variant="rect" width={80} height={24} /></TableCell>
        <TableCell><Skeleton variant="rect" width={24} height={24} /></TableCell>  
        <TableCell align="right" className="text-left" ><Skeleton variant="rect" width={24} height={24} /></TableCell>
        <TableCell align="right" className="text-left"  ><Skeleton variant="rect" width={95} height={40} /></TableCell>
        <TableCell align="right" className="text-left" ><Skeleton variant="rect" width={95} height={40} /></TableCell>
      </TableRow>
      <TableRow className="text-left">
      <TableCell ><Skeleton variant="rect" width={24} height={24} /></TableCell>
      <TableCell><Skeleton variant="rect" width={80} height={24} /></TableCell>
      <TableCell><Skeleton variant="rect" width={24} height={24} /></TableCell>  
      <TableCell align="right" className="text-left" ><Skeleton variant="rect" width={24} height={24} /></TableCell>
      <TableCell align="right" className="text-left"  ><Skeleton variant="rect" width={95} height={40} /></TableCell>
      <TableCell align="right" className="text-left" ><Skeleton variant="rect" width={95} height={40} /></TableCell>
    </TableRow> 
            </React.Fragment>
          )
        }
      }

      const getCount = () => {
        let count=0
        queries.map((query,index) => {
          count=count+1
        })
        return count;
      }
      const TotalCount = getCount()
      console.log(`Total elements are : ${TotalCount}`)
      const [pageNumber,setPageNumber] = useState(TotalCount)
      console.log(`Initial page count number is : ${pageNumber}`)
     
    
      const SetPageValue= () => {
    
        if(TotalCount%5===0){
          let tempPageNo = parseInt(TotalCount/5)
          console.log(tempPageNo)
          setPageNumber(tempPageNo)
        } else {
          let tempPageNo = TotalCount/5
          tempPageNo= parseInt(tempPageNo+1)
          console.log(tempPageNo)
          setPageNumber(tempPageNo)
    
        }
        console.log(`New Page Number is : ${pageNumber}`)
        return ''
      }
    
      const handleChange = (event, value) => {
        setPage(value);
          let tempValue = value*5
          setLowerBound(tempValue-5)
          setUpperBound(tempValue)
           
      };
    

      const BasicPagination = () => {
        return(
          <div className={classes.root}>
          
          <Pagination count={pageNumber} page={page} onChange={handleChange} color="primary" />
          </div>
        )
      }
    
      
  
  
    return (
      <TableContainer component={Paper}>
      <SetPageValue/>
        <Table aria-label="collapsible table">
          <TableHead >
            <TableRow className="text-left">
              <TableCell >Details</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>  
              <TableCell align="right" className="text-left" >Query ID</TableCell>
              <TableCell align="right" className="text-left" >Email</TableCell>
              <TableCell align="right" className="text-left"  >Posted on</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {loading && (
            <GetSkeleton/>
          )}
            {queries.map((query,index) => {
              if(index >= lowerBound && index <upperBound){
                return(
                  <Row key={query._id}  query={query} preload={preload} />
                )
              }
            })}
          </TableBody>
          
        </Table>
        <div class="d-flex flex-row-reverse pt-2 pb-2">
          <BasicPagination/>
          </div>
      </TableContainer>
    );
  }
  
  export default QueryManagement;