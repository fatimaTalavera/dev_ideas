import { useReducer, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios'

const initialState = {
    description: {
        value: '',
        error: null
    }
};

function reducer(state, action) {
    if (action.type === 'init') return getState(action.payload)
    return {
        ...state,
        [action.type]: action.payload
    };
}

function serializeState(obj) {
    let result = {};
    Object.keys(obj).map((key) => result[key] = obj[key].value)
    return result;
}

function getState(obj) {
    let result = {};
    Object.keys(obj).map((key) => result[key] = { value: obj[key], error: null })
    return result;
}

const Form = (props) => {
    const { id } = useParams()
    const [state, dispatch] = useReducer(reducer, initialState)
    const { handleSubmit, buttonTitle } = props;

    useEffect(() => {
        if (!id) return

        axios.get(`http://localhost:8000/api/ideas/${id}`, { withCredentials: true })
            .then(res => dispatch({ type: 'init', payload: res.data.idea }))
            .catch(error => console.log(error))
    }, [])

    function onChange(e) {
        const { name, value } = e.target
        dispatch({
            type: name,
            payload: { value }
        });
    }

    function onChangeCheckbox(e) {
        const { name, checked } = e.target
        dispatch({
            type: name,
            payload: { value: checked }
        });
    }

    function onSubmit(e) {
        e.preventDefault()
        handleSubmit(serializeState(state), dispatch)
    }

    return (
        <form onSubmit={onSubmit} className='container d-flex justify-content-between align-items-center mt-5'>
            <div className='flex-grow-1 me-2'>
                <input type='text' className='form-control' placeholder='Post something here...' name='description' onChange={onChange} value={state.description?.value || ''} />
                {state.description?.error !== null && <div className='col-12 text-danger'> {state.description?.error} </div>}
            </div>
            <button type='submit' className='btn btn-primary'>{buttonTitle}</button>
        </form>
    )
}
export default Form;