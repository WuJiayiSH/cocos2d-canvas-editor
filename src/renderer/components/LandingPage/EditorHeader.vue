<template>
  <div>
    <el-button size="mini" icon="el-icon-folder-opened" @click="handleClickOpenFolder"></el-button>
    <el-divider direction="vertical"></el-divider>
    <el-button-group>
      <el-button size="mini" icon="el-icon-document-add" @click="handleClickNewCCC"></el-button>
      <el-button size="mini" icon="el-icon-download" @click="handleClickSave"></el-button>
      <el-button size="mini" icon="el-icon-close" @click="handleClickClose"></el-button>
    </el-button-group>
    <el-divider direction="vertical"></el-divider>
    <el-button-group>
      <el-button size="mini" icon="el-icon-back" @click="handleClickUndo"></el-button>
      <el-button size="mini" icon="el-icon-right" @click="handleClickRedo"></el-button>
    </el-button-group>

    <el-divider direction="vertical"></el-divider>
    <el-button-group>
      <el-button size="mini" icon="el-icon-zoom-in" @click="handleClickZoomIn"></el-button>
      <el-button size="mini" icon="el-icon-c-scale-to-original" @click="handleClickZoomReset"></el-button>
      <el-button size="mini" icon="el-icon-zoom-out" @click="handleClickZoomOut"></el-button>
    </el-button-group>
    <el-divider direction="vertical"></el-divider>
    <el-dropdown @command="handleCommand">
      <el-button size="mini">
        {{designResW}}x{{designResH}}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="450x800">450x800</el-dropdown-item>
        <el-dropdown-item command="640x960">640x960</el-dropdown-item>
        <el-dropdown-item command="640x1136">640x1136</el-dropdown-item>
        <el-dropdown-item command="720x1280">720x1280</el-dropdown-item>
        <el-dropdown-item command="750x1334">750x1334</el-dropdown-item>
        <el-dropdown-item command="768x1024">768x1024</el-dropdown-item>
        <el-dropdown-item command="1080x1920">1080x1920</el-dropdown-item>

        <el-dropdown-item divided command="800x450">800x450</el-dropdown-item>
        <el-dropdown-item command="960x640">960x640</el-dropdown-item>
        <el-dropdown-item command="1024x768">1024x768</el-dropdown-item>
        <el-dropdown-item command="1136x640">1136x640</el-dropdown-item>
        <el-dropdown-item command="1280x720">1280x720</el-dropdown-item>
        <el-dropdown-item command="1334x750">1334x750</el-dropdown-item>
        <el-dropdown-item command="1920x1080">1920x1080</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
