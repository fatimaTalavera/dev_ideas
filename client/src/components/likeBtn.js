import axios from 'axios'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'

const LikeBtn = ({ id, likes, current_user }) => {
    const [liked, setLiked] = useState(likes?.indexOf(current_user) >= 0)
    const [likeCount, setLikeCount] = useState(likes?.length)
    
    const likeHandler = (e)=>{
        e.preventDefault()
        axios.put(`http://localhost:8000/api/ideas/like/${id}`, {liked}, {withCredentials:true})
            .then(res => {
                setLiked(!liked)
                setLikeCount(res.data.idea.likes?.length)
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <a href='#' onClick={likeHandler} className={liked ? 'text-danger' : 'text-white'}>
                <FontAwesomeIcon icon={faHeart} />
            </a>
            <Link to={`/idea/${id}`} className='ms-3 text-white'>{likeCount} {likeCount == 1? 'person ' : 'people '}</Link>
            <span>like this</span>
        </div>
    )
}
export default LikeBtn;