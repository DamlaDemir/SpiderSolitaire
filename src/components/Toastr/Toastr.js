import Noty from "noty";

export default {
  showToastr: (type, text) => {
    new Noty({
      type: type,
      layout: "bottomRight",
      theme: "bootstrap-v4",
      text: text,
      timeout: "3000",
      progressBar: true,
      closeWith: ["click"],
      killer: true,
    }).show();
  },
};
