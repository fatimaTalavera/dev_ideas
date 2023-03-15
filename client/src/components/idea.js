import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import LikeBtn from './likeBtn'
import DeleteBtn from './deleteBtn'

const Idea = ({ idea, likes, current_user }) => {
    const navigate = useNavigate()
    const redirect = event => navigate(0)

    return (
        <div className='idea border rounded border-white my-3 py-2 px-3 position-relative'>
            <div className='idea-header'>
                <Link to={`/user/${idea.owner?._id}`} className='fw-bold text-white'>{idea.owner?.alias}</Link>
            </div>     
            <div className='idea-content'>{idea.description}</div>
            {idea.imgPath !== null && 
                <div className="text-center">
                    <img src={idea.imgPath} alt ="image idea" className="mx-auto img-fluid" />
                </div>
            }
            <LikeBtn id={idea._id} likes={likes} current_user={current_user} />
            { idea?.owner?._id === current_user && <DeleteBtn id={idea._id} redirectFn={redirect}/> }
        </div>
    )
}
export default Idea;