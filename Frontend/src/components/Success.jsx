import { Link, useSearchParams } from 'react-router-dom'

const Success = () => (
    <div className="success text-white">
        <p>
            Your Order has been Placed
        </p>
        <p>
            Payment ID: {useSearchParams()[0].get('ref')}
        </p>
        <Link to={'/myorders'}>
            View Orders
        </Link>
    </div>
)

export default Success