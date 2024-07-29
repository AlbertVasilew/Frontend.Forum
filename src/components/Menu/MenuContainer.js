import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import CategoryContext from '../../contexts/CategoryContext';
import MenuContext from '../../contexts/MenuContext';
import AuthContext from '../../contexts/AuthContext';

import Menu from './Menu';
import menuItems from './helpers/menu-items';

const MenuContainer = () => {
    const [menus, setMenus] = useState(menuItems);
    const [categoriesMenus, setCategoriesMenus] = useState([]);
    const [manageCategoryDialog, setManageCategoryDialog] = useState();

    const categoryContext = useContext(CategoryContext);
    const menuContext = useContext(MenuContext);
    const authContext = useContext(AuthContext);

    const { pathname } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        setCategoriesMenus(categoryContext.categories
            .map(category => ({ ...category, path: `/category/${category.id}` })));
    }, [categoryContext.categories])

    useEffect(() => {
        setMenus(menus => menus
            .map(menu => ({...menu, count: menuContext.counters[menu.name.toLowerCase()]})));
    }, [menuContext.counters]);

    const isActive = path => path === pathname;

    return (
        <Menu
            menus={menus}
            navigate={navigate}
            categoriesMenus={categoriesMenus}
            user={authContext.user}
            setUser={authContext.setUser}
            isActive={isActive}
            manageCategoryDialog={manageCategoryDialog}
            setManageCategoryDialog={setManageCategoryDialog}
        />
    )
}

export default MenuContainer;