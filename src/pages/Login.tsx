import { useState } from 'react'
import { useAuthContext } from '../contexts/AuthProvider'
import { Link } from 'react-router-dom'

const Login = () => {
    const { login } = useAuthContext()
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const handleLogin = () => {
        if(email.trim() != '' && password.trim() != '') {
            login({email: email.trim(), password: password.trim()})
        }else {
            alert('Please enter valid login details')
        }
    }

    return (
        <div className='row'>
            <div className="col-md-3"></div>
            <div className="col-md-6">
                <div className="card">
                    <div className="card-body">
                        <h3>Login</h3>
                        <hr />
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" placeholder="e.g. name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <div className="text-center mt-4">
                            <button className="btn btn-primary w-25" onClick={handleLogin}>Login</button>
                            <div className="d-flex justify-content-center mt-3">
                                <p>Don't have an account?</p>
                                <Link to='/signup' className='ms-2'>
                                    <p>Signup</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-3"></div>
        </div>
    )
}

export default Login