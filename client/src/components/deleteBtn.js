import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'

const DeleteBtn = ({ id, deleteFn }) => {
    const deleteHandler = ()=>{
        console.log("try to delete with socket")
        deleteFn(id)
    }

    return (
        <button className='btn btn-danger position-absolute top-0 end-0' onClick={deleteHandler} title='Delete Idea'>
            <FontAwesomeIcon icon={faTrashCan} />
        </button>
    )
}
export default DeleteBtn;