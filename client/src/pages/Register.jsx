import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import SEO from '../components/common/SEO';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { registerUser } from '../store/authSlice';

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading } = useAppSelector((s) => s.auth);
  const { register, handleSubmit } = useForm();

  const onSubmit = async (values) => {
    try {
      await dispatch(registerUser(values)).unwrap();
      toast.success('Account created');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <>
      <SEO title="Register" />
      <section className="section-padding">
        <div className="container-wide mx-auto max-w-md">
          <div className="glass rounded-3xl p-8">
            <h1 className="font-display text-3xl font-semibold">Create your student account</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
              <input
                placeholder="Full name"
                {...register('name', { required: true })}
                className="w-full rounded-xl border border-slate-200 bg-white/80 px-3 py-2.5 text-sm outline-none"
              />
              <input
                type="email"
                placeholder="Email"
                {...register('email', { required: true })}
                className="w-full rounded-xl border border-slate-200 bg-white/80 px-3 py-2.5 text-sm outline-none"
              />
              <input
                placeholder="Phone (optional)"
                {...register('phone')}
                className="w-full rounded-xl border border-slate-200 bg-white/80 px-3 py-2.5 text-sm outline-none"
              />
              <input
                type="password"
                placeholder="Password (min 6 characters)"
                {...register('password', { required: true, minLength: 6 })}
                className="w-full rounded-xl border border-slate-200 bg-white/80 px-3 py-2.5 text-sm outline-none"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-ink-900 py-3 text-sm font-semibold text-white"
              >
                {loading ? 'Creating…' : 'Register'}
              </button>
            </form>
            <p className="mt-4 text-center text-sm text-ink-500">
              Already registered?{' '}
              <Link to="/login" className="font-semibold text-brand-600">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
