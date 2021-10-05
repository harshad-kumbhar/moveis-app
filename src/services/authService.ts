import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";

const getUser = () => {
     try {
      const token = localStorage.getItem('token') || '';
      if (token !== '') {
      const user: any = jwtDecode(token);
      }
    } catch (ex: any) {
      toast.error(ex);
    }
}

export default getUser;