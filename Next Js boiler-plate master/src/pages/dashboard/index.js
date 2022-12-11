import withAuth from "HOC/withAuth"
import { useEffect, useState } from "react";
import { addLogin } from "store/action/loggedin_action";
import {useSelector, useDispatch} from 'react-redux'

const   Index = () => {

  const dispatch = useDispatch()
  const isLogin = useSelector(state => state.isLogin)
  
  useEffect(()=>{
    console.log('there-------->232',isLogin)
  },[isLogin])
  
  const handleLogin = () => {
    dispatch(addLogin(!isLogin))
  }

  return (
    <>Dashboard
    <button onClick={()=>handleLogin()}>Click</button>
    </>
  )
}

export default withAuth(Index)
