<template>
  <el-container>
    <el-header>
      <editor-header @handleMessage="handleMessage" :message="boardcastMessage"></editor-header>
    </el-header>
    <el-container>
      <el-aside width="240px">
        <div align="center">
          <el-radio-group v-model="radio" size="mini">
            <el-radio-button label="Resource"></el-radio-button>
            <el-radio-button label="Hierachy"></el-radio-button>
          </el-radio-group>
        </div>
        <resource-tree
          v-if="radio === 'Resource'"
          @handleMessage="handleMessage"
          :message="boardcastMessage"
        ></resource-tree>
        <node-tree
          v-if="radio === 'Hierachy'"
          label="Hierachy"
          @handleMessage="handleMessage"
          :message="boardcastMessage"
        ></node-tree>
      </el-aside>
      <el-container>
        <el-main>
          <DIV style="width:800px;height:450px;margin:0 auto">
            <DIV style="width:800px;height:450px;margin:0 auto">
              <DIV style="width:800px;height:450px;margin:0 auto">
                <canvas id="gameCanvas" width="800" height="450"></canvas>
              </DIV>
            </DIV>
          </DIV>
          <node-controller @handleMessage="handleMessage" :message="boardcastMessage"></node-controller>
        </el-main>
        <!-- <el-footer></el-footer> -->
      </el-container>
      <el-aside width="410px">
        <el-collapse v-model="vNodePanelArr">
          <c-c-node-panel
            v-if="vNodePanels.CCNode"
            @handleMessage="handleMessage"
            :message="boardcastMessage"
          ></c-c-node-panel>
          <c-c-layer-panel
            v-if="vNodePanels.CCLayer"
            @handleMessage="handleMessage"
            :message="boardcastMessage"
          ></c-c-layer-panel>
          <c-c-layer-color-panel
            v-if="vNodePanels.CCLayerColor"
            @handleMessage="handleMessage"
            :message="boardcastMessage"
          ></c-c-layer-color-panel>
          <c-c-layer-gradient-panel
            v-if="vNodePanels.CCLayerGradient"
            @handleMessage="handleMessage"
            :message="boardcastMessage"
          ></c-c-layer-gradient-panel>
          <c-c-sprite-panel
            v-if="vNodePanels.CCSprite"
            @handleMessage="handleMessage"
            :message="boardcastMessage"
          ></c-c-sprite-panel>
          <c-c-scale9-sprite-panel
            v-if="vNodePanels.CCScale9Sprite"
            @handleMessage="handleMessage"
            :message="boardcastMessage"
          ></c-c-scale9-sprite-panel>
          <c-c-label-t-t-f-panel
            v-if="vNodePanels.CCLabelTTF"
            @handleMessage="handleMessage"
            :message="boardcastMessage"
          ></c-c-label-t-t-f-panel>
          <c-c-label-b-m-font-panel
            v-if="vNodePanels.CCLabelBMFont"
            @handleMessage="handleMessage"
            :message="boardcastMessage"
          ></c-c-label-b-m-font-panel>
          <c-c-control-button-panel
            v-if="vNodePanels.CCControlButton"
            @handleMessage="handleMessage"
            :message="boardcastMessage"
          ></c-c-control-button-panel>
          <c-c-control-slider-panel
            v-if="vNodePanels.CCControlSlider"
            @handleMessage="handleMessage"
            :message="boardcastMessage"
          ></c-c-control-slider-panel>
          <c-c-control-switch-panel
            v-if="vNodePanels.CCControlSwitch"
            @handleMessage="handleMessage"
            :message="boardcastMessage"
          ></c-c-control-switch-panel>
           <c-c-node-widget-panel
            v-if="vNodePanels.CCNodeWidget"
            @handleMessage="handleMessage"
            :message="boardcastMessage"
          ></c-c-node-widget-panel>
          <c-c-skeleton-animation-panel
            v-if="vNodePanels.CCSkeletonAnimation"
            @handleMessage="handleMessage"
            :message="boardcastMessage"
          ></c-c-skeleton-animation-panel>
          <c-c-particle-system-panel
            v-if="vNodePanels.CCParticleSystem"
            @handleMessage="handleMessage"
            :message="boardcastMessage"
          ></c-c-particle-system-panel>
          <image-panel
            v-if="vResPanels.image"
            @handleMessage="handleMessage"
            :message="boardcastMessage"
          ></image-panel>
        </el-collapse>
      </el-aside>
    </el-container>
  </el-container>
</template>


