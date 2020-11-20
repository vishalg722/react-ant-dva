import styles from './index.css';
import 'antd/dist/antd.css';
import { Layout, Menu } from 'antd';
import logo from '../assets/altran-logo-wine.png';
import Link from 'umi/link';


const { Header, Content } = Layout;
function BasicLayout(props) {
  let pathName = props.location.pathname;
  let headerText;
  if(pathName === '/') {
    headerText = 'Home'
  }
  else {
    headerText = pathName.replace(/(\\|\/)/g,'');
    headerText = headerText.charAt(0).toUpperCase() + headerText.slice(1)
  }

  return (
    <div className={styles.normal}>
      <Header>
        <div className="logo" >
        </div>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="logo"><Link to="/"><img className="logo" src={logo} height="50px" /></Link></Menu.Item>
          <Menu.Item key="home"><Link to="/">Home</Link></Menu.Item>
          <Menu.Item key="user"><Link to="/posts">Posts</Link></Menu.Item>
        </Menu>
      </Header>
      <Content>
        <h1 className={styles.title}>{` Welcome to ${headerText}` }</h1>
        {props.children}
      </Content>
      <footer className ={styles.footer} theme="dark">
        Footer content
      </footer>
    </div>
  );
}

export default BasicLayout;
