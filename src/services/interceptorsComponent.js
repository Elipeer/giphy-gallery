import React, { useEffect } from "react";
import { connect } from "react-redux";
import interceptors from "../services/interceptor";
import { setLoaderOn, setLoaderOff } from "../store/reducers/appSettings";
import ContentLoader from "../wigdets/ContentLoader";

const InterceptorsComponent = (props) => {
  const toggleLoader = (isTurnOn) => {
    if (isTurnOn) props.setLoaderOn();
    else props.setLoaderOff();
  };

  useEffect(() => {
    interceptors.setupInterceptors(props.history, toggleLoader);
  }, []);

  return <div>{props.loaderOn ? <ContentLoader /> : null}</div>;
};

const mapStateToProps = (state) => {
  return {
    loaderOn: state.persistedReducer.loaderOn
  };
};

const mapDispatchToProps = { setLoaderOn, setLoaderOff };

export default connect(mapStateToProps, mapDispatchToProps)(InterceptorsComponent);
