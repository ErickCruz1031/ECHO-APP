import React, { useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import JSONPretty from 'react-json-pretty';
import { useState } from 'react';
//import { useEffect } from 'react';

export default function Profile(){
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [bearerToken, setBearer] = useState("");

  useEffect (() =>{
    console.log("This is the thing: ", isAuthenticated);
  });

  const handler = async () =>{
    const callAPI = async () =>{
      
    
      const domain = "dev--hn8vcuo.us.auth0.com";
      const accessToken = await getAccessTokenSilently({
        audience: `https://userAuth.com`,
        scope: "read:user",
      });
      console.log("This is the token: ", accessToken);
      setBearer(accessToken);
    }

    console.log("About to call it up")
    callAPI();

    

  }


  const handlerBackend = async () =>{
    const backendCall = async () =>{
      const response = await fetch(`http://localhost:8080/authorized`,{
        headers:{
          Authorization: `Bearer ${bearerToken}`,
        }
      })

      const data = await response.json();
      console.log("This is the response: ", data);

    }

    backendCall();
  }

  return (
    isAuthenticated && ( 
     <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <button onClick={handler}> Click it </button>
        <button onClick={handlerBackend}> Backend Call </button>
        <JSONPretty data={user} />
        {/* {JSON.stringify(user, null, 2)} */}
      </div>
    )
  )
}

//export default Profile
