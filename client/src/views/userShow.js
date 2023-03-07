import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/navbar'

const UserShow = (props) => {
    const [user, setUser] = useState({})
    const [username, setUsername] = useState("")
    const {id} = useParams()

    const navigate = useNavigate()
    const redirect = route => navigate(route || '/')

    useEffect(() => {
        axios.get(`http://localhost:8000/api/users/${id}`, {withCredentials:true})
            .then(res => {
                setUser(res.data.user)
                setUsername(res.data.username)
            })
            .catch(error => redirect('/404'))
    }, [])

    return (
        <>
            <Navbar title={`Hi ${username}!`} logoutBtn='true' boardBtn='true'/>
            <div className='container mt-5'>
                <div className='mb-3'>
                    Name: {user.name} {user.lastname} 
                </div>
                <div className='mb-3'>
                    Alias: {user.alias} 
                </div>
                <div className='mb-3'>
                    Name: {user.email} 
                </div>
            </div>
        </>
    )
}
export default UserShow;