import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Idea from '../components/idea'
import Navbar from '../components/navbar'
import IdeaNew from './/ideaNew'

const IdeasIndex = (props) => {
    const [ideas, setIdeas] = useState([])
    const [user, setUser] = useState('')
    const [welcomeTitle, setWelcomeTitle] = useState('')

    const navigate = useNavigate()
    const redirect = event => navigate(0)

    useEffect(() => {
        axios.get('http://localhost:8000/api/ideas', { withCredentials: true })
            .then(res => {
                setIdeas(res.data.ideas)
                setUser(res.data.user)
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
                    return (<Idea idea={idea} likes={idea.likes} current_user={user}/>)
                })}
            </div>
        </>
    )
}
export default IdeasIndex;
//<DeleteBtn id={pr._id} redirectFn={redirect} />