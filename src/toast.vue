<template>
  <div
    :class="style + shade + animation"
    @click="click"
    @mouseover="toggleTimer(true)"
    @mouseleave="toggleTimer(false)"
    role="alert"
  >
    <div class="px-4 py-4 flex justify-between items-start text-lg">
      {{ message }}
    </div>
  </div>
</template>

<script>
import Timer from "./timer";
import events from "./events";
import elements from "./elements";

export default {
  name: "toast",
  props: {
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "default",
    },
    delay: {
      type: Number,
      default: 4000,
    },
    maxToasts: {
      type: [Number, Boolean],
      default: 5,
    },
  },
  data: () => ({
    parent: null,
    timer: null,
    queueTimer: null,
    transition: "toast-in",
  }),
  computed: {
    animation() {
      return " animation-" + this.transition;
    },
    style() {
      return "flex self-end overflow-hidden rounded-xl cursor-pointer shadow-xl mb-5 pointer-events-auto";
    },
    shade() {
      switch (this.type) {
        case "info":
          return " bg-blue-500 border-2 border-blue-600 text-white";
        case "warning":
          return " bg-orange-600 border-2 border-orange-600 text-white";
        case "success":
          return " bg-green-600 border-2 border-green-600 text-white";
        case "error":
          return " bg-red-500 border-2 border-red-600 text-white";
        default:
          return " bg-gray-50 border-2 border-gray-200";
      }
    },
  },
  beforeMount() {
    this.createParent();
    this.setupContainer();
  },
  mounted() {
    this.notify();
    events.$on("toast-clean", this.close);
  },
  methods: {
    createParent() {
      this.parent = document.getElementById("_toast_container");
      if (!this.parent) {
        this.parent = document.createElement("div");
        this.parent.id = "_toast_container";
        this.parent.className =
          "fixed flex flex-col-reverse w-full h-full inset-0 p-10 z-50 pointer-events-none overflow-hidden";
      }
    },
    setupContainer() {
      const container = document.body;
      container.appendChild(this.parent);
    },
    shouldNotify() {
      if (this.maxToasts !== false) {
        return this.maxToasts <= this.parent.childElementCount;
      }

      return !this.maxToasts;
    },
    notify() {
      if (this.shouldNotify()) {
        this.queueTimer = setTimeout(this.notify, 250);
        return;
      }

      this.parent.insertAdjacentElement("afterbegin", this.$el);
      this.timer = new Timer(this.close, this.delay);
    },
    click() {
      this.close();
    },
    toggleTimer(state) {
      if (this.timer) {
        state ? this.timer.pause() : this.timer.resume();
      }
    },
    close() {
      this.timer && this.timer.stop();
      clearTimeout(this.queueTimer);
      this.transition = "toast-out";

      setTimeout(() => {
        elements.removeElement(this.$el);
      }, 250);
    },
  },
  beforeUnmount() {
    events.$off("toast-clear", this.close);
  },
};
</script>

<style>
.animation-toast-in {
  -webkit-animation: slide-top 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)
    forwards;
  animation: slide-top 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

.animation-toast-out {
  -webkit-animation: fade-out 0.2s ease-out both;
  animation: fade-out 0.2s ease-out both;
}

@-webkit-keyframes slide-top {
  0% {
    -webkit-transform: translateY(60px);
    transform: translateY(60px);
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
}
@keyframes slide-top {
  0% {
    -webkit-transform: translateY(60px);
    transform: translateY(60px);
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
}

@-webkit-keyframes fade-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@keyframes fade-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
