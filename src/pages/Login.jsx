import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Mail, Lock } from 'lucide-react';
import toast from 'react-hot-toast';
import { LoginForm } from '../components/login/LoginForm';
import { useLoginMutation } from '../store/api/authApiSlice';
import { setCredentials } from '../store/slices/authSlice';

const Login = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleQuickLogin = (email, password) => {
    setValue('email', email, { shouldValidate: true });
    setValue('password', password, { shouldValidate: true });
    onSubmit({ email, password });
  };

  const onSubmit = async (data) => {
    try {
      const response = await login(data).unwrap();
      const user = response?.data?.user;
      const token = response?.data?.accessToken;

      if (user) {
        dispatch(setCredentials({ user, token }));
        toast.success(`Welcome back, ${user.name}!`);
        if (user.role === 'admin' || user.role === 'super_admin') {
          navigate('/admin/dashboard');
        } else if (user.role === 'employer') {
          navigate('/employer/dashboard');
        } else {
          navigate('/dashboard');
        }
      }
    } catch (err) {
      const apiErrorMsg =
        err?.data?.message ||
        (Array.isArray(err?.data?.errors) && err.data.errors[0]) ||
        err?.error ||
        'Invalid email or password.';
      toast.error(apiErrorMsg);
    }
  };

  return (
    <LoginForm>
      <LoginForm.LeftBanner />
      <LoginForm.RightPanel>
        <LoginForm.Header />

        {/* Quick Demo Credentials Bar */}
        <div className="mb-4 p-2.5 rounded-2xl bg-slate-50 border border-slate-200/80">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 mb-1.5 px-0.5">
            <span>⚡ One-Click Demo Access</span>
            <span className="text-blue-600 font-semibold">Live Database</span>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            <button
              type="button"
              disabled={isLoading}
              onClick={() => handleQuickLogin('obaid@example.com', 'password123')}
              className="py-1.5 px-2 rounded-xl bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 text-[11px] font-bold transition-all shadow-2xs text-center cursor-pointer disabled:opacity-50"
            >
              🎓 Candidate
            </button>
            <button
              type="button"
              disabled={isLoading}
              onClick={() => handleQuickLogin('recruiter@techlogix.com', 'password123')}
              className="py-1.5 px-2 rounded-xl bg-white hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 border border-slate-200 text-[11px] font-bold transition-all shadow-2xs text-center cursor-pointer disabled:opacity-50"
            >
              🏢 Employer
            </button>
            <button
              type="button"
              disabled={isLoading}
              onClick={() => handleQuickLogin('admin@gmail.com', 'password123')}
              className="py-1.5 px-2 rounded-xl bg-white hover:bg-purple-50 text-slate-700 hover:text-purple-700 border border-slate-200 text-[11px] font-bold transition-all shadow-2xs text-center cursor-pointer disabled:opacity-50"
            >
              🛡️ Admin
            </button>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 2xl:space-y-5">
          <LoginForm.Field
            label="Email Address"
            icon={Mail}
            type="email"
            placeholder="your.email@example.com"
            registration={register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            error={errors.email?.message}
            autoComplete="email"
          />

          <LoginForm.Field
            label="Password"
            icon={Lock}
            type="password"
            placeholder="Enter your password"
            registration={register('password', {
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters',
              },
            })}
            error={errors.password?.message}
            autoComplete="current-password"
          />

          <LoginForm.Submit loading={isLoading} />
        </form>

        <LoginForm.Footer>
          <span>Don't have an account?</span>
          <Link
            to="/register"
            className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            Create an account
          </Link>
        </LoginForm.Footer>
      </LoginForm.RightPanel>
    </LoginForm>
  );
};

export default Login;

