import { Route, Routes } from "react-router-dom";
import "./App.css";
import { listRouter } from "./contstant";
import { useEffect, useState } from "react";

function App() {
  const [routers, setRouters] = useState([]);
  useEffect(() => {
    const getRouter = async () => {
      var obj = localStorage.getItem("user");

      if (JSON?.parse(obj)?._id) {
        const user = await fetch(`https://localhost:8000/api/user/persistlogin/${JSON?.parse(obj)?._id}`, {
          headers: {
            'Content-type': "application/json",
          },
          method: 'GET'
        })
        //console.log(await user.json())
        localStorage.setItem('user', JSON.stringify(await user.json()))
        obj = localStorage.getItem("user");
      }


      const type = JSON?.parse(obj)?.role;
      switch (type) {
        case 3:
          setRouters(listRouter.admin);
          break;
        case 2:
          setRouters(listRouter.management);
          break;
        case 1:
          setRouters(listRouter.teacher);
          break;
        case 0:
          setRouters(listRouter.student);
          break;
        default:
          setRouters(listRouter.guest);
          break;
      }
    };
    getRouter();
  }, []);
  return (
    <Routes>
      {routers?.map((router, index) => (
        <Route path={router.path} element={router?.element} key={index} />
      ))}
    </Routes>
  );
}

export default App;
