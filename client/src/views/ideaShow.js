import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Navbar from '../components/navbar'
import Idea from '../components/idea'

const IdeaShow = (props) => {
    const [idea, setIdea] = useState({})
    const [user, setUser] = useState('')
    const [username, setUsername] = useState("")
    const {id} = useParams()

    const navigate = useNavigate()
    const redirect = route => navigate(route || '/')

    useEffect(() => {
        axios.get(`http://localhost:8000/api/ideas/${id}`, {withCredentials:true})
            .then(res => {
                setIdea(res.data.idea)
                setUser(res.data.user)
                setUsername(res.data.username)
            })
            .catch(error => redirect('/404'))
    }, [])

    return (
        <>
            <Navbar title={`Hi ${username}!`} logoutBtn='true' boardBtn='true'/>
            <div className='container mt-5'>
                <Idea idea={idea} likes={idea.likes?.map(i => i._id)} current_user={user}/>
                
                {idea.likes?.length > 0 &&
                    <>
                    <p className='mt-2'>People who liked this post:</p>
                    <div className='idea border rounded border-white my-1 py-2 px-3'>
                    {idea.likes?.map(user => {
                        return (<div>
                            <span>{`${user.name} ${user.lastname} `}</span><Link to={`/user/${user._id}`} className='fw-bold text-white'>{`@${user.alias}`}</Link>
                        </div>)
                    })}
                    </div>
                    </>
                }
            </div>
        </>
    )
}
export default IdeaShow;