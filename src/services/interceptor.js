import axios from "axios";
import Swal from "sweetalert2";

var generalErrMsg = "There appears to be a problem right now. Please try again later.";

export default {
  setupInterceptors: (history, toggleLoader) => {
    axios.interceptors.request.use((config) => {
      if (!config.preventLoading) toggleLoader(true);

      return config;
    });

    axios.interceptors.response.use(
      (response) => {
        toggleLoader(false);

        if (response && response.data) {
          if (response.data.err) {
            Swal.fire({ title: "", text: generalErrMsg, icon: "warning", heightAuto: false });
          }
        }

        return response;
      },
      (error) => {
        toggleLoader(false);

        if (error.request && error.request.status === 429) {
          Swal.fire("", "Too many requests made", "warning").then(() => {
            window.location.href = "/";
          });
        } else {
          Swal.fire({ title: "", text: generalErrMsg, icon: "warning", heightAuto: false });
        }
        return error;
      }
    );
  }
};
