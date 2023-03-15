import { Link } from 'react-router-dom'
import LikeBtn from './likeBtn'

const Idea = ({ idea, likes, current_user }) => {
    return (
        <div key={idea._id} className='idea border rounded border-white my-3 py-2 px-3'>
            <div className='idea-header'>
                <Link to={`/user/${idea.owner?._id}`} className='fw-bold text-white'>{idea.owner?.alias}</Link>
            </div>     
            <div className='idea-content'>{idea.description}</div>
            {idea.imgPath !== null && 
                <div class="text-center">
                    <img src={idea.imgPath} alt ="image idea" className="mx-auto img-fluid" />
                </div>
            }
            <div>
                <LikeBtn id={idea._id} likes={likes} current_user={current_user} />
            </div>
        </div>
    )
}
export default Idea;