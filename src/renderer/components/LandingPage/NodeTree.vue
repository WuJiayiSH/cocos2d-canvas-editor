<template>
  <div>
    <div>
      <v-contextmenu ref="contextmenu">
        <v-contextmenu-submenu title="Add">
          <v-contextmenu-submenu title="Node">
            <v-contextmenu-item @click="addCCNode('CCNode')">CCNode</v-contextmenu-item>
            <v-contextmenu-item @click="addCCNode('CCNodeWidget')">CCNodeWidget</v-contextmenu-item>
            <v-contextmenu-item @click="addCCNode('CCLayer')">CCLayer</v-contextmenu-item>
            <v-contextmenu-item @click="addCCNode('CCLayerColor')">CCLayerColor</v-contextmenu-item>
            <v-contextmenu-item @click="addCCNode('CCLayerGradient')">CCLayerGradient</v-contextmenu-item>
            <v-contextmenu-item @click="addCCNode('CCTableView')">CCTableView</v-contextmenu-item>
          </v-contextmenu-submenu>
          <v-contextmenu-submenu title="Sprite">
            <v-contextmenu-item @click="addCCNode('CCSprite')">CCSprite</v-contextmenu-item>
            <v-contextmenu-item @click="addCCNode('CCScale9Sprite')">CCScale9Sprite</v-contextmenu-item>
          </v-contextmenu-submenu>

          <v-contextmenu-submenu title="Label">
            <v-contextmenu-item @click="addCCNode('CCLabelTTF')">CCLabelTTF</v-contextmenu-item>
            <v-contextmenu-item @click="addCCNode('CCLabelBMFont')">CCLabelBMFont</v-contextmenu-item>
          </v-contextmenu-submenu>

          <v-contextmenu-submenu title="Control">
            <v-contextmenu-item @click="addCCNode('CCControlButton')">CCControlButton</v-contextmenu-item>
            <v-contextmenu-item @click="addCCNode('CCControlSlider')">CCControlSlider</v-contextmenu-item>
            <v-contextmenu-item @click="addCCNode('CCControlSwitch')">CCControlSwitch</v-contextmenu-item>
          </v-contextmenu-submenu>

          <v-contextmenu-submenu title="Misc">
            <v-contextmenu-item @click="addCCNode('CCParticleSystem')">CCParticleSystem</v-contextmenu-item>
            <v-contextmenu-item @click="addCCNode('CCSkeletonAnimation')">Spine</v-contextmenu-item>
            <v-contextmenu-item @click="addCustomNode()">Custom Node</v-contextmenu-item>
          </v-contextmenu-submenu>
        </v-contextmenu-submenu>
        <v-contextmenu-item @click="handleClickCut">Cut</v-contextmenu-item>
        <v-contextmenu-item @click="handleClickCopy">Copy</v-contextmenu-item>
        <v-contextmenu-item @click="handleClickPaste">Paste</v-contextmenu-item>
        <v-contextmenu-item @click="handleClickDelete">Delete</v-contextmenu-item>
      </v-contextmenu>
    </div>

    <el-tree
      :data="data"
      :props="defaultProps"
      ref="tree"
      @node-click="handleNodeClick"
      @node-contextmenu="handleNodeContextmenu"
      highlight-current
      :expand-on-click-node="false"
      node-key="id"
      default-expand-all
      draggable
      @node-drop="handleDrop"
    >
      <span class="custom-tree-node" slot-scope="{ node }">
        <span>{{ node.label }}</span>
      </span>
    </el-tree>
  </div>
</template>

<script>
/* eslint-disable */
import Global from "../Global";

let selectedNode;
let selectedData;

