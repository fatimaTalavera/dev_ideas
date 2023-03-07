import Form from '../components/form'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
 
const IdeaNew = (props) => {
    const navigate = useNavigate()
    const redirect = route => navigate(route)

    const saveData = (data, dispatch) => {
        console.log('Saving...', data)
        axios.post('http://localhost:8000/api/ideas/new', data, {withCredentials:true})
            .then(resp => {
                alert('Idea was created successfully.')
                redirect(0)
            })
            .catch(error => {
                console.log(error)
                error = error.response.data.errors
                Object.keys(error).map(key => dispatch(
                    {type: key, payload: {value: error[key].value, error: error[key].message}
                }))
            })
    }
 
    return (
        <>
            <Form handleSubmit={saveData} buttonTitle="Post!"/>
        </>
    )
}
export default IdeaNew;