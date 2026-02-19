import { o as openBlock, j as createElementBlock, a as createBaseVNode, bx as getRunnerConfigFromWindow, by as useToggle, m as computed, L as gql, bz as defineStore, i as ref, y as useRouter, an as useMutation, bA as RunAllSpecsDocument, aO as useQuery, bB as RunAllSpecsDataDocument, ak as isRunMode, aL as RUN_ALL_SPECS_KEY, d as defineComponent, F as Fragment, D as renderList, n as normalizeClass, t as toDisplayString, X as createTextVNode, b as unref, bC as commonjsGlobal, C as watch, aN as lodashExports, P as useElementSize, bD as shallowRef, c as createBlock, bE as Card, h as useI18n, bF as ScaffoldGeneratorStepOne_E2eExamplesDocument, A as onMounted, f as createVNode, E as normalizeStyle, w as withCtx, $ as _sfc_main$n, ba as StandardModalFooter, k as createCommentVNode, bG as ShikiHighlight, bH as _sfc_main$o, q as __unplugin_components_0$5, bI as useVModels, bJ as EmptyGenerator_MatchSpecFileDocument, bK as EmptyGenerator_GenerateSpecDocument, bL as whenever, r as resolveComponent, e as withModifiers, aB as Input, br as __unplugin_components_1, bM as __unplugin_components_1$1, a_ as createStaticVNode, bN as __unplugin_components_0$6, p as renderSlot, bO as _sfc_main$q, Y as withDirectives, Z as vModelText, M as isRef, _ as _export_sfc, bP as __unplugin_components_0$7, I as IconMagnifyingGlass, bc as useDebounce, bQ as debouncedWatch, bR as createSlots, ap as vShow, bS as __unplugin_components_0$8, bT as VueComponentGeneratorStepOne_GenerateSpecDocument, bU as VueComponentGeneratorStepOneDocument, bV as ComponentList_GetReactComponentsFromFileDocument, bW as ReactComponentGeneratorStepOne_GenerateSpecDocument, bX as ReactComponentGeneratorStepOneDocument, H as resolveDynamicComponent, bY as not, bZ as DialogOverlay, aA as _sfc_main$s, z as useSpecStore, b_ as SpecFilter_SetPreferencesDocument } from "./index-8631b600.js";
import { _ as __unplugin_components_0$4, p as posixify, g as getPathForPlatform } from "./box-open_x48-cc9a16a8.js";
import { _ as _sfc_main$p, b as _sfc_main$r } from "./SpecPatterns.vue_vue_type_script_setup_true_lang-0af37847.js";
const _hoisted_1$m = {
  height: "1em",
  width: "1em",
  style: { "min-width": "16px", "min-height": "16px" },
  viewBox: "0 0 16 16",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
};
const _hoisted_2$j = /* @__PURE__ */ createBaseVNode("path", {
  d: "M8 4V12M12 8H4",
  stroke: "#1B1E2E",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  class: "icon-dark"
}, null, -1);
const _hoisted_3$h = [
  _hoisted_2$j
];
function render$8(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$m, _hoisted_3$h);
}
const __unplugin_components_0$3 = { name: "cy-add-small_x16", render: render$8 };
let platform;
const getPlatform = () => {
  if (!platform) {
    platform = getRunnerConfigFromWindow().platform;
  }
  return platform;
};
const getRegexSeparator = () => getPlatform() === "win32" ? /\\/ : /\//;
const getSeparator = () => getPlatform() === "win32" ? "\\" : "/";
function buildSpecTree(specs, root = { name: "", isLeaf: false, children: [], id: "", highlightIndexes: [] }) {
  specs.forEach((spec) => buildSpecTreeRecursive(spec.relative, root, spec));
  collapseEmptyChildren(root);
  return root;
}
function getHighlightIndexes(node) {
  var _a;
  if (!((_a = node.data) == null ? void 0 : _a.fuzzyIndexes)) {
    return [];
  }
  const { relative: relativeIndexes, baseName: baseNameIndexes } = node.data.fuzzyIndexes;
  if (node.isLeaf && baseNameIndexes.length > 0) {
    return baseNameIndexes;
  }
  const maxIndex = node.id.length - 1;
  const minIndex = maxIndex - node.name.length + 1;
  const res = relativeIndexes.filter((index) => index >= minIndex && index <= maxIndex);
  return res.map((idx) => idx - minIndex);
}
function buildSpecTreeRecursive(path, tree, data) {
  const [firstFile, ...rest] = path.split(getRegexSeparator());
  const id = tree.id ? [tree.id, firstFile].join(getSeparator()) : firstFile;
  const newNode = { name: firstFile, isLeaf: false, children: [], parent: tree, data, id, highlightIndexes: [] };
  if (rest.length < 1) {
    newNode.isLeaf = true;
    newNode.highlightIndexes = getHighlightIndexes(newNode);
    tree.children.push(newNode);
    return tree;
  }
  const foundChild = tree.children.find((child) => child.name === firstFile);
  if (foundChild) {
    buildSpecTreeRecursive(rest.join(getSeparator()), foundChild, data);
    return tree;
  }
  newNode.highlightIndexes = getHighlightIndexes(newNode);
  const newTree = buildSpecTreeRecursive(rest.join(getSeparator()), newNode, data);
  tree.children.push(newTree);
  return tree;
}
function collapseEmptyChildren(node) {
  for (const child of node.children) {
    collapseEmptyChildren(child);
  }
  if (node.isLeaf) {
    return;
  }
  if (node.parent && node.parent.parent && node.parent.children.length === 1) {
    node.parent.name = [node.parent.name, node.name].join(getSeparator());
    node.parent.id = [node.parent.id, node.name].join(getSeparator());
    node.parent.children = node.children;
    node.parent.highlightIndexes = getHighlightIndexes(node.parent);
  }
  return;
}
function collectRoots(node, acc = []) {
  if (!node || !node.parent) {
    return acc;
  }
  acc.push(node);
  collectRoots(node.parent, acc);
  return acc;
}
const useCollapsibleTreeNode = (rawNode, options, depth, parent) => {
  const { cache, expandInitially } = options;
  const treeNode = rawNode;
  const roots = parent ? collectRoots(parent) : [];
  const [expanded, toggle] = useToggle((cache == null ? void 0 : cache.get(rawNode.id)) ?? !!expandInitially);
  const hidden = computed(() => {
    return !!roots.find((r) => r.expanded.value === false);
  });
  const wrappedToggle = (value) => {
    var _a;
    const originalState = expanded.value;
    const newValue = toggle(value);
    if (!!cache && !hidden.value && ((_a = rawNode.children) == null ? void 0 : _a.length)) {
      cache.set(rawNode.id, !originalState);
    }
    return newValue;
  };
  return {
    ...treeNode,
    depth,
    parent,
    hidden,
    expanded,
    toggle: wrappedToggle
  };
};
function buildTree(rawNode, options, acc = [], depth = 1, parent = null) {
  var _a;
  const node = useCollapsibleTreeNode(rawNode, options, depth, parent);
  acc.push(node);
  if ((_a = node.children) == null ? void 0 : _a.length) {
    for (const child of node.children) {
      buildTree(child, options, acc, depth + 1, node);
    }
  }
  return acc;
}
function sortTree(tree) {
  if (tree.children.length > 0) {
    tree.children = tree.children.sort((a, b) => {
      if (a.children.length === 0 && b.children.length === 0) {
        return a.name > b.name ? 1 : -1;
      }
      if (a.children.length === 0) {
        return 1;
      }
      if (b.children.length === 0) {
        return -1;
      }
      return a.name > b.name ? 1 : -1;
    });
    tree.children.forEach(sortTree);
  }
}
function useCollapsibleTree(tree, options = {}) {
  options.expandInitially = options.expandInitially ?? true;
  sortTree(tree);
  const collapsibleTree = buildTree(tree, options);
  collapsibleTree.sort((a, b) => {
    if (a.parent === b.parent) {
      if (a.children.length && !b.children.length) {
        return -1;
      }
      return 0;
    }
    return 0;
  });
  return {
    tree: options.dropRoot ? collapsibleTree.slice(1) : collapsibleTree
  };
}
gql`
query RunAllSpecsData {
  currentProject {
    id
    config
    currentTestingType
  }
}
`;
gql`
mutation RunAllSpecs ($specPath: String!, $runAllSpecs: [String!]!) {
  setRunAllSpecs(runAllSpecs: $runAllSpecs)
  launchOpenProject(specPath: $specPath, shouldLaunchNewTab: true) {
    id
  }
}
`;
const useRunAllSpecsStore = defineStore("runAllSpecs", () => {
  const allSpecsRef = ref([]);
  const directoryChildrenRef = ref({});
  const separator = getSeparator();
  const router = useRouter();
  const setRunAllSpecsMutation = useMutation(RunAllSpecsDocument);
  async function runSpecs(runAllSpecs2) {
    await setRunAllSpecsMutation.executeMutation({ runAllSpecs: runAllSpecs2, specPath: RUN_ALL_SPECS_KEY });
    router.push({ path: "/specs/runner", query: { file: RUN_ALL_SPECS_KEY } });
  }
  async function runAllSpecs() {
    await runSpecs(allSpecsRef.value);
  }
  async function runSelectedSpecs(dir) {
    await runSpecs(directoryChildrenRef.value[dir]);
  }
  function setRunAllSpecsData(tree) {
    const allSpecs = [];
    const directoryChildren = {};
    for (const { id, isLeaf } of tree) {
      if (!isLeaf) {
        directoryChildren[id] = [];
      } else {
        allSpecs.push(id);
        Object.keys(directoryChildren).forEach((dir) => {
          if (id.startsWith(dir) && id.replace(dir, "").startsWith(separator)) {
            directoryChildren[dir].push(id);
          }
        });
      }
    }
    allSpecsRef.value = allSpecs;
    directoryChildrenRef.value = directoryChildren;
  }
  const query = useQuery({ query: RunAllSpecsDataDocument, pause: isRunMode || window.__CYPRESS_TESTING_TYPE__ === "component" });
  const isRunAllSpecsAllowed = computed(() => {
    var _a, _b, _c, _d;
    const isE2E = ((_b = (_a = query.data.value) == null ? void 0 : _a.currentProject) == null ? void 0 : _b.currentTestingType) === "e2e";
    const config = ((_d = (_c = query.data.value) == null ? void 0 : _c.currentProject) == null ? void 0 : _d.config) || [];
    const hasExperiment = config.some(({ field, value }) => field === "experimentalRunAllSpecs" && value === true);
    return isE2E && hasExperiment;
  });
  return {
    isRunAllSpecsAllowed,
    directoryChildren: directoryChildrenRef,
    runAllSpecs,
    allSpecsRef,
    runSelectedSpecs,
    setRunAllSpecsData
  };
});
const _hoisted_1$l = {
  height: "1em",
  width: "1em",
  style: { "min-width": "16px", "min-height": "16px" },
  viewBox: "0 0 16 16",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
};
const _hoisted_2$i = /* @__PURE__ */ createBaseVNode("path", {
  d: "M2 14V2C2 1.44772 2.44772 1 3 1H13C13.5523 1 14 1.44772 14 2V14C14 14.5523 13.5523 15 13 15H3C2.44772 15 2 14.5523 2 14Z",
  fill: "#D0D2E0",
  class: "icon-light"
}, null, -1);
const _hoisted_3$g = /* @__PURE__ */ createBaseVNode("path", {
  d: "M5 8H8M5 5H11M5 11H10M13 1L3 1C2.44772 1 2 1.44772 2 2V14C2 14.5523 2.44772 15 3 15H13C13.5523 15 14 14.5523 14 14V2C14 1.44772 13.5523 1 13 1Z",
  stroke: "#1B1E2E",
  class: "icon-dark",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, null, -1);
const _hoisted_4$e = [
  _hoisted_2$i,
  _hoisted_3$g
];
function render$7(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$l, _hoisted_4$e);
}
const __unplugin_components_0$2 = { name: "cy-document-blank_x16", render: render$7 };
const _sfc_main$m = /* @__PURE__ */ defineComponent({
  __name: "HighlightedText",
  props: {
    text: { default: "" },
    indexes: { default: () => [] },
    highlightClasses: { default: "text-white" }
  },
  setup(__props) {
    const props = __props;
    const characters = computed(() => {
      const chars = props.text.split("").map((char) => ({ char, highlighted: false }));
      props.indexes.forEach((idx) => chars[idx].highlighted = true);
      return chars;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("span", null, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(unref(characters), ({ char, highlighted }, idx) => {
          return openBlock(), createElementBlock("span", {
            key: idx,
            class: normalizeClass({ "px-[4px]": char === "/" })
          }, [
            highlighted ? (openBlock(), createElementBlock("span", {
              key: 0,
              class: normalizeClass(__props.highlightClasses)
            }, toDisplayString(char), 3)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              createTextVNode(toDisplayString(char), 1)
            ], 64))
          ], 2);
        }), 128))
      ]);
    };
  }
});
function commonjsRequire(path) {
  throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var fuzzysortExports = {};
var fuzzysort = {
  get exports() {
    return fuzzysortExports;
  },
  set exports(v) {
    fuzzysortExports = v;
  }
};
(function(module) {
  (function(root, UMD) {
    if (module.exports)
      module.exports = UMD();
    else
      root.fuzzysort = UMD();
  })(commonjsGlobal, function UMD() {
    function fuzzysortNew(instanceOptions) {
      var fuzzysort2 = {
        single: function(search, target, options) {
          if (!search)
            return null;
          if (!isObj(search))
            search = fuzzysort2.getPreparedSearch(search);
          if (!target)
            return null;
          if (!isObj(target))
            target = fuzzysort2.getPrepared(target);
          var allowTypo = options && options.allowTypo !== void 0 ? options.allowTypo : instanceOptions && instanceOptions.allowTypo !== void 0 ? instanceOptions.allowTypo : true;
          var algorithm = allowTypo ? fuzzysort2.algorithm : fuzzysort2.algorithmNoTypo;
          return algorithm(search, target, search[0]);
        },
        go: function(search, targets, options) {
          if (!search)
            return noResults;
          search = fuzzysort2.prepareSearch(search);
          var searchLowerCode = search[0];
          var threshold = options && options.threshold || instanceOptions && instanceOptions.threshold || -9007199254740991;
          var limit = options && options.limit || instanceOptions && instanceOptions.limit || 9007199254740991;
          var allowTypo = options && options.allowTypo !== void 0 ? options.allowTypo : instanceOptions && instanceOptions.allowTypo !== void 0 ? instanceOptions.allowTypo : true;
          var algorithm = allowTypo ? fuzzysort2.algorithm : fuzzysort2.algorithmNoTypo;
          var resultsLen = 0;
          var limitedCount = 0;
          var targetsLen = targets.length;
          if (options && options.keys) {
            var scoreFn = options.scoreFn || defaultScoreFn;
            var keys = options.keys;
            var keysLen = keys.length;
            for (var i = targetsLen - 1; i >= 0; --i) {
              var obj = targets[i];
              var objResults = new Array(keysLen);
              for (var keyI = keysLen - 1; keyI >= 0; --keyI) {
                var key = keys[keyI];
                var target = getValue(obj, key);
                if (!target) {
                  objResults[keyI] = null;
                  continue;
                }
                if (!isObj(target))
                  target = fuzzysort2.getPrepared(target);
                objResults[keyI] = algorithm(search, target, searchLowerCode);
              }
              objResults.obj = obj;
              var score = scoreFn(objResults);
              if (score === null)
                continue;
              if (score < threshold)
                continue;
              objResults.score = score;
              if (resultsLen < limit) {
                q.add(objResults);
                ++resultsLen;
              } else {
                ++limitedCount;
                if (score > q.peek().score)
                  q.replaceTop(objResults);
              }
            }
          } else if (options && options.key) {
            var key = options.key;
            for (var i = targetsLen - 1; i >= 0; --i) {
              var obj = targets[i];
              var target = getValue(obj, key);
              if (!target)
                continue;
              if (!isObj(target))
                target = fuzzysort2.getPrepared(target);
              var result = algorithm(search, target, searchLowerCode);
              if (result === null)
                continue;
              if (result.score < threshold)
                continue;
              result = { target: result.target, _targetLowerCodes: null, _nextBeginningIndexes: null, score: result.score, indexes: result.indexes, obj };
              if (resultsLen < limit) {
                q.add(result);
                ++resultsLen;
              } else {
                ++limitedCount;
                if (result.score > q.peek().score)
                  q.replaceTop(result);
              }
            }
          } else {
            for (var i = targetsLen - 1; i >= 0; --i) {
              var target = targets[i];
              if (!target)
                continue;
              if (!isObj(target))
                target = fuzzysort2.getPrepared(target);
              var result = algorithm(search, target, searchLowerCode);
              if (result === null)
                continue;
              if (result.score < threshold)
                continue;
              if (resultsLen < limit) {
                q.add(result);
                ++resultsLen;
              } else {
                ++limitedCount;
                if (result.score > q.peek().score)
                  q.replaceTop(result);
              }
            }
          }
          if (resultsLen === 0)
            return noResults;
          var results = new Array(resultsLen);
          for (var i = resultsLen - 1; i >= 0; --i)
            results[i] = q.poll();
          results.total = resultsLen + limitedCount;
          return results;
        },
        goAsync: function(search, targets, options) {
          var canceled = false;
          var p = new Promise(function(resolve, reject) {
            if (!search)
              return resolve(noResults);
            search = fuzzysort2.prepareSearch(search);
            var searchLowerCode = search[0];
            var q2 = fastpriorityqueue();
            var iCurrent = targets.length - 1;
            var threshold = options && options.threshold || instanceOptions && instanceOptions.threshold || -9007199254740991;
            var limit = options && options.limit || instanceOptions && instanceOptions.limit || 9007199254740991;
            var allowTypo = options && options.allowTypo !== void 0 ? options.allowTypo : instanceOptions && instanceOptions.allowTypo !== void 0 ? instanceOptions.allowTypo : true;
            var algorithm = allowTypo ? fuzzysort2.algorithm : fuzzysort2.algorithmNoTypo;
            var resultsLen = 0;
            var limitedCount = 0;
            function step() {
              if (canceled)
                return reject("canceled");
              var startMs = Date.now();
              if (options && options.keys) {
                var scoreFn = options.scoreFn || defaultScoreFn;
                var keys = options.keys;
                var keysLen = keys.length;
                for (; iCurrent >= 0; --iCurrent) {
                  var obj = targets[iCurrent];
                  var objResults = new Array(keysLen);
                  for (var keyI = keysLen - 1; keyI >= 0; --keyI) {
                    var key = keys[keyI];
                    var target = getValue(obj, key);
                    if (!target) {
                      objResults[keyI] = null;
                      continue;
                    }
                    if (!isObj(target))
                      target = fuzzysort2.getPrepared(target);
                    objResults[keyI] = algorithm(search, target, searchLowerCode);
                  }
                  objResults.obj = obj;
                  var score = scoreFn(objResults);
                  if (score === null)
                    continue;
                  if (score < threshold)
                    continue;
                  objResults.score = score;
                  if (resultsLen < limit) {
                    q2.add(objResults);
                    ++resultsLen;
                  } else {
                    ++limitedCount;
                    if (score > q2.peek().score)
                      q2.replaceTop(objResults);
                  }
                  if (iCurrent % 1e3 === 0) {
                    if (Date.now() - startMs >= 10) {
                      isNode ? {}(step) : setTimeout(step);
                      return;
                    }
                  }
                }
              } else if (options && options.key) {
                var key = options.key;
                for (; iCurrent >= 0; --iCurrent) {
                  var obj = targets[iCurrent];
                  var target = getValue(obj, key);
                  if (!target)
                    continue;
                  if (!isObj(target))
                    target = fuzzysort2.getPrepared(target);
                  var result = algorithm(search, target, searchLowerCode);
                  if (result === null)
                    continue;
                  if (result.score < threshold)
                    continue;
                  result = { target: result.target, _targetLowerCodes: null, _nextBeginningIndexes: null, score: result.score, indexes: result.indexes, obj };
                  if (resultsLen < limit) {
                    q2.add(result);
                    ++resultsLen;
                  } else {
                    ++limitedCount;
                    if (result.score > q2.peek().score)
                      q2.replaceTop(result);
                  }
                  if (iCurrent % 1e3 === 0) {
                    if (Date.now() - startMs >= 10) {
                      isNode ? {}(step) : setTimeout(step);
                      return;
                    }
                  }
                }
              } else {
                for (; iCurrent >= 0; --iCurrent) {
                  var target = targets[iCurrent];
                  if (!target)
                    continue;
                  if (!isObj(target))
                    target = fuzzysort2.getPrepared(target);
                  var result = algorithm(search, target, searchLowerCode);
                  if (result === null)
                    continue;
                  if (result.score < threshold)
                    continue;
                  if (resultsLen < limit) {
                    q2.add(result);
                    ++resultsLen;
                  } else {
                    ++limitedCount;
                    if (result.score > q2.peek().score)
                      q2.replaceTop(result);
                  }
                  if (iCurrent % 1e3 === 0) {
                    if (Date.now() - startMs >= 10) {
                      isNode ? {}(step) : setTimeout(step);
                      return;
                    }
                  }
                }
              }
              if (resultsLen === 0)
                return resolve(noResults);
              var results = new Array(resultsLen);
              for (var i = resultsLen - 1; i >= 0; --i)
                results[i] = q2.poll();
              results.total = resultsLen + limitedCount;
              resolve(results);
            }
            isNode ? {}(step) : step();
          });
          p.cancel = function() {
            canceled = true;
          };
          return p;
        },
        highlight: function(result, hOpen, hClose) {
          if (result === null)
            return null;
          if (hOpen === void 0)
            hOpen = "<b>";
          if (hClose === void 0)
            hClose = "</b>";
          var highlighted = "";
          var matchesIndex = 0;
          var opened = false;
          var target = result.target;
          var targetLen = target.length;
          var matchesBest = result.indexes;
          for (var i = 0; i < targetLen; ++i) {
            var char = target[i];
            if (matchesBest[matchesIndex] === i) {
              ++matchesIndex;
              if (!opened) {
                opened = true;
                highlighted += hOpen;
              }
              if (matchesIndex === matchesBest.length) {
                highlighted += char + hClose + target.substr(i + 1);
                break;
              }
            } else {
              if (opened) {
                opened = false;
                highlighted += hClose;
              }
            }
            highlighted += char;
          }
          return highlighted;
        },
        prepare: function(target) {
          if (!target)
            return;
          return { target, _targetLowerCodes: fuzzysort2.prepareLowerCodes(target), _nextBeginningIndexes: null, score: null, indexes: null, obj: null };
        },
        prepareSlow: function(target) {
          if (!target)
            return;
          return { target, _targetLowerCodes: fuzzysort2.prepareLowerCodes(target), _nextBeginningIndexes: fuzzysort2.prepareNextBeginningIndexes(target), score: null, indexes: null, obj: null };
        },
        prepareSearch: function(search) {
          if (!search)
            return;
          return fuzzysort2.prepareLowerCodes(search);
        },
        // Below this point is only internal code
        // Below this point is only internal code
        // Below this point is only internal code
        // Below this point is only internal code
        getPrepared: function(target) {
          if (target.length > 999)
            return fuzzysort2.prepare(target);
          var targetPrepared = preparedCache.get(target);
          if (targetPrepared !== void 0)
            return targetPrepared;
          targetPrepared = fuzzysort2.prepare(target);
          preparedCache.set(target, targetPrepared);
          return targetPrepared;
        },
        getPreparedSearch: function(search) {
          if (search.length > 999)
            return fuzzysort2.prepareSearch(search);
          var searchPrepared = preparedSearchCache.get(search);
          if (searchPrepared !== void 0)
            return searchPrepared;
          searchPrepared = fuzzysort2.prepareSearch(search);
          preparedSearchCache.set(search, searchPrepared);
          return searchPrepared;
        },
        algorithm: function(searchLowerCodes, prepared, searchLowerCode) {
          var targetLowerCodes = prepared._targetLowerCodes;
          var searchLen = searchLowerCodes.length;
          var targetLen = targetLowerCodes.length;
          var searchI = 0;
          var targetI = 0;
          var typoSimpleI = 0;
          var matchesSimpleLen = 0;
          for (; ; ) {
            var isMatch = searchLowerCode === targetLowerCodes[targetI];
            if (isMatch) {
              matchesSimple[matchesSimpleLen++] = targetI;
              ++searchI;
              if (searchI === searchLen)
                break;
              searchLowerCode = searchLowerCodes[typoSimpleI === 0 ? searchI : typoSimpleI === searchI ? searchI + 1 : typoSimpleI === searchI - 1 ? searchI - 1 : searchI];
            }
            ++targetI;
            if (targetI >= targetLen) {
              for (; ; ) {
                if (searchI <= 1)
                  return null;
                if (typoSimpleI === 0) {
                  --searchI;
                  var searchLowerCodeNew = searchLowerCodes[searchI];
                  if (searchLowerCode === searchLowerCodeNew)
                    continue;
                  typoSimpleI = searchI;
                } else {
                  if (typoSimpleI === 1)
                    return null;
                  --typoSimpleI;
                  searchI = typoSimpleI;
                  searchLowerCode = searchLowerCodes[searchI + 1];
                  var searchLowerCodeNew = searchLowerCodes[searchI];
                  if (searchLowerCode === searchLowerCodeNew)
                    continue;
                }
                matchesSimpleLen = searchI;
                targetI = matchesSimple[matchesSimpleLen - 1] + 1;
                break;
              }
            }
          }
          var searchI = 0;
          var typoStrictI = 0;
          var successStrict = false;
          var matchesStrictLen = 0;
          var nextBeginningIndexes = prepared._nextBeginningIndexes;
          if (nextBeginningIndexes === null)
            nextBeginningIndexes = prepared._nextBeginningIndexes = fuzzysort2.prepareNextBeginningIndexes(prepared.target);
          var firstPossibleI = targetI = matchesSimple[0] === 0 ? 0 : nextBeginningIndexes[matchesSimple[0] - 1];
          if (targetI !== targetLen)
            for (; ; ) {
              if (targetI >= targetLen) {
                if (searchI <= 0) {
                  ++typoStrictI;
                  if (typoStrictI > searchLen - 2)
                    break;
                  if (searchLowerCodes[typoStrictI] === searchLowerCodes[typoStrictI + 1])
                    continue;
                  targetI = firstPossibleI;
                  continue;
                }
                --searchI;
                var lastMatch = matchesStrict[--matchesStrictLen];
                targetI = nextBeginningIndexes[lastMatch];
              } else {
                var isMatch = searchLowerCodes[typoStrictI === 0 ? searchI : typoStrictI === searchI ? searchI + 1 : typoStrictI === searchI - 1 ? searchI - 1 : searchI] === targetLowerCodes[targetI];
                if (isMatch) {
                  matchesStrict[matchesStrictLen++] = targetI;
                  ++searchI;
                  if (searchI === searchLen) {
                    successStrict = true;
                    break;
                  }
                  ++targetI;
                } else {
                  targetI = nextBeginningIndexes[targetI];
                }
              }
            }
          {
            if (successStrict) {
              var matchesBest = matchesStrict;
              var matchesBestLen = matchesStrictLen;
            } else {
              var matchesBest = matchesSimple;
              var matchesBestLen = matchesSimpleLen;
            }
            var score = 0;
            var lastTargetI = -1;
            for (var i = 0; i < searchLen; ++i) {
              var targetI = matchesBest[i];
              if (lastTargetI !== targetI - 1)
                score -= targetI;
              lastTargetI = targetI;
            }
            if (!successStrict) {
              score *= 1e3;
              if (typoSimpleI !== 0)
                score += -20;
            } else {
              if (typoStrictI !== 0)
                score += -20;
            }
            score -= targetLen - searchLen;
            prepared.score = score;
            prepared.indexes = new Array(matchesBestLen);
            for (var i = matchesBestLen - 1; i >= 0; --i)
              prepared.indexes[i] = matchesBest[i];
            return prepared;
          }
        },
        algorithmNoTypo: function(searchLowerCodes, prepared, searchLowerCode) {
          var targetLowerCodes = prepared._targetLowerCodes;
          var searchLen = searchLowerCodes.length;
          var targetLen = targetLowerCodes.length;
          var searchI = 0;
          var targetI = 0;
          var matchesSimpleLen = 0;
          for (; ; ) {
            var isMatch = searchLowerCode === targetLowerCodes[targetI];
            if (isMatch) {
              matchesSimple[matchesSimpleLen++] = targetI;
              ++searchI;
              if (searchI === searchLen)
                break;
              searchLowerCode = searchLowerCodes[searchI];
            }
            ++targetI;
            if (targetI >= targetLen)
              return null;
          }
          var searchI = 0;
          var successStrict = false;
          var matchesStrictLen = 0;
          var nextBeginningIndexes = prepared._nextBeginningIndexes;
          if (nextBeginningIndexes === null)
            nextBeginningIndexes = prepared._nextBeginningIndexes = fuzzysort2.prepareNextBeginningIndexes(prepared.target);
          targetI = matchesSimple[0] === 0 ? 0 : nextBeginningIndexes[matchesSimple[0] - 1];
          if (targetI !== targetLen)
            for (; ; ) {
              if (targetI >= targetLen) {
                if (searchI <= 0)
                  break;
                --searchI;
                var lastMatch = matchesStrict[--matchesStrictLen];
                targetI = nextBeginningIndexes[lastMatch];
              } else {
                var isMatch = searchLowerCodes[searchI] === targetLowerCodes[targetI];
                if (isMatch) {
                  matchesStrict[matchesStrictLen++] = targetI;
                  ++searchI;
                  if (searchI === searchLen) {
                    successStrict = true;
                    break;
                  }
                  ++targetI;
                } else {
                  targetI = nextBeginningIndexes[targetI];
                }
              }
            }
          {
            if (successStrict) {
              var matchesBest = matchesStrict;
              var matchesBestLen = matchesStrictLen;
            } else {
              var matchesBest = matchesSimple;
              var matchesBestLen = matchesSimpleLen;
            }
            var score = 0;
            var lastTargetI = -1;
            for (var i = 0; i < searchLen; ++i) {
              var targetI = matchesBest[i];
              if (lastTargetI !== targetI - 1)
                score -= targetI;
              lastTargetI = targetI;
            }
            if (!successStrict)
              score *= 1e3;
            score -= targetLen - searchLen;
            prepared.score = score;
            prepared.indexes = new Array(matchesBestLen);
            for (var i = matchesBestLen - 1; i >= 0; --i)
              prepared.indexes[i] = matchesBest[i];
            return prepared;
          }
        },
        prepareLowerCodes: function(str) {
          var strLen = str.length;
          var lowerCodes = [];
          var lower = str.toLowerCase();
          for (var i = 0; i < strLen; ++i)
            lowerCodes[i] = lower.charCodeAt(i);
          return lowerCodes;
        },
        prepareBeginningIndexes: function(target) {
          var targetLen = target.length;
          var beginningIndexes = [];
          var beginningIndexesLen = 0;
          var wasUpper = false;
          var wasAlphanum = false;
          for (var i = 0; i < targetLen; ++i) {
            var targetCode = target.charCodeAt(i);
            var isUpper = targetCode >= 65 && targetCode <= 90;
            var isAlphanum = isUpper || targetCode >= 97 && targetCode <= 122 || targetCode >= 48 && targetCode <= 57;
            var isBeginning = isUpper && !wasUpper || !wasAlphanum || !isAlphanum;
            wasUpper = isUpper;
            wasAlphanum = isAlphanum;
            if (isBeginning)
              beginningIndexes[beginningIndexesLen++] = i;
          }
          return beginningIndexes;
        },
        prepareNextBeginningIndexes: function(target) {
          var targetLen = target.length;
          var beginningIndexes = fuzzysort2.prepareBeginningIndexes(target);
          var nextBeginningIndexes = [];
          var lastIsBeginning = beginningIndexes[0];
          var lastIsBeginningI = 0;
          for (var i = 0; i < targetLen; ++i) {
            if (lastIsBeginning > i) {
              nextBeginningIndexes[i] = lastIsBeginning;
            } else {
              lastIsBeginning = beginningIndexes[++lastIsBeginningI];
              nextBeginningIndexes[i] = lastIsBeginning === void 0 ? targetLen : lastIsBeginning;
            }
          }
          return nextBeginningIndexes;
        },
        cleanup,
        new: fuzzysortNew
      };
      return fuzzysort2;
    }
    var isNode = typeof commonjsRequire !== "undefined" && typeof window === "undefined";
    var preparedCache = /* @__PURE__ */ new Map();
    var preparedSearchCache = /* @__PURE__ */ new Map();
    var noResults = [];
    noResults.total = 0;
    var matchesSimple = [];
    var matchesStrict = [];
    function cleanup() {
      preparedCache.clear();
      preparedSearchCache.clear();
      matchesSimple = [];
      matchesStrict = [];
    }
    function defaultScoreFn(a) {
      var max = -9007199254740991;
      for (var i = a.length - 1; i >= 0; --i) {
        var result = a[i];
        if (result === null)
          continue;
        var score = result.score;
        if (score > max)
          max = score;
      }
      if (max === -9007199254740991)
        return null;
      return max;
    }
    function getValue(obj, prop) {
      var tmp = obj[prop];
      if (tmp !== void 0)
        return tmp;
      var segs = prop;
      if (!Array.isArray(prop))
        segs = prop.split(".");
      var len = segs.length;
      var i = -1;
      while (obj && ++i < len)
        obj = obj[segs[i]];
      return obj;
    }
    function isObj(x) {
      return typeof x === "object";
    }
    var fastpriorityqueue = function() {
      var r = [], o = 0, e = {};
      function n() {
        for (var e2 = 0, n2 = r[e2], c = 1; c < o; ) {
          var f = c + 1;
          e2 = c, f < o && r[f].score < r[c].score && (e2 = f), r[e2 - 1 >> 1] = r[e2], c = 1 + (e2 << 1);
        }
        for (var a = e2 - 1 >> 1; e2 > 0 && n2.score < r[a].score; a = (e2 = a) - 1 >> 1)
          r[e2] = r[a];
        r[e2] = n2;
      }
      return e.add = function(e2) {
        var n2 = o;
        r[o++] = e2;
        for (var c = n2 - 1 >> 1; n2 > 0 && e2.score < r[c].score; c = (n2 = c) - 1 >> 1)
          r[n2] = r[c];
        r[n2] = e2;
      }, e.poll = function() {
        if (0 !== o) {
          var e2 = r[0];
          return r[0] = r[--o], n(), e2;
        }
      }, e.peek = function(e2) {
        if (0 !== o)
          return r[0];
      }, e.replaceTop = function(o2) {
        r[0] = o2, n();
      }, e;
    };
    var q = fastpriorityqueue();
    return fuzzysortNew();
  });
})(fuzzysort);
const fuzzySort = fuzzysortExports;
function fuzzySortSpecs(specs, searchValue) {
  const normalizedSearchValue = getPlatform() === "win32" ? searchValue.replaceAll("/", "\\") : searchValue;
  const fuzzySortResult = fuzzySort.go(normalizedSearchValue, specs, { keys: ["relative", "baseName"], allowTypo: false, threshold: -3e3 }).map((result) => {
    const [relative, baseName] = result;
    return {
      ...result.obj,
      fuzzyIndexes: {
        relative: (relative == null ? void 0 : relative.indexes) ?? [],
        baseName: (baseName == null ? void 0 : baseName.indexes) ?? []
      }
    };
  });
  return fuzzySortResult;
}
function makeFuzzyFoundSpec(spec) {
  return {
    ...spec,
    fuzzyIndexes: {
      relative: [],
      baseName: []
    }
  };
}
function useCachedSpecs(specs) {
  const cachedSpecs = ref([]);
  watch(specs, (currentSpecs, prevSpecs = []) => {
    if (!lodashExports.isEqual(currentSpecs, prevSpecs)) {
      cachedSpecs.value = currentSpecs;
    }
  }, { immediate: true });
  return cachedSpecs;
}
function deriveIndexes(fileName, indexes) {
  return indexes.reduce((acc, idx) => {
    if (idx < fileName.length) {
      acc.fileNameIndexes.push(idx);
    } else {
      acc.extensionIndexes.push(idx - fileName.length);
    }
    return acc;
  }, { fileNameIndexes: [], extensionIndexes: [] });
}
const _hoisted_1$k = {
  height: "1em",
  width: "1em",
  style: { "min-width": "16px", "min-height": "16px" },
  viewBox: "0 0 16 14",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
};
const _hoisted_2$h = /* @__PURE__ */ createBaseVNode("path", {
  d: "M14 13C14.5523 13 15 12.5523 15 12V4C15 3.44772 14.5523 3 14 3H9L7.29289 4.70711C7.10536 4.89464 6.851 5 6.58579 5H1V12C1 12.5523 1.44772 13 2 13H14Z",
  fill: "#2E3247",
  class: "icon-dark"
}, null, -1);
const _hoisted_3$f = /* @__PURE__ */ createBaseVNode("path", {
  d: "M9 3L7.29289 1.29289C7.10536 1.10536 6.851 1 6.58579 1H2C1.44772 1 1 1.44772 1 2V5M9 3H14C14.5523 3 15 3.44772 15 4V12C15 12.5523 14.5523 13 14 13H2C1.44772 13 1 12.5523 1 12V5M9 3L7.29289 4.70711C7.10536 4.89464 6.851 5 6.58579 5H1",
  stroke: "#434861",
  "stroke-width": "2",
  "stroke-linejoin": "round",
  class: "icon-light"
}, null, -1);
const _hoisted_4$d = [
  _hoisted_2$h,
  _hoisted_3$f
];
function render$6(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$k, _hoisted_4$d);
}
const IconFolder = { name: "cy-folder_x16", render: render$6 };
function useVirtualList(list, options) {
  const containerRef = ref();
  const size = useElementSize(containerRef);
  const currentList = ref([]);
  const source = shallowRef(list);
  const state = ref({ start: 0, end: 10 });
  const { itemHeight, overscan = 5 } = options;
  const getViewCapacity = (containerHeight) => {
    if (typeof itemHeight === "number") {
      return Math.ceil(containerHeight / itemHeight);
    }
    const { start = 0 } = state.value;
    let sum = 0;
    let capacity = 0;
    for (let i = start; i < source.value.length; i++) {
      const height = itemHeight(i);
      sum += height;
      if (sum >= containerHeight) {
        capacity = i;
        break;
      }
    }
    return capacity - start;
  };
  const getOffset = (scrollTop) => {
    if (typeof itemHeight === "number") {
      return Math.floor(scrollTop / itemHeight) + 1;
    }
    let sum = 0;
    let offset = 0;
    for (let i = 0; i < source.value.length; i++) {
      const height = itemHeight(i);
      sum += height;
      if (sum >= scrollTop) {
        offset = i;
        break;
      }
    }
    return offset + 1;
  };
  const calculateRange = () => {
    const element = containerRef.value;
    if (element) {
      const offset = getOffset(element.scrollTop);
      const viewCapacity = getViewCapacity(element.clientHeight);
      const from = offset - overscan;
      const to = offset + viewCapacity + overscan;
      state.value = {
        start: from < 0 ? 0 : from,
        end: to > source.value.length ? source.value.length : to
      };
      currentList.value = source.value.slice(state.value.start, state.value.end).map((ele, index) => {
        return {
          data: ele,
          index: index + state.value.start
        };
      });
    }
  };
  watch([size.height, list], (newVal, oldVal) => {
    if (!lodashExports.isEqual(newVal, oldVal)) {
      calculateRange();
    }
  });
  const totalHeight = computed(() => {
    if (typeof itemHeight === "number") {
      return source.value.length * itemHeight;
    }
    return source.value.reduce((sum, _, index) => sum + itemHeight(index), 0);
  });
  const getDistanceTop = (index) => {
    if (typeof itemHeight === "number") {
      const height2 = index * itemHeight;
      return height2;
    }
    const height = source.value.slice(0, index).reduce((sum, _, i) => sum + itemHeight(i), 0);
    return height;
  };
  const scrollTo = (index) => {
    if (containerRef.value) {
      containerRef.value.scrollTop = getDistanceTop(index);
      calculateRange();
    }
  };
  const offsetTop = computed(() => getDistanceTop(state.value.start));
  const wrapperProps = computed(() => {
    return {
      style: {
        width: "100%",
        height: `${totalHeight.value - offsetTop.value}px`,
        marginTop: `${offsetTop.value}px`
      }
    };
  });
  const containerStyle = { overflowY: "auto" };
  return {
    list: currentList,
    scrollTo,
    containerProps: {
      ref: containerRef,
      onScroll: () => {
        calculateRange();
      },
      style: containerStyle
    },
    wrapperProps,
    api: {
      containerRef,
      getOffset,
      getViewCapacity,
      source,
      scrollTo
    }
  };
}
const filters = {
  matchesCT: (testingType) => testingType === "component",
  matchesE2E: (testingType) => testingType === "e2e"
};
const _sfc_main$l = /* @__PURE__ */ defineComponent({
  __name: "CreateSpecCard",
  props: {
    icon: null,
    header: null,
    description: null,
    disabled: { type: Boolean },
    badgeText: null
  },
  emits: ["click"],
  setup(__props, { emit: emits }) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Card, {
        disabled: __props.disabled,
        title: __props.header,
        description: __props.description,
        icon: __props.icon,
        "icon-size": 48,
        class: "m-[2px] min-h-[216px] max-h-[350px] px-[32px] pt-[32px] pb-[24px] w-[280px]",
        variant: "indigo",
        "badge-text": __props.badgeText,
        onClick: _cache[0] || (_cache[0] = ($event) => emits("click"))
      }, null, 8, ["disabled", "title", "description", "icon", "badge-text"]);
    };
  }
});
const _sfc_main$k = /* @__PURE__ */ defineComponent({
  __name: "ScaffoldGeneratorCard",
  props: {
    disabled: { type: Boolean }
  },
  setup(__props) {
    const { t } = useI18n();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$l, {
        disabled: __props.disabled,
        header: unref(t)("createSpec.e2e.importFromScaffold.header"),
        description: unref(t)("createSpec.e2e.importFromScaffold.description"),
        icon: unref(__unplugin_components_0$4)
      }, null, 8, ["disabled", "header", "description", "icon"]);
    };
  }
});
const _hoisted_1$j = { key: 0 };
const _hoisted_2$g = { class: "h-[320px] overflow-auto" };
const _hoisted_3$e = { class: "grid gap-[8px] grid-cols-[16px,auto] items-center" };
const _hoisted_4$c = { class: "text-gray-700" };
const _hoisted_5$8 = { class: "grid grid-cols-[16px,auto,auto] items-center" };
const _hoisted_6$5 = { class: "pl-[8px] text-gray-900" };
const _hoisted_7$4 = { class: "font-light text-gray-400 text-gray-500" };
const _sfc_main$j = /* @__PURE__ */ defineComponent({
  __name: "ScaffoldGeneratorStepOne",
  emits: ["update:title", "update:description", "close"],
  setup(__props, { emit: emits }) {
    const { t } = useI18n();
    gql`
mutation ScaffoldGeneratorStepOne_e2eExamples {
  e2eExamples {
    file {
      id
      absolute
      relative
      baseName
      name
      fileExtension
      fileName
    }
  }
}
`;
    const mutation = useMutation(ScaffoldGeneratorStepOne_E2eExamplesDocument);
    onMounted(async () => {
      emits("update:title", t("createSpec.e2e.importFromScaffold.specsAddingHeader"));
      await mutation.executeMutation({});
      emits("update:title", t("createSpec.e2e.importFromScaffold.specsAddedHeader"));
    });
    const scaffoldedFiles = computed(() => {
      var _a;
      return ((_a = mutation.data.value) == null ? void 0 : _a.e2eExamples) || [];
    });
    const specTree = computed(() => {
      const files = scaffoldedFiles.value.map((res) => {
        return {
          ...res.file,
          specType: "integration",
          specFileExtension: res.file.baseName.replace(res.file.fileName, "")
        };
      });
      return useCollapsibleTree(buildSpecTree(files), { dropRoot: true });
    });
    return (_ctx, _cache) => {
      const _component_i_cy_add_small_x16 = __unplugin_components_0$3;
      const _component_i_cy_folder_x16 = IconFolder;
      const _component_i_cy_document_blank_x16 = __unplugin_components_0$2;
      return unref(mutation).data.value ? (openBlock(), createElementBlock("div", _hoisted_1$j, [
        createBaseVNode("ul", _hoisted_2$g, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(specTree).tree, (row, idx) => {
            var _a, _b;
            return openBlock(), createElementBlock("li", {
              key: idx,
              class: "flex font-medium border-b-gray-50 border-b-width-[1px] pl-[24px] gap-[8px] items-center children:h-[40px]"
            }, [
              createVNode(_component_i_cy_add_small_x16, { class: "icon-dark-jade-400" }),
              !row.isLeaf ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: "flex items-center",
                style: normalizeStyle({ paddingLeft: `${(row.depth - 2) * 10}px` })
              }, [
                createBaseVNode("div", _hoisted_3$e, [
                  createVNode(_component_i_cy_folder_x16, { class: "icon-dark-white icon-light-gray-200" }),
                  createBaseVNode("span", _hoisted_4$c, toDisplayString(row.name), 1)
                ])
              ], 4)) : (openBlock(), createElementBlock("div", {
                key: 1,
                class: "flex items-center",
                style: normalizeStyle({ paddingLeft: `${(row.depth - 2) * 10}px` })
              }, [
                createBaseVNode("div", _hoisted_5$8, [
                  createVNode(_component_i_cy_document_blank_x16, { class: "icon-light-gray-50 icon-dark-gray-200" }),
                  createBaseVNode("span", _hoisted_6$5, toDisplayString((_a = row.data) == null ? void 0 : _a.fileName), 1),
                  createBaseVNode("span", _hoisted_7$4, toDisplayString((_b = row.data) == null ? void 0 : _b.specFileExtension), 1)
                ])
              ], 4))
            ]);
          }), 128))
        ]),
        createVNode(StandardModalFooter, null, {
          default: withCtx(() => [
            createVNode(_sfc_main$n, {
              size: "lg",
              onClick: _cache[0] || (_cache[0] = ($event) => emits("close"))
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(unref(t)("createSpec.e2e.importFromScaffold.specsAddedButton")), 1)
              ]),
              _: 1
            })
          ]),
          _: 1
        })
      ])) : createCommentVNode("", true);
    };
  }
});
const ScaffoldGenerator = {
  card: _sfc_main$k,
  entry: _sfc_main$j,
  matches: filters.matchesE2E,
  show: () => true,
  id: "scaffold"
};
const _hoisted_1$i = {
  height: "1em",
  width: "1em",
  style: { "min-width": "48px", "min-height": "48px" },
  viewBox: "0 0 48 48",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
};
const _hoisted_2$f = /* @__PURE__ */ createBaseVNode("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M32\n5.17964V13H39.8204C39.7221 12.784 39.5852 12.5852 39.4142 12.4142L32.5858\n5.58578C32.4148 5.41477 32.216 5.27792 32 5.17964Z",
  fill: "#D0D2E0",
  class: "icon-light"
}, null, -1);
const _hoisted_3$d = /* @__PURE__ */ createBaseVNode("path", {
  d: "M20 21L17 24L20 27M28 21L31 24L28 27M22.5 29.5L25.5 18.5M32\n5.17964C31.7423 5.06237 31.4602 5 31.1716 5H9C8.44772 5 8 5.44772 8 6V42C8\n42.5523 8.44772 43 9 43H39C39.5523 43 40 42.5523 40 42V13.8284C40 13.5398\n39.9376 13.2577 39.8204 13M32 5.17964C32.216 5.27792 32.4148 5.41477\n32.5858 5.58578L39.4142 12.4142C39.5852 12.5852 39.7221 12.784 39.8204\n13M32 5.17964V13H39.8204",
  stroke: "#1B1E2E",
  class: "icon-dark",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, null, -1);
const _hoisted_4$b = /* @__PURE__ */ createBaseVNode("path", {
  d: "M43 40C43 43.3137 40.3137 46 37 46C33.6863 46 31 43.3137 31 40C31\n36.6863 33.6863 34 37 34C40.3137 34 43 36.6863 43 40Z",
  class: "icon-light-secondary",
  fill: "#A3E7CB"
}, null, -1);
const _hoisted_5$7 = /* @__PURE__ */ createBaseVNode("path", {
  d: "M37 38V40M37 42V40M37 40H39H35M43 40C43 43.3137 40.3137 46 37\n46C33.6863 46 31 43.3137 31 40C31 36.6863 33.6863 34 37 34C40.3137 34 43\n36.6863 43 40Z",
  stroke: "#00814D",
  class: "icon-dark-secondary",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, null, -1);
const _hoisted_6$4 = [
  _hoisted_2$f,
  _hoisted_3$d,
  _hoisted_4$b,
  _hoisted_5$7
];
function render$5(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$i, _hoisted_6$4);
}
const DocumentCodeIcon = { name: "cy-document-code_x48", render: render$5 };
const _sfc_main$i = /* @__PURE__ */ defineComponent({
  __name: "EmptyGeneratorCard",
  props: {
    disabled: { type: Boolean }
  },
  setup(__props) {
    const { t } = useI18n();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$l, {
        disabled: __props.disabled,
        header: unref(t)("createSpec.e2e.importTemplateSpec.header"),
        description: unref(t)("createSpec.e2e.importTemplateSpec.description"),
        icon: unref(DocumentCodeIcon)
      }, null, 8, ["disabled", "header", "description", "icon"]);
    };
  }
});
const _hoisted_1$h = {
  height: "1em",
  width: "1em",
  style: { "min-width": "16px", "min-height": "16px" },
  viewBox: "0 0 16 16",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
};
const _hoisted_2$e = /* @__PURE__ */ createBaseVNode("circle", {
  cx: "8",
  cy: "8",
  r: "7",
  fill: "#1FA971",
  class: "icon-dark"
}, null, -1);
const _hoisted_3$c = /* @__PURE__ */ createBaseVNode("path", {
  d: "M10 6L8 10L6 8",
  stroke: "white",
  "stroke-width": "2",
  "stroke-linecap": "round",
  class: "icon-light",
  "stroke-linejoin": "round"
}, null, -1);
const _hoisted_4$a = [
  _hoisted_2$e,
  _hoisted_3$c
];
function render$4(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$h, _hoisted_4$a);
}
const __unplugin_components_0$1 = { name: "cy-status-passed-solid_x16", render: render$4 };
const _hoisted_1$g = {
  class: "cursor-pointer flex py-[16px] px-[24px] gap-[8px] items-center",
  "data-cy": "file-row"
};
const _hoisted_2$d = { class: "font-medium text-jade-500 truncate" };
const _hoisted_3$b = { class: "grow flex justify-self-end justify-end" };
const _hoisted_4$9 = { class: "rounded border mx-[24px] mb-[24px]" };
const _sfc_main$h = /* @__PURE__ */ defineComponent({
  __name: "GeneratorSuccess",
  props: {
    file: null
  },
  setup(__props) {
    gql`
fragment GeneratorSuccessFile on ScaffoldedFile {
  file {
    id
    fileName
    fileExtension
    baseName
    relative
    contents
  }
}
`;
    gql`
fragment GeneratorSuccess on GenerateSpecResponse {
  # Used to update the cache after a spec is created, so when the user tries to
  # run it, it already exists
  currentProject {
    id
    specs {
      id
      ...SpecNode_InlineSpecList
    }
  }
  generatedSpecResult {
    ... on ScaffoldedFile {
      ...GeneratorSuccessFile
    }
  }
}
`;
    return (_ctx, _cache) => {
      const _component_i_cy_status_passed_solid_x16 = __unplugin_components_0$1;
      const _component_i_cy_chevron_down_small_x16 = __unplugin_components_0$5;
      return openBlock(), createBlock(_sfc_main$o, {
        class: "rounded outline-none m-[4px] overflow-hidden",
        "initially-open": true
      }, {
        target: withCtx(({ open }) => [
          createBaseVNode("div", _hoisted_1$g, [
            createVNode(_component_i_cy_status_passed_solid_x16),
            createBaseVNode("span", _hoisted_2$d, toDisplayString(__props.file.relative), 1),
            createBaseVNode("div", _hoisted_3$b, [
              createVNode(_component_i_cy_chevron_down_small_x16, {
                class: normalizeClass([{ "rotate-180": open }, "max-w-[16px] transform transition duration-150 icon-dark-gray-400"])
              }, null, 8, ["class"])
            ])
          ])
        ]),
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_4$9, [
            createVNode(ShikiHighlight, {
              code: __props.file.contents,
              "line-numbers": "",
              lang: "js"
            }, null, 8, ["code"])
          ])
        ]),
        _: 1
      });
    };
  }
});
const _hoisted_1$f = {
  height: "1em",
  width: "1em",
  style: { "min-width": "24px", "min-height": "24px" },
  viewBox: "0 0 24 24",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
};
const _hoisted_2$c = /* @__PURE__ */ createBaseVNode("path", {
  d: "M3 15H7V19H3V15Z",
  fill: "#D0D2E0",
  class: "icon-light"
}, null, -1);
const _hoisted_3$a = /* @__PURE__ */ createBaseVNode("path", {
  d: "M21 8C21.5523 8 22 7.55228 22 7C22 6.44772 21.5523 6 21 6V8ZM11 6C10.4477 6 10 6.44772 10 7C10 7.55228 10.4477 8 11 8V6ZM21 18C21.5523 18 22 17.5523 22 17C22 16.4477 21.5523 16 21 16V18ZM11 16C10.4477 16 10 16.4477 10 17C10 17.5523 10.4477 18 11 18V16ZM2.29289 8.29289C1.90237 8.68342 1.90237 9.31658 2.29289 9.70711C2.68342 10.0976 3.31658 10.0976 3.70711 9.70711L2.29289 8.29289ZM7.70711 5.70711C8.09763 5.31658 8.09763 4.68342 7.70711 4.29289C7.31658 3.90237 6.68342 3.90237 6.29289 4.29289L7.70711 5.70711ZM3.70711 4.29289C3.31658 3.90237 2.68342 3.90237 2.29289 4.29289C1.90237 4.68342 1.90237 5.31658 2.29289 5.70711L3.70711 4.29289ZM6.29289 9.70711C6.68342 10.0976 7.31658 10.0976 7.70711 9.70711C8.09763 9.31658 8.09763 8.68342 7.70711 8.29289L6.29289 9.70711ZM3 15V14C2.44772 14 2 14.4477 2 15H3ZM7 15H8C8 14.4477 7.55228 14 7 14V15ZM7 19V20C7.55228 20 8 19.5523 8 19H7ZM3 19H2C2 19.5523 2.44772 20 3 20V19ZM21 6H11V8H21V6ZM21 16H11V18H21V16ZM3.70711 9.70711L5.70711 7.70711L4.29289 6.29289L2.29289 8.29289L3.70711 9.70711ZM5.70711 7.70711L7.70711 5.70711L6.29289 4.29289L4.29289 6.29289L5.70711 7.70711ZM2.29289 5.70711L4.29289 7.70711L5.70711 6.29289L3.70711 4.29289L2.29289 5.70711ZM4.29289 7.70711L6.29289 9.70711L7.70711 8.29289L5.70711 6.29289L4.29289 7.70711ZM3 16H7V14H3V16ZM6 15V19H8V15H6ZM7 18H3V20H7V18ZM4 19V15H2V19H4Z",
  fill: "#1B1E2E",
  class: "icon-dark"
}, null, -1);
const _hoisted_4$8 = [
  _hoisted_2$c,
  _hoisted_3$a
];
function render$3(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$f, _hoisted_4$8);
}
const TestResultsIcon = { name: "cy-test-results_x24", render: render$3 };
const _hoisted_1$e = { class: "flex flex-col grow justify-between" };
const _hoisted_2$b = { class: "p-[24px] w-[720px]" };
const _hoisted_3$9 = ["onSubmit"];
const _hoisted_4$7 = { key: 0 };
const _hoisted_5$6 = {
  key: 0,
  class: "rounded flex font-medium bg-error-100 mt-[16px] p-[14px] ring-2 ring-error-100 text-error-600 gap-[8px] items-center"
};
const _hoisted_6$3 = /* @__PURE__ */ createBaseVNode("em", { class: "font-medium" }, "specPattern", -1);
const _hoisted_7$3 = {
  key: 1,
  class: "rounded flex font-medium bg-warning-100 mt-[16px] p-[16px] text-warning-600 gap-[8px] items-center"
};
const _hoisted_8$3 = { class: "rounded bg-warning-200 py-[2px] px-[8px] text-warning-700" };
const _hoisted_9$2 = {
  key: 2,
  class: "mt-[16px]"
};
const _sfc_main$g = /* @__PURE__ */ defineComponent({
  __name: "EmptyGenerator",
  props: {
    title: null,
    gql: null,
    type: null,
    specFileName: null,
    otherGenerators: { type: Boolean }
  },
  emits: ["update:title", "update:description", "restart", "close", "updateTitle"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const { t } = useI18n();
    gql`
fragment EmptyGenerator on CurrentProject {
  id
  config
  ...SpecPatterns
}
`;
    gql`
mutation EmptyGenerator_MatchSpecFile($specFile: String!) {
  matchesSpecPattern (specFile: $specFile) 
}
`;
    gql`
mutation EmptyGenerator_generateSpec($codeGenCandidate: String!, $type: CodeGenType!) {
  generateSpecFromSource(codeGenCandidate: $codeGenCandidate, type: $type) {
    ...GeneratorSuccess
  }
}`;
    const { title } = useVModels(props, emits);
    const inputRef = ref();
    const inputRefFn = () => inputRef;
    const specFile = ref(props.specFileName);
    const matches = useMutation(EmptyGenerator_MatchSpecFileDocument);
    const writeFile = useMutation(EmptyGenerator_GenerateSpecDocument);
    const isValidSpecFile = ref(true);
    const hasError = computed(() => !isValidSpecFile.value && !!specFile.value);
    const result = ref(null);
    onMounted(() => {
      if (!(inputRef == null ? void 0 : inputRef.value)) {
        return;
      }
      inputRef.value.focus();
      const fileNameRegex = /[ \w-]+(?=\.)/;
      const inputValue = props.specFileName;
      const match = inputValue.match(fileNameRegex);
      if (match) {
        const startSelectionIndex = match.index || 0;
        const endSelectionIndex = startSelectionIndex + match[0].length;
        inputRef.value.setSelectionRange(startSelectionIndex, endSelectionIndex);
      }
    });
    whenever(result, () => {
      title.value = t("createSpec.successPage.header");
      emits("updateTitle", t("createSpec.successPage.header"));
    });
    const createSpec = async () => {
      var _a, _b, _c;
      if (!isValidSpecFile.value) {
        return;
      }
      const { data } = await writeFile.executeMutation({ codeGenCandidate: specFile.value, type: props.type });
      result.value = ((_b = (_a = data == null ? void 0 : data.generateSpecFromSource) == null ? void 0 : _a.generatedSpecResult) == null ? void 0 : _b.__typename) === "ScaffoldedFile" ? (_c = data == null ? void 0 : data.generateSpecFromSource) == null ? void 0 : _c.generatedSpecResult : null;
    };
    watch(specFile, async (value) => {
      var _a;
      const result2 = await matches.executeMutation({ specFile: value });
      isValidSpecFile.value = ((_a = result2.data) == null ? void 0 : _a.matchesSpecPattern) ?? false;
    }, { immediate: true });
    title.value = t("createSpec.e2e.importTemplateSpec.chooseFilenameHeader");
    const showExtensionWarning = computed(() => isValidSpecFile.value && !specFile.value.includes(".cy"));
    const recommendedFileName = computed(() => {
      const split = specFile.value.split(".");
      return `{filename}.cy.${split[split.length - 1]}`;
    });
    const invalidSpecWarning = computed(() => props.type === "e2e" ? t("createSpec.e2e.importTemplateSpec.invalidSpecWarning") : t("createSpec.component.importTemplateSpec.invalidComponentWarning"));
    return (_ctx, _cache) => {
      const _component_i_cy_document_blank_x16 = __unplugin_components_0$2;
      const _component_i_cy_errored_outline_x16 = __unplugin_components_1$1;
      const _component_router_link = resolveComponent("router-link");
      return openBlock(), createElementBlock("div", _hoisted_1$e, [
        !result.value ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          createBaseVNode("div", _hoisted_2$b, [
            createBaseVNode("form", {
              onSubmit: withModifiers(createSpec, ["prevent"])
            }, [
              createVNode(Input, {
                modelValue: specFile.value,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => specFile.value = $event),
                "input-ref": inputRefFn,
                placeholder: unref(t)("createSpec.e2e.importTemplateSpec.inputPlaceholder"),
                "aria-label": unref(t)("createSpec.e2e.importTemplateSpec.inputPlaceholder"),
                "has-error": unref(hasError)
              }, {
                prefix: withCtx(() => [
                  createVNode(_component_i_cy_document_blank_x16, {
                    class: normalizeClass(["icon-light-gray-50 icon-dark-gray-300", {
                      "icon-light-error-50 icon-dark-error-400": unref(hasError)
                    }])
                  }, null, 8, ["class"])
                ]),
                _: 1
              }, 8, ["modelValue", "placeholder", "aria-label", "has-error"])
            ], 40, _hoisted_3$9),
            props.gql ? (openBlock(), createElementBlock("div", _hoisted_4$7, [
              unref(hasError) ? (openBlock(), createElementBlock("div", _hoisted_5$6, [
                createVNode(_component_i_cy_errored_outline_x16, { class: "icon-dark-error-600" }),
                createBaseVNode("span", null, [
                  createTextVNode(toDisplayString(unref(invalidSpecWarning)), 1),
                  _hoisted_6$3,
                  createTextVNode(":")
                ])
              ])) : unref(showExtensionWarning) && props.type === "e2e" ? (openBlock(), createElementBlock("div", _hoisted_7$3, [
                createVNode(_component_i_cy_errored_outline_x16, { class: "icon-dark-warning-600" }),
                createTextVNode(" " + toDisplayString(unref(t)("createSpec.e2e.importTemplateSpec.specExtensionWarning")), 1),
                createBaseVNode("span", _hoisted_8$3, toDisplayString(unref(recommendedFileName)), 1)
              ])) : createCommentVNode("", true),
              unref(hasError) ? (openBlock(), createElementBlock("div", _hoisted_9$2, [
                createVNode(_sfc_main$p, {
                  gql: props.gql,
                  variant: "info"
                }, null, 8, ["gql"])
              ])) : createCommentVNode("", true)
            ])) : createCommentVNode("", true)
          ]),
          !result.value ? (openBlock(), createBlock(StandardModalFooter, {
            key: 0,
            class: "flex gap-[16px]"
          }, {
            default: withCtx(() => [
              createVNode(_sfc_main$n, {
                size: "lg",
                type: "submit",
                disabled: !isValidSpecFile.value,
                onClick: createSpec
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(t)("createSpec.createSpec")), 1)
                ]),
                _: 1
              }, 8, ["disabled"]),
              props.otherGenerators ? (openBlock(), createBlock(_sfc_main$n, {
                key: 0,
                size: "lg",
                variant: "outline",
                onClick: _cache[1] || (_cache[1] = ($event) => emits("restart"))
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(t)("components.button.back")), 1)
                ]),
                _: 1
              })) : (openBlock(), createBlock(_sfc_main$n, {
                key: 1,
                size: "lg",
                variant: "outline",
                onClick: _cache[2] || (_cache[2] = ($event) => emits("close"))
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(t)("components.button.cancel")), 1)
                ]),
                _: 1
              }))
            ]),
            _: 1
          })) : createCommentVNode("", true)
        ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          createVNode(_sfc_main$h, {
            file: result.value.file
          }, null, 8, ["file"]),
          createVNode(StandardModalFooter, { class: "flex gap-[16px] items-center" }, {
            default: withCtx(() => [
              createVNode(_component_router_link, {
                class: "outline-none",
                to: {
                  name: "SpecRunner",
                  query: {
                    file: unref(posixify)(result.value.file.relative)
                  },
                  params: props.type === "component" || props.type === "componentEmpty" ? {
                    shouldShowTroubleRenderingAlert: "true"
                  } : void 0
                }
              }, {
                default: withCtx(() => [
                  createVNode(_sfc_main$n, {
                    size: "lg",
                    "prefix-icon": unref(TestResultsIcon),
                    "prefix-icon-class": "w-[16px] h-[16px] icon-dark-white",
                    onClick: _cache[3] || (_cache[3] = ($event) => emits("close"))
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(t)("createSpec.successPage.runSpecButton")), 1)
                    ]),
                    _: 1
                  }, 8, ["prefix-icon"])
                ]),
                _: 1
              }, 8, ["to"]),
              createVNode(_sfc_main$n, {
                size: "lg",
                "prefix-icon": unref(__unplugin_components_1),
                "prefix-icon-class": "w-[16px] h-[16px] icon-dark-gray-500",
                variant: "outline",
                onClick: _cache[4] || (_cache[4] = ($event) => emits("restart"))
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(t)("createSpec.successPage.createAnotherSpecButton")), 1)
                ]),
                _: 1
              }, 8, ["prefix-icon"])
            ]),
            _: 1
          })
        ], 64))
      ]);
    };
  }
});
const EmptyGenerator = {
  card: _sfc_main$i,
  entry: _sfc_main$g,
  matches: () => true,
  show: () => true,
  id: "empty"
};
const _hoisted_1$d = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "160",
  height: "160",
  fill: "none"
};
const _hoisted_2$a = /* @__PURE__ */ createStaticVNode('<path fill="#D0D2E0" d="M71.4 47.379H5.334v79.884h66.068V47.379Z"></path><path fill="#9095AD" d="M58.33 59.353H18.388v5.384H58.33v-5.384ZM58.33 71.249H18.388v5.383H58.33V71.25ZM58.33 82.779H18.388v5.384H58.33v-5.384Z"></path><path fill="#6470F3" d="M113.392 22.667H49.023v73.31h64.369v-73.31ZM128.689 106.013l-5.502 5.503 6.715 6.715 5.503-5.503-6.716-6.715Z"></path><path fill="#D0D2E0" d="m127.311 120.788 10.646-10.646 14.992 14.992a2.433 2.433 0 0 1 0 3.436l-7.199 7.199a2.426 2.426 0 0 1-3.436 0l-14.992-14.992-.011.011Z"></path><circle cx="106.667" cy="89.333" r="20" fill="#9095AD"></circle><path fill="#D0D2E0" d="M125.954 70.375a27.161 27.161 0 0 1 5.89 29.597 27.153 27.153 0 0 1-25.091 16.767 27.154 27.154 0 0 1-25.09-16.767 27.158 27.158 0 0 1 44.291-29.597Zm-31.43 6.988a17.295 17.295 0 1 0 24.458 0 17.283 17.283 0 0 0-18.848-3.753 17.28 17.28 0 0 0-5.61 3.753ZM69.75 34.514a6.066 6.066 0 0 1 1.953 4.765 5.607 5.607 0 0 1-1.938 4.605 7.94 7.94 0 0 1-5.145 1.589l-.127 2.366h-3.78l-.159-5.225h1.255a9.528 9.528 0 0 0 4.113-.715 2.62 2.62 0 0 0 1.445-2.589 2.89 2.89 0 0 0-.778-2.144 2.843 2.843 0 0 0-2.144-.81 2.956 2.956 0 0 0-2.192.779 2.827 2.827 0 0 0-.794 2.112h-4.066a6.542 6.542 0 0 1 .81-3.351 5.734 5.734 0 0 1 2.446-2.303 8.163 8.163 0 0 1 3.796-.842 7.464 7.464 0 0 1 5.304 1.763Zm-9.085 19.98a2.383 2.383 0 0 1-.746-1.811 2.35 2.35 0 0 1 .746-1.795 2.7 2.7 0 0 1 1.922-.73 2.59 2.59 0 0 1 1.874.73 2.413 2.413 0 0 1 .746 1.795 2.445 2.445 0 0 1-.746 1.81 2.572 2.572 0 0 1-1.874.715 2.683 2.683 0 0 1-2.001-.715h.08Z"></path>', 6);
const _hoisted_8$2 = [
  _hoisted_2$a
];
function render$2(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$d, _hoisted_8$2);
}
const NoResultsIllustration = { render: render$2 };
const _hoisted_1$c = {
  key: 0,
  "data-testid": "no-results",
  class: "text-center"
};
const _hoisted_2$9 = { class: "leading-normal text-gray-500 text-[18px]" };
const _hoisted_3$8 = {
  key: 0,
  class: "text-purple-500 truncate"
};
const _sfc_main$f = /* @__PURE__ */ defineComponent({
  __name: "NoResults",
  props: {
    searchTerm: null,
    message: null,
    emptySearch: { type: Boolean }
  },
  emits: ["clear"],
  setup(__props, { emit }) {
    const { t } = useI18n();
    return (_ctx, _cache) => {
      const _component_i_cy_delete_x12 = __unplugin_components_0$6;
      return __props.searchTerm || __props.emptySearch ? (openBlock(), createElementBlock("div", _hoisted_1$c, [
        createVNode(unref(NoResultsIllustration), {
          class: "mx-auto",
          alt: ""
        }),
        createBaseVNode("p", _hoisted_2$9, [
          createTextVNode(toDisplayString(__props.message || unref(t)("noResults.defaultMessage")) + " ", 1),
          __props.searchTerm ? (openBlock(), createElementBlock("span", _hoisted_3$8, toDisplayString(__props.searchTerm), 1)) : createCommentVNode("", true)
        ]),
        createVNode(_sfc_main$n, {
          "data-cy": "no-results-clear",
          class: "mx-auto mt-[20px]",
          size: "lg",
          variant: "outline",
          onClick: _cache[0] || (_cache[0] = ($event) => emit("clear"))
        }, {
          prefix: withCtx(() => [
            createVNode(_component_i_cy_delete_x12, { class: "w-[12px] icon-dark-gray-400" })
          ]),
          default: withCtx(() => [
            createTextVNode(" " + toDisplayString(unref(t)("noResults.clearSearch")), 1)
          ]),
          _: 1
        })
      ])) : createCommentVNode("", true);
    };
  }
});
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  __name: "CreateSpecModalBody",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$q, {
        variant: "bare",
        class: "rounded h-[444px] w-[640px] overflow-auto"
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      });
    };
  }
});
const _hoisted_1$b = { class: "h-full" };
const _hoisted_2$8 = {
  key: 0,
  class: "h-full relative",
  tabindex: "0"
};
const _hoisted_3$7 = { class: "h-full" };
const _hoisted_4$6 = ["onClick"];
const _hoisted_5$5 = { class: "h-full inline-flex whitespace-nowrap items-center overflow-hidden" };
const _hoisted_6$2 = { class: "font-medium text-indigo-500 group-hocus:text-indigo-500" };
const _hoisted_7$2 = { class: "font-light text-gray-400" };
const _hoisted_8$1 = { class: "font-light ml-[20px] opacity-0 text-gray-600 duration-200 truncate group-hocus:opacity-60" };
const _hoisted_9$1 = {
  key: 1,
  class: "flex h-full items-center justify-center"
};
const _sfc_main$d = /* @__PURE__ */ defineComponent({
  __name: "FileList",
  props: {
    files: null
  },
  emits: ["selectFile"],
  setup(__props) {
    gql`
fragment FileListItem on FileParts {
  id
  relative
  fileName
  fileExtension
  baseName
}
`;
    const name = (file) => {
      return file.baseName.replace(file.fileExtension, "");
    };
    return (_ctx, _cache) => {
      const _component_i_cy_document_blank_x16 = __unplugin_components_0$2;
      return openBlock(), createElementBlock("div", _hoisted_1$b, [
        __props.files.length ? (openBlock(), createElementBlock("div", _hoisted_2$8, [
          createBaseVNode("ul", _hoisted_3$7, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(__props.files, (file) => {
              return openBlock(), createElementBlock("li", {
                key: file == null ? void 0 : file.id,
                class: "cursor-pointer flex border-b border-b-gray-50 leading-normal text-[16px] gap-[8px] group items-center last last:border-none last:h-[64px] last:py-0 last:items-start children:h-[40px] children:py-[8px]",
                "data-cy": "file-list-row",
                onClick: ($event) => _ctx.$emit("selectFile", file)
              }, [
                createVNode(_component_i_cy_document_blank_x16, { class: "min-w-[16px] min-h-[16px] icon-light-gray-50 icon-dark-gray-300" }),
                createBaseVNode("div", _hoisted_5$5, [
                  createBaseVNode("span", _hoisted_6$2, toDisplayString(name(file)), 1),
                  createBaseVNode("span", _hoisted_7$2, toDisplayString(file.fileExtension), 1),
                  createBaseVNode("span", _hoisted_8$1, toDisplayString(file.relative), 1)
                ])
              ], 8, _hoisted_4$6);
            }), 128))
          ])
        ])) : (openBlock(), createElementBlock("div", _hoisted_9$1, [
          renderSlot(_ctx.$slots, "no-results")
        ]))
      ]);
    };
  }
});
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "FileMatchInput",
  props: {
    modelValue: null
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const { modelValue: localModelValue } = useVModels(props, emits);
    return (_ctx, _cache) => {
      return withDirectives((openBlock(), createElementBlock("input", {
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(localModelValue) ? localModelValue.value = $event : null),
        class: "grow p-0 text-gray-700 placeholder-gray-400 border-transparent outline-none placeholder-shown:overflow-ellipsis placeholder-shown:truncate hocus:border-transparent mr-[8px]",
        type: "search",
        autocomplete: "off"
      }, null, 512)), [
        [vModelText, unref(localModelValue)]
      ]);
    };
  }
});
const FileMatchInput_vue_vue_type_style_index_0_scoped_0dfe973e_lang = "";
const FileMatchInput = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__scopeId", "data-v-0dfe973e"]]);
const _hoisted_1$a = {
  "data-cy": "file-match-button",
  class: "inline-flex items-center h-full text-gray-700 transition duration-150 rounded-l outline-none group bg-gray-50 border-r-gray-100 border-r hocus:bg-indigo-50 hocus:border-r-indigo-300 hocus:text-indigo-500 px-[12px]"
};
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "FileMatchButton",
  props: {
    expanded: { type: Boolean, default: false }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      const _component_i_cy_chevron_right_small_x16 = __unplugin_components_0$7;
      return openBlock(), createElementBlock("button", _hoisted_1$a, [
        createVNode(_component_i_cy_chevron_right_small_x16, {
          class: normalizeClass(["transition duration-150 transform min-w-[16px] min-h-[16px] icon-dark-gray-400 group-hocus:icon-dark-indigo-400", {
            "rotate-90": __props.expanded
          }])
        }, null, 8, ["class"]),
        renderSlot(_ctx.$slots, "default")
      ]);
    };
  }
});
const _hoisted_1$9 = { class: "rounded border h-[40px] w-full inline-flex items-center hocus-default focus-within-default truncate" };
const _hoisted_2$7 = { key: 0 };
const _hoisted_3$6 = { class: "grow min-w-min inline-flex items-center group" };
const _hoisted_4$5 = { class: "grow inline-flex items-center group" };
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "FileMatch",
  props: {
    extensionPattern: null,
    pattern: null,
    matches: null
  },
  emits: ["update:extensionPattern", "update:pattern"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const { t } = useI18n();
    const { extensionPattern: localExtensionPattern, pattern: localPattern } = useVModels(props, emits);
    const indicatorText = computed(() => {
      const numerator = props.matches.found;
      const denominator = props.matches.total;
      if (localPattern.value) {
        return t("components.fileSearch.matchesIndicator", { count: numerator, denominator, numerator });
      }
      return t("components.fileSearch.matchesIndicatorEmptyFileSearch", { count: numerator, denominator, numerator });
    });
    const [expanded, toggleExpanded] = useToggle(false);
    return (_ctx, _cache) => {
      const _component_i_cy_magnifying_glass_x16 = IconMagnifyingGlass;
      return openBlock(), createElementBlock("div", null, [
        createBaseVNode("div", _hoisted_1$9, [
          createVNode(_sfc_main$b, {
            expanded: unref(expanded),
            onClick: _cache[0] || (_cache[0] = ($event) => unref(toggleExpanded)())
          }, {
            default: withCtx(() => [
              !unref(expanded) ? (openBlock(), createElementBlock("span", _hoisted_2$7, toDisplayString(unref(localExtensionPattern)), 1)) : createCommentVNode("", true)
            ]),
            _: 1
          }, 8, ["expanded"]),
          createBaseVNode("div", _hoisted_3$6, [
            !unref(expanded) ? (openBlock(), createBlock(_component_i_cy_magnifying_glass_x16, {
              key: 0,
              class: "mr-[8px] ml-[12px] inline-block icon-light-gray-50 icon-dark-gray-500 group-focus-within:icon-light-indigo-50 group-focus-within:icon-dark-indigo-400"
            })) : createCommentVNode("", true),
            unref(expanded) ? (openBlock(), createBlock(FileMatchInput, {
              key: 1,
              modelValue: unref(localExtensionPattern),
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => isRef(localExtensionPattern) ? localExtensionPattern.value = $event : null),
              class: "ml-[12px]",
              placeholder: unref(t)("components.fileSearch.byExtensionInput")
            }, null, 8, ["modelValue", "placeholder"])) : (openBlock(), createBlock(FileMatchInput, {
              key: 2,
              modelValue: unref(localPattern),
              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => isRef(localPattern) ? localPattern.value = $event : null),
              "aria-label": "file-name-input",
              placeholder: unref(t)("components.fileSearch.byFilenameInput")
            }, null, 8, ["modelValue", "placeholder"]))
          ]),
          renderSlot(_ctx.$slots, "matches", {}, () => [
            createVNode(_sfc_main$r, {
              class: "mr-[8px] truncate",
              "data-cy": "file-match-indicator"
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(unref(indicatorText)), 1)
              ]),
              _: 1
            })
          ])
        ]),
        createBaseVNode("div", {
          class: normalizeClass(["rounded border h-[40px] mt-[8px] w-full inline-flex items-center hocus-default focus-within-default", { "hidden": !unref(expanded) }])
        }, [
          createBaseVNode("div", _hoisted_4$5, [
            createVNode(_component_i_cy_magnifying_glass_x16, { class: "mr-[8px] ml-[12px] inline-block icon-light-gray-50 icon-dark-gray-500 group-focus-within:icon-light-indigo-50 group-focus-within:icon-dark-indigo-400" }),
            createVNode(FileMatchInput, {
              modelValue: unref(localPattern),
              "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => isRef(localPattern) ? localPattern.value = $event : null),
              placeholder: unref(t)("components.fileSearch.byFilenameInput")
            }, null, 8, ["modelValue", "placeholder"])
          ])
        ], 2)
      ]);
    };
  }
});
const _hoisted_1$8 = { "data-testid": "loading" };
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "FileChooser",
  props: {
    files: null,
    extensionPattern: null,
    loading: { type: Boolean, default: false }
  },
  emits: ["selectFile", "update:extensionPattern"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const { t } = useI18n();
    gql`
fragment FileChooser on FileParts {
  relative
  id
  ...FileListItem
}
`;
    const initialExtensionPattern = props.extensionPattern;
    const localExtensionPattern = ref(props.extensionPattern);
    const filePathSearch = ref("");
    const selectFile = (file) => {
      emits("selectFile", file);
    };
    const fileMatchRef = ref(null);
    const { height: fileMatchHeight } = useElementSize(fileMatchRef);
    const debounce = 200;
    const debouncedExtensionPattern = useDebounce(localExtensionPattern, debounce);
    debouncedWatch(localExtensionPattern, (value) => {
      emits("update:extensionPattern", value);
    }, { debounce });
    const filteredFiles = computed(() => {
      var _a;
      return (_a = props.files) == null ? void 0 : _a.filter((file) => {
        return file.relative.toLowerCase().includes(filePathSearch.value.toLowerCase());
      });
    });
    const matches = computed(() => {
      return {
        total: props.files.length,
        found: filteredFiles.value.length
      };
    });
    const noResults = computed(() => {
      return {
        search: filePathSearch.value || debouncedExtensionPattern.value,
        message: filePathSearch.value ? t("noResults.defaultMessage") : t("components.fileSearch.noMatchesForExtension"),
        clear: () => {
          if (filePathSearch.value) {
            filePathSearch.value = "";
          } else {
            localExtensionPattern.value = initialExtensionPattern;
          }
        }
      };
    });
    return (_ctx, _cache) => {
      const _component_i_cy_loading_x16 = __unplugin_components_0$8;
      return openBlock(), createBlock(_sfc_main$e, {
        variant: "bare",
        class: "bg-white flex flex-col px-[24px] relative"
      }, {
        default: withCtx(() => [
          createVNode(_sfc_main$a, {
            ref_key: "fileMatchRef",
            ref: fileMatchRef,
            pattern: filePathSearch.value,
            "onUpdate:pattern": _cache[0] || (_cache[0] = ($event) => filePathSearch.value = $event),
            extensionPattern: localExtensionPattern.value,
            "onUpdate:extensionPattern": _cache[1] || (_cache[1] = ($event) => localExtensionPattern.value = $event),
            class: "bg-white pt-[24px] pb-[12px] top-[0px] z-10 sticky",
            matches: unref(matches)
          }, createSlots({ _: 2 }, [
            __props.loading ? {
              name: "matches",
              fn: withCtx(() => [
                createVNode(_component_i_cy_loading_x16, { class: "h-[24px] mr-[10px] animate-spin w-[24px]" })
              ]),
              key: "0"
            } : void 0
          ]), 1032, ["pattern", "extensionPattern", "matches"]),
          withDirectives(createBaseVNode("div", _hoisted_1$8, " Loading ", 512), [
            [vShow, __props.loading]
          ]),
          withDirectives(createVNode(_sfc_main$d, {
            style: normalizeStyle({ paddingTop: `${unref(fileMatchHeight) + 36}px` }),
            class: "right-[24px] left-[24px] absolute",
            files: unref(filteredFiles),
            search: filePathSearch.value,
            onSelectFile: selectFile
          }, {
            "no-results": withCtx(() => [
              createVNode(_sfc_main$f, {
                "empty-search": "",
                "search-term": unref(noResults).search,
                message: unref(noResults).message,
                onClear: unref(noResults).clear
              }, null, 8, ["search-term", "message", "onClear"])
            ]),
            _: 1
          }, 8, ["style", "files", "search"]), [
            [vShow, !__props.loading]
          ])
        ]),
        _: 1
      });
    };
  }
});
const _hoisted_1$7 = { class: "flex flex-col grow justify-between" };
const _hoisted_2$6 = { class: "grow" };
const _hoisted_3$5 = {
  key: 0,
  class: "mt-[48px] w-full inline-flex items-center justify-center"
};
const _hoisted_4$4 = /* @__PURE__ */ createBaseVNode("p", { class: "text-lg" }, " Loading ", -1);
const _hoisted_5$4 = {
  key: 1,
  class: "bg-white rounded-b h-[24px] bottom-0 left-0 w-[calc(100%-24px)] absolute"
};
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "VueComponentGeneratorStepOne",
  props: {
    title: null,
    gql: null
  },
  emits: ["update:title", "update:description", "restart", "close"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const { t } = useI18n();
    const { title } = useVModels(props, emits);
    title.value = t("createSpec.component.importFromComponent.chooseAComponentHeader");
    gql`
query VueComponentGeneratorStepOne($glob: String!) {
  currentProject {
    id
    codeGenCandidates(glob: $glob) {
      id
      fileName
      fileExtension
      absolute
      relative
      baseName
    }
    # Add the specs, so we can keep the list up to date with the cache
    specs {
      id
      ...SpecNode_InlineSpecList
    }
  }
}
`;
    gql`
mutation VueComponentGeneratorStepOne_generateSpec($codeGenCandidate: String!, $type: CodeGenType!) {
  generateSpecFromSource(codeGenCandidate: $codeGenCandidate, type: $type) {
    ...GeneratorSuccess
    currentProject {
      id
      ...EmptyGenerator
    }
    generatedSpecResult {
      ... on GeneratedSpecError {
        fileName
      }
    }
  }
}`;
    const mutation = useMutation(VueComponentGeneratorStepOne_GenerateSpecDocument);
    const extensionPattern = ref(props.gql.codeGenGlobs.component);
    const query = useQuery({
      query: VueComponentGeneratorStepOneDocument,
      // @ts-ignore
      variables: { glob: extensionPattern },
      requestPolicy: "network-only"
    });
    const allFiles = computed(() => {
      var _a, _b, _c;
      if ((_b = (_a = query.data.value) == null ? void 0 : _a.currentProject) == null ? void 0 : _b.codeGenCandidates) {
        return (_c = query.data.value.currentProject) == null ? void 0 : _c.codeGenCandidates;
      }
      return [];
    });
    const result = ref(null);
    const generatedSpecError = ref();
    const generateSpecFromSource = ref();
    whenever(result, () => {
      title.value = t("createSpec.successPage.header");
    });
    whenever(generatedSpecError, () => {
      title.value = t("createSpec.component.importTemplateSpec.header");
    });
    const makeSpec = async (file) => {
      var _a, _b, _c, _d, _e, _f;
      const { data } = await mutation.executeMutation({
        codeGenCandidate: file.absolute,
        type: "component"
      });
      generateSpecFromSource.value = data == null ? void 0 : data.generateSpecFromSource;
      result.value = ((_b = (_a = data == null ? void 0 : data.generateSpecFromSource) == null ? void 0 : _a.generatedSpecResult) == null ? void 0 : _b.__typename) === "ScaffoldedFile" ? (_c = data == null ? void 0 : data.generateSpecFromSource) == null ? void 0 : _c.generatedSpecResult : null;
      generatedSpecError.value = ((_e = (_d = data == null ? void 0 : data.generateSpecFromSource) == null ? void 0 : _d.generatedSpecResult) == null ? void 0 : _e.__typename) === "GeneratedSpecError" ? (_f = data == null ? void 0 : data.generateSpecFromSource) == null ? void 0 : _f.generatedSpecResult : null;
    };
    const cancelSpecNameCreation = () => {
      generatedSpecError.value = null;
    };
    return (_ctx, _cache) => {
      const _component_i_cy_loading_x16 = __unplugin_components_0$8;
      return openBlock(), createElementBlock("div", _hoisted_1$7, [
        generatedSpecError.value ? (openBlock(), createBlock(_sfc_main$g, {
          key: 0,
          gql: generateSpecFromSource.value.currentProject,
          title: "",
          type: "component",
          "other-generators": false,
          "spec-file-name": generatedSpecError.value.fileName,
          onRestart: cancelSpecNameCreation,
          onUpdateTitle: _cache[0] || (_cache[0] = (value) => emits("update:title", value))
        }, null, 8, ["gql", "spec-file-name"])) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          createBaseVNode("div", _hoisted_2$6, [
            unref(mutation).fetching.value ? (openBlock(), createElementBlock("div", _hoisted_3$5, [
              createVNode(_component_i_cy_loading_x16, { class: "h-[48px] mr-[12px] animate-spin w-[48px]" }),
              _hoisted_4$4
            ])) : !result.value ? (openBlock(), createBlock(_sfc_main$9, {
              key: 1,
              extensionPattern: extensionPattern.value,
              "onUpdate:extensionPattern": _cache[1] || (_cache[1] = ($event) => extensionPattern.value = $event),
              files: unref(allFiles),
              loading: unref(query).fetching.value,
              onSelectFile: makeSpec
            }, null, 8, ["extensionPattern", "files", "loading"])) : (openBlock(), createBlock(_sfc_main$h, {
              key: 2,
              file: result.value.file
            }, null, 8, ["file"]))
          ]),
          createBaseVNode("div", null, [
            result.value ? (openBlock(), createBlock(StandardModalFooter, {
              key: 0,
              class: "flex gap-[16px] items-center"
            }, {
              default: withCtx(() => [
                createVNode(_sfc_main$n, {
                  size: "lg",
                  to: { name: "SpecRunner", query: { file: unref(posixify)(result.value.file.relative) }, params: { shouldShowTroubleRenderingAlert: "true" } },
                  "prefix-icon": unref(TestResultsIcon),
                  "prefix-icon-class": "w-[16px] h-[16px] icon-dark-white",
                  onClick: _cache[2] || (_cache[2] = ($event) => emits("close"))
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(t)("createSpec.successPage.runSpecButton")), 1)
                  ]),
                  _: 1
                }, 8, ["to", "prefix-icon"]),
                createVNode(_sfc_main$n, {
                  size: "lg",
                  "prefix-icon": unref(__unplugin_components_1),
                  "prefix-icon-class": "w-[16px] h-[16px] icon-dark-gray-500",
                  variant: "outline",
                  onClick: _cache[3] || (_cache[3] = ($event) => emits("restart"))
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(t)("createSpec.successPage.createAnotherSpecButton")), 1)
                  ]),
                  _: 1
                }, 8, ["prefix-icon"])
              ]),
              _: 1
            })) : (openBlock(), createElementBlock("div", _hoisted_5$4))
          ])
        ], 64))
      ]);
    };
  }
});
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "ComponentGeneratorCard",
  props: {
    disabled: { type: Boolean }
  },
  setup(__props) {
    const { t } = useI18n();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$l, {
        disabled: __props.disabled,
        header: unref(t)("createSpec.component.importFromComponent.header"),
        description: unref(t)("createSpec.component.importFromComponent.description"),
        icon: unref(DocumentCodeIcon),
        "badge-text": unref(t)("versions.new")
      }, null, 8, ["disabled", "header", "description", "icon", "badge-text"]);
    };
  }
});
const VueComponentGenerator = {
  card: _sfc_main$7,
  entry: _sfc_main$8,
  show: (currentProject) => (currentProject == null ? void 0 : currentProject.codeGenFramework) === "vue",
  matches: filters.matchesCT,
  id: "vueComponent"
};
const _hoisted_1$6 = { class: "h-full" };
const _hoisted_2$5 = {
  key: 0,
  class: "h-full relative"
};
const _hoisted_3$4 = { class: "h-full pb-[24px] overflow-auto" };
const _hoisted_4$3 = { class: "cursor-pointer flex border-b border-b-gray-50 leading-normal text-[16px] gap-[8px] group items-center last last:py-0 last:items-start children:h-[40px] children:py-[8px]" };
const _hoisted_5$3 = { class: "h-full inline-flex whitespace-nowrap items-center overflow-hidden" };
const _hoisted_6$1 = { class: "font-medium text-gray-600" };
const _hoisted_7$1 = { class: "font-light text-gray-400" };
const _hoisted_8 = { class: "font-light ml-[20px] opacity-0 text-gray-600 duration-200 truncate group-hocus:opacity-60" };
const _hoisted_9 = { key: 0 };
const _hoisted_10 = {
  key: 1,
  class: "flex h-full items-center justify-center"
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "ExpandableFileList",
  props: {
    files: null
  },
  emits: ["selectItem"],
  setup(__props) {
    gql`
fragment FileListItem on FileParts {
  id
  relative
  fileName
  fileExtension
  baseName
}
`;
    const name = (file) => {
      return file.baseName.replace(file.fileExtension, "");
    };
    return (_ctx, _cache) => {
      const _component_i_cy_chevron_down_small_x16 = __unplugin_components_0$5;
      const _component_i_cy_document_blank_x16 = __unplugin_components_0$2;
      return openBlock(), createElementBlock("div", _hoisted_1$6, [
        __props.files.length ? (openBlock(), createElementBlock("div", _hoisted_2$5, [
          createBaseVNode("ul", _hoisted_3$4, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(__props.files, (file) => {
              return openBlock(), createElementBlock("li", {
                key: file.id
              }, [
                createVNode(_sfc_main$o, {
                  lazy: "",
                  "data-cy": "file-list-row"
                }, {
                  target: withCtx(({ open }) => [
                    createBaseVNode("div", _hoisted_4$3, [
                      createVNode(_component_i_cy_chevron_down_small_x16, {
                        class: normalizeClass(["mr-[8px] text-sm icon-dark-gray-300 group-hocus:icon-dark-gray-700", { "transform rotate-270": !open }])
                      }, null, 8, ["class"]),
                      createVNode(_component_i_cy_document_blank_x16, { class: "min-w-[16px] min-h-[16px] icon-light-gray-50 icon-dark-gray-300" }),
                      createBaseVNode("div", _hoisted_5$3, [
                        createBaseVNode("span", _hoisted_6$1, toDisplayString(name(file)), 1),
                        createBaseVNode("span", _hoisted_7$1, toDisplayString(file.fileExtension), 1),
                        createBaseVNode("span", _hoisted_8, toDisplayString(file.relative), 1)
                      ])
                    ]),
                    open ? (openBlock(), createElementBlock("div", _hoisted_9, [
                      renderSlot(_ctx.$slots, "expanded-content", { file })
                    ])) : createCommentVNode("", true)
                  ]),
                  _: 2
                }, 1024)
              ]);
            }), 128))
          ])
        ])) : (openBlock(), createElementBlock("div", _hoisted_10, [
          renderSlot(_ctx.$slots, "no-results")
        ]))
      ]);
    };
  }
});
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "ExpandableFileChooser",
  props: {
    files: null,
    extensionPattern: null,
    loading: { type: Boolean, default: false }
  },
  emits: ["update:extensionPattern"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const { t } = useI18n();
    gql`
fragment FileChooser on FileParts {
  relative
  id
  ...FileListItem
}
`;
    const initialExtensionPattern = props.extensionPattern;
    const localExtensionPattern = ref(props.extensionPattern);
    const filePathSearch = ref("");
    const fileMatchRef = ref(null);
    const { height: fileMatchHeight } = useElementSize(fileMatchRef);
    const debounce = 200;
    const debouncedExtensionPattern = useDebounce(localExtensionPattern, debounce);
    debouncedWatch(localExtensionPattern, (value) => {
      emits("update:extensionPattern", value);
    }, { debounce });
    const filteredFiles = computed(() => {
      var _a;
      return (_a = props.files) == null ? void 0 : _a.filter((file) => {
        return file.relative.toLowerCase().includes(filePathSearch.value.toLowerCase());
      });
    });
    const matches = computed(() => {
      return {
        total: props.files.length,
        found: filteredFiles.value.length
      };
    });
    const noResults = computed(() => {
      return {
        search: filePathSearch.value || debouncedExtensionPattern.value,
        message: filePathSearch.value ? t("noResults.defaultMessage") : t("components.fileSearch.noMatchesForExtension"),
        clear: () => {
          if (filePathSearch.value) {
            filePathSearch.value = "";
          } else {
            localExtensionPattern.value = initialExtensionPattern;
          }
        }
      };
    });
    return (_ctx, _cache) => {
      const _component_i_cy_loading_x16 = __unplugin_components_0$8;
      return openBlock(), createBlock(_sfc_main$e, {
        variant: "bare",
        class: "bg-white flex flex-col px-[24px] relative"
      }, {
        default: withCtx(() => [
          createVNode(_sfc_main$a, {
            ref_key: "fileMatchRef",
            ref: fileMatchRef,
            pattern: filePathSearch.value,
            "onUpdate:pattern": _cache[0] || (_cache[0] = ($event) => filePathSearch.value = $event),
            extensionPattern: localExtensionPattern.value,
            "onUpdate:extensionPattern": _cache[1] || (_cache[1] = ($event) => localExtensionPattern.value = $event),
            class: "bg-white pt-[24px] pb-[12px] top-[0px] z-10 sticky",
            matches: unref(matches)
          }, createSlots({ _: 2 }, [
            __props.loading ? {
              name: "matches",
              fn: withCtx(() => [
                createVNode(_component_i_cy_loading_x16, { class: "h-[24px] mr-[10px] animate-spin w-[24px]" })
              ]),
              key: "0"
            } : void 0
          ]), 1032, ["pattern", "extensionPattern", "matches"]),
          withDirectives(createVNode(_sfc_main$6, {
            style: normalizeStyle({ paddingTop: `${unref(fileMatchHeight) + 36}px` }),
            class: "right-[24px] left-[24px] absolute",
            files: unref(filteredFiles),
            search: filePathSearch.value
          }, {
            "expanded-content": withCtx(({ file }) => [
              renderSlot(_ctx.$slots, "item", { file })
            ]),
            "no-results": withCtx(() => [
              createVNode(_sfc_main$f, {
                "empty-search": "",
                "search-term": unref(noResults).search,
                message: unref(noResults).message,
                onClear: unref(noResults).clear
              }, null, 8, ["search-term", "message", "onClear"])
            ]),
            _: 3
          }, 8, ["style", "files", "search"]), [
            [vShow, !__props.loading]
          ])
        ]),
        _: 3
      });
    };
  }
});
const _hoisted_1$5 = {
  height: "1em",
  width: "1em",
  style: { "min-width": "16px", "min-height": "16px" },
  viewBox: "0 0 16 16",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
};
const _hoisted_2$4 = /* @__PURE__ */ createBaseVNode("path", {
  d: "M13.6568 2.34392C12.8758 1.56287 11.6095 1.56287 10.8284 2.34392C10.5708 2.60151 10.3982 2.91189 10.3105 3.24023L8.70721 1.63694C8.12143 1.05115 7.17155 1.05103 6.58577 1.63681L5.48055 2.74203C5.62264 2.82595 5.75658 2.92895 5.87866 3.05103C6.65971 3.83208 6.65971 5.09841 5.87866 5.87946C5.09761 6.6605 3.83128 6.6605 3.05023 5.87946C2.92815 5.75737 2.82515 5.62344 2.74123 5.48135L1.63602 6.58656C1.05023 7.17235 1.0503 8.12216 1.63609 8.70795L3.23944 10.3113C2.9111 10.399 2.60071 10.5716 2.34312 10.8292C1.56208 11.6103 1.56208 12.8766 2.34312 13.6576C3.12417 14.4387 4.3905 14.4387 5.17155 13.6576C5.42914 13.4 5.60177 13.0897 5.68945 12.7613L7.29269 14.3646C7.87847 14.9503 8.82832 14.9504 9.41411 14.3647L10.5193 13.2595C10.3773 13.1756 10.2433 13.0726 10.1213 12.9505C9.34025 12.1695 9.34025 10.9031 10.1213 10.1221C10.9023 9.34105 12.1687 9.34105 12.9497 10.1221C13.0718 10.2441 13.1748 10.378 13.2587 10.5201L14.3639 9.4149C14.9496 8.82912 14.9495 7.87925 14.3637 7.29346L12.7605 5.69025C13.0889 5.60257 13.3992 5.42994 13.6568 5.17235C14.4379 4.3913 14.4379 3.12497 13.6568 2.34392Z",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, null, -1);
const _hoisted_3$3 = [
  _hoisted_2$4
];
function render$1(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$5, _hoisted_3$3);
}
const __unplugin_components_0 = { name: "cy-puzzle-piece_x16", render: render$1 };
const _hoisted_1$4 = { class: "h-full" };
const _hoisted_2$3 = {
  key: 0,
  class: "border-b border-b-gray-50 py-2 pl-[56px] text-gray-700"
};
const _hoisted_3$2 = {
  key: 1,
  class: "border-b border-b-gray-50 py-2 pl-[56px] text-gray-700"
};
const _hoisted_4$2 = { key: 2 };
const _hoisted_5$2 = ["onClick"];
const _hoisted_6 = { class: "h-full inline-flex whitespace-nowrap items-center overflow-hidden" };
const _hoisted_7 = { class: "font-medium text-indigo-600 truncate" };
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "ReactComponentList",
  props: {
    file: null
  },
  emits: ["selectItem"],
  setup(__props) {
    const props = __props;
    const { t } = useI18n();
    const errored = ref(false);
    const components = ref([]);
    gql`
mutation ComponentList_getReactComponentsFromFile($filePath: String!) {
  getReactComponentsFromFile(filePath: $filePath) {
    components {
      exportName
      isDefault
    }
    errored
  }
}`;
    const getReactComponentsMutation = useMutation(ComponentList_GetReactComponentsFromFileDocument);
    const getComponents = async (file) => {
      var _a, _b;
      const { data } = await getReactComponentsMutation.executeMutation({
        filePath: file.absolute
      });
      errored.value = ((_a = data == null ? void 0 : data.getReactComponentsFromFile) == null ? void 0 : _a.errored) || void 0;
      components.value = ((_b = data == null ? void 0 : data.getReactComponentsFromFile) == null ? void 0 : _b.components) || [];
    };
    onMounted(() => {
      getComponents(props.file);
    });
    return (_ctx, _cache) => {
      const _component_i_cy_puzzle_piece_x16 = __unplugin_components_0;
      return openBlock(), createElementBlock("div", _hoisted_1$4, [
        errored.value ? (openBlock(), createElementBlock("div", _hoisted_2$3, toDisplayString(unref(t)("createSpec.unableToParseFile")), 1)) : !unref(getReactComponentsMutation).fetching.value && !components.value.length ? (openBlock(), createElementBlock("div", _hoisted_3$2, toDisplayString(unref(t)("createSpec.noComponentsFound")), 1)) : (openBlock(), createElementBlock("ul", _hoisted_4$2, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(components.value, ({ exportName, isDefault }) => {
            return openBlock(), createElementBlock("li", { key: exportName }, [
              createBaseVNode("button", {
                "data-cy": "react-component-row",
                class: "cursor-pointer flex border-b border-b-gray-50 leading-normal w-full pl-[56px] text-[16px] group items-center children:h-[40px] children:py-[8px]",
                onClick: ($event) => _ctx.$emit("selectItem", { file: __props.file, item: { exportName, isDefault } })
              }, [
                createBaseVNode("div", _hoisted_6, [
                  createVNode(_component_i_cy_puzzle_piece_x16, { class: "mr-[8px] text-sm fill-gray-50 stroke-gray-300 group-hocus:stroke-indigo-500 group-hocus:fill-indigo-50" }),
                  createBaseVNode("span", _hoisted_7, toDisplayString(exportName), 1)
                ])
              ], 8, _hoisted_5$2)
            ]);
          }), 128))
        ]))
      ]);
    };
  }
});
const _hoisted_1$3 = { class: "flex flex-col grow justify-between" };
const _hoisted_2$2 = { class: "grow" };
const _hoisted_3$1 = {
  key: 0,
  class: "mt-[48px] w-full inline-flex items-center justify-center"
};
const _hoisted_4$1 = /* @__PURE__ */ createBaseVNode("p", { class: "text-lg" }, " Loading ", -1);
const _hoisted_5$1 = {
  key: 1,
  class: "bg-white rounded-b h-[24px] bottom-0 left-0 w-[calc(100%-24px)] absolute"
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "ReactComponentGeneratorStepOne",
  props: {
    title: null,
    gql: null
  },
  emits: ["update:title", "update:description", "restart", "close"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const { t } = useI18n();
    const { title } = useVModels(props, emits);
    title.value = t("createSpec.component.importFromComponent.chooseAComponentHeader");
    gql`
query ReactComponentGeneratorStepOne($glob: String!) {
  currentProject {
    id
    codeGenCandidates(glob: $glob) {
      id
      fileName
      fileExtension
      absolute
      relative
      baseName
    }
    # Add the specs, so we can keep the list up to date with the cache
    specs {
      id
      ...SpecNode_InlineSpecList
    }
  }
}
`;
    gql`
mutation ReactComponentGeneratorStepOne_generateSpec($codeGenCandidate: String!, $type: CodeGenType!, $componentName: String!, $isDefault: Boolean!) {
  generateSpecFromSource(codeGenCandidate: $codeGenCandidate, type: $type, componentName: $componentName, isDefault: $isDefault) {
    ...GeneratorSuccess
    currentProject {
      id
      ...EmptyGenerator
    }
    generatedSpecResult {
      ... on GeneratedSpecError {
        fileName
      }
    }
  }
}`;
    const generateSpecMutation = useMutation(ReactComponentGeneratorStepOne_GenerateSpecDocument);
    const extensionPattern = ref(props.gql.codeGenGlobs.component);
    const query = useQuery({
      query: ReactComponentGeneratorStepOneDocument,
      // @ts-ignore
      variables: { glob: extensionPattern },
      requestPolicy: "network-only"
    });
    const allFiles = computed(() => {
      var _a, _b, _c;
      if ((_b = (_a = query.data.value) == null ? void 0 : _a.currentProject) == null ? void 0 : _b.codeGenCandidates) {
        return (_c = query.data.value.currentProject) == null ? void 0 : _c.codeGenCandidates;
      }
      return [];
    });
    const result = ref(null);
    const generatedSpecError = ref();
    const generateSpecFromSource = ref();
    whenever(result, () => {
      title.value = t("createSpec.successPage.header");
    });
    whenever(generatedSpecError, () => {
      title.value = t("createSpec.component.importTemplateSpec.header");
    });
    const makeSpec = async ({ file, item }) => {
      var _a, _b, _c, _d, _e, _f;
      const { data } = await generateSpecMutation.executeMutation({
        codeGenCandidate: file.absolute,
        type: "component",
        componentName: item.exportName,
        isDefault: item.isDefault
      });
      generateSpecFromSource.value = data == null ? void 0 : data.generateSpecFromSource;
      result.value = ((_b = (_a = data == null ? void 0 : data.generateSpecFromSource) == null ? void 0 : _a.generatedSpecResult) == null ? void 0 : _b.__typename) === "ScaffoldedFile" ? (_c = data == null ? void 0 : data.generateSpecFromSource) == null ? void 0 : _c.generatedSpecResult : null;
      generatedSpecError.value = ((_e = (_d = data == null ? void 0 : data.generateSpecFromSource) == null ? void 0 : _d.generatedSpecResult) == null ? void 0 : _e.__typename) === "GeneratedSpecError" ? (_f = data == null ? void 0 : data.generateSpecFromSource) == null ? void 0 : _f.generatedSpecResult : null;
    };
    const cancelSpecNameCreation = () => {
      generatedSpecError.value = null;
    };
    return (_ctx, _cache) => {
      const _component_i_cy_loading_x16 = __unplugin_components_0$8;
      return openBlock(), createElementBlock("div", _hoisted_1$3, [
        generatedSpecError.value ? (openBlock(), createBlock(_sfc_main$g, {
          key: 0,
          gql: generateSpecFromSource.value.currentProject,
          title: "",
          type: "component",
          "other-generators": false,
          "spec-file-name": generatedSpecError.value.fileName,
          onRestart: cancelSpecNameCreation,
          onUpdateTitle: _cache[0] || (_cache[0] = (value) => emits("update:title", value))
        }, null, 8, ["gql", "spec-file-name"])) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          createBaseVNode("div", _hoisted_2$2, [
            unref(generateSpecMutation).fetching.value ? (openBlock(), createElementBlock("div", _hoisted_3$1, [
              createVNode(_component_i_cy_loading_x16, { class: "h-[48px] mr-[12px] animate-spin w-[48px]" }),
              _hoisted_4$1
            ])) : !result.value ? (openBlock(), createBlock(_sfc_main$5, {
              key: 1,
              extensionPattern: extensionPattern.value,
              "onUpdate:extensionPattern": _cache[1] || (_cache[1] = ($event) => extensionPattern.value = $event),
              files: unref(allFiles),
              loading: unref(query).fetching.value
            }, {
              item: withCtx(({ file }) => [
                createVNode(_sfc_main$4, {
                  file,
                  onSelectItem: makeSpec
                }, null, 8, ["file"])
              ]),
              _: 1
            }, 8, ["extensionPattern", "files", "loading"])) : (openBlock(), createBlock(_sfc_main$h, {
              key: 2,
              file: result.value.file
            }, null, 8, ["file"]))
          ]),
          createBaseVNode("div", null, [
            result.value ? (openBlock(), createBlock(StandardModalFooter, {
              key: 0,
              class: "flex gap-[16px] items-center"
            }, {
              default: withCtx(() => [
                createVNode(_sfc_main$n, {
                  size: "lg",
                  to: { name: "SpecRunner", query: { file: unref(posixify)(result.value.file.relative) }, params: { shouldShowTroubleRenderingAlert: "true" } },
                  "prefix-icon": unref(TestResultsIcon),
                  "prefix-icon-class": "w-[16px] h-[16px] icon-dark-white",
                  onClick: _cache[2] || (_cache[2] = ($event) => emits("close"))
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(t)("createSpec.successPage.runSpecButton")), 1)
                  ]),
                  _: 1
                }, 8, ["to", "prefix-icon"]),
                createVNode(_sfc_main$n, {
                  size: "lg",
                  "prefix-icon": unref(__unplugin_components_1),
                  "prefix-icon-class": "w-[16px] h-[16px] icon-dark-gray-500",
                  variant: "outline",
                  onClick: _cache[3] || (_cache[3] = ($event) => emits("restart"))
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(t)("createSpec.successPage.createAnotherSpecButton")), 1)
                  ]),
                  _: 1
                }, 8, ["prefix-icon"])
              ]),
              _: 1
            })) : (openBlock(), createElementBlock("div", _hoisted_5$1))
          ])
        ], 64))
      ]);
    };
  }
});
const ReactComponentGenerator = {
  card: _sfc_main$7,
  entry: _sfc_main$3,
  show: (currentProject) => (currentProject == null ? void 0 : currentProject.codeGenFramework) === "react",
  matches: filters.matchesCT,
  id: "reactComponent"
};
const generatorList = [
  VueComponentGenerator,
  ReactComponentGenerator,
  ScaffoldGenerator,
  EmptyGenerator
];
const getFilteredGeneratorList = (currentProject) => {
  return computed(() => generatorList.filter((g) => g.matches(currentProject.currentTestingType) && (g.show === void 0 ? true : g.show(currentProject))));
};
const generators = lodashExports.keyBy(generatorList, "id");
const _hoisted_1$2 = { class: "flex flex-wrap gap-[32px] children:mx-auto" };
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "CreateSpecCards",
  props: {
    generators: null,
    gql: null
  },
  emits: ["select"],
  setup(__props) {
    gql`
fragment CreateSpecCards on Query {
  currentProject {
    id
    config
    codeGenGlobs {
      id
      component
    }
  }
}
`;
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$2, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(__props.generators, (generator) => {
          return openBlock(), createBlock(resolveDynamicComponent(generator.card), {
            key: generator.id,
            onClick: ($event) => _ctx.$emit("select", generator.id)
          }, null, 8, ["onClick"]);
        }), 128))
      ]);
    };
  }
});
const _hoisted_1$1 = { class: "flex flex-col min-h-[280px] sm:min-w-[640px]" };
const _hoisted_2$1 = {
  key: 1,
  class: "grow flex items-center self-center"
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "CreateSpecModal",
  props: {
    initialGenerator: null,
    show: { type: Boolean },
    gql: null
  },
  emits: ["close"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const iteration = ref(0);
    gql`
fragment ComponentGeneratorStepOne_codeGenGlob on CurrentProject {
  id
  codeGenGlobs {
    id
    component
  }
  codeGenFramework
}
`;
    gql`
fragment CreateSpecModal on Query {
  ...CreateSpecCards
  currentProject {
    id
    fileExtensionToUse
    defaultSpecFileName
    ...ComponentGeneratorStepOne_codeGenGlob
    ...EmptyGenerator
  }
}
`;
    const currentGeneratorId = ref(props.initialGenerator);
    const { t } = useI18n();
    const title = ref(t("createSpec.newSpecModalTitle"));
    const generator = computed(() => {
      if (currentGeneratorId.value)
        return generators[currentGeneratorId.value];
      return singleGenerator.value;
    });
    const helpLink = computed(() => {
      if (title.value === t("createSpec.e2e.importFromScaffold.specsAddedHeader")) {
        return "https://on.cypress.io/writing-and-organizing-tests";
      }
      return "";
    });
    const specFileName = computed(() => {
      var _a;
      return getPathForPlatform(((_a = props.gql.currentProject) == null ? void 0 : _a.defaultSpecFileName) || "");
    });
    const filteredGenerators = getFilteredGeneratorList(props.gql.currentProject);
    const singleGenerator = computed(() => filteredGenerators.value.length === 1 ? filteredGenerators.value[0] : null);
    whenever(not(generator), () => {
      title.value = t("createSpec.newSpecModalTitle");
    });
    function close() {
      currentGeneratorId.value = void 0;
      emits("close");
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$s, {
        class: "transition transition-all duration-200",
        variant: "bare",
        title: title.value,
        "model-value": __props.show,
        "help-link": unref(helpLink),
        "no-help": !unref(helpLink),
        "data-cy": "create-spec-modal",
        "onUpdate:modelValue": close
      }, {
        overlay: withCtx(({ classes }) => [
          createVNode(unref(DialogOverlay), {
            class: normalizeClass([classes, "bg-gray-900 opacity-[0.97]"])
          }, null, 8, ["class"])
        ]),
        default: withCtx(() => {
          var _a, _b;
          return [
            createBaseVNode("div", _hoisted_1$1, [
              unref(generator) ? (openBlock(), createBlock(resolveDynamicComponent(unref(generator).entry), {
                key: `${unref(generator).id}-${iteration.value}`,
                title: title.value,
                "onUpdate:title": _cache[0] || (_cache[0] = ($event) => title.value = $event),
                gql: props.gql.currentProject,
                type: ((_a = props.gql.currentProject) == null ? void 0 : _a.currentTestingType) === "e2e" ? (_b = props.gql.currentProject) == null ? void 0 : _b.currentTestingType : "componentEmpty",
                "spec-file-name": unref(specFileName),
                "other-generators": unref(filteredGenerators).length > 1,
                onRestart: _cache[1] || (_cache[1] = ($event) => {
                  currentGeneratorId.value = void 0;
                  iteration.value++;
                }),
                onClose: close
              }, null, 40, ["title", "gql", "type", "spec-file-name", "other-generators"])) : (openBlock(), createElementBlock("div", _hoisted_2$1, [
                createVNode(_sfc_main$2, {
                  gql: props.gql,
                  generators: unref(filteredGenerators),
                  onSelect: _cache[2] || (_cache[2] = ($event) => currentGeneratorId.value = $event)
                }, null, 8, ["gql", "generators"])
              ]))
            ])
          ];
        }),
        _: 1
      }, 8, ["title", "model-value", "help-link", "no-help"]);
    };
  }
});
gql`
mutation SpecFilter_SetPreferences ($value: String!) {
  setPreferences (value: $value, type: project) {
    ...TestingPreferences
    ...SpecRunner_Preferences
  }
}`;
function useSpecFilter(savedFilter) {
  const specStore = useSpecStore();
  const saveSpecFilter = useMutation(SpecFilter_SetPreferencesDocument);
  const initialFilter = specStore.specFilter ?? savedFilter ?? "";
  const specFilterModel = ref(initialFilter);
  const debouncedSpecFilterModel = useDebounce(specFilterModel, 200);
  function setSpecFilter(specFilter) {
    if (specStore.specFilter !== specFilter) {
      specStore.setSpecFilter(specFilter);
      saveSpecFilter.executeMutation({ value: JSON.stringify({ specFilter }) });
    }
  }
  watch(() => debouncedSpecFilterModel == null ? void 0 : debouncedSpecFilterModel.value, (newVal) => {
    setSpecFilter(newVal ?? "");
  });
  setSpecFilter(specFilterModel.value);
  return {
    specFilterModel,
    debouncedSpecFilterModel
  };
}
const _hoisted_1 = {
  height: "1em",
  width: "1em",
  style: { "min-width": "16px", "min-height": "16px" },
  viewBox: "0 0 16 16",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
};
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("path", {
  d: "M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z",
  fill: "#1B1E2E",
  class: "icon-dark"
}, null, -1);
const _hoisted_3 = /* @__PURE__ */ createBaseVNode("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M10 8C10 9.10457 9.10457 10 8 10C6.89543 10 6 9.10457 6 8C6 6.89543 6.89543 6 8 6C9.10457 6 10 6.89543 10 8Z",
  fill: "#1B1E2E",
  class: "icon-dark"
}, null, -1);
const _hoisted_4 = /* @__PURE__ */ createBaseVNode("path", {
  d: "M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8ZM10 8C10 9.10457 9.10457 10 8 10C6.89543 10 6 9.10457 6 8C6 6.89543 6.89543 6 8 6C9.10457 6 10 6.89543 10 8Z",
  stroke: "#1B1E2E",
  "stroke-width": "2",
  class: "icon-dark"
}, null, -1);
const _hoisted_5 = [
  _hoisted_2,
  _hoisted_3,
  _hoisted_4
];
function render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_5);
}
const RecordIcon = { name: "cy-action-record_x16", render };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "InlineCodeFragment",
  props: {
    variant: { default: "default" }
  },
  setup(__props) {
    const props = __props;
    const colorClasses = {
      default: "bg-purple-100 text-purple-600",
      error: "bg-red-200 text-red-700"
    };
    const color = computed(() => {
      return colorClasses[props.variant];
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("code", {
        class: normalizeClass(["rounded p-[2px]", unref(color)])
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 2);
    };
  }
});
export {
  IconFolder as I,
  RecordIcon as R,
  __unplugin_components_0$3 as _,
  __unplugin_components_0$2 as a,
  _sfc_main$m as b,
  useCollapsibleTree as c,
  deriveIndexes as d,
  buildSpecTree as e,
  useVirtualList as f,
  useSpecFilter as g,
  useCachedSpecs as h,
  fuzzySortSpecs as i,
  _sfc_main$1 as j,
  _sfc_main as k,
  _sfc_main$f as l,
  makeFuzzyFoundSpec as m,
  getFilteredGeneratorList as n,
  _sfc_main$2 as o,
  useRunAllSpecsStore as u
};
