'use client'

import {useSelector,useDispatch} from 'react-redux'
import { fetchUsers ,increament} from '@/slices/userSlice'
import { useEffect ,useRef} from 'react'
import { AppDispatch,RootState } from '@/store/store'


export default function Home() {
  const userRef=useRef(false)
  const {entities,loading,value}=useSelector((state:RootState)=>state.user)
  const dipatch=useDispatch<AppDispatch>()

  // console.log(entities);
  
  useEffect(()=>{
   if(userRef.current===false){
    dipatch(fetchUsers())
   }
   return ()=>{
    userRef.current=true
   }
  },[])
  return (
    <div>
      {loading?
      <h1>Loading...</h1> :
entities?.map((item:any)=>{
  return(
    <h3 key={item.id}>{item.name}</h3>
  )
})
}
 <button onClick={()=>dipatch(increament())}>Click To Add</button>
    <p>{value}</p>
      </div>
  )
}
