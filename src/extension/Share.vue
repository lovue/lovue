<template>
  <div class="v-share">
    <div class="s-wechat" title="分享至微信" @click.stop="showWechatQrcode = true">
      <v-icon icon="wechat-o"></v-icon>
      <div class="qrcode-wrap" v-if="showWechatQrcode" @click.stop>
        <vue-qrcode :value="url" :size="120" level="H"></vue-qrcode>
        <p class="tip-text">用微信扫码二维码，分享至好友和朋友圈</p>
      </div>
    </div>
    <div title="分享至微博" @click="shareToSina"><v-icon icon="sina-o"></v-icon></div>
    <div title="分享至QQ" @click="shareToQQ"><v-icon icon="qq-o"></v-icon></div>
  </div>
</template>
<script>
  import Icon from '../components/Icon.vue'
  import VueQrcode from 'qrcode.vue'

  export default {
    name: 'v-share',
    data() {
      return {
        showWechatQrcode: false
      }
    },
    props: {
      url: String,
      title: String
    },
    components: {
      [Icon.name]: Icon,
      VueQrcode
    },
    methods: {
      shareToSina() {
        const url = encodeURIComponent(this.url)
        const shareUrl = `https://service.weibo.com/share/share.php?url=${url}&title=${this.title}`
        window.open(shareUrl)
      },
      shareToQQ() {
        const url = encodeURIComponent(this.url)
        const shareUrl = `https://connect.qq.com/widget/shareqq/index.html?url=${url}&title=${this.title}`
        window.open(shareUrl)
      }
    },
    mounted() {
      window.addEventListener('click', () => this.showWechatQrcode = false)
    }
  }
</script>
