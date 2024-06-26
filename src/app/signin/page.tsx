"use client"

import { createUserWithEmailAndPassword, GithubAuthProvider, signInWithPopup,sendEmailVerification, signInWithEmailAndPassword } from "firebase/auth"

import { useState,useEffect,useRef } from "react"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

import { provider,auth,gitprovider } from "../config"



export default function Register()
{
   
    // const createCookie=async(email:string)=>{
    //      await axios.post("/api/createCookie",{email}).then((res)=>console.log(res)).catch((err)=>console.log(err));
    // }
    const ref=useRef(null)

    const [value,setvalue]=useState<any | null>()
   
    async function handleauth()
    {
           await signInWithPopup(auth,provider).then((data)=>{
                setvalue(data.user)
                //@ts-ignore
                localStorage.setItem("email",data.user.email)
                
             if(data.user)
             {
                console.log(`verified is : ${data.user.emailVerified}`)
                 //@ts-ignore
             //createCookie(data.user.email)
               //@ts-ignore
              ref.current.click()
             }
                
            }).catch((err)=> alert("google auth error.Please try again after some time. If error persists, contact owner"+err)) 
    }
    async function handleauthgit()
    {
            await signInWithPopup(auth,gitprovider).then((data)=>{
                const credential=GithubAuthProvider.credentialFromResult(data)
                const token=credential?.accessToken
                 //@ts-ignore
                localStorage.setItem("email",data.user.email)
              
                setvalue(data.user)
                console.log(data.user)
             if(data.user){ 
                 //@ts-ignore
             //createCookie(data.user.email)
             //@ts-ignore
             ref.current.click()}
                // localStorage.setItem("email",data.user.email)
            }).catch((error)=> toast.error("you have already signedup using google. Please choose signin with google",  {position: "top-center"}))
          
    }
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [confpassword,setconfPassword]=useState("")

  

const handlesubmitlogin=async(e:any)=>
{
    e.preventDefault()
    // if(password!=confpassword)
    // {
    //     toast.error("passwords dont match",{position: "top-center"})
    //     return
    // }
    
        await signInWithEmailAndPassword(auth,email,password).then((data)=>{
            console.log('in verification area')

           
              
             
            
            console.log(`login data is ${data.user.email} is verified? ${data.user.emailVerified}`)
        setvalue(data.user)
         //@ts-ignore
         localStorage.setItem("email",data.user.email)
    const email = localStorage.getItem('email')
         console.log(email)
        
           if(data.user)
           {
                //@ts-ignore
               //createCookie(data.user.email)
               //@ts-ignore
               ref.current.click()
           }
         
    }).catch((err)=>toast.error(""+err,{position: "top-center"}))
}

const handleformSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Check if passwords match
    if (password !== confpassword) {
        toast.error("Passwords don't match",{position: "top-center"});
        return;
    }

  
        // Create user with email and password
     await createUserWithEmailAndPassword(auth, email, password).then((data)=>{
       const user =auth.currentUser
       console.log('current user is ')
       console.log(user)
      
        
  
       
              
       
        // if(!data.user.emailVerified)
        //   {
        //     toast.error("email not verified. Please verify your email and login again")
          
        //   }
        //  else
        //  {
        //     if(data.user)
        //     {
        //          //@ts-ignore
        //         //createCookie(data.user.email)
        //         //@ts-ignore
        //         ref.current.click()
        //     }
        //  }
        // Check if email is verified
        if(data.user)
          {
               //@ts-ignore
              //createCookie(data.user.email)
              //@ts-ignore
              ref.current.click()
          }
      
        console.log(`Email verified? ${data.user.emailVerified}`);
        }).catch((err)=>{
           toast.error(""+err,{position: "top-center"})
        })
     
        // Send email verification
        // if(user){
        // await sendEmailVerification(data.user);
        // toast.success("Email verification link sent");
        // }
       

        // Save email to local storage
       
    
};

    const [signup,setSignup]=useState(false)
   
    return <div >
        <ToastContainer />
        <div className=" grid grid-cols-1 lg:grid-cols-2 h-full" id="REGISTER">
       
        <div className=" bg-white" style={{ background:'url("https://i.pinimg.com/736x/4e/99/61/4e996161b1ff9177cd41ce737c8e00ca.jpg")',backgroundPosition:'center' }}>
            <div className=" w-full bg-opacity-55 bg-black text-white font-semibold text-5xl h-full flex justify-center items-center gap-0">
                <div className=" py-5 flex flex-col px-3"><p className=" text-center">Ready for battle?</p> 
                <span className=" h-0.5 w-full bg-white"></span></div> </div> </div> 
        <div className=" bg-slate-950 p-3">
        <form onSubmit={signup?handleformSignup:handlesubmitlogin} className='pb-8 p-3 border-2 border-slate-700 text-white bg-transparent grid gap-3 shadow-2xl rounded-lg mt-5 '>
            <h1 className=" pt-5 text-2xl font-semibold">{signup? 'Signup':'login'}</h1>
           {signup&&<input required placeholder='name'  className='ease-in-out duration-500 focus:text-lg outline-none w-full mt-4 p-2 py-4  bg-transparent  border-b-2 border-slate-800 hover:border-white' type="text" name="" id="" />} 
        <input value={email} onChange={(e)=>setEmail(e.target.value)} required placeholder='email' className='ease-in-out duration-500 focus:text-lg outline-none w-full p-2 py-4 mt-4 bg-transparent border-b-2  border-slate-800 hover:border-white' type="email" name="" id="" />
       <input value={password} onChange={(e)=>setPassword(e.target.value)}  required placeholder='password' className='ease-in-out duration-500 focus:text-lg outline-none w-full mt-4 p-2 py-4  bg-transparent  border-b-2  border-slate-800 hover:border-white' type="password" name="" id="" />
       {signup&&<input value={confpassword} onChange={(e)=>setconfPassword(e.target.value)} required placeholder='confirm password' className='ease-in-out duration-500 focus:text-lg outline-none w-full mt-4 p-2 py-4  bg-transparent  border-b-2  border-slate-800 hover:border-white' type="text" name="" id="" />}
       <button className=' rounded-md max-w-28 mt-6 h-14 bg-slate-800 hover:bg-slate-900 ease-in-out duration-500  text-lg font-semibold hover:text-2xl p-2 px-3 text-white' type="submit">submit</button>
      <div className=" pt-4 flex"><p className=" opacity-60">{signup? 'already register?':'new here?'} </p><button className=" text-white pl-1" onClick={()=>{
         setEmail('')
         setPassword('')
         setconfPassword('')
        setSignup(!signup)}}>{!signup? 'Signup':'login'}</button></div> 
      <div className=" w-full flex  justify-center items-center pt-8 ">
        <button onClick={handleauth} className=" w-fit flex justify-center items-center bg-slate-800 rounded-md p-2 overflow-clip group relative">
        <i className=" pr-2 group-hover:translate-x-10 transition ease-in-out duration-700"><img className=" w-8" src="https://img.icons8.com/color/48/google-logo.png" alt="" /></i><p className="group-hover:translate-y-40 transition ease-in-out duration-700">sign in with google</p><p className=" -translate-y-9 group-hover:translate-y-0 transition ease-in-out duration-700 absolute right-12">lets go!!</p> </button></div>
        <div className=" w-full flex  justify-center items-center pt-2 ">
        <button onClick={handleauthgit} className=" w-fit flex justify-center items-center bg-slate-800 rounded-md p-2 overflow-clip group relative">
        <i className=" pr-2 group-hover:translate-x-8 transition ease-in-out duration-700"><img className=" w-8" 
        src="https://img.icons8.com/external-tanah-basah-glyph-tanah-basah/48/external-github-social-media-tanah-basah-glyph-tanah-basah.png" 
        alt="" /></i><p className="group-hover:translate-y-40 transition ease-in-out duration-700">sign in with github</p><p className=" -translate-y-9 group-hover:translate-y-0 transition ease-in-out duration-700 absolute right-10">lets code!!</p> </button></div>
        </form>
        </div>
        <a ref={ref} className=" text-white" href="/dashboard" style={{ display:'none' }}></a>
    </div>
    </div> 
}
