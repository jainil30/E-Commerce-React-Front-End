import { useState } from 'react'
import { useAuthContext } from '../contexts/AuthProvider'
import { Link } from 'react-router-dom'

const SignUp = () => {
    const { signUp } = useAuthContext()
    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const handleSignUp = () => {
        if(name.trim() != '' && email.trim() != '' && password.trim() != '') {
            signUp({name: name.trim(), email: email.trim(), password: password.trim()})
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
                        <h3>Sign Up</h3>
                        <hr />
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control" id="name" placeholder="e.g. Jon Deo" value={name} onChange={(e) => setName(e.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" placeholder="e.g. name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="text-center mt-4">
                            <button className="btn btn-primary w-25" onClick={handleSignUp}>Signup</button>
                            <div className="d-flex justify-content-center mt-3">
                                <p>Already have an account?</p>
                                <Link to='/login' className='ms-2'>
                                    <p>Login</p>
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

export default SignUp