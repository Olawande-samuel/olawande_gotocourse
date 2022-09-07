import React from 'react'

const style ={
    position:"fixed",
    inset: 0,
    backgroundColor:"#fff",
    opacity:"0.7",
    height: "100vh",
    display:"grid",
    placeItems:"center",
    zIndex: 10000
}


const Loader = () => {
  return (
    <div style={style}>
        <div className="spinner-border text-primary" role="status" style={{width:"4rem", height:"4rem"}}>
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>
  )
}

export default Loader