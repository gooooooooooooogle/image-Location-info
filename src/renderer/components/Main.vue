<template>
  <div>
    <el-container>
      <el-header>照片解析器(离线版)</el-header>
      <el-main>
        <el-row :gutter="20" type="flex" justify="space-around">
          <el-col :span="3">
            <label>照片位置:</label>
          </el-col>
          <el-col :span="16">
            <el-input v-model="imgPath" placeholder="请选择要解析的照片……" size="mini" clearable readonly></el-input>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" size="mini" @click="selectImg">请选择照片</el-button>
          </el-col>
        </el-row>
        <el-row :gutter="20" type="flex" justify="space-around" v-show="!showFlag">
          <div class="margin-top">
            <i class="el-icon-loading"></i>正在解析中，请稍等……
          </div>
        </el-row>

        <el-row :gutter="20" type="flex" justify="space-around" v-show="showFlag">
          <div class="margin-top">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>照片信息</span>
              </div>
              <div class="text item">国家：{{node1}}</div>
              <div class="text item">省份：{{node2}}</div>
              <div class="text item">地级市：{{node3}}</div>
              <div class="text item">具体位置：{{node4}}</div>
              <div class="text item">拍摄时间：{{time}}</div>
            </el-card>
          </div>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { Message } from "element-ui";
const remote = require("@electron/remote");
import { geoInit, getImgInfo } from "../utils/imgInfo";

export default {
  name: "Main",
  data() {
    return {
      imgPath: "",
      showFlag: true,
      node1: "无",
      node2: "无",
      node3: "无",
      node4: "无",
      time: "无",
    };
  },
  methods: {
    async selectImg() {
      this.initParams();
      const dialog = remote.dialog;
      const res = await dialog.showOpenDialog();
      const path = res.filePaths[0];
      if (path) {
        const fileSuffix = path.substring(path.lastIndexOf(".") + 1);
        const whiteList = ["JPG", "PNG", "JPEG", "WEBP", "AVIF", "TIFF"];
        if (whiteList.indexOf(fileSuffix.toUpperCase()) === -1) {
          Message({
            message: "只能选择图片格式的文件！",
            type: "error",
          });
          return;
        }

        this.showFlag = false;
        const _this = this;

        if (this.imgPath === "") {
          geoInit(path, (node) => {
            this.setParams(_this, node);
          });
        } else {
          getImgInfo(path, (node) => {
            this.setParams(_this, node);
          });
        }
        this.imgPath = path;
      }
    },
    initParams() {
      this.node1 = "无";
      this.node2 = "无";
      this.node3 = "无";
      this.node4 = "无";
      this.time = "无";
      this.path = "";
    },
    setParams(_this, node) {
      _this.node1 = node.node1;
      _this.node2 = node.node2;
      _this.node3 = node.node3;
      _this.node4 = node.node4;
      _this.time = node.time;
      _this.showFlag = true;
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro");

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Source Sans Pro", sans-serif;
}

.margin-top {
  margin-top: 40px;
}

.el-header {
  height: 60px;
  line-height: 60px;
  font-size: 36px;
  text-align: center;
  background-color: #409eff;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
</style>
