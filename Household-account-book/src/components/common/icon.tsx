import FastfoodIcon from '@mui/icons-material/Fastfood';
import PaidIcon from '@mui/icons-material/Paid';
import WorkIcon from '@mui/icons-material/Work';
import MoneyIcon from '@mui/icons-material/Money';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import EntertainmentIcon from '@mui/icons-material/SportsEsports';
import EmergencyIcon from '@mui/icons-material/Warning';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { ExpenseCategory, incomeCategory } from '../../types';

type Category = incomeCategory | ExpenseCategory; 

const getCategoryIcon = (category : Category) : JSX.Element => {
    switch (category) {
        case "給与":
            return <PaidIcon />;
        case "副収入":
            return <MoneyIcon />;
        case "お小遣い":
            return <MoneyIcon />;
        case "食費":
            return <FastfoodIcon />;
        case "日用品":
            return <AddShoppingCartIcon />;
        case "住居費":
            return <HomeIcon />;
        case "交際費":
            return <PeopleIcon />;
        case "娯楽":
            return <EntertainmentIcon />;
        case "急用":
            return <EmergencyIcon />;
        default:
            return <WorkIcon />;
  }
};

export default getCategoryIcon;
