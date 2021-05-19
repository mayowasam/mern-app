import React,{useEffect, useState}  from 'react'
import axios from 'axios'
import { Link} from 'react-router-dom'
import {Button} from 'reactstrap'
import EditIcon from '@material-ui/icons/Edit'
import PersonIcon from '@material-ui/icons/Person'
import {Table} from 'reactstrap';
import './LandingPage.css'
 


function LandingPage() {
    const [data, setData] = useState("")
    const [id, setId] = useState()
    console.log('data', data) 

    console.log(id)

   


useEffect(() =>{
  axios.get('http://localhost:3001/')
  .then(res =>{
    console.log(res.data.message[0]);
    setData(res.data.message)
  })

},[])

      
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

                    {data ? data.map(newdata =>( 

                        <tbody key={newdata._id}>
                            <tr >
                                <th>{newdata._id}</th>
                                <td>{newdata.name}</td>
                                <td>{newdata.email}</td>
                                <td>{newdata.gender}</td>
                                <td>{newdata.status}</td>                                       
                                <td onClick={() =>setId(newdata._id)}><EditIcon className="mui"/></td>
                                <td className="delete">X</td>
                            </tr>
                        </tbody>
                    )) : null}

                </Table>


                
            
               
                
        </div>
    )
}

export default LandingPage
