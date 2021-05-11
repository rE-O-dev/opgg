import Header from './header';

import './layout.scss';
const Layout = (props: {children: JSX.Element}) => {

    return (
        <div className="layout">
            <Header />
            {props.children}
        </div>
    )
}


export default Layout;