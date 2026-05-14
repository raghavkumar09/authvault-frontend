import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { forgotPasswordApi } from '../api/auth.api';

const schema = yup.object({
  email: yup.string().email('Invalid email address').required('Email is required'),
}).required();

const ForgotPassword = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await forgotPasswordApi(data.email);
      setIsSubmitted(true);
    } catch (err) {
      // Backend returns 200 even if email doesn't exist, so we rarely hit this unless network issue
      setIsSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-layout">
      <div className="auth-card glass-card p-8 animate-slideUp">
        
        {!isSubmitted ? (
          <>
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold mb-2">Reset Password</h1>
              <p className="text-gray-400">Enter your email and we'll send you a reset link</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
              <Input
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                icon={Mail}
                error={errors.email?.message}
                {...register('email')}
              />
              
              <Button type="submit" isLoading={loading}>
                Send Reset Link
              </Button>
            </form>
          </>
        ) : (
          <div className="text-center animate-fadeIn py-4">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-3">Check Your Email</h2>
            <p className="text-gray-400 mb-8">
              If an account exists with that email, we have sent a password reset link.
            </p>
          </div>
        )}

        <div className="mt-8 text-center">
          <Link to="/login" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
            <ArrowLeft size={16} /> Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
