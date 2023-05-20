import React, { useEffect } from "react";
import { Layout } from "antd";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import { Login } from "./Login";
import { useSelectorRoot } from "../store/store";
import { LeftMenu } from "./leftMenu/LeftMenu";
import { Main } from "./main/Main";
import { useDispatch } from "react-redux";
import Utils from "../common/Utils";
import { getRoles, setLoginSuccess } from "../store/controls/LoginEpic";
import { ResponseToken } from "../common/define-types";
import { pushBreadcrum } from "../store/slice/controlSlice";
import { Routes } from "./Routes";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";

export const Root = () => {
  const authenticated = useSelectorRoot((state) => state.login.isSuccess);
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  history.listen((e) => {
    console.log(e);
    createBreadcrum(e.pathname);
  });
  useEffect(() => {
    if (!authenticated) {
      Utils.getValueLocalStorage(Utils.constant.token).then(
        async (token: ResponseToken) => {
          if (token != null) {
            var user = await Utils.getValueLocalStorage(Utils.constant.user);
            dispatch(setLoginSuccess({ status: true, token: token.jwt, user }));
            dispatch(getRoles());
          } else {
            history.replace("/login");
          }
        }
      );
      createBreadcrum(location.pathname);
    }
  }, [authenticated]);
  const createBreadcrum = (path: string) => {
    var data: ItemType[] = [];
    if (path === "/") {
      data.push({ title: "Bảng điều khiển" });
    } else {
      var isDone = false;
      for (var i of Routes) {
        if (i.items && i.items.length > 0) {
          for (var child of i.items) {
            if (
              child.routeProps &&
              path.startsWith(child.routeProps?.path as string)
            ) {
              data.push({ title: i.label });
              data.push({
                title: (
                  <a
                    href={(child.routeProps?.path ?? "/") as string}
                    style={{ color: "#000" }}
                  >
                    {child.label}
                  </a>
                ),
              });
              isDone = true;
              break;
            }
          }
        }
        if (isDone) break;
      }
    }
    dispatch(pushBreadcrum(data));
  };
  return (
    <Layout style={{ height: "100vh" }}>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route path="/" component={Main} />
      </Switch>
    </Layout>
  );
};
