<template>
  <el-collapse-item title="CCLabelTTF" name="CCLabelTTF">
    <el-row class="panel-item">
      <el-col :span="7">
        <span>Text</span>
      </el-col>
      <el-col :span="16">
        <el-input type="textarea" placeholder="Hello" v-model="string" clearable></el-input>
      </el-col>
    </el-row>

    <el-row class="panel-item">
      <el-col :span="7">
        <span>Font Name</span>
      </el-col>
      <el-col :span="16">
        <el-input placeholder="font name" v-model="font" clearable></el-input>
      </el-col>
    </el-row>

    <el-row class="panel-item">
      <el-col :span="7">
        <span>Font Size</span>
      </el-col>
      <el-col :span="8">
        <el-input-number size="mini" v-model="size" :precision="3" :step="0.1"></el-input-number>
      </el-col>
    </el-row>

    <el-row class="panel-item">
      <el-col :span="6">
        <span>Dimensions</span>
      </el-col>
      <el-col :span="1">
        <span>W</span>
      </el-col>
      <el-col :span="8">
        <el-input-number size="mini" v-model="dim.w" :precision="3" :step="0.1"></el-input-number>
      </el-col>
      <el-col :span="1">
        <span>H</span>
      </el-col>
      <el-col :span="8">
        <el-input-number size="mini" v-model="dim.h" :precision="3" :step="0.1"></el-input-number>
      </el-col>
    </el-row>

    <el-row class="panel-item">
      <el-col :span="6">
        <span>Align</span>
      </el-col>
      <el-col :span="1">
        <span>H</span>
      </el-col>
      <el-col :span="8">
        <el-dropdown @command="handleHAlign">
          <el-button size="mini">
            {{align.h===0?'Left':align.h===1?'Center':'Right'}}
            <i
              class="el-icon-arrow-down el-icon--right"
            ></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="0">Left</el-dropdown-item>
            <el-dropdown-item command="1">Center</el-dropdown-item>
            <el-dropdown-item command="2">Right</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
      <el-col :span="1">
        <span>V</span>
      </el-col>
      <el-col :span="8">
        <el-dropdown @command="handleVAlign">
          <el-button size="mini">
            {{align.v===0?'Top':align.v===1?'Center':'Bottom'}}
            <i
              class="el-icon-arrow-down el-icon--right"
            ></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="0">Top</el-dropdown-item>
            <el-dropdown-item command="1">Center</el-dropdown-item>
            <el-dropdown-item command="2">Bottom</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
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
      <el-col :span="12">
        <el-checkbox v-model="bold">Bold Enabled</el-checkbox>
      </el-col>
    </el-row>

    <el-row class="panel-item">
      <el-col :span="12">
        <el-checkbox v-model="italic">Italic Enabled</el-checkbox>
      </el-col>
    </el-row>

    <el-row class="panel-item">
      <el-col :span="12">
        <el-checkbox v-model="stroke.enabled">Stroke Enabled</el-checkbox>
      </el-col>
    </el-row>

    <el-row class="panel-item">
      <el-col :span="7">
        <span>Stroke Size</span>
      </el-col>
      <el-col :span="8">
        <el-input-number
          size="mini"
          v-model="stroke.size"
          :precision="3"
          :step="0.1"
          :disabled="!stroke.enabled"
        ></el-input-number>
      </el-col>
    </el-row>

    <el-row class="panel-item">
      <el-col :span="7">
        <span>Stroke Color</span>
      </el-col>
      <el-col :span="8">
        <el-color-picker :disabled="!stroke.enabled" v-model="stroke.color"></el-color-picker>
      </el-col>
    </el-row>

    <el-row class="panel-item">
      <el-col :span="12">
        <el-checkbox v-model="shadow.enabled">Shadow Enabled</el-checkbox>
      </el-col>
    </el-row>

    <el-row class="panel-item">
      <el-col :span="6">
        <span>Shadow Offset</span>
      </el-col>
      <el-col :span="1">
        <span>X</span>
      </el-col>
      <el-col :span="8">
        <el-input-number
          size="mini"
          v-model="shadow.offset.w"
          :precision="3"
          :step="0.1"
          :disabled="!shadow.enabled"
        ></el-input-number>
      </el-col>
      <el-col :span="1">
        <span>Y</span>
      </el-col>
      <el-col :span="8">
        <el-input-number
          size="mini"
          v-model="shadow.offset.h"
          :precision="3"
          :step="0.1"
          :disabled="!shadow.enabled"
        ></el-input-number>
      </el-col>
    </el-row>

    <el-row class="panel-item">
      <el-col :span="7">
        <span>Shadow Opacity</span>
      </el-col>
      <el-col :span="17">
        <el-slider
          v-model="shadow.opacity"
          show-input
          input-size="mini"
          :max="1.0"
          :step="0.01"
          :disabled="!shadow.enabled"
        ></el-slider>
      </el-col>
    </el-row>

    <el-row class="panel-item">
      <el-col :span="7">
        <span>Shadow Blur</span>
      </el-col>
      <el-col :span="8">
        <el-input-number
          size="mini"
          v-model="shadow.blur"
          :precision="3"
          :step="0.1"
          :disabled="!shadow.enabled"
        ></el-input-number>
      </el-col>
    </el-row>
  </el-collapse-item>
