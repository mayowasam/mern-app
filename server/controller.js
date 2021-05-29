const Profile = require('./schema')
const bcrypt = require('bcrypt')


const getData = async (req, res) =>{
    try {
        const result = await Profile.find()
        res.status(200).json({success:true, message:result})

    } catch (error) {
        res.status(404).json({success:false, message:error})

    }
   
 }


 const getOne = async (req, res) =>{
    const {id} = req.params
    try {
        const profile = await Profile.findById(id)
        res.status(200).json({success:true, message:profile})

    } catch (error) {
        res.status(404).json({success:false, message:error})

    }
   
 }

 const newUser = async (req, res) =>{
   try{
       const {name,email,password,gender,status} = req.body
       const hashedPassword = await bcrypt.hash(password,10)
       const profile = new Profile({
           name,
           email,
           gender,
           status,
           password:hashedPassword
       })
       const result = await profile.save()
       res.status(200).json({success:true, message:result})

   }catch(err){
       res.status(404).json({success:false, message:err})
   }
 }



const updateUser = async (req, res) =>{
    try{
        const {id} = req.params
        const update = req.body
        const result = await Profile.findByIdAndUpdate(id,update,{new:true})
        res.status(200).json({success:true, message:result})

    }catch(err){
        res.status(404).json({success:false, message:err})
    }

    
 }


 const login = async (req, res) =>{
    
    try {
        const {name, password} = req.body
        const users = await Profile.find()
        const result= users.find(user=>user.name === name)
        if(result){
          if(await bcrypt.compare(password, result.password)){
            return res.status(200).json({success:true, message:"password and username match"})
          }else{
            res.status(404).send("password is not correct")
          }
        }
        res.status(404).json({success:false, message:"user does not exist"})


    } catch (error) {
        res.status(500).json({success:false, message:error.message})

    }
   
 }



 const deleteUser = async (req, res) =>{
    
    try {
        const {id} = req.body
        console.log(id)
        const user = await Profile.findByIdAndDelete(id)
         res.status(202).json({success:true, user,message:"user deleted" })
    }catch (error) {
        res.status(500).json({success:false, message:error.message})

    }
   
 }
 
 module.exports ={
     getData,
     updateUser,
     getOne,
     newUser,
     login,
     deleteUser
 }