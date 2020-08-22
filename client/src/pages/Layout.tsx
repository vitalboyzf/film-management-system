import React from 'react'
import { NavLink, Route } from 'react-router-dom'
import Home from './Home'
import AddMovie from './AddMovie'
import EditMovie from './EditMovie'
import MovieList from './MovieList'
import { Layout, Menu } from 'antd'
const { Header, Content, Sider } = Layout;
const LayoutMain: React.FC = function () {
  return (
    <div style={{
      position: "fixed",
      height: "100%",
      width: "100%",
      display: "flex"
    }}>
      <Layout>
        <Header>
          <NavLink to="/">电影后台管理系统</NavLink>
        </Header>
        <Layout>
          <Sider>
            <Menu
              theme={"dark"}
              mode="inline"
            >
              <Menu.Item>
                <NavLink to="/movie" >电影列表</NavLink>
              </Menu.Item>
              <Menu.Item >
                <NavLink to="/movie/add" >添加电影</NavLink>
              </Menu.Item>
            </Menu>
          </Sider>
          <Content style={{ padding: "20px" }}>
            <Route exact path="/" component={Home} />
            <Route exact path="/movie" component={MovieList} />
            <Route path="/movie/add" component={AddMovie} />
            <Route path="/movie/edit/:id" component={EditMovie} />
          </Content>
        </Layout>
      </Layout>
      <div>
      </div>
    </div >
  )
}
export default LayoutMain;
