import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import { useContext, useState, useEffect} from 'react'
import Axios from 'axios'
import { userContext } from './Layout'

const Header = () => {
  const { username, setUsername, userId, setUserId, token, setToken } = useContext(userContext)
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const initialValues = {username: "", email: "", password: "" };
  const [formValues, setFormValues ] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({ username: "", password: "", email: "" });
  const [isSubmit, setIsSubmit] = useState(false);

  const goBack = () => {
    history.back()
  }
  const goNext = () => {
    history.forward()
  }

  useEffect(() =>{
    console.log(formErrors)
    if(Object.keys(formErrors).length === 0 && isSubmit){
      console.log(formValues)
    }
  },[formErrors]);

  const validateRegister = (values: any) => {
    const errors = { username: "", password: "", email: "" }
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if(!values.username){
      errors.username= "Username is required!";
    }

    if(!values.password){
      errors.password= "Password is required!";
    } else if (values.password.length < 8){
      errors.password = "Password must be at least 8 characters";
    }

    if(!values.email){
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)){
      errors.email = "This is not a valid email format";
    }
    return errors;
  }

  const register = () => {
    setFormErrors(validateRegister(formValues));
    setIsSubmit(true);

    Axios.post('http://localhost:3001/api/auth/register', {
      username: username,
      password: password,
      email: email,
    }).then((res: any) => {
      if (res.status == 200) {
        setUserId(res.data.user);
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
        <div className="cursor-pointer">
          <a href="/">Home</a>
        </div>
        <div className="cursor-pointer">
          <a href="#">Discovery</a>
        </div>
        <div className="cursor-pointer">
          <a href="/me">Playlist</a>
        </div>
      </div>
      {/*Avatar */}
      <div className="flex flex-row items-center justify-end flex-1 w-0 gap-4">
        <label
          htmlFor="logIn-modal"
        >
          <img
            className="object-cover w-12 h-12 rounded-full"
            src="https://api.lorem.space/image/face?hash=47449"
          />
        </label>
      </div>

      <input type="checkbox" id="logIn-modal" className="modal-toggle" />
      <div className="modal">
        <label
          htmlFor="logIn-modal"
          className="absolute btn btn-circle btn-sm right-2 top-2"
        >
          ✕
        </label>
        <div className="w-2/3 rounded-lg hero h-3/5 bg-base-200">
          <div className="flex-col hero-content lg:flex-row-reverse">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">Login now!</h1>
              <p className="py-6">
                Listening is everything, create an account to share your
                thoughts to others all over the world
              </p>
            </div>

            <div className="flex-shrink-0 w-full max-w-sm shadow-2xl card bg-base-100">
              <div className="card-body">
                <div className="form-control">
                  <label className="label">UserName</label>
                  <input
                    type="text"
                    placeholder="UserName"
                    className="input input-bordered"
                    minLength={6}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                </div>

                <div className="form-control">
                  <label className="label">Password</label>
                  <input
                    type="password"
                    placeholder="password"
                    className="input input-bordered"
                    onChange={(e) => {
                      setPassword(e.target.value)
                    }}
                  />
                  <label className="label">
                    <label htmlFor="register-modal" className="btn btn-link btn-xs" onClick={login}>
                      Sign up for a new account?
                    </label>
                  </label>
                </div>

                <div className="mt-6 form-control">
                  <label htmlFor="logIn-modal" className="btn btn-primary" onClick={login}>
                    LOGIN
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <input type="checkbox" id="register-modal" className="modal-toggle" />
      <div className="modal" id="register-modal">
        <label
          htmlFor="register-modal"
          className="absolute btn btn-circle btn-sm right-2 top-2"
        >
          ✕
        </label>

        <div className="w-2/3 rounded-lg hero h-2/3 bg-base-200">
          <div className="flex-col hero-content lg:flex-row-reverse">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">Sign Up!</h1>
              <p className="py-6">
                Listening is everything, create an account to share your
                thoughts to others all over the world
              </p>
            </div>
            <div className="flex-shrink-0 w-full max-w-sm shadow-2xl card bg-base-100">
              <div className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">UserName</span>
                  </label>
                  <p className='text-xs text-red-600 underline label-text underline-offset-1'>{formErrors.username}</p>
                  <input
                    type="text"
                    placeholder="UserName"
                    className="input input-bordered"
                    value = { formValues.username}
                    onChange={(e) => {
                      setUsername(e.target.value)
                      formValues.username=e.target.value;
                    }}
                  />
                </div>

                <div className="form-control">
                  <label className="label">Password</label>
                  <p className='text-xs text-red-600 underline label-text underline-offset-1'>{formErrors.password}</p>
                  <input
                    type="password"
                    placeholder="password"
                    className="input input-bordered"
                    value = { formValues.password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      formValues.password=(e.target.value)
                    }}
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <p className='text-xs text-red-600 underline label-text underline-offset-1'>{formErrors.email}</p>
                  <input
                    type="text"
                    placeholder="email"
                    className="input input-bordered"
                    value = { formValues.email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      formValues.email=(e.target.value)
                    }}
                  />
                </div>
                <div className="mt-6 form-control">
                  {/* <label htmlFor="register-modal" className="btn btn-primary" onClick={register}>
                    Register
                  </label> */}
                  <label className="btn btn-primary" onClick={register}>
                    Register
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div>
          {Object.keys(formErrors).length === 0 && isSubmit ? (<div className='ui message success'>Signed In successfully</div>
          ) : (<div className='ui message success'>Not yet sign in</div>)}
        </div> */}
      </div>
    </header>
  )
}

export default Header