/* eslint-disable */
import Global from "../Global";
export default {
  props: {
    message: {
      type: String
    }
  },
  watch: {
    message: function(message) {
      // console.log('editor-header boardcastMessage changed', message)
    }
  },
  data() {
    return {
      designResW: 800,
      designResH: 450
    };
  },
  methods: {
    handleClickZoomReset() {
      this.setResolution(this.designResW, this.designResH);
    },
    handleClickZoomIn() {
      let cc = window.cc;
      let frame = cc.EGLView.getInstance()._frame;
      let style = frame.style;
      let width =
        Number(style.width.substring(0, style.width.length - 2)) * 1.25;
      let height =
        Number(style.width.substring(0, style.width.length - 2)) * 1.25;
      style.width = width + "px";
      style.height = height + "px";
      let styleParent = frame.parentNode.style;
      styleParent.width = width * 1.25 + "px";
      styleParent.height = height * 1.25 + "px";
      cc.EGLView.getInstance().setDesignResolutionSize(
        this.designResW,
        this.designResH,
        cc.RESOLUTION_POLICY.SHOW_ALL
      );
      this.$emit("handleMessage", "updateNodeController");
    },
    handleClickZoomOut() {
      let cc = window.cc;
      let frame = cc.EGLView.getInstance()._frame;
      let style = frame.style;
      let width =
        Number(style.width.substring(0, style.width.length - 2)) / 1.25;
      let height =
        Number(style.width.substring(0, style.width.length - 2)) / 1.25;
      style.width = width + "px";
      style.height = height + "px";
      let styleParent = frame.parentNode.style;
      styleParent.width = width * 1.25 + "px";
      styleParent.height = height * 1.25 + "px";
      cc.EGLView.getInstance().setDesignResolutionSize(
        this.designResW,
        this.designResH,
        cc.RESOLUTION_POLICY.SHOW_ALL
      );
      this.$emit("handleMessage", "updateNodeController");
    },
    handleCommand(command) {
      let size = command.split("x");
      this.setResolution(Number(size[0]), Number(size[1]));
    },
    setResolution(w, h) {
      this.designResW = w;
      this.designResH = h;
      let cc = window.cc;
      let frame = cc.EGLView.getInstance()._frame;
      let style = frame.style;
      style.width = w + "px";
      style.height = h + "px";
      let styleParent = frame.parentNode.style;
      styleParent.width = w * 1.25 + "px";
      styleParent.height = h * 1.25 + "px";
      cc.EGLView.getInstance().setDesignResolutionSize(
        w,
        h,
        cc.RESOLUTION_POLICY.SHOW_ALL
      );
      this.$emit("handleMessage", "updateNodeController");
    },
    handleClickNewCCC() {
      if (document.title.endsWith("*")) {
        this.$message("Save or close current file");
        return;
      }
      let cc = window.cc;
      Global.selectedCCCFile = null;
      Global.selectedNode = null;
      let nodeTreeData = {
        data: [
          {
            children: [],
            cls: "CCLayer",
            data: [{}]
          }
        ]
      };
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
      Global.nodeTreeData = nodeTreeDataRoot;
      Global.undoStack.length = Global.undoIndex = 0;
      document.title = "Untitled *";
      Global.undoStack[Global.undoIndex++] = Global.serializeNodeTree({
        children: Global.nodeTreeData
      });
    },
    handleClickOpenFolder() {
      if (document.title.endsWith("*")) {
        this.$message("Save or close current file");
        return;
      }
      const ipcRenderer = require("electron").ipcRenderer;
      ipcRenderer.send("openDirectoryDialog");
      ipcRenderer.once("selectedDirectory", (e, path) => {
        if (!path) {
          return;
        }
        let cc = window.cc;
        let searchPaths = [];
        searchPaths.push("file://" + path);
        cc.FileUtils.getInstance().setSearchPaths(searchPaths);
        Global.resourcePath = path;

        cc.Director.getInstance()
          .getRunningScene()
          .removeAllChildren(true);
        Global.nodeTreeData = [];
        this.$emit("handleMessage", "refreshLeftAside");
      });
    },
    handleClickSave() {
      if (Global.nodeTreeData.length === 0) {
        return;
      }

      if (!Global.selectedCCCFile) {
        const ipcRenderer = require("electron").ipcRenderer;
        ipcRenderer.send("openSaveDialog");
        ipcRenderer.once("selectedFile", (e, path) => {
          if (!path) {
            return;
          }
          if (!path.toLowerCase().endsWith(".ccc.json")) {
            path += ".ccc.json";
          }
          Global.selectedCCCFile = path;
          this.handleClickSave();
        });
        return;
      }

      let root = Global.serializeNodeTree({ children: Global.nodeTreeData });
      root.data = root.children;
      delete root.children;
      let fs = require("fs");
      if (Global.selectedCCCFile) {
        try {
          let fileDesc = fs.openSync(Global.selectedCCCFile, "w");
          fs.write(fileDesc, JSON.stringify(root, null, 4));
          document.title = Global.selectedCCCFile;
        } catch (err) {
          console.log(err);
        }
      }
    },
    handleClickClose() {
      if (document.title.endsWith("*")) {
        this.$confirm("Close current file without saving?", "Warning", {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning"
        })
          .then(() => {
            document.title = "Untitled";
            this.handleClickClose();
          })
          .catch(() => {});
        return;
      }
      let cc = window.cc;
      cc.Director.getInstance()
        .getRunningScene()
        .removeAllChildren(true);
      Global.nodeTreeData = [];
      document.title = "Untitled";
      this.$emit("handleMessage", "refreshLeftAside");
    },
    handleClickUndo() {
      if (Global.undoIndex <= 1) {
        return;
      }
      Global.undoIndex--;
      let cc = window.cc;
      let stepData = Global.undoStack[Global.undoIndex - 1];
      cc.Director.getInstance()
        .getRunningScene()
        .removeAllChildren(true);
      let nodeTreeDataRoot = [];
      for (let i = 0; i < stepData.children.length; i++) {
        Global.deserializeNodeTree(stepData.children[i], {
          ref: cc.Director.getInstance().getRunningScene(),
          children: nodeTreeDataRoot
        });
      }
      Global.nodeTreeData = nodeTreeDataRoot;
      this.$emit("handleMessage", "refreshLeftAside");
    },
    handleClickRedo() {
      if (Global.undoIndex < Global.undoStack.length) {
        Global.undoIndex++;
        let cc = window.cc;
        let stepData = Global.undoStack[Global.undoIndex - 1];
        cc.Director.getInstance()
          .getRunningScene()
          .removeAllChildren(true);
        let nodeTreeDataRoot = [];
        for (let i = 0; i < stepData.children.length; i++) {
          Global.deserializeNodeTree(stepData.children[i], {
            ref: cc.Director.getInstance().getRunningScene(),
            children: nodeTreeDataRoot
          });
        }
        Global.nodeTreeData = nodeTreeDataRoot;
        this.$emit("handleMessage", "refreshLeftAside");
      }
    }
  }
};
</script>

<style scoped>
</style>
