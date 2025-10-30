import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { userService } from '../services/api';

export function ProfilePage() {
  const { user, updateUser, logout } = useAuth();
  const navigate = useNavigate();
  
  const [newName, setNewName] = useState(user?.name || '');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState('');

  // Atualiza perfil
  const saveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setFeedbackMsg('');

    try {
      const updatedUser = await userService.updateProfile({ name: newName });
      
      updateUser(updatedUser);
      
      setFeedbackMsg('✅ Profile updated successfully!');
      setIsEditing(false);
      
      // Remove msg
      setTimeout(() => setFeedbackMsg(''), 3000);
    } catch (error) {
      setFeedbackMsg('❌ Failed to save changes');
    } finally {
      setIsSaving(false);
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setNewName(user?.name || '');
    setFeedbackMsg('');
  };

  // Coloca a primeira letra do nome para o avatar
  const initial = user?.name.charAt(0).toUpperCase() || '?';

  return (
    <div className="min-h-screen bg-gray-100">
      
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/chat')}
            className="text-blue-600 hover:underline font-medium"
          >
            ← Voltar para o Chat
          </button>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Sair
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-2xl mx-auto p-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          
          {/* Avatar and basic info */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl text-white font-bold">
              {initial}
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-1">
              {user?.name}
            </h1>
            <p className="text-gray-600">{user?.email}</p>
          </div>

          {/* Para isualizacao e edicao */}
          {feedbackMsg && (
            <div className={`mb-4 px-4 py-3 rounded-lg text-center ${
              feedbackMsg.includes('✅')
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}>
              {feedbackMsg}
            </div>
          )}

          {/* Edit mode or view mode */}
          {isEditing ? (
            <form onSubmit={saveProfile} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Seu Nome
                </label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your name"
                  required
                  minLength={3}
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex-1 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 disabled:opacity-50"
                >
                  {isSaving ? 'Saving...' : '💾 Save Changes'}
                </button>
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="flex-1 bg-gray-300 text-gray-800 py-3 rounded-lg hover:bg-gray-400"
                >
                   Cancelar
                </button>
              </div>
            </form>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 font-medium"
            >
               Editar Perfl
            </button>
          )}

          {/* Informacoes adicionais */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-bold text-gray-800 mb-3">📋 Account Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Email:</span>
                <span className="font-medium">{user?.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Member since:</span>
                <span className="font-medium">
                  {new Date(user?.createdAt || '').toLocaleDateString('en-US')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
