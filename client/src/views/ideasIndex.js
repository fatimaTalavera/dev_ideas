import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import LikeBtn from '../components/likeBtn'
import Navbar from '../components/navbar'
import IdeaNew from './/ideaNew'

const IdeasIndex = (props) => {
    const [ideas, setIdeas] = useState([])
    const [welcomeTitle, setWelcomeTitle] = useState('')

    const navigate = useNavigate()
    const redirect = event => navigate(0)

    useEffect(() => {
        axios.get('http://localhost:8000/api/ideas', { withCredentials: true })
            .then(res => {
                setIdeas(res.data.ideas)
                setWelcomeTitle(`Hi ${res.data.username}!`)
            })
            .catch(error => console.log(error))
    }, [])

    return (
        <>
            <Navbar title={welcomeTitle} logoutBtn='true' />
            <IdeaNew/>
            <div className='container'>
                {ideas.map((idea, index) => {
                    return (<div key={index} className='idea border rounded border-white my-3 py-2 px-3'>
                        <div className='idea-header'>
                            <Link to={`/user/${idea.owner._id}`} className='fw-bold text-white'>{idea.owner.alias}</Link>
                        </div>
                        <div className='idea-content'>{idea.description}</div>
                        <div>
                            <LikeBtn id={idea._id} likes={idea.likes} current_user={idea.owner._id} />
                        </div>
                    </div>)
                })}
            </div>
        </>
    )
}
export default IdeasIndex;
//<DeleteBtn id={pr._id} redirectFn={redirect} />