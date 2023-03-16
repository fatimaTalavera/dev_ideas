import SignUp from '../components/signUp'
import Login from '../components/login'
import Navbar from '../components/navbar';

const Registration = (props) => {
    const { setUser}  = props
    return (
        <>
            <Navbar title='Welcome!' />
            <div className='d-flex flex-wrap'>
                <SignUp />
                <Login/>
            </div>
        </>

    )
}
export default Registration;