import React,{useState, useEffect} from 'react';
import { getUsers } from './helper/adminapicall';
import Skeleton from "react-loading-skeleton";
import { css } from "@emotion/core";
import {PulseLoader} from "react-spinners";
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Paper, Typography } from '@material-ui/core';
import Title from '../components/dashboard/Title';
import Pagination from '@material-ui/lab/Pagination';




const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));


const ViewAllUsers = () => {
  const classes = useStyles();
    const [users,setUsers] = useState([]);
    const [loading, setLoading] = useState(true)
    const [lowerBound,setLowerBound] = useState(0)
    const [upperBound,setUpperBound] = useState(5)
    const [page, setPage] = useState(1);

    const preload = () => {
        getUsers().then(data => {
            if(data?.error) {
                console.log(data.error);
                setLoading(false)
            } else {
                setUsers(data)
                setLoading(false)
            }
        })
    }


    useEffect( () => {
        preload();
    }, []);

    const sliceDate = (date) => {
        date = date.slice(0,10)
        return date;
    }


  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  const GetSkeleton = () => {
    if(loading){
      return(
        <React.Fragment>
         <TableRow>
         <TableCell ><Skeleton variant="rect" width={24} height={24} /></TableCell>
         <TableCell><Skeleton variant="rect" width={80} height={24} /></TableCell>
         <TableCell><Skeleton variant="rect" width={130} height={24} /></TableCell>  
         <TableCell align="right" className="text-left"  ><Skeleton variant="rect" width={24} height={24} /></TableCell>
         <TableCell align="right" className="text-right" ><Skeleton variant="rect" width={90} height={24} /></TableCell>
         </TableRow>
         <TableRow>
         <TableCell ><Skeleton variant="rect" width={24} height={24} /></TableCell>
         <TableCell><Skeleton variant="rect" width={80} height={24} /></TableCell>
         <TableCell><Skeleton variant="rect" width={130} height={24} /></TableCell>  
         <TableCell align="right" className="text-left"  ><Skeleton variant="rect" width={24} height={24} /></TableCell>
         <TableCell align="right" className="text-right" ><Skeleton variant="rect" width={90} height={24} /></TableCell>
         </TableRow>
         <TableRow>
         <TableCell ><Skeleton variant="rect" width={24} height={24} /></TableCell>
         <TableCell><Skeleton variant="rect" width={80} height={24} /></TableCell>
         <TableCell><Skeleton variant="rect" width={130} height={24} /></TableCell>  
         <TableCell align="right" className="text-left"  ><Skeleton variant="rect" width={24} height={24} /></TableCell>
         <TableCell align="right" className="text-right" ><Skeleton variant="rect" width={90} height={24} /></TableCell>
         </TableRow>
         <TableRow>
         <TableCell ><Skeleton variant="rect" width={24} height={24} /></TableCell>
         <TableCell><Skeleton variant="rect" width={80} height={24} /></TableCell>
         <TableCell><Skeleton variant="rect" width={130} height={24} /></TableCell>  
         <TableCell align="right" className="text-left"  ><Skeleton variant="rect" width={24} height={24} /></TableCell>
         <TableCell align="right" className="text-right" ><Skeleton variant="rect" width={90} height={24} /></TableCell>
         </TableRow>
         <TableRow>
         <TableCell ><Skeleton variant="rect" width={24} height={24} /></TableCell>
         <TableCell><Skeleton variant="rect" width={80} height={24} /></TableCell>
         <TableCell><Skeleton variant="rect" width={130} height={24} /></TableCell>  
         <TableCell align="right" className="text-left"  ><Skeleton variant="rect" width={24} height={24} /></TableCell>
         <TableCell align="right" className="text-right" ><Skeleton variant="rect" width={90} height={24} /></TableCell>
         </TableRow> 
        </React.Fragment>
      )
    }
  }

  const loadingMessage = (loading) => {
    if(loading){
      return(
        <div className="sweet-loading">
        <PulseLoader
          css={override}
          
          color={"#5DD292"}
          loading={loading}
        />
        </div>
      )
    }
  }



  const getCount = () => {
    let count=0
    users.map((user,index) => {
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




  const tempTitle = `  Customer List`;

  const viewUsers = () => {
    return(
      <React.Fragment>
      <SetPageValue/>
      <Title ><span className="text-center">{tempTitle}</span></Title>
      <Table size="small table-striped">
        <TableHead>
          <TableRow>
            <TableCell>Serial No.</TableCell>
            <TableCell>User name</TableCell>
            <TableCell>Email ID</TableCell>
            <TableCell>No. of Purchase</TableCell>
            <TableCell align="right">User Since</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {loading && (
          <GetSkeleton/>
        )}
          {users.map((user,index) => {
            if(index >= lowerBound && index <upperBound){
              return(
                <TableRow key={user._id} style={{backgroundColor:"#F5F5F5"}}>
                <TableCell>{index+1}</TableCell>
                <TableCell>{user.name} {user.lastname}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.purchases.length}</TableCell>
                <TableCell align="right">{sliceDate(user.createdAt)}</TableCell>
              </TableRow>
               )
            }
          })}
        </TableBody>
      </Table>
      </React.Fragment>
    )
  }

  const BasicPagination = () => {
    return(
      <div className={classes.root}>
      
      <Pagination count={pageNumber} page={page} onChange={handleChange} color="primary" />
      </div>
    )
  }


        return (
          <Paper>
          {viewUsers()}
          <div class="d-flex flex-row-reverse pt-2 pb-2">
          <BasicPagination/>
          </div>
          </Paper>
        )
           
}

export default ViewAllUsers;