</template>


<script>
/* eslint-disable */
import Global from "../Global";
let className = "CCLabelTTF";
export default {
  props: {
    message: {
      type: String
    }
  },
  data() {
    return {
      color: "rgba(255,255,255,1)",
      string: "",
      font: "",
      size: 10,
      align: { h: 0, v: 0 },
      dim: { w: 0, h: 0 },
      bold: false,
      italic: false,
      stroke: { enabled: false, size: 0, color: "#000000" },
      shadow: { enabled: false, offset: { w: 0, h: 0 }, opacity: 0, blur: 0 }
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
    string: function(value) {
      window.cc.CanvasEditor.getParser(className).onHandleProp(
        Global.selectedNode.ref,
        "string",
        value
      );
      // this.$emit('handleMessage', 'updateNodeController')
    },
    font: function(value) {
      window.cc.CanvasEditor.getParser(className).onHandleProp(
        Global.selectedNode.ref,
        "font",
        value
      );
      // this.$emit('handleMessage', 'updateNodeController')
    },
    size: function(value) {
      window.cc.CanvasEditor.getParser(className).onHandleProp(
        Global.selectedNode.ref,
        "size",
        value
      );
      // this.$emit('handleMessage', 'updateNodeController')
    },
    align: {
      handler(value) {
        window.cc.CanvasEditor.getParser(className).onHandleProp(
          Global.selectedNode.ref,
          "align",
          value
        );
      },
      deep: true
    },
    dim: {
      handler(value) {
        window.cc.CanvasEditor.getParser(className).onHandleProp(
          Global.selectedNode.ref,
          "dim",
          value
        );
        // this.$emit('handleMessage', 'updateNodeController')
      },
      deep: true
    },
    bold: function(value) {
      window.cc.CanvasEditor.getParser(className).onHandleProp(
        Global.selectedNode.ref,
        "bold",
        value
      );
    },
    italic: function(value) {
      window.cc.CanvasEditor.getParser(className).onHandleProp(
        Global.selectedNode.ref,
        "italic",
        value
      );
    },
    stroke: {
      handler(value) {
        window.cc.CanvasEditor.getParser(className).onHandleProp(
          Global.selectedNode.ref,
          "stroke",
          value
        );
        // this.$emit('handleMessage', 'updateNodeController')
      },
      deep: true
    },
    shadow: {
      handler(value) {
        window.cc.CanvasEditor.getParser(className).onHandleProp(
          Global.selectedNode.ref,
          "shadow",
          value
        );
        // this.$emit('handleMessage', 'updateNodeController')
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
    },
    handleHAlign(align) {
      this.align.h = Number(align);
    },
    handleVAlign(align) {
      this.align.v = Number(align);
    }
  }
};
</script>
<style scoped>
.panel-item {margin-bottom: 2px;}
</style>