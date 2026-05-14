import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { verifyEmailApi } from '../api/auth.api';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();
  
  const [status, setStatus] = useState('loading'); // 'loading' | 'success' | 'error'
  const [message, setMessage] = useState('Verifying your email address...');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('Invalid or missing verification token.');
      return;
    }

    const verify = async () => {
      try {
        const res = await verifyEmailApi(token);
        setStatus('success');
        setMessage(res.data.message || 'Email verified successfully!');
      } catch (err) {
        setStatus('error');
        setMessage(err.response?.data?.message || 'Verification failed. The link may be expired.');
      }
    };

    verify();
  }, [token]);

  return (
    <div className="auth-layout">
      <div className="auth-card glass-card p-8 text-center animate-scaleIn">
        
        <div className="flex justify-center mb-6">
          {status === 'loading' && <Loader2 className="w-16 h-16 text-purple-500 animate-spin" />}
          {status === 'success' && <CheckCircle className="w-16 h-16 text-green-500" />}
          {status === 'error' && <XCircle className="w-16 h-16 text-red-500" />}
        </div>
        
        <h1 className="text-2xl font-bold mb-3">Email Verification</h1>
        <p className="text-gray-400 mb-8">{message}</p>

        {status === 'success' ? (
          <Link 
            to="/login"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-2.5 rounded-xl transition-colors"
          >
            Go to Login
          </Link>
        ) : status === 'error' ? (
          <Link 
            to="/login"
            className="inline-block bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] text-white font-medium px-6 py-2.5 rounded-xl transition-colors"
          >
            Back to Login
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default VerifyEmail;
