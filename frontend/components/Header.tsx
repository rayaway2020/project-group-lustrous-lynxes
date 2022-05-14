import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import { useContext, useState, useEffect } from 'react'
import Axios from 'axios'
import { userContext } from './Layout'
import { useRouter } from 'next/router'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Tooltip from '@mui/material/Tooltip';


const Header = () => {
  const router = useRouter()
  const { userInfo, setUserInfo } = useContext(userContext)

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
  
  const [formUsername, setFormUsername] = useState('');
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

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

  const [emailError, setEmailError] = useState(false);

  const [isInvalid, setIsInvalid] = useState(false);
  const [invalidError, setInvalidError] = useState('');

  const goBack = () => {
    history.back()
  }
  const goNext = () => {
    history.forward()
  }

  const resetValues = () => {
    setEmail('')
    setFormUsername('')
    setPassword('')
    setFormErrors({ email: '', username: '', password: '' })
    setInvalidError('')
    setIsInvalid(false)
  }

  const switchDialog = () => {
    resetValues()
    setIsRegister(!isRegister)
  }

  const handleSubmit = () => {
    setInvalidError('')
    setIsInvalid(false)

    if (!password) {
      setFormErrors({...formErrors, username: "Password is required!"});
    } else if (password.length < 8) {
      setFormErrors({...formErrors, password: "Password must be at least 8 characters"});
    }

    if (formErrors.email == '' && formErrors.username == '' && formErrors.password == ''){
      isRegister? register() : login();
    }
  }

  const register = () => {
    Axios.post('http://localhost:3001/api/auth/register', {
      username: formUsername,
      password: password,
      email: email,
    }).then((res: any) => {
      if (res.status == 200) {
        alert('Successfully registered and please log in!')
        handleClose()
      } else {
        setInvalidError('Registration failed')
        setIsInvalid(true)
        alert('Registration failed')
      }
    })
    
  }
  
  const login = () => {
    Axios.post('http://localhost:3001/api/auth/login', {
      username: formUsername,
      password: password,
    }).then((res: any) => {
      if (res.status == 200) {
        setUserInfo({
          username: res.data.username,
          id: res.data.id,
          token: res.data.token,
          likedSongs: res.data.likedSongs,
          likedPlaylist: res.data.likedPlaylists,
          createdPlaylist: res.data.createdPlaylist
        })
        alert('Successfully logged in')
        handleClose()
      } else {
        throw new Error();
      }
    }).catch(err => {
      alert("Account does not exist. Please register first.")
    })
  }

  const logout = () => {
    setUserInfo({username: "", id: "", token: "", likedSongs: [""], likedPlaylist: [""], createdPlaylist: [""]})
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
        <div
          className="cursor-pointer"
          onClick={() => {
            router.push('/')
          }}
        >
          Home
        </div>
        <div className="cursor-pointer" onClick={() => {router.push('/search')}}>
          Discovery
        </div>
        <div className="cursor-pointer" onClick={() => { router.push('/me')}}>
          Library
        </div>
      </div>
      {/*Avatar */}
      <div className="flex flex-row items-center justify-end flex-1 w-0 gap-4">
        <Tooltip title={userInfo.username ? `Hello ${userInfo.username}, click to log out` : "Click here to register/log in" } placement="left" >
          <label htmlFor="logIn-modal">
            <img
              className="object-cover w-12 h-12 rounded-full"
              src={ userInfo.username ? `https://stamp.fyi/avatar/${userInfo.username}` : "https://stamp.fyi/avatar/hello"}
              onClick={ userInfo.username? logout : handleOpen}
            />
          </label>
        </Tooltip>
      </div>
      
      <Dialog open={dialogOpen} onClose={handleClose}>
        {isRegister? <DialogTitle sx={{fontSize:'2rem', fontWeight: 'bold', paddingTop: '32px', paddingBottom: '16px', textAlign: 'center'}}>Register</DialogTitle> : <DialogTitle sx={{fontSize:'2rem', fontWeight: 'bold', paddingTop: '32px', paddingBottom: '16px', textAlign: 'center'}}>Login To Your Account</DialogTitle>}
        <DialogContent sx={{paddingBottom: '10px'}}>
          {isRegister? <TextField
            error = { !email? true : !regex.test(email)? true : false }
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
            value = {email}
            onChange={(e) => setEmail(e.target.value)}
            helperText={!email? "Email is required" : !regex.test(email)? "Please enter an email" : ""}
            required
          /> : null}
          <TextField
            error={!formUsername? true: false }
            margin="dense"
            id="username"
            label="Username"
            type="text"
            fullWidth
            variant="outlined"
            onChange={(e) => setFormUsername(e.target.value)}
            helperText={!formUsername? "Username is required" : null}
            value = {formUsername}
            required
          />
          <TextField
            error={ (!password || password.length < 8) ? true: false}
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            helperText={!password? "Password is required": (password.length < 8) ? "Password needs to be more than 8 characters" : ""}
            value = {password}
            required
          />
        </DialogContent>
        
        {isRegister? (
        <DialogContentText sx={{
          paddingLeft: '24px',
          color: 'rgba(0, 0, 0, 0.87)',
          textAlign: 'center',
        }}
                           className="cursor-pointer"
                           onClick={switchDialog}>
          Already got an account? Click here to log in
        </DialogContentText>) 
        : (
        <DialogContentText 
          sx={{
            paddingLeft: '24px',
            color: 'rgba(0, 0, 0, 0.87)',
            textAlign: 'center',
          }}
          className="cursor-pointer"
          onClick={switchDialog}>
          Sign up for an new account?
        </DialogContentText>
        )}

        {isInvalid? (
          <DialogContentText onClick={switchDialog}>
            {invalidError}
          </DialogContentText>)
          : ( <></>
        )}
        
        <DialogActions sx={{paddingTop: '22px', paddingRight: '24px', paddingBottom: '10px'}}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>

    </header>
  )
}

export default Header
