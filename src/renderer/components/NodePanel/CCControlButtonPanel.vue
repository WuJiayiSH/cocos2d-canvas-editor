<template>
  <el-collapse-item title="CCControlButton" name="CCControlButton">
    <el-tabs type="card">
      <el-tab-pane label="Button">
        <el-row>
          <el-col :span="12">
            <el-checkbox v-model="enabled">Enabled</el-checkbox>
          </el-col>
          <el-col :span="12">
            <el-checkbox v-model="zoom">Zoom on Touch</el-checkbox>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <span>
              <b>Normal</b>
            </span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7">
            <span>Background</span>
          </el-col>
          <el-col :span="16">
            <el-input placeholder="Background" v-model="normal.bg" clearable></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7">
            <span>Text</span>
          </el-col>
          <el-col :span="16">
            <el-input placeholder="Hello" v-model="normal.text" clearable></el-input>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="7">
            <span>Title Color</span>
          </el-col>
          <el-col :span="8">
            <el-color-picker v-model="normal.color"></el-color-picker>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <span>
              <b>Highlighted</b>
            </span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7">
            <span>Background</span>
          </el-col>
          <el-col :span="16">
            <el-input placeholder="Background" v-model="highlighted.bg" clearable></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7">
            <span>Text</span>
          </el-col>
          <el-col :span="16">
            <el-input placeholder="Hello" v-model="highlighted.text" clearable></el-input>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="7">
            <span>Title Color</span>
          </el-col>
          <el-col :span="8">
            <el-color-picker v-model="highlighted.color"></el-color-picker>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <span>
              <b>Disabled</b>
            </span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7">
            <span>Background</span>
          </el-col>
          <el-col :span="16">
            <el-input placeholder="Background" v-model="disabled.bg" clearable></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7">
            <span>Text</span>
          </el-col>
          <el-col :span="16">
            <el-input placeholder="Hello" v-model="disabled.text" clearable></el-input>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="7">
            <span>Title Color</span>
          </el-col>
          <el-col :span="8">
            <el-color-picker v-model="disabled.color"></el-color-picker>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <span>
              <b>Selected</b>
            </span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7">
            <span>Background</span>
          </el-col>
          <el-col :span="16">
            <el-input placeholder="Background" v-model="selected.bg" clearable></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7">
            <span>Text</span>
          </el-col>
          <el-col :span="16">
            <el-input placeholder="Hello" v-model="selected.text" clearable></el-input>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="7">
            <span>Title Color</span>
          </el-col>
          <el-col :span="8">
            <el-color-picker v-model="selected.color"></el-color-picker>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="Label">
        <el-row>
          <el-col :span="7">
            <span>Font Name</span>
          </el-col>
          <el-col :span="16">
            <el-input placeholder="font name" v-model="font" clearable></el-input>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="7">
            <span>Font Size</span>
          </el-col>
          <el-col :span="8">
            <el-input-number size="mini" v-model="size" :precision="3" :step="0.1"></el-input-number>
          </el-col>
        </el-row>

        <el-row>
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

        <el-row>
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

        <el-row>
          <el-col :span="12">
            <el-checkbox v-model="stroke.enabled">Stroke Enabled</el-checkbox>
          </el-col>
        </el-row>

        <el-row>
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

        <el-row>
          <el-col :span="7">
            <span>Stroke Color</span>
          </el-col>
          <el-col :span="8">
            <el-color-picker :disabled="!stroke.enabled" v-model="stroke.color"></el-color-picker>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-checkbox v-model="shadow.enabled">Shadow Enabled</el-checkbox>
          </el-col>
        </el-row>

        <el-row>
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

        <el-row>
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

        <el-row>
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
      </el-tab-pane>
      <el-tab-pane label="Sprite">
        <el-row>
          <el-col :span="7">
            <span>Color</span>
          </el-col>
          <el-col :span="8">
            <el-color-picker v-model="color" show-alpha></el-color-picker>
          </el-col>
        </el-row>

        <el-row>
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

        <el-row>
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

        <el-row>
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
      </el-tab-pane>
    </el-tabs>
  </el-collapse-item>
</template>


<script>
/* eslint-disable */
import Global from "../Global";
let className = "CCControlButton";
export default {
  props: {
    message: {
      type: String
    }
  },
  data() {
    return {
      zoom: true,
      enabled: true,
      radio: "Button",
      color: "rgba(255,255,255,1)",
      font: "",
      size: 10,
      align: { h: 0, v: 0 },
      dim: { w: 0, h: 0 },
      normal: { bg: false, text: "", color: "#000000" },
      disabled: { bg: false, text: "", color: "#000000" },
      highlighted: { bg: false, text: "", color: "#000000" },
      selected: { bg: false, text: "", color: "#000000" },
      stroke: { enabled: false, size: 0, color: "#000000" },
      shadow: { enabled: false, offset: { w: 0, h: 0 }, opacity: 0, blur: 0 },
      insets: { t: 0, l: 0, b: 0, r: 0 },
      preferred: { w: 0, h: 0 }
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
    },
    font: function(value) {
      window.cc.CanvasEditor.getParser(className).onHandleProp(
        Global.selectedNode.ref,
        "font",
        value
      );
    },
    size: function(value) {
      window.cc.CanvasEditor.getParser(className).onHandleProp(
        Global.selectedNode.ref,
        "size",
        value
      );
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
    preferred: {
      handler(value) {
        window.cc.CanvasEditor.getParser(className).onHandleProp(
          Global.selectedNode.ref,
          "preferred",
          value
        );
      },
      deep: true
    },
    normal: {
      handler(value) {
        window.cc.CanvasEditor.getParser(className).onHandleProp(
          Global.selectedNode.ref,
          "normal",
          value
        );
      },
      deep: true
    },
    selected: {
      handler(value) {
        window.cc.CanvasEditor.getParser(className).onHandleProp(
          Global.selectedNode.ref,
          "selected",
          value
        );
      },
      deep: true
    },
    highlighted: {
      handler(value) {
        window.cc.CanvasEditor.getParser(className).onHandleProp(
          Global.selectedNode.ref,
          "highlighted",
          value
        );
      },
      deep: true
    },
    selected: {
      handler(value) {
        window.cc.CanvasEditor.getParser(className).onHandleProp(
          Global.selectedNode.ref,
          "selected",
          value
        );
      },
      deep: true
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
    stroke: {
      handler(value) {
        window.cc.CanvasEditor.getParser(className).onHandleProp(
          Global.selectedNode.ref,
          "stroke",
          value
        );
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
</style>