import { toast } from "react-toastify";

const Api = getCurrentHost()
const HandleError = error => {
    console.log(error, "error");
    if (error.message === "un-authorized access") {
        ForceLogoutApiData()
        // window.location.replace("http://localhost:3000/login");
    } else {
        toast.error(error.message);
    }
    if (error === undefined) {
        window.location.replace("login");
    }
};
const ForceLogoutApiData = () => {
    const token = localStorage.getItem("user-token");
    const config = {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            Authorization: "BEARER " + token,
        },
    };
    fetch(Api.baseURL + `/force_logout`, config)
        .then((res) => res.json())
        .then((data) => {
            // dispatch({
            //   type: USERSLOGOUT_SUCCESS,
            //   payload: data,
            // });
            localStorage.removeItem("user-token")
            window.location.replace("login")
        })
        .catch((err) => {
            if (err) {
                console.log("this is err", err);
            }
        });
};
export default HandleError;