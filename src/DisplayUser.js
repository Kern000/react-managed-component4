import React from 'react';

export default function DisplayUser(props){
    return(
        <React.Fragment>
        <div className="box">
            <h3>{props.user.name}</h3>                
            <h3>{props.user.email}</h3>                
        </div>
        
        <div>
        <button
            onClick={
            () => props.beginEdit(props.user)
            }
        > Update
        </button>
        
        <button
            onClick={
            () => props.deleteUser(props.user)
            }
        > Delete
        </button>
        </div>
        </React.Fragment>
        )
}