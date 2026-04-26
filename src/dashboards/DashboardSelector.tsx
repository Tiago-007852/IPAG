import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../context/AuthContext';
import { motion } from 'motion/react';
import StudentDashboard from './StudentDashboard';
import TeacherDashboard from './TeacherDashboard';
import ParentDashboard from './ParentDashboard';

export default function DashboardSelector() {
  const { user, loading } = useAuth();
  const [role, setRole] = useState<string | null>(null);
  const [fetchingRole, setFetchingRole] = useState(true);

  useEffect(() => {
    async function fetchUserRole() {
      if (!user) {
        setFetchingRole(false);
        return;
      }
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setRole(userDoc.data().role);
        } else {
          setRole('STUDENT'); // Default
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      } finally {
        setFetchingRole(false);
      }
    }
    fetchUserRole();
  }, [user]);

  if (loading || fetchingRole) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-10 h-10 border-4 border-brand-blue border-t-transparent rounded-full" 
        />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  switch (role) {
    case 'TEACHER':
      return <TeacherDashboard user={user} />;
    case 'PARENT':
      return <ParentDashboard user={user} />;
    case 'ADMIN':
      return <TeacherDashboard user={user} />;
    case 'STUDENT':
    default:
      return <StudentDashboard user={user} />;
  }
}
