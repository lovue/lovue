<template>
  <transition name="indicator">
    <div class="v-indicator" v-show="visible">
      <div class="icon-wrap">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" width="32" height="32">
          <g fill="#eee">
            <rect x="46.5" y="15.5" rx="12.09" ry="4.03" width="7" height="17"></rect>
            <rect x="46.5" y="15.5" rx="12.09" ry="4.03" width="7" height="17" transform="rotate(30 50 50)" fill-opacity="0.1"></rect>
            <rect x="46.5" y="15.5" rx="12.09" ry="4.03" width="7" height="17" transform="rotate(60 50 50)" fill-opacity="0.2"></rect>
            <rect x="46.5" y="15.5" rx="12.09" ry="4.03" width="7" height="17" transform="rotate(90 50 50)" fill-opacity="0.28"></rect>
            <rect x="46.5" y="15.5" rx="12.09" ry="4.03" width="7" height="17" transform="rotate(120 50 50)" fill-opacity="0.36"></rect>
            <rect x="46.5" y="15.5" rx="12.09" ry="4.03" width="7" height="17" transform="rotate(150 50 50)" fill-opacity="0.44"></rect>
            <rect x="46.5" y="15.5" rx="12.09" ry="4.03" width="7" height="17" transform="rotate(180 50 50)" fill-opacity="0.52"></rect>
            <rect x="46.5" y="15.5" rx="12.09" ry="4.03" width="7" height="17" transform="rotate(210 50 50)" fill-opacity="0.6"></rect>
            <rect x="46.5" y="15.5" rx="12.09" ry="4.03" width="7" height="17" transform="rotate(240 50 50)" fill-opacity="0.68"></rect>
            <rect x="46.5" y="15.5" rx="12.09" ry="4.03" width="7" height="17" transform="rotate(270 50 50)" fill-opacity="0.76"></rect>
            <rect x="46.5" y="15.5" rx="12.09" ry="4.03" width="7" height="17" transform="rotate(300 50 50)" fill-opacity="0.84"></rect>
            <rect x="46.5" y="15.5" rx="12.09" ry="4.03" width="7" height="17" transform="rotate(330 50 50)" fill-opacity="0.92"></rect>
            <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="1s" repeatCount="indefinite"/>
          </g>
        </svg>

      </div>
    </div>
  </transition>
</template>

<script>
  import '../less/components/Indicator.less'

  export default {
    name: 'Indicator',
    data() {
      return {
        visible: false
      }
    }
  }
</script>
