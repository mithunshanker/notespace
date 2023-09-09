import Head from 'next/head'
import React, { useState } from 'react'

function Calc() {
    const[initialVelocity,setinitialVelocity]=useState()
    const[angle,setinitialangle]=useState()
    const rad = angle*(Math.PI/180)
    const ToF= 2*initialVelocity*Math.sin(rad)/9.8
    const Range = (initialVelocity*initialVelocity*Math.sin(2*rad))/9.8
    const maxH = (initialVelocity*initialVelocity*Math.sin(rad)*Math.sin(rad))/2*9.8
  return (
    <>
    <Head><link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous"/></Head>
    <div className='p-5' >
        
        <input onChange={(e)=>{
            setinitialVelocity(e.target.value)
        }} className="form-control form-control-sm" type="number" placeholder="Initial Velocity Of Projectile " aria-label=".form-control-sm example"></input>
        <br/>
        <input  onChange={(e)=>{
            setinitialangle(e.target.value)
        }} className="form-control form-control-sm" type="number" placeholder="Angle With Horizontal" aria-label=".form-control-sm example"></input>
        {initialVelocity&&angle?<><h3>Time of Flight</h3>
        <h6>{ToF}</h6>
        <h3>Range</h3>
        <h6>{Range}</h6>
        <h3>Maximum Height</h3>
        <h6>{maxH}</h6></>:null}
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossOrigin="anonymous"></script>
    </>
  )
}

export default Calc