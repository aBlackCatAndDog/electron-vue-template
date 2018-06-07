<template>
  <div id="wrapper">
    <button @click='writeFile'>写文件</button>
    <button @click='readFile'>读文件</button>
    <button @click='openUseDirections'>打开使用说明</button>
    <div id="files">{{filesData}}</div>
  </div>
</template>

<script>
import { files } from "@/scripts/fileOpera.js";
const {
  ipcRenderer
} = window.require("electron")
export default {
  name: "landing-page",
  data() {
    return {
      filesData:''
    };
  },
  methods: {
    writeFile: function() {
      files.write(
        "/userSet.txt",
        '{"count":424378,"next":"https://192.168.166.156:8444/v2/packet/?page=2","previous":null,"results":[{"id":424376,"src_mac":"48:7D:2E:2C:63:01","src_ip":"42.120.219.29","src_port":25,"dst_mac":"00:0E:C6:D0:81:06","dst_ip":"192.168.166.153","dst_port":56010,"protocol":"TCP","content":"42.120.219.29:25 --> 192.168.166.153:56010 (60) Connection finish (FIN)","occurred_at":"2018-05-30T16:54:48.219352+08:00","length":60},{"id":424375,"src_mac":"00:0E:C6:D0:81:06","src_ip":"192.168.166.153","src_port":56010,"dst_mac":"48:7D:2E:2C:63:01","dst_ip":"42.120.219.29","dst_port":25,"protocol":"TCP","content":"192.168.166.153:56010 --> 42.120.219.29:25 (54) ACKed segment that wasn\'t captured (common at capture start)","occurred_at":"2018-05-30T16:54:48.219352+08:00","length":54},{"id":424384,"src_mac":"00:0E:C6:D0:81:06","src_ip":"192.168.166.153","src_port":56010,"dst_mac":"48:7D:2E:2C:63:01","dst_ip":"42.120.219.29","dst_port":25,"protocol":"TCP","content":"192.168.166.153:56010 --> 42.120.219.29:25 (54)","occurred_at":"2018-05-30T16:54:48.219352+08:00","length":54},{"id":424385,"src_mac":"48:7D:2E:2C:63:01","src_ip":"42.120.219.29","src_port":25,"dst_mac":"00:0E:C6:D0:81:06","dst_ip":"192.168.166.153","dst_port":56010,"protocol":"TCP","content":"42.120.219.29:25 --> 192.168.166.153:56010 (60) Connection finish (FIN)","occurred_at":"2018-05-30T16:54:48.219352+08:00","length":60},{"id":424374,"src_mac":"48:7D:2E:2C:63:01","src_ip":"42.120.219.29","src_port":25,"dst_mac":"00:0E:C6:D0:81:06","dst_ip":"192.168.166.153","dst_port":56010,"protocol":"TCP","content":"42.120.219.29:25 --> 192.168.166.153:56010 (60)","occurred_at":"2018-05-30T16:54:46.616420+08:00","length":60},{"id":424383,"src_mac":"48:7D:2E:2C:63:01","src_ip":"42.120.219.29","src_port":25,"dst_mac":"00:0E:C6:D0:81:06","dst_ip":"192.168.166.153","dst_port":56010,"protocol":"TCP","content":"42.120.219.29:25 --> 192.168.166.153:56010 (60) TCP keep-alive segment","occurred_at":"2018-05-30T16:54:46.616420+08:00","length":60},{"id":424373,"src_mac":"48:7D:2E:2C:63:01","src_ip":"42.120.219.29","src_port":25,"dst_mac":"00:0E:C6:D0:81:06","dst_ip":"192.168.166.153","dst_port":56010,"protocol":"TCP","content":"42.120.219.29:25 --> 192.168.166.153:56010 (60)","occurred_at":"2018-05-30T16:54:46.516403+08:00","length":60},{"id":424371,"src_mac":"00:0E:C6:D0:81:06","src_ip":"192.168.166.153","src_port":56010,"dst_mac":"48:7D:2E:2C:63:01","dst_ip":"42.120.219.29","dst_port":25,"protocol":"TCP","content":"192.168.166.153:56010 --> 42.120.219.29:25 (60) This frame is a (suspected) out-of-order segment","occurred_at":"2018-05-30T16:54:46.516403+08:00","length":60},{"id":424369,"src_mac":"48:7D:2E:2C:63:01","src_ip":"42.120.219.29","src_port":25,"dst_mac":"00:0E:C6:D0:81:06","dst_ip":"192.168.166.153","dst_port":56010,"protocol":"SMTP","content":"42.120.219.29:25 --> 192.168.166.153:56010 (63) 221 Bye\\xd\\xa","occurred_at":"2018-05-30T16:54:46.516403+08:00","length":63},{"id":424368,"src_mac":"00:0E:C6:D0:81:06","src_ip":"192.168.166.153","src_port":56010,"dst_mac":"48:7D:2E:2C:63:01","dst_ip":"42.120.219.29","dst_port":25,"protocol":"TCP","content":"192.168.166.153:56010 --> 42.120.219.29:25 (54) Connection finish (FIN)","occurred_at":"2018-05-30T16:54:46.516403+08:00","length":54}],"page_count":42438}'
      );
    },
    readFile: function() {
      this.filesData = files.read("/userSet.json");
    },
    openUseDirections: function(){
      ipcRenderer.send("openUseDirections");
    }
  }
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Source Sans Pro", sans-serif;
}

#wrapper {
  background: radial-gradient(
    ellipse at top left,
    rgba(255, 255, 255, 1) 40%,
    rgba(229, 229, 229, 0.9) 100%
  );
  height: 100vh;
  padding: 60px 80px;
  width: 100vw;
}

#logo {
  height: auto;
  margin-bottom: 20px;
  width: 420px;
}

main {
  display: flex;
  justify-content: space-between;
}

main > div {
  flex-basis: 50%;
}

.left-side {
  display: flex;
  flex-direction: column;
}

.welcome {
  color: #555;
  font-size: 23px;
  margin-bottom: 10px;
}

.title {
  color: #2c3e50;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 6px;
}

.title.alt {
  font-size: 18px;
  margin-bottom: 10px;
}

.doc p {
  color: black;
  margin-bottom: 10px;
}

.doc button {
  font-size: 0.8em;
  cursor: pointer;
  outline: none;
  padding: 0.75em 2em;
  border-radius: 2em;
  display: inline-block;
  color: #fff;
  background-color: #4fc08d;
  transition: all 0.15s ease;
  box-sizing: border-box;
  border: 1px solid #4fc08d;
}

.doc button.alt {
  color: #42b983;
  background-color: transparent;
}
</style>
