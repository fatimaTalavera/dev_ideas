import axios from 'axios'

const DeleteBtn = ({ id, redirectFn }) => {
    const deleteHandler = ()=>{
        axios.delete(`http://localhost:8000/api/ideas/delete/${id}`, {withCredentials:true})
            .then(res => redirectFn())
            .catch(err => console.log(err))
    }

    return (
        <button className='btn btn-danger px-5' onClick={deleteHandler}>Walk the Plank</button>
    )
}
export default DeleteBtn;