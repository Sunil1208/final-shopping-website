import React,{useState} from 'react'
import { updateCategory } from './helper/adminapicall'
import { isAuthenticated } from '../auth/helper'
import { TextField, Button } from '@material-ui/core'


const UpdateCategory = ({category}) => {

    const [updateCategory1,setUpdateCategory1] = useState(category.name)
    const {user,token} = isAuthenticated()
    const updateThisCategory = () => {
        updateCategory(category._id,user._id,token,updateCategory1).then( data => {
            if(data?.error){
                console.log(data.error)
            } else {
                console.log("success")
            }
        })
    }

    const handleChange = (event) => {
        const value = event.target.value
        setUpdateCategory1(value)
        console.log(updateCategory1)
    }



    return(
        <React.Fragment>
        <div className="container">
       <TextField
            autoFocus
            onChange={handleChange}
            margin="dense"
            id="category"
            label="Category"
            fullWidth
          />
          <Button onClick = {updateThisCategory} >Update</Button>
        </div>
        </React.Fragment>
    )
}

export default UpdateCategory;