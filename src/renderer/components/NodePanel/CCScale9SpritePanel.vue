<template>
  <el-collapse-item title="CCScale9Sprite" name="CCScale9Sprite">
    <el-row class="panel-item">
      <el-col :span="7">
        <span>File name</span>
      </el-col>
      <el-col :span="16">
        <el-input placeholder="default.png" v-model="file" clearable></el-input>
      </el-col>
    </el-row>

    <el-row class="panel-item">
      <el-col :span="7">
        <span>Color</span>
      </el-col>
      <el-col :span="8">
        <el-color-picker v-model="color" show-alpha></el-color-picker>
      </el-col>
    </el-row>

    <el-row class="panel-item">
      <el-col :span="6">
        <span>Preferred Size</span>
      </el-col>
      <el-col :span="1">
        <span>W</span>
      </el-col>
      <el-col :span="8">
        <el-input-number size="mini" v-model="preferred.w" :precision="3" :step="0.1"></el-input-number>
      </el-col>
      <el-col :span="1">
        <span>H</span>
      </el-col>
      <el-col :span="8">
        <el-input-number size="mini" v-model="preferred.h" :precision="3" :step="0.1"></el-input-number>
      </el-col>
    </el-row>

    <el-row class="panel-item">
      <el-col :span="6">
        <span>Insets TL</span>
      </el-col>
      <el-col :span="1">
        <span>T</span>
      </el-col>
      <el-col :span="8">
        <el-input-number size="mini" v-model="insets.t" :precision="3" :step="0.1"></el-input-number>
      </el-col>
      <el-col :span="1">
        <span>L</span>
      </el-col>
      <el-col :span="8">
        <el-input-number size="mini" v-model="insets.l" :precision="3" :step="0.1"></el-input-number>
      </el-col>
    </el-row>

    <el-row class="panel-item">
      <el-col :span="6">
        <span>Insets BR</span>
      </el-col>
      <el-col :span="1">
        <span>B</span>
      </el-col>
      <el-col :span="8">
        <el-input-number size="mini" v-model="insets.b" :precision="3" :step="0.1"></el-input-number>
      </el-col>
      <el-col :span="1">
        <span>R</span>
      </el-col>
      <el-col :span="8">
        <el-input-number size="mini" v-model="insets.r" :precision="3" :step="0.1"></el-input-number>
      </el-col>
    </el-row>
  </el-collapse-item>
</template>


<script>
/* eslint-disable */
import Global from "../Global";
let className = "CCScale9Sprite";
export default {
  props: {
    message: {
      type: String
    }
  },
  data() {
    return {
      color: "rgba(255,255,255,1)",
      file: "",
      insets: { t: 0, l: 0, b: 0, r: 0 },
      preferred: { w: 100, h: 100 }
    };
  },
  created() {
    this.syncProp();
  },
  watch: {
    message: function(message) {
      let command = message.split(":")[1];
      if (command === "selectedNodeChanged") {
        this.syncProp();
      }
    },
    color: function(value) {
      window.cc.CanvasEditor.getParser(className).onHandleProp(
        Global.selectedNode.ref,
        "color",
        value
      );
    },
    file: function(value) {
      window.cc.CanvasEditor.getParser(className).onHandleProp(
        Global.selectedNode.ref,
        "file",
        value
      );
    },
    insets: {
      handler(value) {
        window.cc.CanvasEditor.getParser(className).onHandleProp(
          Global.selectedNode.ref,
          "insets",
          value
        );
      },
      deep: true
    },
    preferred: {
      handler(value) {
        window.cc.CanvasEditor.getParser(className).onHandleProp(
          Global.selectedNode.ref,
          "preferred",
          value
        );
      },
      deep: true
    }
  },
  methods: {
    syncProp() {
      if (!Global.selectedNode) {
        return;
      }
      let node = Global.selectedNode.ref;
      let cc = window.cc;
      let obj = cc.CanvasEditor.getParser(className).toObject(node);
      for (let key in obj) {
        this[key] = obj[key];
      }
    }
  }
};
</script>
<style scoped>
.panel-item {margin-bottom: 2px;}
</style>