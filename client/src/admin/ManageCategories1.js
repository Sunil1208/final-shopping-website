import React,{useState, useEffect} from 'react';
import Skeleton from "react-loading-skeleton";
import { css } from "@emotion/core";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Paper, Typography, Button, TextField } from '@material-ui/core';
import Title from '../components/dashboard/Title';
import { getCategories, deleteCategory, updateCategory } from './helper/adminapicall';
import { isAuthenticated } from '../auth/helper';
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
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));


const CategoryManagement = () => {

  const classes = useStyles()
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true)
    const [toUpdateCategory,setToUpdateCategory] =useState("")
    const [updatedCategory,setUpdatedCategory] = useState("")
    const [categoryID1,setCategoryID1]=useState("")
    const [lowerBound,setLowerBound] = useState(0)
    const [upperBound,setUpperBound] = useState(5)
    const [page, setPage] = useState(1);

    const { user, token } = isAuthenticated();

    const preload = () => {
        getCategories().then(data => {
          if (data.error) {
            console.log(data.error);
          } else {
            setCategories(data);
            setLoading(false)
          }
        });
      };

      useEffect(() => {
        preload();
      }, []);



      const getCount = () => {
        let count = 0
        categories.map((cate,index) => {
          count= count+1
        })
        return count;
      }

      const deleteThisCategory = categoryId => {
        deleteCategory(categoryId, user._id, token).then( data => {
            if(data.error) {
                console.log(data.error);
            } else {
                preload();
            }
        })
    }

  const GetSkeleton = () => {
    if(loading){
      return(
        <React.Fragment>
        <TableRow>
            <TableCell><Skeleton variant="rect" width={24} height={24} /></TableCell>
            <TableCell><Skeleton variant="rect" width={80} height={24} /></TableCell>
            <TableCell><Skeleton variant="rect" width={190} height={24} /></TableCell>
            <TableCell><Skeleton variant="rect" width={140} height={24} /></TableCell>
            <TableCell align="right"><Skeleton variant="rect" width={140} height={24} /></TableCell>
            <TableCell><Skeleton variant="rect" width={95} height={40} /></TableCell>
          </TableRow>
          <TableRow>
            <TableCell><Skeleton variant="rect" width={24} height={24} /></TableCell>
            <TableCell><Skeleton variant="rect" width={80} height={24} /></TableCell>
            <TableCell><Skeleton variant="rect" width={190} height={24} /></TableCell>
            <TableCell><Skeleton variant="rect" width={140} height={24} /></TableCell>
            <TableCell align="right"><Skeleton variant="rect" width={140} height={24} /></TableCell>
            <TableCell><Skeleton variant="rect" width={95} height={40} /></TableCell>
          </TableRow>
          <TableRow>
            <TableCell><Skeleton variant="rect" width={24} height={24} /></TableCell>
            <TableCell><Skeleton variant="rect" width={80} height={24} /></TableCell>
            <TableCell><Skeleton variant="rect" width={190} height={24} /></TableCell>
            <TableCell><Skeleton variant="rect" width={140} height={24} /></TableCell>
            <TableCell align="right"><Skeleton variant="rect" width={140} height={24} /></TableCell>
            <TableCell><Skeleton variant="rect" width={95} height={40} /></TableCell>
          </TableRow>
          <TableRow>
            <TableCell><Skeleton variant="rect" width={24} height={24} /></TableCell>
            <TableCell><Skeleton variant="rect" width={80} height={24} /></TableCell>
            <TableCell><Skeleton variant="rect" width={190} height={24} /></TableCell>
            <TableCell><Skeleton variant="rect" width={140} height={24} /></TableCell>
            <TableCell align="right"><Skeleton variant="rect" width={140} height={24} /></TableCell>
            <TableCell><Skeleton variant="rect" width={95} height={40} /></TableCell>
          </TableRow>
          <TableRow>
            <TableCell><Skeleton variant="rect" width={24} height={24} /></TableCell>
            <TableCell><Skeleton variant="rect" width={80} height={24} /></TableCell>
            <TableCell><Skeleton variant="rect" width={190} height={24} /></TableCell>
            <TableCell><Skeleton variant="rect" width={140} height={24} /></TableCell>
            <TableCell align="right"><Skeleton variant="rect" width={140} height={24} /></TableCell>
            <TableCell><Skeleton variant="rect" width={95} height={40} /></TableCell>
          </TableRow>

        </React.Fragment>
      )
    }
  }



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




  const viewCategories = () => {
    return(
      <React.Fragment>
      <SetPageValue/>
      <Title ><span className="text-center">Total {getCount()} Categories</span></Title>
      <Table size="small table-striped">
        <TableHead>
          <TableRow>
            <TableCell>Serial No.</TableCell>
            <TableCell>Category Name</TableCell>
            <TableCell>Category ID</TableCell>
            <TableCell>Created On</TableCell>
            <TableCell >Updated At</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {loading && (
          <GetSkeleton/>
        )}
          {categories.map((category,index) => {
            if(index >= lowerBound && index <upperBound){
              return(
                <TableRow key={category._id} style={{backgroundColor:"#F5F5F5"}}>
                <TableCell>{index+1}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category._id}</TableCell>
                <TableCell>{formatDate(category.createdAt)}</TableCell>
                <TableCell >{formatDate(category.updatedAt)}</TableCell>
                <TableCell>
                  <Button variant="contained" onClick = { () => {
                      deleteThisCategory(category._id);
                  }} >Delete</Button>
                </TableCell>
              </TableRow>
               )
            } 
          })}
        </TableBody>
      </Table>
      </React.Fragment>
    )
  }


        return (
          <Paper>
          {viewCategories()}
          <div class="d-flex flex-row-reverse pt-2 pb-2">
          <BasicPagination/>
          </div>
          </Paper>
        )
           
}

export default CategoryManagement;