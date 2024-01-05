import { useEffect, useState, useMemo, useCallback } from 'react'
import { Home, FileText, CheckCircle, Mail, User, Circle, Copy, AlertTriangle, MessageCircle, List, Folder, Flag } from 'react-feather'
import { useSelector } from 'react-redux'

const dynamicMenus = () => {
  const userData = useSelector(state => state.auth.userData)
  const userRole = useMemo(() => { return userData?.role }, [userData?.role])
  const [Menus, setMenus] = useState([
    {
      id: 'home',
      title: 'Home',
      titleKey: 'menu.home',
      icon: <Home size={20} />,
      navLink: '/home'
    },
    {
      id: 'libraries',
      title: 'Libraries',
      titleKey: 'menu.libraries',
      icon: <Folder size={20} />,
      navLink: "/libraries"
    },
    {
      id: 'postApp',
      title: 'Posts',
      titleKey: 'menu.posts',
      icon: <FileText size={20} />,
      children: [
        {
          id: 'postList',
          title: 'List',
          titleKey: 'menu.list',
          icon: <CheckCircle size={12} />,
          navLink: '/post/list'
        },
        {
          id: 'postAdd',
          title: 'Add',
          titleKey: 'menu.add',
          icon: <CheckCircle size={12} />,
          navLink: '/post/add'
        }
      ]
    },
    {
      id: 'Comments',
      title: 'Comments',
      titleKey: 'menu.comments',
      icon: <MessageCircle size={20} />,
      children: [
        {
          id: 'CommentList',
          title: 'List',
          titleKey: 'menu.list',
          icon: <Circle size={12} />,
          navLink: '/comments/list'
        },
        {
          id: 'CommentsBlock',
          title: 'Blocked Comments',
          titleKey: 'menu.blocked_comments',
          icon: <Circle size={12} />,
          navLink: '/comments/blocked/list'
        }
      ]
    }
  ])
  const checkRole = useCallback(() => {
    if (userRole === "Administrator") {
      const adminMenus = [
        {
          id: 'pageApp',
          title: 'Pages',
          titleKey: 'menu.page',
          icon: <FileText size={20} />,
          children: [
            {
              id: 'pageList',
              title: 'List',
              titleKey: 'menu.list',
              icon: <CheckCircle size={12} />,
              navLink: '/page/list'
            },
            {
              id: 'pageAdd',
              title: 'Add',
              titleKey: 'menu.add',
              icon: <CheckCircle size={12} />,
              navLink: '/page/add'
            }
          ]
        },
        {
          id: 'users',
          title: 'Users',
          titleKey: 'menu.users',
          icon: <User size={20} />,
          children: [
            {
              id: 'list',
              title: 'List',
              titleKey: 'menu.list',
              icon: <Circle size={12} />,
              navLink: '/user/list'
            }
          ]
        },
        {
          id: 'categories',
          title: 'Categories',
          titleKey: 'menu.categories',
          icon: <Copy size={20} />,
          navLink: "/categories"
        },
        {
          id: 'menus',
          title: 'Menus',
          titleKey: 'menu.menus',
          icon: <Copy size={20} />,
          navLink: "/menus"
        },
        {
          id: 'errors',
          title: 'Errors',
          titleKey: 'menu.errors',
          icon: <AlertTriangle size={20} />,
          navLink: "/errors/list"
        },
        {
          id: 'reports',
          title: 'Reports',
          titleKey: 'menu.reports',
          icon: <Flag size={20} />,
          navLink: "/reports/list"
        },
        {
          id: 'scrapperApp',
          title: 'Scrappers',
          titleKey: 'menu.scrappers',
          icon: <FileText size={20} />,
          children: [
            {
              id: 'scrapperList',
              title: 'List',
              titleKey: 'menu.list',
              icon: <CheckCircle size={12} />,
              navLink: '/scrapper/list'
            }
          ]
        }
      ]
      setMenus((prevState) => { return [...prevState, ...adminMenus] })
    }
  }, [userRole])

  useEffect(() => {
    checkRole()
  }, [userRole])

  return { Menus }
}

export default dynamicMenus
