import axios from 'axios'
import { useState, useEffect } from 'react'
import Idea from '../components/idea'
import Navbar from '../components/navbar'
import IdeaNew from './/ideaNew'

const IdeasIndex = ({socket}) => {
    const [ideas, setIdeas] = useState([])
    const [user, setUser] = useState('')
    const [welcomeTitle, setWelcomeTitle] = useState('')

    useEffect(() => {
        axios.get('http://localhost:8000/api/ideas', { withCredentials: true })
            .then(res => {
                setIdeas(res.data.ideas)
                setUser(res.data.user)
                setWelcomeTitle(`Hi ${res.data.username}!`)
            })
            .catch(error => console.log(error))
    }, [])

    socket.on('deletedIdea', (_id)=>{
        console.log("Deleted idea:", _id)
        setIdeas(ideas.filter((idea)=> idea._id !== _id))
    })

    const deleteFn = id => {
        socket.emit('deleteIdea', id)
    }

    return (
        <>
            <Navbar title={welcomeTitle} logoutBtn='true' />
            <IdeaNew/>
            <div className='container'>
                {ideas.map((idea, index) => {
                    return (<Idea idea={idea} likes={idea.likes} current_user={user} key={idea._id} deleteFn={deleteFn}/>)
                })}
            </div>
        </>
    )
}
export default IdeasIndex;