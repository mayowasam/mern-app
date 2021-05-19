import React,{useState} from 'react'
import axios from 'axios'
import { Form, Button, Label, Input, FormGroup } from 'reactstrap'
import {Link} from 'react-router-dom'
import './UpdateUser.css'

function UpdateUser() {
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [gender, setGender] = useState('Male')
    const [status, setStatus] = useState("")
    const [updateUser, setUpdateUserData] = useState("")

    const update = (e) => {
        e.preventDefault()
        setUpdateUserData({
            email,
            name,
            gender,
            status
        })

        axios.put('http://localhost:3001/updateuser/:id',updateUser)
        .then(res =>{
            console.log(res);
            setUpdateUserData(res.data)
        })            
    }

    return (
        <div className="newuser">
            <div className="newuser__head">
                <p><Link to="/">All users</Link></p>
                <h2>User Mangement</h2>
            </div>

            <div className="newuser__content">
                <div className="newuser__title">
                    <h2>Update Users</h2>
                </div>


                <Form className="newuser__form" onSubmit={update}>
                <FormGroup>
                        <Label for="name">Name</Label>
                        <Input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={name}
                            onChange={(e) =>setName(e.target.value)} />
                            
                    </FormGroup>

                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) =>setEmail(e.target.value)}  />
                    </FormGroup>


                    <FormGroup>
                        <div className="gender">
                            <legend className="radio__header">Gender</legend>
                            <FormGroup check>

                                <Label check className="radio__input">Male
                                <Input
                                        type="radio"
                                        name="gender"
                                        value="male"
                                        onClick={() => setGender('Male')} />
                                </Label>
                            </FormGroup>

                            <FormGroup check>
                                <Label check className="radio__input">Female
                                <Input
                                        type="radio"
                                        name="gender"
                                        value="female"
                                        onClick={() => setGender('Female')} />
                                </Label>
                            </FormGroup>
                        </div>




                        <div className="gender">
                            <legend className="radio__header">Status</legend>
                            <FormGroup check>

                                <Label check className="radio__input">Active
                                <Input
                                        type="radio"
                                        name="status"
                                        value="active" 
                                        onClick={() => setStatus('Active')}/>
                                </Label>
                            </FormGroup>

                            <FormGroup check>
                                <Label check className="radio__input">Inactive
                                <Input
                                        type="radio"
                                        name="status"
                                        value="inactive"
                                        onClick={() => setStatus('inActive')} />
                                </Label>
                            </FormGroup>
                        </div>
                    </FormGroup>






                    <Button>Update</Button>
                </Form>
            </div>


        </div>
    )
}

export default UpdateUser
