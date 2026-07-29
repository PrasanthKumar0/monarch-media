import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import SEO from '../components/common/SEO';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { loginUser } from '../store/authSlice';

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading } = useAppSelector((s) => s.auth);
  const { register, handleSubmit } = useForm();

  const onSubmit = async (values) => {
    try {
      const result = await dispatch(loginUser(values)).unwrap();
      toast.success(`Welcome back, ${result.user.name}`);
      navigate(result.user.role === 'admin' ? '/admin' : '/dashboard');
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <>
      <SEO title="Login" />
      <section className="section-padding">
        <div className="container-wide mx-auto max-w-md">
          <div className="glass rounded-3xl p-8">
            <h1 className="font-display text-3xl font-semibold">Welcome back</h1>
            <p className="mt-2 text-sm text-ink-500">Access your applications and counselor updates.</p>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
              <input
                type="email"
                placeholder="Email"
                {...register('email', { required: true })}
                className="w-full rounded-xl border border-slate-200 bg-white/80 px-3 py-2.5 text-sm outline-none"
              />
              <input
                type="password"
                placeholder="Password"
                {...register('password', { required: true })}
                className="w-full rounded-xl border border-slate-200 bg-white/80 px-3 py-2.5 text-sm outline-none"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-brand-600 py-3 text-sm font-semibold text-white"
              >
                {loading ? 'Signing in…' : 'Sign in'}
              </button>
            </form>
            <p className="mt-4 text-center text-sm text-ink-500">
              New here?{' '}
              <Link to="/register" className="font-semibold text-brand-600">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
