import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'

const DeleteBtn = ({ id, redirectFn, socket }) => {
    const deleteHandler = ()=>{
        console.log("try to delete with socket")
        socket.emit('deleteIdea', id)
        //redirectFn()
    }

    return (
        <button className='btn btn-danger position-absolute top-0 end-0' onClick={deleteHandler} title='Delete Idea'>
            <FontAwesomeIcon icon={faTrashCan} />
        </button>
    )
}
export default DeleteBtn;