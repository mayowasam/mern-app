import React,{useEffect, useState}  from 'react'
import{ useHistory } from 'react-router-dom'
import {useCookies} from 'react-cookie'
import axios from 'axios'
import { Link} from 'react-router-dom'
import {Button} from 'reactstrap'
import EditIcon from '@material-ui/icons/Edit'
import PersonIcon from '@material-ui/icons/Person'
import {Table} from 'reactstrap';
import './LandingPage.css'
 
axios.defaults.withCredentials = true;

function LandingPage() {
    const [data, setData] = useState([])
    const [deleteId, setDeleteId] = useState("")
    
    console.log('data', data) 

    const [cookies, setCookies] = useCookies(['accessToken'])

    console.log("cookies",cookies)
    console.log(cookies.accessToken)
  

    let history = useHistory()


    useEffect(() =>{
        axios.get('http://localhost:3001/')
        .then(res =>{
          console.log(res.data.message[0]);
          setData(res.data.message)

       
      
        })
      
      },[])

      

    const getTable = () => {
        return data.map(newdata =>( 

                <tr  key={newdata._id}>
                    <th>{newdata._id}</th>
                    <td>{newdata.name}</td>
                    <td>{newdata.email}</td>
                    <td>{newdata.gender}</td>
                    <td>{newdata.status}</td>                                       
                    <td ><EditIcon className="mui" onClick={updateField} data-action={newdata._id}/></td>
                    <td onClick={deleteField} data-action={newdata._id} className="delete">X</td>
                </tr>
        )) 
    }


    const deleteField = (e) => {
     const id = e.target.dataset.action
     setDeleteId(id)
        console.log(deleteId)
        axios.post('http://localhost:3001/deleteuser',{id:deleteId})
        .then((response) => {
            console.log(response)
            history.push('/')
        })
        .catch((error) => {
            console.log(error.message)
        })
    }


    const updateField = (e) => {
        const id = e.target.dataset.action
           console.log(id)
           
        //    axios.post('http://localhost:3001/updateuser',{id})
        //    .then((response) => {
        //        console.log(response)
        //    })
        //    .catch((error) => {
        //        console.log(error.message)
        //    })
       }



      
    return (
        <div  className="landing">
            <div className="landing__head">
                <h2>User Mangement</h2>
            </div>


            <div className="btn">
                <Button><Link to="/newuser">New User <PersonIcon/></Link> </Button>
            </div>

        
              
                <Table className="landing__table">
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>Status</th>
                        <th colSpan="2" style={{textAlign:"center"}}>Action</th>
                        </tr>
                    </thead>

                    <tbody>

                        {getTable()}
                   </tbody>

                </Table>


                
            
               
                
        </div>
    )
}

export default LandingPage
