import React, { Component,Fragment } from 'react'
import { Responsive, Button, Menu,Header,Icon} from 'semantic-ui-react'
import {NavLink,Link} from "react-router-dom"
import {useSelector} from "react-redux"
import "./Navbar.css"
function NavbarDesktop() {
    const { is_Auth } = useSelector(state => state)
    return (
      <Fragment>
        <Menu borderless inverted secondary fixed="top">
    
          <Menu.Item>
              <Header as={Link} to="/">Snappy</Header>
          </Menu.Item>
          <Menu.Menu position='right'>
              <Menu.Item
              content='Home'
              as={NavLink} to="/" exact
              />
              <Menu.Item
              content='Services'
              as={NavLink} to="/service" exact
              />
              <Menu.Item
                content="Pro worker"
                as={NavLink} to="/pro-worker" exact
              />
              <Menu.Item
                content="Customer"
                as={NavLink} to="/customer" exact
              />
          </Menu.Menu>
          <Menu.Menu position='right'>
            <Menu.Item>
                <Button.Group>
                  <Button color="orange" as={NavLink} to="/hire" exact><Icon name="user" /> Hire </Button>
                  <Button.Or />
                  <Button color="blue"as={NavLink} to={ is_Auth["is_Logged"] ? "/profile" : "/join-as" } exact positive>
                    { is_Auth["is_Logged"] ? " Profile " : " Join " }
                    <Icon name= { is_Auth["is_Logged"] ? "arrow right" : "arrow right" } />
                    </Button>
                </Button.Group>
            </Menu.Item>
          </Menu.Menu>
        
      
        </Menu>
      </Fragment>
    )
  }

function NavbarMobile(props) {
 const {handleToggle,toggle} = props
 const { is_Auth } = useSelector(state => state)
  return(
    <Menu borderless inverted secondary fixed="top">
            <Menu.Item onClick={handleToggle} id="toggler-container">
               <Icon name="sidebar" size="large" />
                <Header>Snappy</Header>
              </Menu.Item>
              <div className={ toggle ? "sidebar-show" : "sidebar-hidden"}>
                <Menu.Menu>
                  <Menu.Item id="sidebar-toggler">
                    <Header as={Link} to="/">Snappy</Header>
                    <Icon onClick={handleToggle}  name="close" inverted size="big" />
                  </Menu.Item>
                </Menu.Menu>
                <div style={{height:"1px",background:"yellow"}}/>
                <Menu.Menu position='right' className="sidebar-navlinks" >
                    <Menu.Item onClick={handleToggle}
                    content='Home'
                    as={NavLink} to="/" exact
                    />
                    <Menu.Item onClick={handleToggle}
                    content='Services'
                    as={NavLink} to="/service" exact
                    />
                    <Menu.Item onClick={handleToggle}
                    content="Pro worker"
                    as={NavLink} to="/pro-worker" exact
                    />
                    <Menu.Item onClick={handleToggle}
                    content="Customer"
                    as={NavLink} to="/customer" exact
                    />
                  </Menu.Menu>
                  <Menu.Menu className="btn-group">
                    <Menu.Item >
                        <Button.Group size="huge">
                          <Button color="orange" as={NavLink} to="/hire" 
                            onClick={handleToggle}exact>
                            <Icon name="user" />
                            Hire 
                          </Button>
                          <Button.Or />
                          <Button color="blue" as={NavLink} to={ is_Auth["is_Logged"] ? "/profile" : "/join-as" }
                            onClick={handleToggle} exact positive >
                            { is_Auth["is_Logged"] ? "Profile" : "Join" }
                            <Icon name="arrow right" />
                          </Button>
                        </Button.Group>
                    </Menu.Item>
                    </Menu.Menu>
            </div>
          </Menu>
  )
}

export default class Navbar extends Component{
  state = {
    toggle : false
  }
  handleToggle = () => {
    this.setState(prevState => {
      return { toggle: !prevState.toggle }
    })
  }
    render(){
      return (
         <nav className="navbar-container">
          <Responsive className="navbar" minWidth ={Responsive.onlyTablet.maxWidth + 1}>
            <NavbarDesktop />
          </Responsive>
          <Responsive className="navbar" maxWidth ={Responsive.onlyTablet.maxWidth}>
            <NavbarMobile toggle={this.state.toggle} handleToggle = {this.handleToggle}/>
          </Responsive>
        </nav>
    )
    }
}

