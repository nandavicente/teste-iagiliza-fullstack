import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthPage } from './pages/AuthPage';
import { ChatPage } from './pages/ChatPage';
import { ProfilePage } from './pages/ProfilePage';

function App() {
  return (
    // Wrap everything with AuthProvider so all components can access auth
    <AuthProvider>
      {/* BrowserRouter enables routing in our app */}
      <BrowserRouter>
        <Routes>
          {/* Public route - anyone can access */}
          <Route path="/auth" element={<AuthPage />} />
          
          {/* Protected routes - need to be logged in */}
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <ChatPage />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          
          {/* Default route - redirect to chat */}
          <Route path="/" element={<Navigate to="/chat" replace />} />
          
          {/* 404 - redirect to chat if route doesn't exist */}
          <Route path="*" element={<Navigate to="/chat" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
