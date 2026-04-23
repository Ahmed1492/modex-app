import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is logged in on app start
  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        const userData = localStorage.getItem('userData');

        if (isLoggedIn === 'true' && userData) {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        // Clear corrupted data
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userData');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = (userData) => {
    try {
      const userInfo = {
        id: userData.id || Date.now(),
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        fullName: `${userData.firstName} ${userData.lastName}`,
        loginTime: new Date().toISOString(),
      };

      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userData', JSON.stringify(userInfo));
      setUser(userInfo);

      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Failed to save login data' };
    }
  };

  const register = (userData) => {
    try {
      // Check if user already exists
      const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const userExists = existingUsers.find(u => u.email === userData.email);

      if (userExists) {
        return { success: false, error: 'User with this email already exists' };
      }

      // Create new user
      const newUser = {
        id: Date.now(),
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        password: userData.password, // In real app, this would be hashed
        registeredAt: new Date().toISOString(),
      };

      // Save to registered users list
      existingUsers.push(newUser);
      localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));

      // Auto-login after registration
      const loginResult = login(newUser);
      return loginResult;
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'Failed to register user' };
    }
  };

  const loginWithCredentials = (email, password) => {
    try {
      const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const user = existingUsers.find(u => u.email === email && u.password === password);

      if (!user) {
        return { success: false, error: 'Invalid email or password' };
      }

      return login(user);
    } catch (error) {
      console.error('Login with credentials error:', error);
      return { success: false, error: 'Failed to login' };
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userData');
      setUser(null);
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      return { success: false, error: 'Failed to logout' };
    }
  };

  const updateProfile = (updatedData) => {
    try {
      if (!user) return { success: false, error: 'No user logged in' };

      const updatedUser = { ...user, ...updatedData };
      localStorage.setItem('userData', JSON.stringify(updatedUser));
      setUser(updatedUser);

      // Update in registered users list too
      const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const userIndex = existingUsers.findIndex(u => u.id === user.id);
      if (userIndex !== -1) {
        existingUsers[userIndex] = { ...existingUsers[userIndex], ...updatedData };
        localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));
      }

      return { success: true };
    } catch (error) {
      console.error('Update profile error:', error);
      return { success: false, error: 'Failed to update profile' };
    }
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    loginWithCredentials,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};