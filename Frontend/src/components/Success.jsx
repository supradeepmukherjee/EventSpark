import { Link, useSearchParams } from 'react-router-dom'

const Success = () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg max-w-md w-full text-center space-y-4">
            <p className="text-xl font-semibold">
                Your Event is now Confirmed
            </p>
            <p>
                Payment ID: {useSearchParams()[0].get('ref')}
            </p>
            <Link
                to="/customer-dashboard"
                className="inline-block mt-4 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
            >
                Go to Dashboard
            </Link>
        </div>
    </div>
)

export default Success