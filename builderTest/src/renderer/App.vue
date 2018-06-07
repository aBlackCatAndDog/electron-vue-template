<template>
  <div id="app">
    <div class="fake-title-bar">
      <div class="title-mark">
        <img src="../../static/menubar-nodarwin.png" />
        欢迎使用Bolean Guard工控安全审计平台
      </div>
      <div class="handle-bar" v-if="os === 'win32'">
        <Icon type="minus" @click="minimizeWindow"></Icon>
        <Icon type="close" @click="closeWindow"></Icon>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { remote } from "electron";
// import test from './mixins/test'
const { BrowserWindow } = remote;
import {time_differ, toISOString, formatDate} from '@/scripts/times.js'
export default {
  name: "buildertest",
  // mixins: [test],
  data() {
    return {
      os: ""
    };
  },
  created() {
    this.os = process.platform;
  },
  mounted: function(){
    console.log(time_differ("2018-04-01","2018-03-01","ms"));
    console.log(toISOString(new Date("2018-04-01")));
    console.log(formatDate(new Date('2018-06-04T11:28:45.000000+08:00'), "yyyy-MM-dd hh:mm:ss"));
    this.$store.set("token",'aksgdhjgasjdhgjhas');
    console.log(this.$store.get("token"));
    console.log(this.data);
  },
  methods: {
    minimizeWindow() {
      const window = BrowserWindow.getFocusedWindow();
      window.minimize();
    },
    closeWindow() {
      const window = BrowserWindow.getFocusedWindow();      
      window.close();
    }
  }
};
</script>

<style lang='stylus'>
#app {
  .fake-title-bar {
    -webkit-app-region: drag;
    height: h = 24px;
    color: #2c2c2c;
    font-size: 12px;
    line-height: h;
    width: 100%;
    border-bottom: 1px solid #d8d8d8;
    position: fixed;
    z-index: 100;

    .title-mark {
      position: absolute;
      left: 4px;
      top: 0;
      z-index: 10000;
      padding-left: 26px;

      img {
        position: absolute;
        top: 50%;
        left: 4px;
        transform: translateY(-50%);
        height: 20px;
      }
    }

    .handle-bar {
      position: absolute;
      top: 2px;
      right: 4px;
      width: 40px;
      height: h;
      z-index: 10000;
      -webkit-app-region: no-drag;

      i {
        cursor: pointer;
        font-size: 16px;
      }

      .ivu-icon-minus {
        margin-right: 6px;

        &:hover {
          color: #409EFF;
        }
      }

      .ivu-icon-close {
        &:hover {
          color: #F15140;
        }
      }
    }
  }

  .writeFile {
    position: absolute;
    top: 40px;
    font-size: 14px;
  }
}
</style>
