import toast from "./toast.vue";
import elements from "./elements.js";

const service = (globalOptions = {}) => {
  return {
    show(message, options = {}) {
      return elements.mountElement(toast, {
        props: { ...globalOptions, ...{ message, ...options } },
      });
    },
    success(message, options = {}) {
      options.type = "success";
      return this.show(message, options);
    },
    error(message, options = {}) {
      options.type = "error";
      return this.show(message, options);
    },
    info(message, options = {}) {
      options.type = "info";
      return this.show(message, options);
    },
    warning(message, options = {}) {
      options.type = "warning";
      return this.show(message, options);
    },
  };
};

export default service;
