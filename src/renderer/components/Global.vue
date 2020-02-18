<script>
/* eslint-disable */
let selectedNode = null; // current selected node(data) of node tree
let copiedNode = null; // current copied node(data) in node tree
let selectedResource = null; // current selected node(data) of resource tree
let selectedCCCFile = null; // current ccc file
let resourceTreeData = []; // cached resource tree data
let resourcePath = null; // root path of proj
let nodeTreeData = []; // cached node tree data
let nodeTreeID = 10000;
let undoStack = [];
let undoIndex = 0;
const serializeNodeTree = nodeData => {
  let cc = window.cc;
  let root = { children: [] };
  let getObjectFromData = (from, to) => {
    if (from.ref) {
      let obj = cc.CanvasEditor.writeToObject(from.ref, from.label);
      for (let key in obj) {
        to[key] = obj[key];
      }
    }
    for (let i = 0; i < from.children.length; i++) {
      let newObject = { children: [] };
      to.children.push(newObject);
      getObjectFromData(from.children[i], newObject);
    }
  };
  getObjectFromData(nodeData, root);
  return root;
};
const deserializeNodeTree = (jsonData, nodeData) => {
  // deserialize
  let cc = window.cc;
  let readNode = (from, to) => {
    let parent = to.ref;
    let ref = cc.CanvasEditor.readFromObject(from);
    parent.addChild(ref);
    const child = { id: nodeTreeID++, label: from.cls, children: [], ref: ref };
    to.children.push(child);
    for (let i = 0; i < from.children.length; i++) {
      readNode(from.children[i], child);
    }
  };
  readNode(jsonData, nodeData);
};
export default {
  selectedNode,
  copiedNode,
  selectedResource,
  selectedCCCFile,
  resourceTreeData,
  resourcePath,
  nodeTreeData,
  nodeTreeID,
  serializeNodeTree,
  deserializeNodeTree,
  undoStack,
  undoIndex
};
</script>