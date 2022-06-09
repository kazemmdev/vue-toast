import toast from "./toast.vue";
import service from "./service";

toast.install = (app, options = {}) => {
  let plugin = service(options);
  app.$toast = plugin;
  app.config.globalProperties.$toast = plugin;
};

export default toast;
export { toast, service };
