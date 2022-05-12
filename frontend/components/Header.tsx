import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import { useContext, useState, useEffect } from 'react'
import Axios from 'axios'
import { userContext } from './Layout'
import { useRouter } from 'next/router'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const Header = () => {
  const router = useRouter()
  const { username, setUsername, userId, setUserId, token, setToken } =
    useContext(userContext)
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const initialValues = { email: '', username: '', password: '' }
  const [formErrors, setFormErrors] = useState({
    email: '',
    username: '',
    password: '',
  })

  const [isRegister, setIsRegister] = useState(false)

  const [dialogOpen, setDialogOpen] = useState(false);
  const handleOpen = () => setDialogOpen(true);
  const handleClose = () => {
    setDialogOpen(false);
    resetValues()
  }
  const handleClickOpen = () => {
    setDialogOpen(true);
  };
  const [emailError, setEmailError] = useState(false);
  const [userNameError, setUserNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

// const style = {
//   position: 'absolute' as 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };

  const goBack = () => {
    history.back()
  }
  const goNext = () => {
    history.forward()
  }

  const resetValues = () => {
    setEmail('')
    setUsername('')
    setPassword('')
    setEmailError(false)
    setUserNameError(false)
    setPasswordError(false)
    setFormErrors(initialValues)
  }

  const switchDialog = () => {
    resetValues()
    setIsRegister(!isRegister)
  }

  const handleSubmit = () => {
    setEmailError(false)
    setUserNameError(false)
    setPasswordError(false)
    // console.log("new turn")
    const errors = {email: '', username: '', password: ''}
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i

    if(isRegister){
      if (!email) {
        errors.email = 'Email is required!'
        setEmailError(true)
      } else if (!regex.test(email)) {
        errors.email = 'This is not a valid email format'
        setEmailError(true)
      }
    }

    if (!username) {
      errors.username = 'Username is required!'
      setUserNameError(true)
    }

    if (!password) {
      errors.password = 'Password is required!'
      setPasswordError(true)
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters'
            setPasswordError(true)
    }

    if (errors.email == '' && errors.username == '' && errors.password == ''){
      if(isRegister){
        register()
      }else{
        login()
      }
      console.log("yay")
      handleClose()
    } else{
      setFormErrors(errors)
      console.log(formErrors.email)
      console.log(formErrors.username)
      console.log(formErrors.password )
    }
  }

  const register = () => {
    Axios.post('http://localhost:3001/api/auth/register', {
      username: username,
      password: password,
      email: email,
    }).then((res: any) => {
      if (res.status == 200) {
        setUserId(res.data.user)
        alert('Successfully registered')
      } else {
        alert('Registration failed')
      }
    })
  }
  
  const login = () => {
    Axios.post('http://localhost:3001/api/auth/login', {
      username: username,
      password: password,
    }).then((res: any) => {
      if (res.status == 200) {
        setToken(res.data)
        alert('Successfully logged in')
        //Direct to new page
      } else {
        alert('Incorrect Username or Password')
      }
    })
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex max-w-screen-xl px-6 py-4 m-auto bg-white">
      {/* nav section */}
      <div className="flex flex-row items-center justify-start flex-1 w-0 gap-4">
        <ChevronLeftIcon
          className="w-8 h-8 cursor-pointer"
          onClick={() => goBack()}
        />
        <ChevronRightIcon
          className="w-8 h-8 cursor-pointer"
          onClick={() => goNext()}
        />
      </div>
      {/* tab section */}
      <div className="flex flex-row items-center justify-center flex-1 w-0 gap-6 text-lg font-semibold">
        <div className="cursor-pointer" onClick={() => { router.push('/') }}>
          Home
        </div>
        <div
          className="cursor-pointer"
          onClick={() => {
            router.push('/search')
          }}
        >
          Discovery
        </div>
        <div
          className="cursor-pointer"
          onClick={() => {
            router.push('/me')
          }}
        >
          Library
        </div>
      </div>
      {/*Avatar */}
      <div className="flex flex-row items-center justify-end flex-1 w-0 gap-4">
        <label htmlFor="logIn-modal">
          <img
            className="object-cover w-12 h-12 rounded-full"
            src="https://api.lorem.space/image/face?hash=47449"
            onClick={handleOpen}
          />
        </label>
      </div>
      
      <Dialog open={dialogOpen} onClose={handleClose}>
        {isRegister? <DialogTitle>Register</DialogTitle> : <DialogTitle>Login</DialogTitle>}
        <DialogContent>
          
          {isRegister? <TextField
            error = {emailError}
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value = {email}
            onChange={(e) => setEmail(e.target.value)}
            helperText={formErrors.email}
            required
          /> : null}
          
          <TextField
            error={userNameError}
            autoFocus
            margin="dense"
            id="name"
            label="Username"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setUsername(e.target.value)}
            helperText={formErrors.username}
            value = {username}
            required
          />
          <TextField
            error={passwordError}
            autoFocus
            margin="dense"
            id="name"
            label="Password"
            type="password"
            fullWidth
            onChange={(e) => setPassword(e.target.value)}
            variant="standard"
            required
            helperText={formErrors.password}
            value ={password}
          />
        </DialogContent>
        
        {isRegister? (
        <DialogContentText fontWeight= 'bold' 
                           fontStyle= 'oblique' 
                           textAlign='center' 
                           color='red' 
                           onClick={switchDialog}>
          Already got an account? Click here to log in
        </DialogContentText>) 
        : (
        <DialogContentText onClick={switchDialog}>
          Sign up for an new account?
        </DialogContentText>
        )}
        
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>

    </header>
  )
}

export default Header
