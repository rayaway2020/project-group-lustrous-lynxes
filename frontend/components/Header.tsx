import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import { useContext, useState } from 'react'
import Axios from 'axios'
import { userContext } from './Layout'

const Header = () => {
  const { username, setUsername, token, setToken } = useContext(userContext)
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const goBack = () => {
    history.back()
  }
  const goNext = () => {
    history.forward()
  }
  const toHomepage = () => {}
  const toDiscover = () => {}
  const toPlaylist = () => {}

  const register = () => {
    Axios.post('http://localhost:3001/api/auth/register', {
      username: username,
      password: password,
      email: email,
    }).then((res: any) => {
      if (res.status == 200) {
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
    <header className="fixed top-0 left-0 right-0 z-50 m-auto flex max-w-screen-xl bg-white px-6 py-4">
      {/* nav section */}
      <div className="flex w-0 flex-1 flex-row items-center justify-start gap-4">
        <ChevronLeftIcon
          className="h-8 w-8 cursor-pointer"
          onClick={() => goBack()}
        />
        <ChevronRightIcon
          className="h-8 w-8 cursor-pointer"
          onClick={() => goNext()}
        />
      </div>
      {/* tab section */}
      <div className="flex w-0 flex-1 flex-row items-center justify-center gap-6 text-lg font-semibold">
        <div className="cursor-pointer" onClick={() => toHomepage()}>
          Home
        </div>
        <div className="cursor-pointer" onClick={() => toDiscover()}>
          Discovery
        </div>
        <div className="cursor-pointer" onClick={() => toPlaylist()}>
          Playlist
        </div>
      </div>
      {/*Avatar */}
      <div className="flex w-0 flex-1 flex-row items-center justify-end gap-4">
        <label
          htmlFor="logIn-modal"
        >
          <img
            className="object-cover rounded-full w-12 h-12"
            src="https://api.lorem.space/image/face?hash=47449"
          />
        </label>
      </div>

      <input type="checkbox" id="logIn-modal" className="modal-toggle" />
      <div className="modal">
        <label
          htmlFor="logIn-modal"
          className="btn btn-circle btn-sm absolute right-2 top-2"
        >
          ✕
        </label>
        <div className="hero h-1/2 w-2/3 rounded-lg bg-base-200">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">Login now!</h1>
              <p className="py-6">
                Listening is everything, create an account to share your
                thoughts to others all over the world
              </p>
            </div>

            <div className="card w-full max-w-sm flex-shrink-0 bg-base-100 shadow-2xl">
              <div className="card-body">
                <div className="form-control">
                  <label className="label">UserName</label>
                  <input
                    type="text"
                    placeholder="UserName"
                    className="input input-bordered"
                    minLength={6}
                    onChange={(e) => {
                      setUsername(e.target.value)
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

                <div className="form-control mt-6">
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
          className="btn btn-circle btn-sm absolute right-2 top-2"
        >
          ✕
        </label>

        <div className="hero h-1/2 w-2/3 rounded-lg bg-base-200">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">Sign Up!</h1>
              <p className="py-6">
                Listening is everything, create an account to share your
                thoughts to others all over the world
              </p>
            </div>
            <div className="card w-full max-w-sm flex-shrink-0 bg-base-100 shadow-2xl">
              <div className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">UserName</span>
                  </label>
                  <input
                    type="text"
                    placeholder="UserName"
                    className="input input-bordered"
                    onChange={(e) => {
                      setUsername(e.target.value)
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
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="text"
                    placeholder="email"
                    className="input input-bordered"
                    onChange={(e) => {
                      setEmail(e.target.value)
                    }}
                  />
                </div>
                <div className="form-control mt-6">
                  <label htmlFor="register-modal" className="btn btn-primary" onClick={register}>
                    Register
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
