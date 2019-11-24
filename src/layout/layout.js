import React, {Component} from 'react'
import classes from './layout.module.scss'
import Navigation from '../components/Navigation'
import Drawer from '../components/Drawer'


class Layout extends Component {
   
    state = {
        menu: false
    }

    toggleMenuHandler = () => {
        this.setState({
            menu: !this.state.menu
        })
    }

    menuCloseHandler = () => {
        this.setState({
            menu: false
        })
    }
   
    render() {
        return(
            <div className={classes.layout}>
                <Drawer 
                    isOpen={this.state.menu}
                    onClose={this.menuCloseHandler}
                />
                <Navigation 
                    onToggle={this.toggleMenuHandler}
                    isOpen={this.state.menu}
                />
                <main>
                    { this.props.children }
                </main>
            </div>
        )
    }
}

export default Layout;