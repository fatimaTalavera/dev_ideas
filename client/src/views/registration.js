import SignUp from '../components/signUp'
import Login from '../components/login'
import Navbar from '../components/navbar';

const Registration = (props) => {
    const { setUser}  = props
    return (
        <>
            <Navbar title='Welcome!' />
            <div className='text-center mt-3'>
                <div className='animate-text'>
                    <h1>Enjoy your code!</h1>
                </div>
            </div>
            <div className='d-flex flex-wrap'>
                <SignUp />
                <Login/>
            </div>
        </>

    )
}
export default Registration;