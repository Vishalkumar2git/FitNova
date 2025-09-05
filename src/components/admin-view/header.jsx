import { Button } from "@mui/material";
import ArticleIcon from '@mui/icons-material/Article';
import { Logout } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { logout} from "../../store/auth-slice";

export default function AdminHeader({setOpen}) {
  const dispatch = useDispatch();
  function handleLogout (){
    dispatch(logout())
  }
  return (
    <header className="admin-header">
      <Button onClick={()=> setOpen(true)} className="menu-toggle">
        <ArticleIcon />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="logout-container">
        <Button onClick={handleLogout} className="logout-button">
          <Logout />
          Logout
        </Button>
      </div>
    </header>
  );
}
