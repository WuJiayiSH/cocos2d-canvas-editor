<template>
  <el-collapse-item title="CCNode" name="CCNode">
    <el-row class="panel-item">
      <el-col :span="6">
        <span>Position</span>
      </el-col>
      <el-col :span="1">
        <span>X</span>
      </el-col>
      <el-col :span="8">
        <el-input-number size="mini" v-model="pos.x" :precision="3" :step="0.1"></el-input-number>
      </el-col>
      <el-col :span="1">
        <span>Y</span>
      </el-col>
      <el-col :span="8">
        <el-input-number size="mini" v-model="pos.y" :precision="3" :step="0.1"></el-input-number>
      </el-col>
    </el-row>

    <el-row class="panel-item">
      <el-col :span="6">
        <span>Content Size</span>
      </el-col>
      <el-col :span="1">
        <span>W</span>
      </el-col>
      <el-col :span="8">
        <el-input-number size="mini" v-model="size.w" :precision="3" :step="0.1"></el-input-number>
      </el-col>
      <el-col :span="1">
        <span>H</span>
      </el-col>
      <el-col :span="8">
        <el-input-number size="mini" v-model="size.h" :precision="3" :step="0.1"></el-input-number>
      </el-col>
    </el-row>

    <el-row class="panel-item">
      <el-col :span="6">
        <span>Anchor Point</span>
      </el-col>
      <el-col :span="1">
        <span>X</span>
      </el-col>
      <el-col :span="8">
        <el-input-number size="mini" v-model="ap.x" :precision="3" :step="0.1"></el-input-number>
      </el-col>
      <el-col :span="1">
        <span>Y</span>
      </el-col>
      <el-col :span="8">
        <el-input-number size="mini" v-model="ap.y" :precision="3" :step="0.1"></el-input-number>
      </el-col>
    </el-row>

    <el-row class="panel-item">
      <el-col :span="6">
        <span>Scale</span>
      </el-col>
      <el-col :span="1">
        <span>X</span>
      </el-col>
      <el-col :span="8">
        <el-input-number size="mini" v-model="scale.x" :precision="3" :step="0.1"></el-input-number>
      </el-col>
      <el-col :span="1">
        <span>Y</span>
      </el-col>
      <el-col :span="8">
        <el-input-number size="mini" v-model="scale.y" :precision="3" :step="0.1"></el-input-number>
      </el-col>
    </el-row>

    <el-row class="panel-item">
      <el-col :span="7">
        <span>Rotation</span>
      </el-col>
      <el-col :span="8">
        <el-input-number size="mini" v-model="rot" :precision="3" :step="0.1"></el-input-number>
      </el-col>
    </el-row>

    <el-row class="panel-item">
      <el-col :span="6">
        <span>Skew</span>
      </el-col>
      <el-col :span="1">
        <span>X</span>
      </el-col>
      <el-col :span="8">
        <el-input-number size="mini" v-model="skew.x" :precision="3" :step="0.1"></el-input-number>
      </el-col>
      <el-col :span="1">
        <span>Y</span>
      </el-col>
      <el-col :span="8">
        <el-input-number size="mini" v-model="skew.y" :precision="3" :step="0.1"></el-input-number>
      </el-col>
    </el-row>

    <el-row class="panel-item">
      <el-col :span="7">
        <span>Tag</span>
      </el-col>
      <el-col :span="8">
        <el-input-number size="mini" v-model="tag" :step="1"></el-input-number>
      </el-col>
    </el-row>

    <el-row class="panel-item">
      <el-col :span="12">
        <el-checkbox v-model="ignoreAp">Ignore Anchor Point For Position</el-checkbox>
      </el-col>
    </el-row>
  </el-collapse-item>
</template>


<script>
/* eslint-disable */
import Global from "../Global";
let className = "CCNode";
export default {
  props: {
    message: {
      type: String
    }
  },
  data() {
    return {
      pos: { x: 0, y: 0 },
      size: { w: 0, h: 0 },
      ap: { x: 0, y: 0 },
      scale: { x: 0, y: 0 },
      rot: 0,
      skew: { x: 0, y: 0 },
      tag: 0,
      ignoreAp: true,
    };
  },
  created() {
    this.syncProp();
  },
  watch: {
    message: function(message) {
      // console.log('node-panel boardcastMessage changed', message)
      let command = message.split(":")[1];
      if (command === "updateCCNodePanel") {
        this.syncProp();
      } else if (command === "selectedNodeChanged") {
        this.syncProp();
      }
    },
    pos: {
      handler(value) {
        window.cc.CanvasEditor.getParser(className).onHandleProp(
          Global.selectedNode.ref,
          "pos",
          value
        );
        // this.$emit('handleMessage', 'updateNodeController')
      },
      deep: true
    },
    size: {
      handler(value) {
        window.cc.CanvasEditor.getParser(className).onHandleProp(
          Global.selectedNode.ref,
          "size",
          value
        );
        // this.$emit('handleMessage', 'updateNodeController')
      },
      deep: true
    },
    ap: {
      handler(value) {
        window.cc.CanvasEditor.getParser(className).onHandleProp(
          Global.selectedNode.ref,
          "ap",
          value
        );
        // this.$emit('handleMessage', 'updateNodeController')
      },
      deep: true
    },
    scale: {
      handler(value) {
        window.cc.CanvasEditor.getParser(className).onHandleProp(
          Global.selectedNode.ref,
          "scale",
          value
        );
        // this.$emit('handleMessage', 'updateNodeController')
      },
      deep: true
    },
    rot: {
      handler(value) {
        window.cc.CanvasEditor.getParser(className).onHandleProp(
          Global.selectedNode.ref,
          "rot",
          value
        );
        // this.$emit('handleMessage', 'updateNodeController')
      },
      deep: true
    },
    skew: {
      handler(value) {
        window.cc.CanvasEditor.getParser(className).onHandleProp(
          Global.selectedNode.ref,
          "skew",
          value
        );
        // this.$emit('handleMessage', 'updateNodeController')
      },
      deep: true
    },
    tag: {
      handler(value) {
        window.cc.CanvasEditor.getParser(className).onHandleProp(
          Global.selectedNode.ref,
          "tag",
          value
        );
      },
      deep: true
    },
    ignoreAp: {
      handler(value) {
        window.cc.CanvasEditor.getParser(className).onHandleProp(
          Global.selectedNode.ref,
          "ignoreAp",
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