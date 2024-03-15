import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { ProtectedRoute } from './components/index.js'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import AllPost from './pages/AllPost.jsx';
import AddPost from './pages/AddPost.jsx'
import EditPost from './pages/EditPost.jsx'
import Post from './pages/Post.jsx'
import Home from './pages/Home.jsx'


const router = createBrowserRouter([{
  path: "/",
  element: <App />,
  children: [
    {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: (
      <ProtectedRoute authentication={false} >
        <Login />
      </ProtectedRoute>
    ),
  },
  {
    path: "/signup",
    element: (
      <ProtectedRoute authentication={false}>
        <Signup />
      </ProtectedRoute>
    ),
  },
  {
    path: "/all-posts",
    element: (
      <ProtectedRoute authentication>
        {" "}
        <AllPost />
      </ProtectedRoute>
    ),
  },
  {
    path: "/add-post",
    element: (
      <ProtectedRoute authentication>
        {" "}
        <AddPost />
      </ProtectedRoute>
    ),
  },
  {
    path: "/edit-post/:slug",
    element: (
      <ProtectedRoute authentication>
        {" "}
        <EditPost />
      </ProtectedRoute>
    ),
  },
  {
    path: "/post/:slug",
    element: <Post />,
  },
  ]
}])

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store} >
    <RouterProvider router={router} />
  </Provider>
)
