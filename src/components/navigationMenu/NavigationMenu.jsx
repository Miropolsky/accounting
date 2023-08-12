import { NavLink } from 'react-router-dom';
import styles from './NavigationMenu.module.scss';

export default function NavigationMenu(props) {
    return (
        <div className={styles.container}>
            <div className={styles.menuItem}>
                <NavLink
                    to='/peopleList'
                    className={({ isActive }) =>
                        isActive ? styles.active : ''
                    }
                >
                    Список пользователей
                </NavLink>
            </div>
            <div className={styles.menuItem}>
                <NavLink
                    to='/'
                    className={({ isActive }) =>
                        isActive ? styles.active : ''
                    }
                >
                    Список арендованного инвентаря
                </NavLink>
            </div>
            <div className={styles.menuItem}>
                <NavLink
                    to='/inventoryList'
                    className={({ isActive }) =>
                        isActive ? styles.active : ''
                    }
                >
                    Список инвентаря
                </NavLink>
            </div>
        </div>
    );
}
