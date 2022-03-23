import Index from "./views/Index.js";
import Profile from "./views/examples/Profile.js";
import Register from "./views/examples/Register.js";
import Login from "./views/examples/Login.js";
import Tables from "./views/examples/Tables.js";
import Visualize from "./views/examples/visualize.js"
import UploadFile from "./views/examples/uploadfile";

var routes = [
  {
    path: "/index",
    name: "Home",
    icon: "ni ni-tv-2 text-success",
    component: Index,
    layout: "/admin",
  },
  {
    path: "/uploadfilr",
    name: "Uploadfile",
    icon: "ni ni-cloud-upload-96  text-success font-weight-bold",
    component: UploadFile,
    layout: "/admin",
  },
  {
    path: "/visualize",
    name: "Visualize",
    icon: "ni ni-bullet-list-67  text-success font-weight-bold",
    component: Visualize,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-success",
    component: Profile,
    layout: "/admin",
  },
  {
 
    name: "Find Biomarkers",
    icon: "ni ni-atom text-success",
    component: Profile,
    layout: "/admin",
  },
  {
    
    path: "/user-profile",
    name: "Predictions",
    icon: "ni ni-ruler-pencil text-success",
   
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-success",
    component: Login,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-success",
    component: Register,
    layout: "/auth",
  },
  // {
  //   path: "/tables",
  //   name: "Tables",
  //   icon: "ni ni-bullet-list-67  text-success font-weight-bold",
  //   component: Tables,
  //   layout: "/admin",
  // },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "ni ni-planet text-success",
  //   component: Icons,
  //   layout: "/admin",
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "ni ni-pin-3 text-success",
  //   component: Maps,
  //   layout: "/admin",
  // },
  
];
export default routes;
