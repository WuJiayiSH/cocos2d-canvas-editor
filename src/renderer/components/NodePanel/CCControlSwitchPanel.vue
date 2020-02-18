<template>
  <el-collapse-item title="CCControlSwitch" name="CCControlSwitch">
    <el-row>
      <el-col :span="12">
        <el-checkbox v-model="enabled">Enabled</el-checkbox>
      </el-col>
      <el-col :span="12">
        <el-checkbox v-model="value">On/Off</el-checkbox>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="7">
        <span>Sprite Mask</span>
      </el-col>
      <el-col :span="16">
        <el-input placeholder="default.png" v-model="mask" clearable></el-input>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="7">
        <span>Sprite On</span>
      </el-col>
      <el-col :span="16">
        <el-input placeholder="default.png" v-model="on" clearable></el-input>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="7">
        <span>Sprite Off</span>
      </el-col>
      <el-col :span="16">
        <el-input placeholder="default.png" v-model="off" clearable></el-input>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="7">
        <span>Sprite Thumb</span>
      </el-col>
      <el-col :span="16">
        <el-input placeholder="default.png" v-model="thumb" clearable></el-input>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="7">
        <span>Text On</span>
      </el-col>
      <el-col :span="16">
        <el-input placeholder="default.png" v-model="onText" clearable></el-input>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="7">
        <span>Text Off</span>
      </el-col>
      <el-col :span="16">
        <el-input placeholder="default.png" v-model="offText" clearable></el-input>
      </el-col>
    </el-row>

  </el-collapse-item>
</template>


<script>
/* eslint-disable */
import Global from "../Global";
let className = "CCControlSwitch";
export default {
  props: {
    message: {
      type: String
    }
  },
  data() {
    return {
      value: true,
      enabled: true,
      mask: "",
      on: "",
      off: "",
      thumb: "",
      onText: "",
      offText: ""
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
    value: function(value) {
      window.cc.CanvasEditor.getParser(className).onHandleProp(
        Global.selectedNode.ref,
        "value",
        value
      );
    },
    enabled: function(value) {
      window.cc.CanvasEditor.getParser(className).onHandleProp(
        Global.selectedNode.ref,
        "enabled",
        value
      );
    },
    mask: function(value) {
      window.cc.CanvasEditor.getParser(className).onHandleProp(
        Global.selectedNode.ref,
        "mask",
        value
      );
    },
    on: function(value) {
      window.cc.CanvasEditor.getParser(className).onHandleProp(
        Global.selectedNode.ref,
        "on",
        value
      );
    },
    off: function(value) {
      window.cc.CanvasEditor.getParser(className).onHandleProp(
        Global.selectedNode.ref,
        "off",
        value
      );
    },
    thumb: function(value) {
      window.cc.CanvasEditor.getParser(className).onHandleProp(
        Global.selectedNode.ref,
        "thumb",
        value
      );
    },
    onText: function(value) {
      window.cc.CanvasEditor.getParser(className).onHandleProp(
        Global.selectedNode.ref,
        "onText",
        value
      );
    },
    offText: function(value) {
      window.cc.CanvasEditor.getParser(className).onHandleProp(
        Global.selectedNode.ref,
        "offText",
        value
      );
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
</style>