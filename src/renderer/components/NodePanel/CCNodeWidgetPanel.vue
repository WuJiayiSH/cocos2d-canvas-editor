<template>
  <el-collapse-item title="CCNodeWidget" name="CCNodeWidget">
    <el-row class="panel-item">
      <el-col :span="7">
        <span>Left</span>
      </el-col>
      <el-col :span="9">
        <el-dropdown @command="handleType">
          <el-button size="mini">
            {{l===0?'Absolute':l===1?'Percent':'Ignore'}}
            <i
              class="el-icon-arrow-down el-icon--right"
            ></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="l0">Ignore</el-dropdown-item>
            <el-dropdown-item command="l1">Absolute</el-dropdown-item>
            <el-dropdown-item command="l2">Percent</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
      <el-col :span="8">
        <el-input-number size="mini" v-model="lVal" :precision="3" :step="0.1" :disabled="l<0"></el-input-number>
      </el-col>
    </el-row>

    <el-row class="panel-item">
      <el-col :span="7">
        <span>Right</span>
      </el-col>
      <el-col :span="9">
        <el-dropdown @command="handleType">
          <el-button size="mini">
            {{r===0?'Absolute':r===1?'Percent':'Ignore'}}
            <i
              class="el-icon-arrow-down el-icon--right"
            ></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="r0">Ignore</el-dropdown-item>
            <el-dropdown-item command="r1">Absolute</el-dropdown-item>
            <el-dropdown-item command="r2">Percent</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
      <el-col :span="8">
        <el-input-number size="mini" v-model="rVal" :precision="3" :step="0.1" :disabled="r<0"></el-input-number>
      </el-col>
    </el-row>

    <el-row class="panel-item">
      <el-col :span="7">
        <span>Horizontal Center</span>
      </el-col>
      <el-col :span="9">
        <el-dropdown @command="handleType">
          <el-button size="mini">
            {{h===0?'Absolute':h===1?'Percent':'Ignore'}}
            <i
              class="el-icon-arrow-down el-icon--right"
            ></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="h0">Ignore</el-dropdown-item>
            <el-dropdown-item command="h1">Absolute</el-dropdown-item>
            <el-dropdown-item command="h2">Percent</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
      <el-col :span="8">
        <el-input-number size="mini" v-model="hVal" :precision="3" :step="0.1" :disabled="h<0"></el-input-number>
      </el-col>
    </el-row>

    <el-row class="panel-item">
      <el-col :span="7">
        <span>Top</span>
      </el-col>
      <el-col :span="9">
        <el-dropdown @command="handleType">
          <el-button size="mini">
            {{t===0?'Absolute':t===1?'Percent':'Ignore'}}
            <i
              class="el-icon-arrow-down el-icon--right"
            ></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="t0">Ignore</el-dropdown-item>
            <el-dropdown-item command="t1">Absolute</el-dropdown-item>
            <el-dropdown-item command="t2">Percent</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
      <el-col :span="8">
        <el-input-number size="mini" v-model="tVal" :precision="3" :step="0.1" :disabled="t<0"></el-input-number>
      </el-col>
    </el-row>

    <el-row class="panel-item">
      <el-col :span="7">
        <span>Bottom</span>
      </el-col>
      <el-col :span="9">
        <el-dropdown @command="handleType">
          <el-button size="mini">
            {{b===0?'Absolute':b===1?'Percent':'Ignore'}}
            <i
              class="el-icon-arrow-down el-icon--right"
            ></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="b0">Ignore</el-dropdown-item>
            <el-dropdown-item command="b1">Absolute</el-dropdown-item>
            <el-dropdown-item command="b2">Percent</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
      <el-col :span="8">
        <el-input-number size="mini" v-model="bVal" :precision="3" :step="0.1" :disabled="b<0"></el-input-number>
      </el-col>
    </el-row>

    <el-row class="panel-item">
      <el-col :span="7">
        <span>Vertical Center</span>
      </el-col>
      <el-col :span="9">
        <el-dropdown @command="handleType">
          <el-button size="mini">
            {{v===0?'Absolute':v===1?'Percent':'Ignore'}}
            <i
              class="el-icon-arrow-down el-icon--right"
            ></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="v0">Ignore</el-dropdown-item>
            <el-dropdown-item command="v1">Absolute</el-dropdown-item>
            <el-dropdown-item command="v2">Percent</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
      <el-col :span="8">
        <el-input-number size="mini" v-model="vVal" :precision="3" :step="0.1" :disabled="v<0"></el-input-number>
      </el-col>
    </el-row>
  </el-collapse-item>
</template>


<script>
/* eslint-disable */
import Global from "../Global";
let className = "CCNodeWidget";
export default {
  props: {
    message: {
      type: String
    }
  },
  data() {
    return {
      l: 0,
      r: 0,
      b: 0,
      t: 0,
      v: 0,
      h: 0,
      lVal: 0,
      rVal: 0,
      bVal: 0,
      tVal: 0,
      vVal: 0,
      hVal: 0
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
    l: {
      handler(value) {
        window.cc.CanvasEditor.getParser(className).onHandleProp(
          Global.selectedNode.ref,
          "l",
          value
        );
        this.syncProp();
      },
      deep: true
    },
    r: {
      handler(value) {
        window.cc.CanvasEditor.getParser(className).onHandleProp(
          Global.selectedNode.ref,
          "r",
          value
        );
        this.syncProp();
      },
      deep: true
    },
    h: {
      handler(value) {
        window.cc.CanvasEditor.getParser(className).onHandleProp(
          Global.selectedNode.ref,
          "h",
          value
        );
        this.syncProp();
      },
      deep: true
    },
    lVal: {
      handler(value) {
        window.cc.CanvasEditor.getParser(className).onHandleProp(
          Global.selectedNode.ref,
          "lVal",
          value
        );
      },
      deep: true
    },
    rVal: {
      handler(value) {
        window.cc.CanvasEditor.getParser(className).onHandleProp(
          Global.selectedNode.ref,
          "rVal",
          value
        );
      },
      deep: true
    },
    hVal: {
      handler(value) {
        window.cc.CanvasEditor.getParser(className).onHandleProp(
          Global.selectedNode.ref,
          "hVal",
          value
        );
      },
      deep: true
    },
    t: {
      handler(value) {
        window.cc.CanvasEditor.getParser(className).onHandleProp(
          Global.selectedNode.ref,
          "t",
          value
        );
        this.syncProp();
      },
      deep: true
    },
    b: {
      handler(value) {
        window.cc.CanvasEditor.getParser(className).onHandleProp(
          Global.selectedNode.ref,
          "b",
          value
        );
        this.syncProp();
      },
      deep: true
    },
    v: {
      handler(value) {
        window.cc.CanvasEditor.getParser(className).onHandleProp(
          Global.selectedNode.ref,
          "v",
          value
        );
        this.syncProp();
      },
      deep: true
    },
    tVal: {
      handler(value) {
        window.cc.CanvasEditor.getParser(className).onHandleProp(
          Global.selectedNode.ref,
          "tVal",
          value
        );
      },
      deep: true
    },
    bVal: {
      handler(value) {
        window.cc.CanvasEditor.getParser(className).onHandleProp(
          Global.selectedNode.ref,
          "bVal",
          value
        );
      },
      deep: true
    },
    vVal: {
      handler(value) {
        window.cc.CanvasEditor.getParser(className).onHandleProp(
          Global.selectedNode.ref,
          "vVal",
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
    handleType(type) {
      this[type.substring(0, 1)] = Number(type.substring(1)) - 1;
    }
  }
};
</script>
<style scoped>
.panel-item {margin-bottom: 2px;}
</style>