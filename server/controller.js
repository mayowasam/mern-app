const Profile = require('./schema')
const TokenRefresh = require('./refreshSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


// const getData = async (req, res) =>{
//     try {
//         const result = await Profile.find()
//         res.status(200).json({success:true, message:result})

//     } catch (error) {
//         res.status(404).json({success:false, message:error})

//     }
   
//  }

const auth = async (req, res, next) => {
    try{
        const {accessToken} = req.cookies
        if(!accessToken) return res.status(400).json({success:false, message:"no accessToken found"})
        const verifyToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
        console.log(verifyToken)
        req.user = verifyToken.user
        next()

    }catch (err){
        res.status(501).json({success:false, error:err.message})
    }
}


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
       const emailRegex= /@gmail.com|@yahoo.com/
       const existingUser = await Profile.findOne({email})
        if(existingUser)  return res.status(400).json({success:false, message:"user already exists"})
       if(!email || !password || !gender || !status) return res.status(400).json({success:false, message:"input field not filled"})
       if(!emailRegex.test(email)) return res.status(400).json({success:false, message:"email does not match"})
       if(!password) return res.status(400).json({success:false, message:"password does not match"})
       const hashedPassword = await bcrypt.hash(password,10)
       const profile = new Profile({
           name,
           email,
           gender,
           status,
           password:hashedPassword
       })
       const result = await profile.save()
       const accessToken = jwt.sign({user: result._id},process.env.ACCESS_TOKEN_SECRET,{expiresIn:"20s"})
       const refreshToken =  jwt.sign({user: result._id},process.env.REFRESH_TOKEN_SECRET,{expiresIn:"2m"})
       const refreshSave = new TokenRefresh({refreshToken})
       const refreshResult = await refreshSave.save()
       
       res
       .status(200)
       .cookie("accessToken",accessToken,{sameSite:true})
       .cookie("refreshToken",refreshToken,{httpOnly:true})
       .json({success:true, message:result})

   }catch(err){
       res
       .status(404)
       .json({success:false, message:err})
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
        const user = await Profile.findOne({name})
        if(!user) return res.status(400).json({success:false, message:"user does not exist"})
        const comparePassword =await bcrypt.compare(password, user.password)
        if(!comparePassword) return res.status(400).json({success:false, message:"password is incorrect"})
        const accessToken = jwt.sign({user: user._id},process.env.ACCESS_TOKEN_SECRET,{expiresIn:"60s"})
        const refreshToken = jwt.sign({user: user._id},process.env.REFRESH_TOKEN_SECRET,{expiresIn:"5m"})
        const refreshSave = new TokenRefresh({refreshToken})
        const refreshResult = await refreshSave.save()
        res
        .status(200)
        .cookie("accessToken",accessToken,{sameSite:true})
        .cookie("refreshToken",refreshToken,{httpOnly:true})
        .json({success:true, message:user})

    } catch (error) {
        res.status(500).json({success:false, message:error.message})

    }
   
 }

 const Token = async (req, res) => {
     try{
        const {refreshToken} = req.cookies
        if(!refreshToken) return res.status(400).json({success:false, message:"no refresh token found"})
        const existingToken = await TokenRefresh.findOne({refreshToken})
        if(!existingToken) return res.status(400).json({success:false, message:"no existing token found"})
        const verifyToken = jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET)
        console.log(verifyToken)
        const accessToken = jwt.sign(verifyToken,process.env.ACCESS_TOKEN_SECRET)
        res
        .status(200)
        .cookie("accessToken",accessToken,{httpOnly:true})
        .json({success:true, message:accessToken})
     }catch (error) {
        res.status(500).json({success:false, message:error.message})
 
     }
     
 }



 const deleteUser = async (req, res) =>{
    
    try {
        const {id} = req.body
        console.log(id)
        const {accessToken,refreshToken} = req.cookies
        console.log("accessToken", accessToken)
        console.log("refreshToken", refreshToken)
        const user = await Profile.findByIdAndDelete(id)
         res.status(202).json({success:true, user,message:"user deleted" })
    }catch (error) {
        res.status(500).json({success:false, message:error.message})

    }
   
 }


 const logout = async (req, res) => {
    try{
        const {refreshToken} = req.cookies
        console.log("refreshToken",refreshToken)
        const findRefresh = await TokenRefresh.findOne({refreshToken})
        console.log("findRefresh",findRefresh)
        const deleteTokendb = await TokenRefresh.findByIdAndDelete(findRefresh._id)
        res.clearCookie('accessToken')
        res.clearCookie('refreshToken')
        res.status(202).json({success:true,message:"token deleted succesfully" })
    }catch (err){
        res.status(501).json({success:false, error:err.message})
    }
}

 
 module.exports ={
     auth,
     getData,
     updateUser,
     getOne,
     newUser,
     login,
     deleteUser,    
     Token,
     logout
 }