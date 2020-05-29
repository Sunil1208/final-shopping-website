import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
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
import Button from '@material-ui/core/Button';
import CustomizedSnackbars from '../components/Notifications/Notification';
import { useGlobal } from 'reactn';
import {  deleteProduct, getProducts } from './helper/adminapicall';
import { isAuthenticated } from '../auth/helper';
import { Link } from "react-router-dom";
import ImageHelper1 from '../core/helper/ImageHelper1';
import { css } from "@emotion/core";
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



function Row(props) {
  const { product,preload} = props;

  const [open, setOpen] = React.useState(false);
  const {user, token} = isAuthenticated()
  const classes = useRowStyles();
  const [deleteLoad,setDeleteLoad] = useState(false)   


  const deleteThisProduct = productId => {
    setDeleteLoad(true)
  deleteProduct(productId, user._id, token).then(data => {
    if (data?.error) {
      console.log(data.error);
      setDeleteLoad(false)
    } else {
      preload();
      setDeleteLoad(false)
    }
  });
};
  


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
          {product.name}
        </TableCell>
        <TableCell align="right" className="text-left">{product.price}$</TableCell>
        <TableCell align="right" className="text-left" >{product.sold}</TableCell>
        <TableCell align="right" className="text-left" > 
        <Link
        className="btn btn-md btn-secondary rounded mt-0 text-white font-weight-bold"
        to={`/admin/product/update/${product._id}`}
      >Update
      </Link></TableCell>
        
        <TableCell align="right" className="text-left"><Button variant="contained" onClick={() => {
            deleteThisProduct(product._id)
          }}>Delete</Button> </TableCell>
      </StyledTableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Details
              </Typography>
              <Table size="small" aria-label="purchases" className="table-bordered mt-1 mb-1" >
                <caption style={{captionSide:"top"}} className="mt-1 mb-1"><strong>Product Details</strong></caption>
                <TableHead>
                  <TableRow>
                    <TableCell>Product Photo</TableCell>
                    <TableCell >Product Name</TableCell>
                    <TableCell>Product ID</TableCell>
                    <TableCell >Price</TableCell>
                    <TableCell >Category</TableCell> 
                    <TableCell >Units Sold</TableCell>
                    <TableCell >Units in Stock</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  
                    <TableRow >
                      <TableCell component="th" scope="row">
                      <ImageHelper1 product={product}/>
                      </TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product._id}</TableCell>
                      <TableCell>{product.price}</TableCell>
                      <TableCell>{product.category.name}</TableCell>
                      <TableCell>{product.sold}</TableCell>
                      <TableCell>{product.stock}</TableCell>
                    </TableRow>
                 
                </TableBody>
                </Table>
                <Table size="small" aria-label="purchases" className="table-bordered mt-1 mb-1" >
                <caption style={{captionSide:"top"}} className="mt-1 mb-1"><strong>Extra Details</strong></caption>
                <TableHead>
                  <TableRow>
                    <TableCell>Description</TableCell>
                    <TableCell>Product Created On</TableCell>
                    <TableCell>Product Last Updated On</TableCell>
                    {product.origin === 'India' && (
                        <TableCell>Made in India Product</TableCell>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  
                    <TableRow >
                      <TableCell component="th" scope="row">
                        {product.description}
                      </TableCell>
                      <TableCell >
                        {formatDate(product.createdAt)}
                      </TableCell>
                      <TableCell >
                      {formatDate(product.updatedAt)}
                    </TableCell>
                    {product.origin === 'India' && (
                        <TableCell>Yes</TableCell>
                    )}
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

  
const ProductManagement = () => {
  const classes = useStyles();

    const [products, setProducts] = useState([]);
    const [lowerBound,setLowerBound] = useState(0)
    const [upperBound,setUpperBound] = useState(5)
    const [page, setPage] = useState(1);

  const { user, token } = isAuthenticated();
  const [loading,setLoading] = useState(true)
  

    const preload = () => {
        getProducts().then(data => {
          if (data?.error) {
            console.log(data.error);
          } else {
            setProducts(data);
            setLoading(false)
          }
        });
      };
    
      useEffect(() => {
        preload();
      }, []);
    
      const getCount = () => {
        let count=0
        products.map((product,index) => {
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
            <TableCell>Product Name</TableCell>
            <TableCell>Price</TableCell>  
            <TableCell align="right" className="text-left" >Quantity Sold</TableCell>
            <TableCell align="right" className="text-left"  >Update</TableCell>
            <TableCell align="right" className="text-left" >Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {loading && (
          <GetSkeleton/>
        )}
          {products.map((product,index) => {
            if(index >= lowerBound && index <upperBound){
              return(
                <Row key={product._id}  product={product} preload={preload} />
              )
            }
            
          })}
        </TableBody>
      </Table>
      <div class="d-flex flex-row-reverse pt-2 pb-2">
          <BasicPagination/>
          </div>
      <CustomizedSnackbars  />
    </TableContainer>
  );
}

export default ProductManagement;
