import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FileText, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';

export function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    setError('');
    setLoading(true);
    const { error } = await signUp(email, password, name);
    if (error) {
      setError(error);
      setLoading(false);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-100 flex-col justify-center items-center p-12 relative overflow-hidden">
        <div className="w-full max-w-sm">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-3">Build your dream resume in minutes.</h2>
          <p className="text-gray-500 text-lg mb-10">
            Join thousands of professionals landing jobs faster with our AI-powered templates.
          </p>
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-gray-200" />
              <div className="flex-1">
                <div className="h-4 w-40 bg-gray-800 rounded mb-2" />
                <div className="h-3 w-28 bg-blue-200 rounded" />
              </div>
              <div className="flex items-center gap-1.5 bg-green-50 text-green-700 text-xs font-semibold px-2.5 py-1.5 rounded-full border border-green-200 whitespace-nowrap">
                <CheckCircle className="w-3 h-3" />
                ATS Friendly
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-2.5 bg-gray-200 rounded w-full" />
              <div className="h-2.5 bg-gray-200 rounded w-5/6" />
              <div className="h-2.5 bg-gray-200 rounded w-4/5" />
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <div className="h-2 bg-blue-100 rounded w-full" />
                  <div className="h-2 bg-gray-100 rounded w-4/5" />
                  <div className="h-2 bg-gray-100 rounded w-3/4" />
                  <div className="h-2 bg-gray-100 rounded w-full" />
                </div>
                <div className="space-y-2">
                  <div className="h-2 bg-blue-100 rounded w-full" />
                  <div className="h-2 bg-gray-100 rounded w-5/6" />
                  <div className="h-2 bg-gray-100 rounded w-full" />
                  <div className="h-2 bg-gray-100 rounded w-4/5" />
                </div>
              </div>
              <div className="mt-2 space-y-2">
                <div className="h-2 bg-gray-100 rounded w-3/4" />
                <div className="h-2 bg-gray-100 rounded w-full" />
                <div className="h-2 bg-gray-100 rounded w-5/6" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-11 h-11 bg-blue-600 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="font-extrabold text-gray-900 text-xl">ResumateAI</span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-1">Get started free</h1>
          <p className="text-gray-400 text-sm mb-8">No credit card required.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition"
            />

            <input
              type="email"
              placeholder="Work Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition"
            />

            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                minLength={8}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition"
              />
              <p className="text-xs text-gray-400 text-right mt-1">Min 8 chars</p>
            </div>

            <Button type="submit" size="lg" loading={loading} className="w-full text-base py-3.5">
              Create Account
            </Button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-5">
            By clicking "Create Account", you agree to our{' '}
            <a href="#" className="text-blue-600 hover:underline">Terms</a> and{' '}
            <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
          </p>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 font-bold hover:text-blue-700">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
