import { useHistory } from "react-router-dom";
import axios from "axios";

export const AuthenticatedRoute = (props: any) => {
  const hystory = useHistory();

  let token = localStorage.getItem("jwt");

  let config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  axios
    .get("http://localhost:5000/user/logged", config)
    .then((res) => {
      return <props.component {...props} />;
    })
    .catch((err) => {
      hystory.push("/authentication");
    });

  return <props.component {...props} />;
};
