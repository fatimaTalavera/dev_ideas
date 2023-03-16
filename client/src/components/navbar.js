import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

const Navbar = (props) => {
    const {title, logoutBtn, addIdeaBtn, boardBtn } = props
    const navigate = useNavigate()
    const redirect = route => navigate(route || '/')

    const logout = e => {
        e.preventDefault()
        axios.get('http://localhost:8000/api/logout', {withCredentials:true})
            .then(res => redirect('/'))
            .catch(error => console.log(error))
    }

    return (
        <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="/user/edit">{title}</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li className="nav-item">{ boardBtn ? <Link to={'/ideas'} className='btn btn-primary mx-2'>Home</Link> : ''}</li>
                    <li className="nav-item">{ addIdeaBtn ? <Link to={'/idea/new'} className='btn btn-primary mx-2'>Add Idea</Link> : ''}</li>
                    <li className="nav-item">{ logoutBtn ? <a className='nav-link' onClick={logout} href='/'>Log out</a> : ''}</li>
                </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar