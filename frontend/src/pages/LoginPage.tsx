import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FileText, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error } = await signIn(email, password);
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
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 relative overflow-hidden flex-col justify-between p-12">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600 rounded-full opacity-20 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-400 rounded-full opacity-10 blur-3xl" />
        </div>
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 bg-white/10 backdrop-blur rounded-xl flex items-center justify-center">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <span className="text-white font-bold text-xl">ResumateAI</span>
        </div>
        <div className="relative z-10">
          <blockquote className="text-white text-4xl font-bold leading-tight mb-6">
            "Your dream career starts with a single click."
          </blockquote>
          <p className="text-blue-200 text-lg leading-relaxed mb-8">
            Join thousands of professionals crafting world-class resumes with the power of artificial intelligence.
          </p>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {['bg-amber-400', 'bg-rose-400', 'bg-sky-400'].map((c, i) => (
                <div key={i} className={`w-9 h-9 rounded-full border-2 border-blue-900 ${c}`} />
              ))}
            </div>
            <span className="text-blue-200 text-sm font-medium">10k+ careers launched</span>
          </div>
        </div>
        <div className="relative z-10 flex gap-4 text-blue-300 text-sm">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 p-8">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center">
              <FileText className="w-4.5 h-4.5 text-blue-600" />
            </div>
            <span className="font-bold text-gray-900">ResumateAI</span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-1">Welcome back</h1>
          <p className="text-gray-500 mb-8">Please enter your details to sign in.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition"
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition pr-11"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <div className="text-right">
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700">Forgot password?</a>
            </div>

            <Button type="submit" size="lg" loading={loading} className="w-full text-base py-3.5">
              Sign In
            </Button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-600 font-semibold hover:text-blue-700">Sign up</Link>
          </p>

          <p className="text-center text-xs text-gray-400 mt-8">
            Protected by reCAPTCHA and subject to the Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
