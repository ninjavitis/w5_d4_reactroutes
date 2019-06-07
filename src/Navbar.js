import React from 'react';
import {Menu, Icon} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

const Navbar = () => (
<Menu>
  <Menu.Item>
    <Link to="/">
      <Icon name="home"/>
    </Link>
  </Menu.Item>
  <Menu.Item>
    <Link to="/About">
      About
    </Link>
  </Menu.Item>
</Menu>

)

export default Navbar