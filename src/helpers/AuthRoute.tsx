import { useHistory } from "react-router-dom";
import axios from "axios";
export const AuthenticatedRoute = (props: any) => {
  const history = useHistory();

  let token = localStorage.getItem("jwt");

  let config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  if (token) {
    axios
      .get("http://localhost:5000/user/logged", config)
      .then(res => {
        return <props.component {...props} />;
      })
      .catch(err => {
        window.location.pathname = "/authentication";
      });
  } else {
    history.push("/authentication");
  }

  return <props.component {...props} />;
};
