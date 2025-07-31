import React from 'react'

const Loading = () => {

    return (
        <section style={{position:"fixed",width:"100vw",height:"100vh",zIndex:999,top:0,left:0,opacity:0.75,backgroundColor:'black',color:'white'}}>
            <h1 style={{marginTop:"45vh",marginLeft:"25vw"}}>Please wait...</h1>
        </section>
    )
}

export default Loading