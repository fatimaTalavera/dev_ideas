import { Link } from 'react-router-dom'

const Page404 = (props) => {
    return (
        <div className='container text-center mt-5'>
            <h1>404</h1>
            <h3>We're sorry, but we couldn't find the resource you're looking for. Do you want to add this resource to our database?</h3>
            <Link to={'/ideas'} className='mx-1 btn btn-primary'>Go to Home</Link>
        </div>
    )
}
export default Page404;