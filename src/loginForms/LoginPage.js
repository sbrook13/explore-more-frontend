import React, {useState} from 'react'
import LoginForm from './LoginForm'
import NewUserForm from './NewUserForm'
import {parseJSON, authHeaders, homeURL} from '../components/hooks/customHooks'

export default function LoginPage(props) {

  const { 
    loginUser, 
    history, 
    setCompletedTrails, 
    setBucketListTrails, 
    setFavoriteTrails,
    setAddress
  } = props

  const [loginType, setFormType] = useState(null)

  const handleChange = (event, stateChange) => {
    stateChange(event.target.value)
  }

  function handleError(error){
      const errorMessage = document.querySelector('.error-message')
      errorMessage.innerText = error.message
      errorMessage.classList.remove('hidden');
  }

  function showUserData(){
    fetch(homeURL, {
      method: 'POST',
      headers: authHeaders
    })
      .then(parseJSON)
      .then(result => {
        if(result.errors){
            throw new Error('❌ Incorrect Username or Password')
        }
        loginUser(result)
        setCompletedTrails(result.completed_trails)
        setFavoriteTrails(result.favorites)
        setBucketListTrails(result.bucket_lists)
        setAddress(result.address)
        history.push('/') 
      })
      .catch(handleError)
  }

  const handleButtonClick = (_, formType) => {
    setFormType(formType)
  }

  const showForm = (loginType) => { 
    if (loginType === "login") {
    return <LoginForm 
      handleError={handleError} 
      handleChange={handleChange} 
      showUserData={showUserData} 
    />
    } else {
    return <NewUserForm 
      handleError={handleError} 
      handleChange={handleChange} 
      loginUser={loginUser} 
      history={history} 
      showUserData={showUserData}
    />
    }
  }


  return (
    <div className="main-section center">
      
      { loginType ?
        showForm(loginType) :
        <>
          <h1>Welcome!</h1>
          <h2>Your next adventure awaits...</h2>
          <div>
            <button className="btn" onClick={(_) => handleButtonClick(_, "login")}>Login</button>
            <button className="btn" onClick={(_) => handleButtonClick(_, "createUser")}>New User</button>
          </div> 
        </>
      }
      <p className="error-message"></p>
    </div>
  )
}