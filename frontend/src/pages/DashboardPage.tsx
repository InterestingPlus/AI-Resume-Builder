import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, FileText, Pencil, Trash2, Clock, Sparkles, LogOut, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useResumes } from '../hooks/useResumes';
import { Button } from '../components/ui/Button';

export function DashboardPage() {
  const { user, signOut } = useAuth();
  const { resumes, loading, deleteResume } = useResumes();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this resume? This action cannot be undone.')) return;
    setDeletingId(id);
    await deleteResume(id);
    setDeletingId(null);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const userName = user?.user_metadata?.name || user?.email?.split('@')[0] || 'User';

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-gray-900">ResumateAI</span>
          </Link>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600">
              <div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-3.5 h-3.5 text-blue-600" />
              </div>
              <span>{userName}</span>
            </div>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="w-3.5 h-3.5" />
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Resumes</h1>
            <p className="text-gray-500 text-sm mt-1">
              {resumes.length > 0 ? `${resumes.length} resume${resumes.length > 1 ? 's' : ''}` : 'No resumes yet'}
            </p>
          </div>
          <Link to="/create">
            <Button size="md">
              <Plus className="w-4 h-4" />
              Create New Resume
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
                <div className="h-3 bg-gray-100 rounded w-1/2 mb-6" />
                <div className="h-24 bg-gray-100 rounded-lg mb-4" />
                <div className="flex gap-2">
                  <div className="h-8 bg-gray-100 rounded-lg flex-1" />
                  <div className="h-8 bg-gray-100 rounded-lg w-8" />
                </div>
              </div>
            ))}
          </div>
        ) : resumes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
              <FileText className="w-10 h-10 text-blue-300" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No resumes yet</h3>
            <p className="text-gray-400 max-w-sm mb-8">
              Create your first AI-powered resume in minutes. Just describe your experience and let AI do the rest.
            </p>
            <Link to="/create">
              <Button size="lg">
                <Plus className="w-5 h-5" />
                Create Your First Resume
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map(resume => (
              <div key={resume.id} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-all duration-200 group">
                {/* Resume Preview Mock */}
                <div className="bg-gray-50 rounded-xl p-4 mb-5 border border-gray-100 h-28 overflow-hidden relative">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-gray-300" />
                    <div>
                      <div className="h-2 w-20 bg-gray-700 rounded" />
                      <div className="h-1.5 w-14 bg-blue-200 rounded mt-1" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="h-1.5 w-full bg-gray-200 rounded" />
                    <div className="h-1.5 w-4/5 bg-gray-200 rounded" />
                    <div className="h-1.5 w-3/5 bg-gray-200 rounded" />
                  </div>
                  {resume.ai_generated && (
                    <div className="absolute top-2 right-2 flex items-center gap-1 bg-blue-50 text-blue-600 text-xs font-medium px-1.5 py-0.5 rounded-full">
                      <Sparkles className="w-2.5 h-2.5" />
                      AI
                    </div>
                  )}
                </div>

                <h3 className="font-semibold text-gray-900 mb-1 truncate">{resume.title}</h3>
                {resume.personal_info?.name && (
                  <p className="text-xs text-gray-400 mb-1">{resume.personal_info.name}</p>
                )}
                <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-5">
                  <Clock className="w-3 h-3" />
                  {formatDate(resume.updated_at)}
                </div>

                <div className="flex gap-2">
                  <Link to={`/editor/${resume.id}`} className="flex-1">
                    <Button variant="primary" size="sm" className="w-full">
                      <Pencil className="w-3.5 h-3.5" />
                      Edit
                    </Button>
                  </Link>
                  <Link to={`/preview/${resume.id}`}>
                    <Button variant="outline" size="sm">
                      Preview
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(resume.id)}
                    loading={deletingId === resume.id}
                    className="text-red-400 hover:text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            ))}

            {/* Add New Card */}
            <Link to="/create">
              <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-6 flex flex-col items-center justify-center h-full min-h-[200px] hover:border-blue-300 hover:bg-blue-50/30 transition-all duration-200 cursor-pointer group">
                <div className="w-12 h-12 bg-gray-100 group-hover:bg-blue-100 rounded-xl flex items-center justify-center mb-3 transition-colors">
                  <Plus className="w-6 h-6 text-gray-400 group-hover:text-blue-500 transition-colors" />
                </div>
                <p className="font-medium text-gray-400 group-hover:text-blue-500 transition-colors text-sm">New Resume</p>
              </div>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
