import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'

const DeleteBtn = ({ id, redirectFn }) => {
    const deleteHandler = ()=>{
        axios.delete(`http://localhost:8000/api/ideas/delete/${id}`, {withCredentials:true})
            .then(res => redirectFn())
            .catch(err => console.log(err))
    }

    return (
        <button className='btn btn-danger position-absolute top-0 end-0' onClick={deleteHandler} title='Delete Idea'>
            <FontAwesomeIcon icon={faTrashCan} />
        </button>
    )
}
export default DeleteBtn;