import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Server, 
  FileText, 
  Settings, 
  MessageCircle, 
  ChevronLeft, 
  ChevronRight,
  Home,
  BarChart3,
  CreditCard,
  Users,
  Globe,
  Shield,
  Database
} from 'lucide-react';

const DashboardSidebar = ({ isCollapsed, setIsCollapsed }) => {
  const location = useLocation();

  const navigationItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: Home,
      description: 'Overview and statistics'
    },
    {
      name: 'Services',
      path: '/dashboard/services',
      icon: Server,
      description: 'Manage hosting services'
    },
    {
      name: 'Invoices',
      path: '/dashboard/invoices',
      icon: FileText,
      description: 'View and pay invoices'
    },
    {
      name: 'Profile',
      path: '/dashboard/profile',
      icon: Settings,
      description: 'Account settings'
    },
    {
      name: 'Support',
      path: '/dashboard/support',
      icon: MessageCircle,
      description: 'Get help and support'
    }
  ];

  const quickActions = [
    {
      name: 'Add Domain',
      icon: Globe,
      action: () => console.log('Add Domain clicked'),
      color: 'text-blue-600'
    },
    {
      name: 'Upgrade Plan',
      icon: BarChart3,
      action: () => console.log('Upgrade Plan clicked'),
      color: 'text-green-600'
    },
    {
      name: 'SSL Certificate',
      icon: Shield,
      action: () => console.log('SSL Certificate clicked'),
      color: 'text-purple-600'
    },
    {
      name: 'Database',
      icon: Database,
      action: () => console.log('Database clicked'),
      color: 'text-orange-600'
    }
  ];

  const isActive = (path) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className={`relative bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Server className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900 dark:text-white">HostPro</span>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <div className="space-y-2">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
                isActive(item.path)
                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 border-r-2 border-primary-500'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <item.icon className={`w-5 h-5 flex-shrink-0 ${
                isActive(item.path) ? 'text-primary-600' : 'text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300'
              }`} />
              {!isCollapsed && (
                <div className="flex-1">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {item.description}
                  </div>
                </div>
              )}
            </Link>
          ))}
        </div>
      </nav>

      {/* Quick Actions */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {quickActions.map((action) => (
              <button
                key={action.name}
                onClick={action.action}
                className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 group"
              >
                <action.icon className={`w-5 h-5 mb-1 ${action.color}`} />
                <span className="text-xs text-gray-600 dark:text-gray-400 text-center group-hover:text-gray-900 dark:group-hover:text-white">
                  {action.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Collapsed Quick Actions */}
      {isCollapsed && (
        <div className="p-2 border-t border-gray-200 dark:border-gray-700">
          <div className="space-y-2">
            {quickActions.slice(0, 4).map((action) => (
              <button
                key={action.name}
                onClick={action.action}
                className="w-full p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 group"
                title={action.name}
              >
                <action.icon className={`w-5 h-5 mx-auto ${action.color}`} />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardSidebar;