<script>
/* eslint-disable */
import Global from "./Global";
import NodeTree from "./LandingPage/NodeTree";
import ResourceTree from "./LandingPage/ResourceTree";
import EditorHeader from "./LandingPage/EditorHeader";
import CCNodePanel from "./NodePanel/CCNodePanel";
import CCLayerPanel from "./NodePanel/CCLayerPanel";
import CCLayerColorPanel from "./NodePanel/CCLayerColorPanel";
import CCLayerGradientPanel from "./NodePanel/CCLayerGradientPanel";
import CCSpritePanel from "./NodePanel/CCSpritePanel";
import CCScale9SpritePanel from "./NodePanel/CCScale9SpritePanel";
import CCLabelTTFPanel from "./NodePanel/CCLabelTTFPanel";
import CCLabelBMFontPanel from "./NodePanel/CCLabelBMFontPanel";
import CCControlButtonPanel from "./NodePanel/CCControlButtonPanel";
import CCControlSliderPanel from "./NodePanel/CCControlSliderPanel";
import CCControlSwitchPanel from "./NodePanel/CCControlSwitchPanel";
import CCNodeWidgetPanel from "./NodePanel/CCNodeWidgetPanel";
import CCSkeletonAnimationPanel from "./NodePanel/CCSkeletonAnimationPanel";
import CCParticleSystemPanel from "./NodePanel/CCParticleSystemPanel";
import ImagePanel from "./ResourcePanel/ImagePanel";
import NodeController from "./LandingPage/NodeController";
let globalMessageId = 0;
export default {
  components: {
    NodeController,
    ImagePanel,
    NodeTree,
    ResourceTree,
    EditorHeader,
    CCNodePanel,
    CCLayerPanel,
    CCLayerColorPanel,
    CCLayerGradientPanel,
    CCSpritePanel,
    CCLabelBMFontPanel,
    CCLabelTTFPanel,
    CCScale9SpritePanel,
    CCControlButtonPanel,
    CCControlSliderPanel,
    CCControlSwitchPanel,
    CCNodeWidgetPanel,
    CCSkeletonAnimationPanel,
    CCParticleSystemPanel
  },
  data() {
    return {
      boardcastMessage: "",
      radio: "Resource",
      vNodePanels: {},
      vNodePanelArr: [
        "CCNode",
        "CCLayer",
        "CCLayerColor",
        "CCLayerGradient",
        "CCSprite",
        "CCLabelBMFont",
        "CCLabelTTF",
        "CCScale9Sprite",
        "CCControlButton",
        "CCControlSlider",
        "CCControlSwitch",
        "CCNodeWidget",
        "CCSkeletonAnimation",
        "CCParticleSystem"
      ],
      vResPanels: {
        image: false
      }
    };
  },
  mounted() {
    const loading = this.$loading({
      lock: true,
      text: "Loading",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.7)"
    });
    let interval = setInterval(() => {
      if (
        window.cc &&
        window.cc.director &&
        window.cc.director.getRunningScene()
      ) {
        loading.close();
        clearInterval(interval);
      }
    }, 100);
  },
  methods: {
    handleMessageSelectedNodeChanged() {
      for (let key in this.vNodePanels) {
        this.vNodePanels[key] = false;
      }

      let cc = window.cc;
      let parser = cc.CanvasEditor.getParser(Global.selectedNode.label);
      this.vNodePanels[parser.getClassName()] = true;
      while (parser.getSuperClassName()) {
        parser = cc.CanvasEditor.getParser(parser.getSuperClassName());
        this.vNodePanels[parser.getClassName()] = true;
      }
      this.vResPanels.image = false;
    },
    handleMessageSelectedResourceChanged() {
      for (let key in this.vNodePanels) {
        this.vNodePanels[key] = false;
      }
      // it is a file or folder from resource tree
      if (Global.selectedResource.path) {
        if (Global.selectedResource.type === "image") {
          this.vResPanels.image = true;
        }
      }
    },
    handleMessage(message) {
      let command = message.split(":")[0];
      if (command === "selectedNodeChanged") {
        this.handleMessageSelectedNodeChanged();
      } else if (command === "selectedResourceChanged") {
        this.handleMessageSelectedResourceChanged();
      } else if (command === "showResourceTree") {
        this.radio = "resource";
      } else if (command === "showNodeTree") {
        this.radio = "hierachy";
      }

      this.boardcastMessage = globalMessageId++ + ":" + message;
    }
  }
};
</script>
<style>
.el-header,
.el-footer {
  background-color: #f8f8f8;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #ffffff;
  color: #333;
  text-align: left;
  line-height: 30px;
  margin-left: 4px;
}

.el-main {
  background-color: #888888;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

html,
body,
#app,
.el-container {
  padding: 0px;
  margin: 0px;
  height: 100%;
  font-family: "Source Sans Pro", sans-serif;
  font-size: 12px;
}
</style>