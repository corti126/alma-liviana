import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar.jsx';
import './AdminLayout.css';

export default function AdminLayout() {
  return (
    <div className="admin-layout">
      <Sidebar />
      <main className="admin-layout__content">
        <Outlet />
      </main>
    </div>
  );
}
