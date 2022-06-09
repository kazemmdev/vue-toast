<template>
  <transition>
    <div
      :class="style + shade"
      v-show="isActive"
      @click="click"
      @mouseover="toggleTimer(true)"
      @mouseleave="toggleTimer(false)"
      role="alert"
    >
      <div class="px-4 py-4 flex justify-between items-start text-lg">
        {{ message }}
      </div>
    </div>
  </transition>
</template>

<script>
import Timer from '../scripts/timer'

export default {
  name: 'toast',
  props: {
    message: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'danger'
    }
  },
  data: () => ({
    parent: null,
    isActive: false,
    timer: null
  }),
  computed: {
    style() {
      return 'absolute bottom-0 right-10 overflow-hidden rounded-xl cursor-pointer shadow-md my-10 pointer-events-auto'
    },
    shade() {
      switch (this.type) {
        case 'info':
          return ' bg-blue-500 border-2 border-blue-600 text-white'
        case 'warning':
          return ' bg-orange-600 border-2 border-orange-600 text-white'
        case 'success':
          return ' bg-green-600 border-2 border-green-600 text-white'
        case 'danger':
          return ' bg-red-500 border-2 border-red-600 text-white'
        default:
          return ' bg-gray-50 border-2 border-gray-200'
      }
    }
  },
  beforeMount() {
    this.createParent()
    this.setupContainer()
  },
  mounted() {
    this.notify()
  },
  methods: {
    createParent() {
      this.parent = document.getElementById('_toast_container')

      if (!this.parent) {
        this.parent = document.createElement('div')
        this.parent.id = '_toast_container'
        this.parent.className =
          'fixed w-full h-full inset-0 z-50 pointer-events-none overflow-hidden'
      }
    },
    setupContainer() {
      const container = document.body
      container.appendChild(this.parent)
    },
    notify() {
      this.parent.insertAdjacentElement('afterbegin', this.$el)
      this.isActive = true
      this.timer = new Timer(this.close, 4000)
    },
    click() {
      this.close()
    },
    toggleTimer(state) {
      if (this.timer) {
        state ? this.timer.pause() : this.timer.resume()
      }
    },
    close() {
      this.timer && this.timer.stop()
      this.isActive = false

      setTimeout(() => {
        console.log('clos fired')
      }, 150)
    }
  }
}
</script>

<style scoped>
.v-enter-active {
  animation: fade-in-pulse-08 0.3s cubic-bezier(0.8, 0.02, 0.45, 0.91);
}
.v-leave-active {
  animation: opacity 0.4s ease-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

@keyframes fade-in-pulse-08 {
  0% {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
  50% {
    opacity: 1;
  }
  100%,
  70% {
    transform: none;
  }
}
</style>
