import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Navbar from '../components/navbar'

const IdeaShow = (props) => {
    const [idea, setIdea] = useState({})
    const [username, setUsername] = useState("")
    const {id} = useParams()

    const navigate = useNavigate()
    const redirect = route => navigate(route || '/')

    useEffect(() => {
        axios.get(`http://localhost:8000/api/ideas/${id}`, {withCredentials:true})
            .then(res => {
                setIdea(res.data.idea)
                setUsername(res.data.username)
            })
            .catch(error => redirect('/404'))
    }, [])

    return (
        <>
            <Navbar title={`Hi ${username}!`} logoutBtn='true' boardBtn='true'/>
            <div className='container pt-5'>
                <div className='idea border rounded border-white my-3 py-2 px-3'>
                    <div className='idea-header'>
                        
                    </div>
                    <div className='idea-content'>{idea.description}</div>
                </div>
            </div>
        </>
    )
}
export default IdeaShow;