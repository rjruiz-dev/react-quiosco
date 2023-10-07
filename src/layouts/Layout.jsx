import { Outlet } from 'react-router-dom' // Para visualizar el hijo

export default function Layout() {
    return (
        <div>
            Layout
            <Outlet />
        </div>
    )
}
