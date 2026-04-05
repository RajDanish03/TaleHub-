import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { BlogContext } from '../Context/BlogContext'
import toast from 'react-hot-toast'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'My Stories', href: '/my-stories' }, // Replaced Projects
  { name: 'Create Blog', href: '/create' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function NavBar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useContext(BlogContext)

  const handleLogout = () => {
    logout()
    toast.success("Logged out successfully!")
    navigate('/login')
  }

  return (
    <Disclosure as="nav" className="bg-white border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          
          {/* Mobile menu button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:outline-none">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
          
          {/* Brand & Desktop Links */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <Link to="/" className="text-xl font-bold tracking-tight text-gray-900">
                Blog<span className="text-indigo-600">Page</span>
              </Link>
            </div>

            <div className="hidden sm:ml-8 sm:block">
              <div className="flex space-x-4">
                {navigation
                  .filter(item => {
                    const authRequired = ['Create Blog', 'My Stories'];
                    if (authRequired.includes(item.name) && !user) return false;
                    return true;
                  })
                  .map((item) => {
                  const isCurrent = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={classNames(
                        isCurrent ? 'text-indigo-600 font-semibold' : 'text-gray-600 hover:text-indigo-600',
                        'px-3 py-2 text-sm font-medium transition-colors'
                      )}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Side Auth: Hidden on Mobile */}
          <div className="hidden sm:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center gap-2 bg-indigo-50 px-3 py-1.5 rounded-full">
                   <UserCircleIcon className="size-6 text-indigo-600" />
                   <span className="text-sm font-semibold text-indigo-900">{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-gray-500 hover:text-red-600 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-500 transition shadow-sm"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel: Now includes Auth Links */}
      <DisclosurePanel className="sm:hidden bg-white border-t border-gray-100">
        <div className="space-y-1 px-4 pt-2 pb-3">
          {navigation
            .filter(item => {
               const authRequired = ['Create Blog', 'My Stories'];
               if (authRequired.includes(item.name) && !user) return false;
               return true;
            })
            .map((item) => {
            const isCurrent = location.pathname === item.href;
            return (
              <DisclosureButton
                key={item.name}
                as={Link}
                to={item.href}
                className={classNames(
                  isCurrent ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50 hover:text-indigo-600',
                  'block rounded-md px-3 py-2 text-base font-medium'
                )}
              >
                {item.name}
              </DisclosureButton>
            );
          })}
          
          {/* Mobile Auth Links (Login/Signup inside the toggle) */}
          <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
            {user ? (
               <>
                 <div className="flex items-center px-3 py-2 text-base font-medium text-indigo-600">
                    <UserCircleIcon className="size-6 mr-2" /> {user.name}
                 </div>
                 <button onClick={handleLogout} className="block w-full text-left px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-red-600">
                   Logout
                 </button>
               </>
            ) : (
               <>
                  <DisclosureButton as={Link} to="/login" className="block w-full text-center px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-50">
                    Login
                  </DisclosureButton>
                  <DisclosureButton as={Link} to="/signup" className="block w-full text-center px-3 py-2 text-base font-medium bg-indigo-600 text-white rounded-md">
                    Sign up
                  </DisclosureButton>
               </>
            )}
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}