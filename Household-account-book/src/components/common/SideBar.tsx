import { Box, Divider, Drawer, ListItem, ListItemButton, Toolbar } from '@mui/material'
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import { NavLink } from 'react-router-dom';
import { CSSProperties } from 'react';

interface SideBarProps {
    drawerWidth : number,
    mobileOpen : boolean,
    handleDrawerTransitionEnd : () =>  void,
    handleDrawerClose : () =>  void,
}

interface menuItem {
    text : string,
    path : string,
    icon : React.ComponentType,
}

const SideBar = ({drawerWidth , mobileOpen , handleDrawerTransitionEnd , handleDrawerClose} : SideBarProps) => {

    const  MenuItems:menuItem[] = [
        {text : "Home" , path: "/" , icon : HomeIcon},
        {text : "Report" , path: "/report" , icon : EqualizerIcon}
    ]
    //Reactコンポーネントにcssを当てたい場合はCSSPropertiesを使う
    const baseLinkStyle: CSSProperties = {
      textDecoration: "none",
      color: "inherit",
      display: "block"
    }
    const activeLinkStyle: CSSProperties = {
      backgroundColor: "rgba(0, 0, 0, 0.08)"
    }

    // アイテムの背景色を変更する機能はNavLinkのactiveStyleプロパティを使用する
    // style属性はオブジェクトを返す必要がある。アロー関数でオブジェクトを返す場合は、
    // ()で囲む必要がある
    const getNavLink = (isActive : boolean) : CSSProperties => (
      {
          //動的に最新のcssを当てたいので、スプレット構文を使用
          // textDecoration: "none",
          // color: "inherit",
          // display: "block"
          ...baseLinkStyle,
          ...(isActive ? activeLinkStyle : {})
      }
    );

    const drawer = (
        <div>
          <Toolbar/>
          <Divider />
          <List>
            {MenuItems.map((item, index) => (
                <NavLink key={index}  to={item.path} 
                  //isActiveはリンクが現在のページに一致するかをbooleanで返すオブジェクト
                  style={({ isActive }) => getNavLink(isActive)}>
                    <ListItem key={index} disablePadding>
                        <ListItemButton >
                        <ListItemIcon >
                            {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                            <item.icon/>
                        </ListItemIcon>
                        <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                </NavLink>
            ))}
            </List>
            <Divider/>
        </div>
      );

    return (
    <Box
    component="nav"
    sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
    aria-label="mailbox folders"
  >
    <Drawer
      variant="temporary"
      open={mobileOpen}
      onTransitionEnd={handleDrawerTransitionEnd}
      onClose={handleDrawerClose}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        display: { xs: 'block', sm: 'none' },
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
      }}
    >
      {drawer}
    </Drawer>

    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', md: 'block' },
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
      }}
      open
    >
      {drawer}
    </Drawer>
  </Box>
  )
}

export default SideBar