export default {
  props: {
    message: {
      type: String
    }
  },
  watch: {
    message: function(message) {
      // console.log('node-tree boardcastMessage changed', message)
      let command = message.split(":")[1];
      if (command === "refreshLeftAside") {
        this.data = Global.nodeTreeData;
      }
    }
  },
  created() {
    const ipcRenderer = require("electron").ipcRenderer;
    ipcRenderer.on("copy", this.handleClickCopy);
    ipcRenderer.on("paste", this.handleClickPaste);
    ipcRenderer.on("cut", this.handleClickCut);
    ipcRenderer.on("delete", this.handleClickDelete);
  },
  destroyed() {
    const ipcRenderer = require("electron").ipcRenderer;
    ipcRenderer.removeListener("copy", this.handleClickCopy);
    ipcRenderer.removeListener("paste", this.handleClickPaste);
    ipcRenderer.removeListener("cut", this.handleClickCut);
    ipcRenderer.removeListener("delete", this.handleClickDelete);
  },
  data() {
    return {
      data: Global.nodeTreeData,
      defaultProps: {
        children: "children",
        ref: "ref",
        label: "label"
      }
    };
  },
  methods: {
    handleNodeClick(data, node) {
      Global.selectedNode = data;
      selectedData = data;
      selectedNode = node;
      this.$emit("handleMessage", "selectedNodeChanged");
    },
    handleClickDelete() {
      if (!selectedNode) {
        return;
      }
      if (!selectedData) {
        return;
      }

      selectedData.ref.removeFromParent();
      // remove tree node
      const parent = selectedNode.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === selectedData.id);
      children.splice(index, 1);
      selectedNode = null;
      selectedData = null;
      this.saveAsUndoStack();
    },
    handleClickCut() {
      this.handleClickCopy();
      this.handleClickDelete();
      this.saveAsUndoStack();
    },
    handleClickCopy() {
      if (!selectedNode) {
        return;
      }
      if (!selectedData) {
        return;
      }
      // serialize to object
      Global.copiedNode = Global.serializeNodeTree(selectedData);
    },
    handleClickPaste() {
      if (!selectedNode) {
        return;
      }
      if (!selectedData) {
        return;
      }
      if (!Global.copiedNode) {
        return;
      }
      // deserialize from object
      Global.deserializeNodeTree(Global.copiedNode, selectedData);
      this.saveAsUndoStack();
    },
    addCCNode(className) {
      let cc = window.cc;
      let parser = cc.CanvasEditor.getParser(className);
      let ref = parser.loadCCNode();
      const child = {
        id: Global.nodeTreeID++,
        label: className,
        children: [],
        ref: ref
      };
      if (selectedData) {
        selectedData.ref.addChild(ref);
        selectedData.children.push(child);
      } else {
        cc.Director.getInstance()
          .getRunningScene()
          .addChild(ref);
        this.$refs.tree.data.push(child);
      }
      this.saveAsUndoStack();
    },
    addCustomNode() {
      this.$prompt("Please input your class name", "Tip", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel"
      })
        .then(({ value }) => {
          this.addCCNode(value)
        })
        .catch(() => {
        });
    },
    handleNodeContextmenu(event, data, node, component) {
      Global.selectedNode = data;
      selectedData = data;
      selectedNode = node;
      this.$emit("handleMessage", "selectedNodeChanged");
      this.$refs.contextmenu.show({
        top: event.pageY,
        left: event.pageX
      });
    },
    handleDrop(draggingNode, dropNode, dropType, ev) {
      let ref = draggingNode.data.ref;
      ref.removeFromParent();
      if (dropType === "before") {
        let parent = dropNode.data.ref.getParent();
        parent.addChild(ref);
        let children = parent.getChildren();
        children.splice(children.length - 1, 1);
        for (let i = 0; i < children.length; i++) {
          if (children[i] === dropNode.data.ref) {
            children.splice(i, 0, ref);
            break;
          }
        }
        this.saveAsUndoStack();
      } else if (dropType === "inner") {
        dropNode.data.ref.addChild(ref);
        this.saveAsUndoStack();
      } else if (dropType === "after") {
        let parent = dropNode.data.ref.getParent();
        parent.addChild(ref);
        let children = parent.getChildren();
        children.splice(children.length - 1, 1);
        for (let i = 0; i < children.length; i++) {
          if (children[i] === dropNode.data.ref) {
            children.splice(i + 1, 0, ref);
            break;
          }
        }
        this.saveAsUndoStack();
      }
    },
    saveAsUndoStack() {
      document.title = (Global.selectedCCCFile || "Untitled") + " *";
      Global.undoStack[Global.undoIndex++] = Global.serializeNodeTree({
        children: Global.nodeTreeData
      });
    }
  }
};
</script>

<style scoped>
</style>
