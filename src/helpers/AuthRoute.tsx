import { useHistory } from "react-router-dom";
import axios from "axios";
export const AuthenticatedRoute = (props: any) => {
  const history = useHistory();

  const token = localStorage.getItem("jwt");

  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  if (token) {
    try {
      axios.get("http://localhost:5000/user/logged", config);

      return <props.component {...props} />;
    } catch {
      window.location.pathname = "/authentication";
    }
  } else {
    history.push("/authentication");
  }

  return <props.component {...props} />;
};
