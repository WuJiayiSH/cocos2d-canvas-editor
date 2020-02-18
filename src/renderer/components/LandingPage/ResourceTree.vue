<template>
  <div>
    <div>
      <v-contextmenu ref="contextmenu">
        <v-contextmenu-item @click="handleClickOpenWithExternalApp">Open With External App</v-contextmenu-item>
        <v-contextmenu-item @click="handleClickShowInFolder">Show in Folder</v-contextmenu-item>
      </v-contextmenu>
    </div>

    <el-tree
      :data="data"
      :props="defaultProps"
      ref="tree"
      @node-click="handleNodeClick"
      @node-contextmenu="handleNodeContextmenu"
      highlight-current
      node-key="id"
      default-expand-all
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <i :class="data.icon"></i>
        <span @dblclick="handleNodeDoubleClick()">{{ node.label }}</span>
      </span>
    </el-tree>
  </div>
</template>

<script>
/* eslint-disable */
import Global from "../Global";
let id = 10000;
let fs = require("fs");
let path = require("path");
export default {
  props: {
    message: {
      type: String
    }
  },
  watch: {
    message: function(message) {
      // console.log('resource-tree boardcastMessage changed', message)
      let command = message.split(":")[1];
      if (command === "refreshLeftAside") {
        this.handleMessageRefreshResourceTree();
      }
    }
  },
  mounted() {
    this.handleMessageRefreshResourceTree();
  },
  data() {
    return {
      data: Global.resourceTreeData,
      defaultProps: {
        children: "children",
        path: "path",
        label: "label",
        icon: "icon",
        type: "type"
      }
    };
  },
  methods: {
    handleNodeClick(data) {
      Global.selectedResource = data;
      this.$emit("handleMessage", "selectedResourceChanged");
    },
    handleNodeDoubleClick() {
      let data = Global.selectedResource;
      if (data.type === "ccc") {
        let cc = window.cc;
        Global.selectedCCCFile = data.path;
        let nodeTreeData = JSON.parse(fs.readFileSync(data.path, "utf-8"));
        cc.Director.getInstance()
          .getRunningScene()
          .removeAllChildren(true);
        let nodeTreeDataRoot = [];
        for (let i = 0; i < nodeTreeData.data.length; i++) {
          Global.deserializeNodeTree(nodeTreeData.data[i], {
            ref: cc.Director.getInstance().getRunningScene(),
            children: nodeTreeDataRoot
          });
        }
        // reset undo stack
        Global.nodeTreeData = nodeTreeDataRoot;
        Global.undoStack.length = Global.undoIndex = 0;
        document.title = Global.selectedCCCFile;
        Global.undoStack[Global.undoIndex++] = Global.serializeNodeTree({
          children: Global.nodeTreeData
        });
      }
    },
    handleMessageRefreshResourceTree() {
      this.$refs.tree.data.length = 0;
      let root = Global.resourcePath;
      if (!root) {
        root = path.join(
          __dirname,
          "..",
          "..",
          "..",
          "..",
          "static",
          "runtime",
          "res"
        );
      }
      let readDirSync = node => {
        let dirs = fs.readdirSync(node.path);
        dirs.forEach((fileOrDir, index) => {
          let info = fs.statSync(node.path + "/" + fileOrDir);
          if (info.isDirectory()) {
            const child = {
              type: "folder",
              icon: "el-icon-folder",
              id: id++,
              label: fileOrDir,
              children: [],
              path: path.join(node.path, fileOrDir)
            };
            if (node.children) {
              node.children.push(child);
            } else {
              this.$refs.tree.data.push(child);
            }
            readDirSync(child);
          } else {
            let fileOrDirLowerCase = fileOrDir.toLowerCase();
            if (
              fileOrDirLowerCase.endsWith(".png") ||
              fileOrDirLowerCase.endsWith(".jpg") ||
              fileOrDirLowerCase.endsWith(".jpeg") ||
              fileOrDirLowerCase.endsWith(".tif")
            ) {
              const child = {
                type: "image",
                icon: "el-icon-picture",
                id: id++,
                label: fileOrDir,
                children: [],
                path: path.join(node.path, fileOrDir)
              };
              if (node.children) {
                node.children.push(child);
              } else {
                this.$refs.tree.data.push(child);
              }
            }

            if (fileOrDirLowerCase.endsWith(".ccc.json")) {
              const child = {
                type: "ccc",
                icon: "el-icon-document",
                id: id++,
                label: fileOrDir,
                children: [],
                path: path.join(node.path, fileOrDir)
              };
              if (node.children) {
                node.children.push(child);
              } else {
                this.$refs.tree.data.push(child);
              }
            }
          }
        });
      };

      readDirSync({ path: root });
    },
    handleNodeContextmenu(event, data, node, component) {
      Global.selectedResource = data;
      this.$emit("handleMessage", "selectedResourceChanged");
      this.$refs.contextmenu.show({
        top: event.pageY,
        left: event.pageX
      });
    },
    handleClickShowInFolder() {
      const { shell } = require("electron").remote;
      shell.showItemInFolder(Global.selectedResource.path);
    },
    handleClickOpenWithExternalApp() {
      const { shell } = require("electron").remote;
      shell.openItem(Global.selectedResource.path);
    }
  }
};
</script>

<style scoped>
</style>
