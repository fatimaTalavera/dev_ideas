import {useEffect, useState} from 'react'
import axios from 'axios'
import {redirect, useNavigate} from 'react-router-dom'
import Navbar from '../components/navbar'

const UserEdit = () => {

    const [name,setName] = useState('')
    const [lastname,setLastname] = useState('')
    const [image,setImage] = useState('')
    const [alias,setAlias] = useState('')
    const [seletedFile, setSeletedFile] = useState (null);

    const navigate = useNavigate()

    

    useEffect(() => {
      axios.get('http://localhost:8000/api/user_show', {withCredentials:true})
          .then(res => {
              setName(res.data.user.name)
              setLastname(res.data.user.lastname)
              setAlias(res.data.user.alias)
              setSeletedFile( (res.data.user.imageUrl !== null && typeof res.data.user.imageUrl !== 'undefined' ) ? res.data.user.imageUrl :"../perfil.jpg");
              setImage(res.data.user.imageUrl)
          })
          .catch(error => redirect('/404'))
  }, [])

  function onFileChange(e){
    setImage(e.target.files[0]);
    const [file] = e.target.files;
    const reader = new FileReader();
    reader.onloadend = ()=> setSeletedFile(reader.result);
    reader.readAsDataURL(file);
  }


  const submitHandler = (e)=>{
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', name)
    formData.append('lastname', lastname)
    formData.append('alias', alias)
    
    if (image !== null && typeof image!== 'undefined' ) {
      formData.append('image', image)
      formData.append('imgName', image ? image.name :'' )
    
    }

    axios.put('http://localhost:8000/api/users/edit', formData, {withCredentials:true})
        .then(res=> navigate('/ideas'))
        .catch(err=> console.log(err))
}
  return (
  <>
  <Navbar title={`Hi ${name}!`} logoutBtn='true' boardBtn='true'/>
    <div className='col-12 col-md-12 '>
      <div className='col-12 col-md-10 offset-md-1 card bg-white border-1 border-dark text-dark px-5 py-5'>
        <h1 className='text-center'>{alias}</h1>
        <form className='row' onSubmit={submitHandler}>
          <div className='col-md-6'>
            {seletedFile !== null &&  <img src={seletedFile} alt ="image idea" className="img-fluid mx-3" />}
            <div className="form-group">
                <input type="file" className="form-control-file btn btn-primary mt-3 mt-4" id="image" onChange={onFileChange}/>
            </div>
          </div>
          <div className='col-md-6'>
            <label htmlFor=""  className='form-label mt-3'>First Name:</label>
            <input type="text" value={name} className='form-control' onChange={(e)=>setName(e.target.value)}/>
            <label htmlFor=""  className='form-label mt-3'>Last Name:</label>
            <input type="text" value={lastname} className='form-control' onChange={(e)=>setLastname(e.target.value)}/>
            <label htmlFor=""  className='form-label mt-3'>Alias:</label>
            <input type="text" value={alias} className='form-control' onChange={(e)=>setAlias(e.target.value)}/>  
            <div className='text-end'>
              <button className='btn btn-primary mt-3'>Edit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
    </>
  )
}
export default UserEdit