import { d as defineComponent, u as useI18n, o as openBlock, c as createBlock, w as withCtx, a as createBaseVNode, t as toDisplayString, b as unref, e as withModifiers, f as createVNode, B, g as _sfc_main$w, h as useI18n$1, i as ref, j as createElementBlock, n as normalizeClass, k as createCommentVNode, I as IconMagnifyingGlass, l as __unplugin_components_0$5, _ as _export_sfc, m as computed, p as renderSlot, q as __unplugin_components_0$8, s as onBeforeUpdate, v as onUpdated, x as onKeyStroke, y as useRouter, z as useSpecStore, A as onMounted, C as watch, F as Fragment, D as renderList, E as normalizeStyle, G as withKeys, H as resolveDynamicComponent, R as RouterLink, J as mergeProps, K as useStudioStore, L as gql, M as isRef, N as useSnapshotStore, O as useAutStore, P as useElementSize, Q as useSelectorPlaygroundStore, S as useClipboard, T as MenuButton, U as MenuItems, V as MenuItem, W as Menu, X as createTextVNode, Y as withDirectives, Z as vModelText, $ as _sfc_main$A, a0 as __unplugin_components_2, a1 as pushScopeId, a2 as popScopeId, a3 as getEventManager, a4 as RefreshIcon, a5 as PopoverButton, a6 as TransitionQuickFade, a7 as PopoverPanel, a8 as Popover, a9 as __unplugin_components_0$9, aa as useRoute, ab as watchEffect, r as resolveComponent, ac as allBrowsersIcons, ad as _sfc_main$B, ae as __unplugin_components_0$a, af as _sfc_main$D, ag as _sfc_main$E, ah as togglePlayground, ai as useScreenshotStore, aj as useAttrs, ak as isRunMode, al as runnerConstants, am as useRunnerUiStore, an as useMutation, ao as Preferences_SetPreferencesDocument, ap as vShow, aq as UnifiedRunnerAPI, ar as useWindowSize, as as getAutIframeModel, at as addCrossOriginIframe, au as empty$1, av as getRunnerElement, aw as getReporterElement, ax as _imports_0, ay as AutomationDisconnected_RelaunchBrowserDocument, az as ErrorOutlineIcon, aA as _sfc_main$F, aB as Input, aC as SpecRunnerOpenMode_OpenFileInIdeDocument, aD as onBeforeUnmount, aE as _sfc_main$G, aF as _sfc_main$H, aG as setBlockTracking, aH as REPORTER_ID, aI as RUNNER_ID, aJ as readonly, aK as TestsForRunDocument, aL as RUN_ALL_SPECS_KEY, aM as RUN_ALL_SPECS, aN as lodashExports, aO as useQuery, aP as SpecPageContainerDocument, aQ as SpecPageContainer_SpecsChangeDocument, aR as Runner_ConfigChangeDocument } from "./index-8631b600.js";
import { u as useRunAllSpecsStore, _ as __unplugin_components_0$6, d as deriveIndexes, a as __unplugin_components_0$7, b as _sfc_main$x, I as IconFolder, c as useCollapsibleTree, e as buildSpecTree, f as useVirtualList, g as useSpecFilter, h as useCachedSpecs, m as makeFuzzyFoundSpec, i as fuzzySortSpecs, j as _sfc_main$y, R as RecordIcon, k as _sfc_main$C } from "./InlineCodeFragment.vue_vue_type_script_setup_true_lang-a05a72f1.js";
import { p as posixify, g as getPathForPlatform } from "./box-open_x48-cc9a16a8.js";
import { _ as _sfc_main$z } from "./Switch.vue_vue_type_script_setup_true_lang-e2797dd4.js";
import { R as RefreshIcon$1 } from "./refresh_x16-e173c555.js";
import { b as block0 } from "./route-block-c0a8bdd8.js";
import { u as useSubscription } from "./graphql-f2d7cc94.js";
import "./SpecPatterns.vue_vue_type_script_setup_true_lang-0af37847.js";
const _hoisted_1$z = ["disabled"];
const _hoisted_2$s = {
  class: "font-normal text-sm inline-flex",
  "data-cy": "tooltip-content"
};
const _sfc_main$v = /* @__PURE__ */ defineComponent({
  __name: "InlineRunAllSpecs",
  props: {
    specNumber: null,
    directory: null,
    grayscale: { type: Boolean }
  },
  emits: ["runAllSpecs"],
  setup(__props, { emit: emits }) {
    const { t } = useI18n();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$w, {
        placement: "right",
        "data-cy": `run-all-specs-for-${__props.directory}`
      }, {
        popper: withCtx(() => [
          createBaseVNode("span", _hoisted_2$s, toDisplayString(unref(t)("specPage.runSelectedSpecs", __props.specNumber)), 1)
        ]),
        default: withCtx(() => [
          createBaseVNode("button", {
            class: "flex h-full w-full items-center justify-center",
            "data-cy": "run-all-specs-button",
            disabled: __props.specNumber === 0,
            onClick: _cache[0] || (_cache[0] = withModifiers(($event) => emits("runAllSpecs"), ["stop"]))
          }, [
            createVNode(unref(B), {
              size: "16",
              "stroke-color": __props.grayscale ? "gray-200" : "gray-700",
              "fill-color": "transparent",
              "hocus-stroke-color": __props.grayscale ? void 0 : "indigo-500",
              "hocus-fill-color": __props.grayscale ? void 0 : "indigo-100",
              class: "inline-flex align-text-bottom",
              "data-cy": "play-button"
            }, null, 8, ["stroke-color", "hocus-stroke-color", "hocus-fill-color"])
          ], 8, _hoisted_1$z)
        ]),
        _: 1
      }, 8, ["data-cy"]);
    };
  }
});
const _hoisted_1$y = { class: "border-b border-gray-900 h-[64px] mx-[16px] auto-cols-max grid grid-flow-col gap-[8px] grid-cols-[minmax(0,1fr)] pointer-cursor items-center" };
const _hoisted_2$r = { class: "flex h-full inset-y-0 w-[32px] absolute items-center pointer-events-none" };
const _hoisted_3$k = ["value"];
const _hoisted_4$f = ["aria-label", "onClick"];
const _hoisted_5$8 = ["aria-label"];
const _hoisted_6$6 = {
  class: "inline-flex text-sm font-normal",
  "data-cy": "tooltip-content"
};
const _hoisted_7$5 = {
  class: "sr-only",
  "aria-live": "polite"
};
const _sfc_main$u = /* @__PURE__ */ defineComponent({
  __name: "InlineSpecListHeader",
  props: {
    specFilterModel: null,
    resultCount: null,
    isRunAllSpecsAllowed: { type: Boolean }
  },
  emits: ["update:specFilterModel", "newSpec", "runAllSpecs"],
  setup(__props, { emit }) {
    const props = __props;
    const { t } = useI18n$1();
    const runAllSpecsStore = useRunAllSpecsStore();
    const inputFocused = ref(false);
    const input = ref();
    const onInput = (e) => {
      const value = e.target.value;
      emit("update:specFilterModel", value);
    };
    const clearInput = (e) => {
      emit("update:specFilterModel", "");
    };
    return (_ctx, _cache) => {
      const _component_i_cy_magnifying_glass_x16 = IconMagnifyingGlass;
      const _component_i_cy_delete_x16 = __unplugin_components_0$5;
      const _component_i_cy_add_small_x16 = __unplugin_components_0$6;
      return openBlock(), createElementBlock("div", _hoisted_1$y, [
        createBaseVNode("div", {
          class: "relative items-center",
          onClick: _cache[2] || (_cache[2] = ($event) => {
            var _a;
            return (_a = input.value) == null ? void 0 : _a.focus();
          })
        }, [
          createBaseVNode("div", _hoisted_2$r, [
            createVNode(_component_i_cy_magnifying_glass_x16, {
              class: normalizeClass([inputFocused.value ? "icon-dark-indigo-300" : "icon-dark-gray-800", "icon-light-gray-1000"])
            }, null, 8, ["class"])
          ]),
          createBaseVNode("input", {
            id: "inline-spec-list-header-search",
            ref_key: "input",
            ref: input,
            class: normalizeClass(["font-light outline-none bg-gray-1000 border-0 px-6 placeholder-gray-700 text-gray-500", inputFocused.value || props.specFilterModel.length ? "w-full" : "w-[16px]"]),
            value: props.specFilterModel,
            type: "search",
            minlength: "1",
            autocapitalize: "off",
            autocomplete: "off",
            spellcheck: "false",
            onFocus: _cache[0] || (_cache[0] = ($event) => inputFocused.value = true),
            onBlur: _cache[1] || (_cache[1] = ($event) => inputFocused.value = false),
            onInput
          }, null, 42, _hoisted_3$k),
          createBaseVNode("label", {
            for: "inline-spec-list-header-search",
            class: normalizeClass(["cursor-text font-light bottom-[4px] left-[24px] text-gray-500 pointer-events-none absolute", {
              "sr-only": inputFocused.value || props.specFilterModel
            }])
          }, toDisplayString(unref(t)("specPage.searchPlaceholder")), 3),
          props.specFilterModel ? (openBlock(), createElementBlock("button", {
            key: 0,
            type: "button",
            "data-cy": "clear-search-button",
            class: "border-transparent rounded-md flex outline-none h-[24px] my-[4px] inset-y-0 right-0 w-[24px] duration-300 absolute items-center justify-center group hocus-default hocus:ring-0",
            "aria-label": unref(t)("specPage.clearSearch"),
            onClick: withModifiers(clearInput, ["stop"])
          }, [
            createVNode(_component_i_cy_delete_x16, {
              class: normalizeClass(["icon-light-gray-1000 group-hocus:icon-dark-indigo-300", inputFocused.value ? "icon-dark-indigo-300" : "icon-dark-gray-800"])
            }, null, 8, ["class"])
          ], 8, _hoisted_4$f)) : createCommentVNode("", true)
        ]),
        createVNode(_sfc_main$w, {
          placement: "right",
          "data-cy": "tooltip"
        }, {
          popper: withCtx(() => [
            createBaseVNode("span", _hoisted_6$6, toDisplayString(unref(t)("specPage.newSpecButton")), 1)
          ]),
          default: withCtx(() => [
            createBaseVNode("button", {
              class: "rounded-md flex outline-none border border-gray-900 h-[24px] w-[24px] duration-300 hocus-default items-center justify-center hocus:ring-0 hocus:border-indigo-300",
              "aria-label": unref(t)("specPage.newSpecButton"),
              onClick: _cache[3] || (_cache[3] = ($event) => emit("newSpec"))
            }, [
              createVNode(_component_i_cy_add_small_x16, { class: "icon-light-gray-50 icon-dark-gray-200" })
            ], 8, _hoisted_5$8)
          ]),
          _: 1
        }),
        __props.isRunAllSpecsAllowed ? (openBlock(), createBlock(_sfc_main$v, {
          key: 0,
          "spec-number": unref(runAllSpecsStore).allSpecsRef.length,
          directory: "all",
          grayscale: "",
          class: "rounded-md flex outline-none border border-gray-900 h-[24px] w-[24px] duration-300 hocus-default items-center justify-center hocus:ring-0 hocus:border-indigo-300",
          onRunAllSpecs: _cache[4] || (_cache[4] = ($event) => emit("runAllSpecs"))
        }, null, 8, ["spec-number"])) : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_7$5, toDisplayString(unref(t)("components.fileSearch.matchesIndicatorEmptyFileSearch", { count: __props.resultCount, denominator: __props.resultCount })), 1)
      ]);
    };
  }
});
const InlineSpecListHeader_vue_vue_type_style_index_0_scoped_694f6e40_lang = "";
const InlineSpecListHeader = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["__scopeId", "data-v-694f6e40"]]);
const _hoisted_1$x = { class: "flex text-sm py-[4px] items-center" };
const _hoisted_2$q = ["title"];
const _sfc_main$t = /* @__PURE__ */ defineComponent({
  __name: "SpecFileItem",
  props: {
    fileName: null,
    extension: null,
    selected: { type: Boolean, default: false },
    indexes: { default: () => [] }
  },
  setup(__props) {
    const props = __props;
    const split = computed(() => {
      return deriveIndexes(props.fileName, props.indexes);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$x, [
        createVNode(unref(__unplugin_components_0$7), {
          class: normalizeClass(["text-base min-h-[16px] min-w-[16px] group-hocus:icon-dark-indigo-300 group-hocus:icon-light-indigo-600", __props.selected ? "icon-dark-indigo-300 icon-light-indigo-600" : "icon-dark-gray-800 icon-light-gray-1000"])
        }, null, 8, ["class"]),
        createBaseVNode("div", {
          title: __props.fileName + __props.extension,
          class: "text-gray-400 truncate"
        }, [
          createVNode(_sfc_main$x, {
            text: __props.fileName,
            indexes: unref(split).fileNameIndexes,
            class: normalizeClass(["font-medium pl-[8px] whitespace-nowrap", __props.selected ? "text-white" : "group-focus:text-indigo-300 text-gray-400 group-hover:text-indigo-300"])
          }, null, 8, ["text", "indexes", "class"]),
          createVNode(_sfc_main$x, {
            text: __props.extension,
            indexes: unref(split).extensionIndexes,
            class: "text-gray-700"
          }, null, 8, ["text", "indexes"])
        ], 8, _hoisted_2$q)
      ]);
    };
  }
});
const _hoisted_1$w = { class: "flex justify-between" };
const _hoisted_2$p = ["title"];
const _hoisted_3$j = { class: "mr-[16px]" };
const _sfc_main$s = /* @__PURE__ */ defineComponent({
  __name: "DirectoryItem",
  props: {
    name: { default: "" },
    expanded: { type: Boolean, default: false },
    indexes: { default: () => [] }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      const _component_i_cy_chevron_down_small_x16 = __unplugin_components_0$8;
      const _component_i_cy_folder_x16 = IconFolder;
      return openBlock(), createElementBlock("div", _hoisted_1$w, [
        createBaseVNode("div", {
          title: __props.name,
          class: "flex text-sm py-[4px] items-center"
        }, [
          createVNode(_component_i_cy_chevron_down_small_x16, {
            class: normalizeClass(["mr-[8px] icon-dark-gray-700 group-hocus:icon-dark-indigo-300 group-hover:children:transition-all group-hover:children:ease-in-out", { "transform rotate-270": !__props.expanded }])
          }, null, 8, ["class"]),
          createVNode(_component_i_cy_folder_x16, { class: "h-[16px] mr-[8px] w-[16px] group-hocus:icon-light-indigo-300 group-hocus:icon-dark-indigo-400" }),
          createVNode(_sfc_main$x, {
            text: __props.name,
            indexes: __props.indexes,
            class: "text-gray-400 group-focus:text-indigo-300",
            "highlight-classes": "font-bold text-white"
          }, null, 8, ["text", "indexes"])
        ], 8, _hoisted_2$p),
        createBaseVNode("div", _hoisted_3$j, [
          renderSlot(_ctx.$slots, "run-all-specs")
        ])
      ]);
    };
  }
});
const focusEl = (itemRefs, activeItem) => {
  var _a;
  const idx = unref(activeItem);
  const el2 = ((_a = itemRefs.value[idx]) == null ? void 0 : _a.$el) ?? itemRefs.value[idx];
  if (typeof (el2 == null ? void 0 : el2.focus) === "function") {
    el2.focus({ preventScroll: true });
  }
};
function useVirtualListNavigation({
  containerRef,
  getOffset,
  getViewCapacity,
  source,
  scrollTo
}) {
  const activeItem = ref(null);
  const itemRefs = ref({});
  const setItemRef = (el2, index) => {
    if (el2) {
      itemRefs.value[index] = el2;
    }
  };
  onBeforeUpdate(() => {
    itemRefs.value = {};
  });
  onUpdated(() => {
    focusEl(itemRefs, activeItem);
  });
  onKeyStroke("ArrowDown", (event) => {
    event.preventDefault();
    const element = containerRef.value;
    if (element) {
      activeItem.value = activeItem.value ?? 0;
      if (activeItem.value + 1 === source.value.length) {
        activeItem.value = 0;
        scrollTo(activeItem.value);
        return;
      }
      activeItem.value++;
      const offset = getOffset(element.scrollTop);
      const viewCapacity = getViewCapacity(element.clientHeight);
      const fromIdx = offset - 1;
      const toIdx = fromIdx + (viewCapacity - 1);
      if (activeItem.value >= toIdx) {
        scrollTo(fromIdx + 1);
      } else {
        focusEl(itemRefs, activeItem);
      }
    }
  }, { target: containerRef });
  onKeyStroke("ArrowUp", (event) => {
    event.preventDefault();
    const element = containerRef.value;
    if (element) {
      activeItem.value = activeItem.value ?? 0;
      if (activeItem.value === 0) {
        activeItem.value = source.value.length - 1;
        scrollTo(activeItem.value);
        return;
      }
      activeItem.value--;
      const offset = getOffset(element.scrollTop);
      const fromIndex = offset - 1;
      if (activeItem.value < fromIndex) {
        scrollTo(fromIndex - 1);
      } else {
        focusEl(itemRefs, activeItem);
      }
    }
  }, { target: containerRef });
  return {
    activeItem,
    setItemRef
  };
}
const _hoisted_1$v = ["data-selected-spec", "onClick"];
const _sfc_main$r = /* @__PURE__ */ defineComponent({
  __name: "InlineSpecListTree",
  props: {
    specs: null
  },
  setup(__props) {
    const props = __props;
    const router = useRouter();
    const specStore = useSpecStore();
    const isCurrentSpec = (row) => {
      var _a;
      if (!row.isLeaf || !row.data) {
        return false;
      }
      return row.data.relative === ((_a = specStore.activeSpec) == null ? void 0 : _a.relative);
    };
    const collapsible = computed(() => useCollapsibleTree(buildSpecTree(props.specs), { dropRoot: true }));
    const treeSpecList = computed(() => collapsible.value.tree.filter((item) => !item.hidden.value));
    const findCurrentSpecIndex = computed(() => {
      return treeSpecList.value.findIndex((s) => isCurrentSpec(s));
    });
    const hasAnyCurrentSpec = computed(() => {
      return findCurrentSpecIndex.value > -1;
    });
    const isTabbable = (row, index) => {
      if (!hasAnyCurrentSpec.value) {
        if (index === 0)
          return true;
      } else if (isCurrentSpec(row.data)) {
        return true;
      }
      return false;
    };
    const toggle = (row, idx) => {
      activeItem.value = idx;
      row.toggle();
    };
    const submitOrToggle = (row, idx) => {
      const studioStore = useStudioStore();
      studioStore.cancel();
      activeItem.value = idx;
      if (row.isLeaf) {
        if (!row.data) {
          return;
        }
        router.push({ path: "/specs/runner", query: { file: posixify(row.data.relative) } });
      } else {
        row.toggle();
      }
      return false;
    };
    const { containerProps, list, wrapperProps, scrollTo, api } = useVirtualList(treeSpecList, { itemHeight: 30, overscan: 15 });
    const { activeItem, setItemRef } = useVirtualListNavigation(api);
    onMounted(() => {
      activeItem.value = findCurrentSpecIndex.value;
    });
    watch(collapsible, () => {
      activeItem.value = null;
      scrollTo(0);
    });
    const resetFocusIfNecessary = (row, index) => {
      if (isTabbable(row, index)) {
        activeItem.value = index;
      }
    };
    const runAllSpecsStore = useRunAllSpecsStore();
    watch(collapsible, () => {
      runAllSpecsStore.setRunAllSpecsData(collapsible.value.tree);
    }, { immediate: true });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", mergeProps(unref(containerProps), {
        class: "pt-[8px] specs-list-container",
        "data-cy": "specs-list-container"
      }), [
        createBaseVNode("ul", mergeProps(unref(wrapperProps), { class: "children:h-[30px]" }), [
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(list), (row) => {
            var _a, _b;
            return openBlock(), createElementBlock("li", {
              key: row.index,
              class: "relative flex cursor-pointer group",
              "data-cy": "spec-row-item",
              "data-selected-spec": isCurrentSpec(row.data),
              onClick: withModifiers(($event) => submitOrToggle(row.data, row.index), ["self"])
            }, [
              (openBlock(), createBlock(resolveDynamicComponent(row.data.isLeaf ? unref(RouterLink) : "button"), {
                ref_for: true,
                ref: (el2) => unref(setItemRef)(el2, row.index),
                key: (_a = row.data.data) == null ? void 0 : _a.absolute,
                style: normalizeStyle({ paddingLeft: `${(row.data.depth - 2) * 10 + 16}px` }),
                class: normalizeClass(["border-transparent outline-none border w-full group focus-visible:bg-gray-900 before:border-r-4 before:border-transparent before:h-[28px] before:rounded-r-[4px] before:absolute before:left-[-4px] before:w-[8px]", {
                  "before:border-r-indigo-300": isCurrentSpec(row.data),
                  "before:focus:border-r-indigo-300 before:focus-visible:border-r-transparent before:hover:border-r-indigo-300": !isCurrentSpec(row.data)
                }]),
                to: { path: "/specs/runner", query: { file: unref(posixify)(((_b = row.data.data) == null ? void 0 : _b.relative) || "") } },
                "aria-expanded": row.data.isLeaf ? null : row.data.expanded,
                onFocus: ($event) => resetFocusIfNecessary(row, row.index),
                onClick: withModifiers(($event) => submitOrToggle(row.data, row.index), ["prevent"]),
                onKeydown: withKeys(withModifiers(($event) => toggle(row.data, row.index), ["prevent", "stop"]), ["left", "right"])
              }, {
                default: withCtx(() => {
                  var _a2, _b2;
                  return [
                    row.data.isLeaf ? (openBlock(), createBlock(_sfc_main$t, {
                      key: 0,
                      "file-name": ((_a2 = row.data.data) == null ? void 0 : _a2.fileName) || row.data.name,
                      extension: ((_b2 = row.data.data) == null ? void 0 : _b2.specFileExtension) || "",
                      selected: isCurrentSpec(row.data),
                      indexes: row.data.highlightIndexes,
                      class: "pl-[22px]",
                      "data-cy": "spec-file-item"
                    }, null, 8, ["file-name", "extension", "selected", "indexes"])) : (openBlock(), createBlock(_sfc_main$s, {
                      key: 1,
                      class: "children:truncate",
                      name: row.data.name,
                      expanded: unref(treeSpecList)[row.index].expanded.value,
                      indexes: row.data.highlightIndexes,
                      "data-cy": "directory-item"
                    }, {
                      "run-all-specs": withCtx(() => [
                        unref(runAllSpecsStore).isRunAllSpecsAllowed ? (openBlock(), createBlock(_sfc_main$v, {
                          key: 0,
                          directory: row.data.name,
                          class: "flex items-center justify-center h-full opacity-0 run-all",
                          "spec-number": unref(runAllSpecsStore).directoryChildren[row.data.id].length,
                          onRunAllSpecs: () => unref(runAllSpecsStore).runSelectedSpecs(row.data.id)
                        }, null, 8, ["directory", "spec-number", "onRunAllSpecs"])) : createCommentVNode("", true)
                      ]),
                      _: 2
                    }, 1032, ["name", "expanded", "indexes"]))
                  ];
                }),
                _: 2
              }, 1064, ["style", "class", "to", "aria-expanded", "onFocus", "onClick", "onKeydown"]))
            ], 8, _hoisted_1$v);
          }), 128))
        ], 16)
      ], 16);
    };
  }
});
const InlineSpecListTree_vue_vue_type_style_index_0_scoped_6265473a_lang = "";
const InlineSpecListTree = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["__scopeId", "data-v-6265473a"]]);
const _hoisted_1$u = /* @__PURE__ */ createBaseVNode("div", { class: "bg-gradient-to-b to-transparent from-gray-1000 h-[12px] top-[64px] left-0 w-[calc(100%-2px)] scroller-fade absolute" }, null, -1);
const _hoisted_2$o = /* @__PURE__ */ createBaseVNode("div", { class: "bg-gradient-to-b from-transparent to-gray-1000 h-[12px] w-full right-0 bottom-[12px] scroller-fade absolute" }, null, -1);
const _sfc_main$q = /* @__PURE__ */ defineComponent({
  __name: "InlineSpecList",
  props: {
    gql: null
  },
  setup(__props) {
    var _a, _b;
    const props = __props;
    gql`
fragment SpecNode_InlineSpecList on Spec {
  id
  name
  specType
  absolute
  baseName
  fileName
  specFileExtension
  fileExtension
  relative
}
`;
    gql`
fragment Specs_InlineSpecList on Query {
  ...CreateSpecModal
  currentProject {
    id
    projectRoot
    currentTestingType
    savedState
    specs {
      id
      ...SpecNode_InlineSpecList
    }
  }
}
`;
    const showModal = ref(false);
    const { debouncedSpecFilterModel, specFilterModel } = useSpecFilter((_b = (_a = props.gql.currentProject) == null ? void 0 : _a.savedState) == null ? void 0 : _b.specFilter);
    const cachedSpecs = useCachedSpecs(computed(() => {
      var _a2;
      return ((_a2 = props.gql.currentProject) == null ? void 0 : _a2.specs) || [];
    }));
    const specs = computed(() => {
      const specs2 = cachedSpecs.value.map((x) => makeFuzzyFoundSpec(x));
      if (!debouncedSpecFilterModel.value)
        return specs2;
      return fuzzySortSpecs(specs2, debouncedSpecFilterModel.value);
    });
    const runAllSpecsStore = useRunAllSpecsStore();
    return (_ctx, _cache) => {
      var _a2;
      return openBlock(), createElementBlock("div", null, [
        ((_a2 = props.gql.currentProject) == null ? void 0 : _a2.currentTestingType) ? (openBlock(), createBlock(_sfc_main$y, {
          key: 0,
          show: showModal.value,
          gql: props.gql,
          onClose: _cache[0] || (_cache[0] = ($event) => showModal.value = false)
        }, null, 8, ["show", "gql"])) : createCommentVNode("", true),
        createVNode(InlineSpecListHeader, {
          specFilterModel: unref(specFilterModel),
          "onUpdate:specFilterModel": _cache[1] || (_cache[1] = ($event) => isRef(specFilterModel) ? specFilterModel.value = $event : null),
          "result-count": unref(specs).length,
          "is-run-all-specs-allowed": unref(runAllSpecsStore).isRunAllSpecsAllowed,
          onNewSpec: _cache[2] || (_cache[2] = ($event) => showModal.value = true),
          onRunAllSpecs: unref(runAllSpecsStore).runAllSpecs
        }, null, 8, ["specFilterModel", "result-count", "is-run-all-specs-allowed", "onRunAllSpecs"]),
        createVNode(InlineSpecListTree, {
          specs: unref(specs),
          class: "pb-[32px]"
        }, null, 8, ["specs"]),
        _hoisted_1$u,
        _hoisted_2$o
      ]);
    };
  }
});
const _hoisted_1$t = {
  height: "1em",
  width: "1em",
  style: { "min-width": "16px", "min-height": "16px" },
  viewBox: "0 0 16 16",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
};
const _hoisted_2$n = /* @__PURE__ */ createBaseVNode("path", {
  d: "M12 6C12 8.20914 10.2091 10 8 10C5.79086 10 4 8.20914 4 6C4 3.79086 5.79086 2 8 2C10.2091 2 12 3.79086 12 6Z",
  fill: "#E1E3ED",
  class: "icon-light"
}, null, -1);
const _hoisted_3$i = /* @__PURE__ */ createBaseVNode("path", {
  d: "M7 14C7 14.5523 7.44772 15 8 15C8.55228 15 9 14.5523 9 14H7ZM7 10V14H9V10H7ZM11 6C11 7.65685 9.65685 9 8 9V11C10.7614 11 13 8.76142 13 6H11ZM8 9C6.34315 9 5 7.65685 5 6H3C3 8.76142 5.23858 11 8 11V9ZM5 6C5 4.34315 6.34315 3 8 3V1C5.23858 1 3 3.23858 3 6H5ZM8 3C9.65685 3 11 4.34315 11 6H13C13 3.23858 10.7614 1 8 1V3Z",
  fill: "currentColor",
  class: "icon-dark"
}, null, -1);
const _hoisted_4$e = [
  _hoisted_2$n,
  _hoisted_3$i
];
function render$8(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$t, _hoisted_4$e);
}
const __unplugin_components_0$4 = { name: "cy-object-pin_x16", render: render$8 };
const _hoisted_1$s = { class: "rounded flex font-medium bg-gray-900 py-[2px] px-[12px] text-gray-200 text-[14px] leading-[20px] gap-[8px] items-center" };
const _hoisted_2$m = {
  for: "toggle-highlights",
  class: "cursor-pointer"
};
const _sfc_main$p = /* @__PURE__ */ defineComponent({
  __name: "SnapshotHighlightControls",
  props: {
    value: { type: Boolean, default: true }
  },
  emits: ["toggle"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const { t } = useI18n$1();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$s, [
        createVNode(_sfc_main$z, {
          name: "toggle-highlights",
          value: props.value,
          size: "sm",
          onUpdate: _cache[0] || (_cache[0] = ($event) => emits("toggle"))
        }, null, 8, ["value"]),
        createBaseVNode("label", _hoisted_2$m, toDisplayString(unref(t)("runner.snapshot.highlightsLabel")), 1)
      ]);
    };
  }
});
const _hoisted_1$r = {
  class: "rounded font-medium text-[14px] overflow-hidden children:leading-[20px]",
  "data-cy": "snapshot-toggle"
};
const _hoisted_2$l = ["data-cy-active-snapshot-toggle", "onClick", "onKeypress"];
const _sfc_main$o = /* @__PURE__ */ defineComponent({
  __name: "SnapshotToggle",
  props: {
    messages: null,
    activeIndex: { default: 0 }
  },
  emits: ["select"],
  setup(__props, { emit }) {
    const select = (message, idx) => {
      emit("select", { idx, message });
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$r, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(__props.messages, (message, idx) => {
          return openBlock(), createElementBlock("button", {
            key: message.id,
            "data-cy-active-snapshot-toggle": idx === __props.activeIndex ? "true" : void 0,
            class: normalizeClass(["border-transparent font-medium outline-none border my-1 transition duration-150 hocus:border-purple-300", {
              "rounded-l": idx === 0,
              "rounded-r": idx === __props.messages.length - 1,
              "text-white bg-purple-500": idx === __props.activeIndex,
              "text-gray-200 bg-gray-900": idx !== __props.activeIndex
            }]),
            style: { "padding": "1px 12px" },
            onClick: ($event) => select(message, idx),
            onKeypress: withKeys(($event) => select(message, idx), ["enter", "space"])
          }, toDisplayString(message.text), 43, _hoisted_2$l);
        }), 128))
      ]);
    };
  }
});
const _hoisted_1$q = {
  key: 0,
  class: "inset-x-0 bottom-24 absolute",
  "data-testid": "snapshot-controls"
};
const _hoisted_2$k = { class: "flex justify-center" };
const _hoisted_3$h = { class: "rounded flex bg-gray-1000 shadow min-h-[40px] py-[4px] px-[8px] text-gray-600 gap-[4px] items-center" };
const _hoisted_4$d = {
  key: 0,
  class: "rounded min-h-[24px] p-[4px] text-[14px] text-gray-600 capitalize block"
};
const _sfc_main$n = /* @__PURE__ */ defineComponent({
  __name: "SnapshotControls",
  props: {
    eventManager: null,
    getAutIframe: { type: Function }
  },
  setup(__props) {
    const props = __props;
    const snapshotStore = useSnapshotStore();
    const snapshots = computed(() => {
      var _a;
      return (_a = snapshotStore.snapshotProps) == null ? void 0 : _a.snapshots;
    });
    const snapshotMessages = computed(() => {
      if (!snapshots.value)
        return [];
      return snapshots.value.map(({ name }, idx) => {
        if (!name)
          return { text: `${idx + 1}`, id: `${idx}` };
        return { text: `${name}`, id: `${idx}` };
      });
    });
    const shouldShowStateControls = computed(() => {
      return snapshots.value && snapshots.value.length >= 2;
    });
    const unpin = () => {
      props.eventManager.snapshotUnpinned();
      snapshotStore.$reset();
    };
    const toggleHighlights = () => {
      snapshotStore.toggleHighlights(props.getAutIframe());
    };
    const shouldShowHighlightControls = computed(() => {
      var _a;
      return snapshotStore.isSnapshotPinned && ((_a = snapshotStore.snapshotProps) == null ? void 0 : _a.$el);
    });
    const renderSnapshotControls = computed(() => {
      return shouldShowStateControls.value || shouldShowHighlightControls.value || snapshotStore.messageTitle;
    });
    const changeState = ({ idx }) => {
      snapshotStore.changeState(idx, props.getAutIframe());
    };
    return (_ctx, _cache) => {
      var _a, _b;
      const _component_i_cy_object_pin_x16 = __unplugin_components_0$4;
      const _component_i_cy_delete_x16 = __unplugin_components_0$5;
      return unref(renderSnapshotControls) ? (openBlock(), createElementBlock("div", _hoisted_1$q, [
        createBaseVNode("div", _hoisted_2$k, [
          createBaseVNode("div", _hoisted_3$h, [
            createVNode(_component_i_cy_object_pin_x16, { class: "icon-dark-purple-400 icon-light-purple-800" }),
            unref(snapshotStore).messageTitle ? (openBlock(), createElementBlock("span", _hoisted_4$d, toDisplayString(unref(snapshotStore).messageTitle), 1)) : createCommentVNode("", true),
            unref(shouldShowStateControls) ? (openBlock(), createBlock(_sfc_main$o, {
              key: 1,
              messages: unref(snapshotMessages),
              "active-index": (_a = unref(snapshotStore).snapshot) == null ? void 0 : _a.stateIndex,
              onSelect: changeState
            }, null, 8, ["messages", "active-index"])) : createCommentVNode("", true),
            unref(shouldShowHighlightControls) ? (openBlock(), createBlock(_sfc_main$p, {
              key: 2,
              value: (_b = unref(snapshotStore).snapshot) == null ? void 0 : _b.showingHighlights,
              onToggle: toggleHighlights
            }, null, 8, ["value"])) : createCommentVNode("", true),
            unref(shouldShowStateControls) || unref(shouldShowHighlightControls) ? (openBlock(), createElementBlock("button", {
              key: 3,
              class: "border-transparent rounded outline-none bg-gray-900 border my-1 mr-[2px] transition duration-150 hocus:border-purple-300",
              style: { "padding": "3px" },
              onClick: unpin
            }, [
              createVNode(_component_i_cy_delete_x16, {
                class: "icon-dark-gray-200",
                "data-testid": "unpin"
              })
            ])) : createCommentVNode("", true)
          ])
        ])
      ])) : createCommentVNode("", true);
    };
  }
});
const _hoisted_1$p = {
  height: "1em",
  width: "1em",
  style: { "min-width": "16px", "min-height": "16px" },
  viewBox: "0 0 16 16",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
};
const _hoisted_2$j = /* @__PURE__ */ createBaseVNode("path", {
  d: "M5 11C5 10.7239 4.77614 10.5 4.5 10.5C4.22386 10.5 4 10.7239 4 11H5ZM4 12C4 12.2761 4.22386 12.5 4.5 12.5C4.77614 12.5 5 12.2761 5 12H4ZM8 11C8 10.7239 7.77614 10.5 7.5 10.5C7.22386 10.5 7 10.7239 7 11H8ZM7 12C7 12.2761 7.22386 12.5 7.5 12.5C7.77614 12.5 8 12.2761 8 12H7ZM10 12C10 12.2761 10.2239 12.5 10.5 12.5C10.7761 12.5 11 12.2761 11 12H10ZM12 11C12.2761 11 12.5 10.7761 12.5 10.5C12.5 10.2239 12.2761 10 12 10V11ZM11 7C10.7239 7 10.5 7.22386 10.5 7.5C10.5 7.77614 10.7239 8 11 8V7ZM12 8C12.2761 8 12.5 7.77614 12.5 7.5C12.5 7.22386 12.2761 7 12 7V8ZM11 4C10.7239 4 10.5 4.22386 10.5 4.5C10.5 4.77614 10.7239 5 11 5V4ZM12 5C12.2761 5 12.5 4.77614 12.5 4.5C12.5 4.22386 12.2761 4 12 4V5ZM11 10C10.7239 10 10.5 10.2239 10.5 10.5C10.5 10.7761 10.7239 11 11 11V10ZM11 11C11 10.7239 10.7761 10.5 10.5 10.5C10.2239 10.5 10 10.7239 10 11H11ZM4 11V12H5V11H4ZM7 11V12H8V11H7ZM11 8L12 8V7L11 7V8ZM11 5L12 5V4L11 4V5ZM11 11H12V10H11V11ZM10 11V12H11V11H10Z",
  fill: "#747994",
  class: "icon-dark"
}, null, -1);
const _hoisted_3$g = /* @__PURE__ */ createBaseVNode("path", {
  d: "M15 15V1H10V10H1L1 15H15ZM15 15V11",
  stroke: "#1B1E2E",
  class: "icon-light",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, null, -1);
const _hoisted_4$c = [
  _hoisted_2$j,
  _hoisted_3$g
];
function render$7(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$p, _hoisted_4$c);
}
const __unplugin_components_0$3 = { name: "cy-ruler_x16", render: render$7 };
const _hoisted_1$o = {
  height: "1em",
  width: "1em",
  style: { "min-width": "16px", "min-height": "16px" },
  viewBox: "0 0 16 16",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
};
const _hoisted_2$i = /* @__PURE__ */ createBaseVNode("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M8 0C8.55228 0 9 0.447715 9 1V1.07089C12.0657 1.5094 14.4906 3.93431 14.9291 7H15C15.5523 7 16 7.44772 16 8C16 8.55228 15.5523 9 15 9H14.9291C14.4906 12.0657 12.0657 14.4906 9 14.9291V15C9 15.5523 8.55228 16 8 16C7.44772 16 7 15.5523 7 15V14.9291C3.93431 14.4906 1.5094 12.0657 1.07089 9H1C0.447715 9 0 8.55228 0 8C0 7.44772 0.447715 7 1 7H1.07089C1.5094 3.93431 3.93431 1.5094 7 1.07089V1C7 0.447715 7.44772 0 8 0ZM7 3.10002C5.04087 3.4977 3.4977 5.04087 3.10002 7H4C4.55228 7 5 7.44772 5 8C5 8.55228 4.55228 9 4 9H3.10002C3.4977 10.9591 5.04087 12.5023 7 12.9V12C7 11.4477 7.44772 11 8 11C8.55228 11 9 11.4477 9 12V12.9C10.9591 12.5023 12.5023 10.9591 12.9 9H12C11.4477 9 11 8.55228 11 8C11 7.44772 11.4477 7 12 7H12.9C12.5023 5.04087 10.9591 3.4977 9 3.10002V4C9 4.55228 8.55228 5 8 5C7.44772 5 7 4.55228 7 4V3.10002Z",
  fill: "#1B1E2E",
  class: "icon-dark"
}, null, -1);
const _hoisted_3$f = /* @__PURE__ */ createBaseVNode("path", {
  d: "M9 8C9 7.44772 8.55229 7 8 7C7.44772 7 7 7.44772 7 8C7 8.55229 7.44772 9 8 9C8.55229 9 9 8.55229 9 8Z",
  fill: "#1B1E2E",
  class: "icon-dark"
}, null, -1);
const _hoisted_4$b = [
  _hoisted_2$i,
  _hoisted_3$f
];
function render$6(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$o, _hoisted_4$b);
}
const __unplugin_components_0$2 = { name: "cy-crosshairs_x16", render: render$6 };
function useAutHeader() {
  const autStore = useAutStore();
  const autHeaderEl = ref();
  const { height } = useElementSize(autHeaderEl);
  watch(height, (newVal) => {
    if (newVal && autStore.specRunnerHeaderHeight !== newVal) {
      autStore.setSpecRunnerHeaderHeight(newVal);
    }
  }, {
    immediate: true
  });
  return {
    autHeaderEl
  };
}
const _hoisted_1$n = {
  height: "1em",
  width: "1em",
  style: { "min-width": "16px", "min-height": "16px" },
  viewBox: "0 0 16 16",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
};
const _hoisted_2$h = /* @__PURE__ */ createBaseVNode("path", {
  opacity: "0.7",
  d: "M1 4V13C1 14.1046 1.89543 15 3 15H13C14.1046 15 15 14.1046 15 13V4M1 4V3C1 1.89543 1.89543 1 3 1H13C14.1046 1 15 1.89543 15 3V4M1 4H15M5 8L6.5 9.5L5 11",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  class: "icon-dark"
}, null, -1);
const _hoisted_3$e = [
  _hoisted_2$h
];
function render$5(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$n, _hoisted_3$e);
}
const __unplugin_components_3 = { name: "cy-technology-terminal_x16", render: render$5 };
const _hoisted_1$m = {
  height: "1em",
  width: "1em",
  style: { "min-width": "16px", "min-height": "16px" },
  viewBox: "0 0 16 16",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
};
const _hoisted_2$g = /* @__PURE__ */ createBaseVNode("path", {
  d: "M14 5V4C14 2.89543 13.1046 2 12 2H4C2.89543 2 2 2.89543 2 4V12C2 13.1046 2.89543 14 4 14H5",
  stroke: "#4956E3",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  class: "icon-dark"
}, null, -1);
const _hoisted_3$d = /* @__PURE__ */ createBaseVNode("path", {
  d: "M10 11L13 14L14 13L11 10L12.5 8.5L7 7L8.5 12.5L10 11Z",
  fill: "#4956E3",
  stroke: "#4956E3",
  "stroke-width": "2",
  "stroke-linejoin": "round",
  class: "icon-dark"
}, null, -1);
const _hoisted_4$a = [
  _hoisted_2$g,
  _hoisted_3$d
];
function render$4(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$m, _hoisted_4$a);
}
const __unplugin_components_0$1 = { name: "cy-selector_x16", render: render$4 };
const _hoisted_1$l = {
  class: "whitespace-nowrap",
  "data-cy": "selector-playground-tooltip"
};
const _sfc_main$m = /* @__PURE__ */ defineComponent({
  __name: "SelectorPlaygroundTooltip",
  props: {
    hoverText: null,
    clickText: null
  },
  setup(__props) {
    const props = __props;
    const shown = ref(false);
    const textToShow = ref(props.hoverText);
    function mouseEnter() {
      textToShow.value = props.hoverText;
      shown.value = true;
    }
    function mouseLeave() {
      shown.value = false;
    }
    function click() {
      textToShow.value = props.clickText ?? props.hoverText;
    }
    function focus() {
      textToShow.value = props.hoverText;
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$w, {
        triggers: ["hover", "focus"],
        "hide-triggers": ["hover", "focus"],
        distance: 8,
        "hide-arrow": "",
        "handle-resize": "",
        onMouseenter: mouseEnter,
        onMouseleave: mouseLeave,
        onClick: click
      }, {
        popper: withCtx(() => [
          createBaseVNode("div", _hoisted_1$l, toDisplayString(textToShow.value), 1)
        ]),
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", { focus })
        ]),
        _: 3
      });
    };
  }
});
const _withScopeId$2 = (n) => (pushScopeId("data-v-ac0da8b0"), n = n(), popScopeId(), n);
const _hoisted_1$k = {
  id: "selector-playground",
  class: "border-t border-b bg-gray-50 border-gray-200 h-[56px] grid py-[12px] px-[16px] gap-[12px] grid-cols-[40px,1fr,auto] items-center"
};
const _hoisted_2$f = ["onClick"];
const _hoisted_3$c = {
  class: "flex pl-[12px] inset-y-0 text-gray-600 absolute items-center pointer-events-none",
  "data-cy": "selected-playground-method"
};
const _hoisted_4$9 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createBaseVNode("span", { class: "text-gray-800" }, "cy", -1));
const _hoisted_5$7 = { class: "text-purple-500" };
const _hoisted_6$5 = {
  key: 0,
  class: "text-error-400"
};
const _hoisted_7$4 = { class: "flex gap-[12px]" };
const _sfc_main$l = /* @__PURE__ */ defineComponent({
  __name: "SelectorPlayground",
  props: {
    eventManager: null,
    getAutIframe: { type: Function }
  },
  setup(__props) {
    const props = __props;
    const { t } = useI18n();
    const methods = [
      {
        display: "cy.get",
        value: "get"
      },
      {
        display: "cy.contains",
        value: "contains"
      }
    ];
    const selectorPlaygroundStore = useSelectorPlaygroundStore();
    const match = ref();
    const { width: matcherWidth } = useElementSize(match);
    const leftOfInputText = computed(() => {
      return (selectorPlaygroundStore.method === "get" ? "cy.get(‘" : "cy.contains(’").length + 1;
    });
    const widthOfMatchesHelperText = computed(() => {
      return matcherWidth.value + 32 + 24;
    });
    const leftOffsetForClosingParens = computed(() => {
      return leftOfInputText.value + selector.value.length;
    });
    watch(() => selectorPlaygroundStore.method, () => {
      props.getAutIframe().toggleSelectorHighlight(true);
    });
    const selector = computed({
      get() {
        return selectorPlaygroundStore.method === "get" ? selectorPlaygroundStore.getSelector : selectorPlaygroundStore.containsSelector;
      },
      set(value) {
        if (selectorPlaygroundStore.method === "get") {
          selectorPlaygroundStore.getSelector = value;
        }
        if (selectorPlaygroundStore.method === "contains") {
          selectorPlaygroundStore.containsSelector = value;
        }
        props.getAutIframe().toggleSelectorHighlight(true);
      }
    });
    function setShowingHighlight() {
      selectorPlaygroundStore.setShowingHighlight(true);
      props.getAutIframe().toggleSelectorHighlight(true);
    }
    function toggleEnabled() {
      const newVal = !selectorPlaygroundStore.isEnabled;
      selectorPlaygroundStore.setEnabled(newVal);
      props.getAutIframe().toggleSelectorPlayground(newVal);
    }
    function printSelected() {
      props.getAutIframe().printSelectorElementsToConsole();
    }
    const { copy: copy2 } = useClipboard({ copiedDuring: 2e3 });
    const copyToClipboard = () => {
      copy2(selectorPlaygroundStore.command);
    };
    return (_ctx, _cache) => {
      const _component_i_cy_selector_x16 = __unplugin_components_0$1;
      const _component_i_cy_chevron_down_small_x16 = __unplugin_components_0$8;
      const _component_i_cy_copy_clipboard_x16 = __unplugin_components_2;
      const _component_i_cy_technology_terminal_x16 = __unplugin_components_3;
      return openBlock(), createElementBlock("div", _hoisted_1$k, [
        createVNode(_sfc_main$m, {
          "hover-text": unref(t)("runner.selectorPlayground.playgroundTooltip"),
          class: "flex h-full"
        }, {
          default: withCtx(() => [
            createBaseVNode("button", {
              class: "border rounded-md flex h-full outline-none border-gray-200 text-white transition w-[40px] duration-150 items-center justify-center hocus-default",
              "data-cy": "playground-toggle",
              onClick: toggleEnabled
            }, [
              createVNode(_component_i_cy_selector_x16, {
                class: normalizeClass({ "icon-dark-indigo-500": unref(selectorPlaygroundStore).isEnabled, "icon-dark-gray-500": !unref(selectorPlaygroundStore).isEnabled })
              }, null, 8, ["class"])
            ])
          ]),
          _: 1
        }, 8, ["hover-text"]),
        createBaseVNode("div", {
          class: "flex h-full flex-1 w-full relative items-center",
          onMouseover: setShowingHighlight
        }, [
          createVNode(unref(Menu), null, {
            default: withCtx(({ open }) => [
              createVNode(unref(MenuButton), {
                "aria-label": unref(t)("runner.selectorPlayground.selectorMethodsLabel"),
                class: "border border-r-transparent rounded-l-md flex h-full outline-none border-gray-200 text-white w-[40px] items-center justify-center hocus-default",
                onClick: _cache[0] || (_cache[0] = withModifiers(() => {
                }, ["stop"]))
              }, {
                default: withCtx(() => [
                  createVNode(_component_i_cy_chevron_down_small_x16, {
                    class: normalizeClass(["transition transition-color duration-300", open ? "icon-dark-indigo-500" : "icon-dark-gray-500"])
                  }, null, 8, ["class"])
                ]),
                _: 2
              }, 1032, ["aria-label"]),
              createVNode(unref(MenuItems), { class: "rounded flex flex-col outline-transparent bg-gray-900 text-white top-[34px] z-40 absolute overflow-scroll" }, {
                default: withCtx(() => [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(unref(methods), (method) => {
                    return openBlock(), createBlock(unref(MenuItem), {
                      key: method.display
                    }, {
                      default: withCtx(({ active }) => [
                        createBaseVNode("button", {
                          class: normalizeClass([{ "bg-gray-700": active }, "border-b border-b-gray-800 text-left py-[8px] px-[16px]"]),
                          onClick: ($event) => unref(selectorPlaygroundStore).setMethod(method.value)
                        }, toDisplayString(method.display), 11, _hoisted_2$f)
                      ]),
                      _: 2
                    }, 1024);
                  }), 128))
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createBaseVNode("code", {
            class: "flex-1 py-[2px] pr-[2px] pl-0 relative overflow-hidden",
            style: normalizeStyle({ height: "calc(100% + 4px)" })
          }, [
            createBaseVNode("span", _hoisted_3$c, [
              _hoisted_4$9,
              createTextVNode("."),
              createBaseVNode("span", _hoisted_5$7, toDisplayString(unref(selectorPlaygroundStore).method), 1),
              createTextVNode("(‘ ")
            ]),
            withDirectives(createBaseVNode("input", {
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => isRef(selector) ? selector.value = $event : null),
              autocapitalize: "none",
              autocomplete: "off",
              autocorrect: "off",
              spellcheck: "false",
              "data-cy": "playground-selector",
              style: normalizeStyle({ paddingLeft: unref(leftOfInputText) + "ch", paddingRight: unref(widthOfMatchesHelperText) + "px" }),
              class: normalizeClass(["border rounded-r-md font-medium h-full outline-none border-gray-200 w-full text-indigo-500 hocus-default overflow-ellipsis", { "hocus-default": unref(selectorPlaygroundStore).isValid, "hocus-error": !unref(selectorPlaygroundStore).isValid }])
            }, null, 6), [
              [vModelText, unref(selector)]
            ]),
            createBaseVNode("span", {
              class: "flex inset-y-0 text-gray-600 absolute items-center pointer-events-none",
              style: normalizeStyle({
                left: `${unref(leftOffsetForClosingParens)}ch`
              })
            }, "’)", 4),
            createBaseVNode("div", {
              ref_key: "match",
              ref: match,
              class: "bg-white border-l flex font-sans border-l-gray-200 my-[6px] px-[16px] inset-y-0 right-[3px] text-gray-600 absolute items-center",
              "data-cy": "playground-num-elements"
            }, [
              !unref(selectorPlaygroundStore).isValid ? (openBlock(), createElementBlock("span", _hoisted_6$5, toDisplayString(unref(t)("runner.selectorPlayground.invalidSelector")), 1)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                createTextVNode(toDisplayString(unref(t)("runner.selectorPlayground.matches", unref(selectorPlaygroundStore).numElements)), 1)
              ], 64))
            ], 512)
          ], 4)
        ], 32),
        createBaseVNode("div", _hoisted_7$4, [
          createVNode(_sfc_main$m, {
            "hover-text": unref(t)("runner.selectorPlayground.copyTooltip"),
            "click-text": unref(t)("runner.selectorPlayground.copyTooltipAction")
          }, {
            default: withCtx(({ focus }) => [
              createVNode(_sfc_main$A, {
                size: "md",
                variant: "outline",
                "data-cy": "playground-copy",
                class: "override-border",
                onClick: copyToClipboard,
                onFocus: focus
              }, {
                default: withCtx(() => [
                  createVNode(_component_i_cy_copy_clipboard_x16, { class: "icon-dark-gray-500" })
                ]),
                _: 2
              }, 1032, ["onFocus"])
            ]),
            _: 1
          }, 8, ["hover-text", "click-text"]),
          createVNode(_sfc_main$m, {
            "hover-text": unref(t)("runner.selectorPlayground.printTooltip"),
            "click-text": unref(t)("runner.selectorPlayground.printTooltipAction")
          }, {
            default: withCtx(({ focus }) => [
              createVNode(_sfc_main$A, {
                key: "fudge",
                size: "md",
                variant: "outline",
                "data-cy": "playground-print",
                class: "override-border",
                onClick: _cache[2] || (_cache[2] = ($event) => printSelected()),
                onFocus: focus
              }, {
                default: withCtx(() => [
                  createVNode(_component_i_cy_technology_terminal_x16, { class: "icon-dark-gray-600" })
                ]),
                _: 2
              }, 1032, ["onFocus"])
            ]),
            _: 1
          }, 8, ["hover-text", "click-text"])
        ])
      ]);
    };
  }
});
const SelectorPlayground_vue_vue_type_style_index_0_scoped_ac0da8b0_lang = "";
const SelectorPlayground = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["__scopeId", "data-v-ac0da8b0"]]);
const _hoisted_1$j = {
  height: "1em",
  width: "1em",
  style: { "min-width": "16px", "min-height": "16px" },
  viewBox: "0 0 16 16",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
};
const _hoisted_2$e = /* @__PURE__ */ createBaseVNode("path", {
  d: "M3.5 2.58535C2.9174 2.79127 2.5 3.34689 2.5 4V13.5C2.5 14.3284 3.17157 15 4 15H12C12.8284 15 13.5 14.3284 13.5 13.5V4C13.5 3.34689 13.0826 2.79127 12.5 2.58535M7 4H9C9.55228 4 10 3.55228 10 3V2C10 1.44772 9.55228 1 9 1H7C6.44772 1 6 1.44772 6 2V3C6 3.55228 6.44772 4 7 4Z",
  stroke: "currentColor",
  class: "icon-dark",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, null, -1);
const _hoisted_3$b = [
  _hoisted_2$e
];
function render$3(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$j, _hoisted_3$b);
}
const __unplugin_components_5 = { name: "cy-general-clipboard_x16", render: render$3 };
const _hoisted_1$i = {
  height: "1em",
  width: "1em",
  style: { "min-width": "16px", "min-height": "16px" },
  viewBox: "0 0 16 16",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
};
const _hoisted_2$d = /* @__PURE__ */ createBaseVNode("path", {
  d: "M4 8.5L7 12L12 4",
  stroke: "currentColor",
  class: "icon-dark",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, null, -1);
const _hoisted_3$a = [
  _hoisted_2$d
];
function render$2(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$i, _hoisted_3$a);
}
const __unplugin_components_4 = { name: "cy-checkmark_x16", render: render$2 };
const _hoisted_1$h = {
  height: "1em",
  width: "1em",
  style: { "min-width": "16px", "min-height": "16px" },
  viewBox: "0 0 16 16",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
};
const _hoisted_2$c = /* @__PURE__ */ createBaseVNode("path", {
  d: "M5.5 3.5L3.5 5.5L6 8L8 6L5.5 3.5Z",
  fill: "#AFB3C7",
  class: "icon-light"
}, null, -1);
const _hoisted_3$9 = /* @__PURE__ */ createBaseVNode("path", {
  d: "M5.5 3.5L6.20711 2.79289C5.81658 2.40237 5.18342 2.40237 4.79289 2.79289L5.5 3.5ZM13.5 11.5L14.2071 12.2071C14.5976 11.8166 14.5976 11.1834 14.2071 10.7929L13.5 11.5ZM11.5 13.5L10.7929 14.2071C11.1834 14.5976 11.8166 14.5976 12.2071 14.2071L11.5 13.5ZM3.5 5.5L2.79289 4.79289C2.40237 5.18342 2.40237 5.81658 2.79289 6.20711L3.5 5.5ZM12.7929 10.7929L10.7929 12.7929L12.2071 14.2071L14.2071 12.2071L12.7929 10.7929ZM4.20711 6.20711L6.20711 4.20711L4.79289 2.79289L2.79289 4.79289L4.20711 6.20711ZM12.2071 12.7929L6.70711 7.29289L5.29289 8.70711L10.7929 14.2071L12.2071 12.7929ZM6.70711 7.29289L4.20711 4.79289L2.79289 6.20711L5.29289 8.70711L6.70711 7.29289ZM4.79289 4.20711L7.29289 6.70711L8.70711 5.29289L6.20711 2.79289L4.79289 4.20711ZM7.29289 6.70711L12.7929 12.2071L14.2071 10.7929L8.70711 5.29289L7.29289 6.70711ZM6.70711 8.70711L8.70711 6.70711L7.29289 5.29289L5.29289 7.29289L6.70711 8.70711Z",
  fill: "currentColor",
  class: "icon-dark"
}, null, -1);
const _hoisted_4$8 = /* @__PURE__ */ createBaseVNode("path", {
  d: "M5.5 1.5V0.5M0.5 5.5H1.5M2.67157 2.67157L1.96447 1.96447M1.96447 9.03553L2.67157 8.32843M8.32843 2.67157L9.03553 1.96447",
  stroke: "#AFB3C7",
  class: "icon-light",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, null, -1);
const _hoisted_5$6 = [
  _hoisted_2$c,
  _hoisted_3$9,
  _hoisted_4$8
];
function render$1(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$h, _hoisted_5$6);
}
const __unplugin_components_1 = { name: "cy-object-magic-wand-dark-mode_x16", render: render$1 };
const _hoisted_1$g = { class: "border-y flex border-gray-50 w-full justify-between" };
const _hoisted_2$b = { class: "flex" };
const _hoisted_3$8 = { class: "flex pr-5 pl-5 items-center" };
const _hoisted_4$7 = {
  key: 0,
  class: "mr-2"
};
const _hoisted_5$5 = {
  key: 1,
  class: "px-2"
};
const _hoisted_6$4 = { class: "font-semibold text-base text-gray-800" };
const _hoisted_7$3 = { class: "ml-1" };
const _hoisted_8$1 = { class: "flex items-center" };
const _hoisted_9$1 = { class: "flex" };
const _hoisted_10$1 = { class: "border rounded-md flex border-gray-100 m-1" };
const _hoisted_11$1 = ["disabled"];
const _hoisted_12 = ["disabled"];
const _hoisted_13 = ["disabled"];
const _hoisted_14 = { key: 0 };
const _hoisted_15 = { key: 1 };
const _hoisted_16 = { class: "flex items-center" };
const _hoisted_17 = ["disabled"];
const _sfc_main$k = /* @__PURE__ */ defineComponent({
  __name: "StudioControls",
  setup(__props) {
    const controlsClassName = "border-gray-100 py-2 px-3 disabled:stroke-gray-400 disabled:pointer-events-none disabled:opacity-50";
    const { t } = useI18n$1();
    const studioStore = useStudioStore();
    const eventManager = getEventManager();
    const commandsCopied = ref(false);
    function handleClose() {
      eventManager.emit("studio:cancel", void 0);
    }
    function handleRestart() {
      studioStore.reset();
      eventManager.emit("restart", void 0);
    }
    function handleCopyCommands() {
      eventManager.emit("studio:copy:to:clipboard", () => {
        commandsCopied.value = true;
      });
    }
    function handleSaveCommands() {
      studioStore.startSave();
    }
    return (_ctx, _cache) => {
      const _component_i_cy_action_record_x16 = RecordIcon;
      const _component_i_cy_object_magic_wand_dark_mode_x16 = __unplugin_components_1;
      const _component_i_cy_delete_x16 = __unplugin_components_0$5;
      const _component_i_cy_action_restart_x16 = RefreshIcon;
      const _component_i_cy_checkmark_x16 = __unplugin_components_4;
      const _component_i_cy_general_clipboard_x16 = __unplugin_components_5;
      return openBlock(), createElementBlock("div", _hoisted_1$g, [
        createBaseVNode("div", _hoisted_2$b, [
          createBaseVNode("div", _hoisted_3$8, [
            unref(studioStore).url && unref(studioStore).isActive && !unref(studioStore).isFailed ? (openBlock(), createElementBlock("span", _hoisted_4$7, [
              createVNode(_component_i_cy_action_record_x16, { class: "animate-pulse icon-dark-red-500 icon-light-red-500" })
            ])) : (openBlock(), createElementBlock("span", _hoisted_5$5, [
              createVNode(_component_i_cy_object_magic_wand_dark_mode_x16, { class: "fill-purple-300 stroke-purple-300" })
            ])),
            createBaseVNode("div", _hoisted_6$4, [
              createBaseVNode("span", null, toDisplayString(unref(t)("runner.studio.studio").toUpperCase()), 1),
              createBaseVNode("span", _hoisted_7$3, toDisplayString(unref(t)("versions.beta").toUpperCase()), 1)
            ])
          ]),
          createBaseVNode("div", _hoisted_8$1, [
            createBaseVNode("a", {
              class: "cursor-pointer font-medium text-base text-indigo-500 hocus-link hover:underline",
              onClick: _cache[0] || (_cache[0] = //@ts-ignore
              (...args) => unref(studioStore).openInstructionModal && unref(studioStore).openInstructionModal(...args))
            }, toDisplayString(unref(t)("runner.studio.availableCommands")), 1)
          ])
        ]),
        createBaseVNode("div", _hoisted_9$1, [
          createBaseVNode("div", _hoisted_10$1, [
            createVNode(_sfc_main$w, { placement: "top" }, {
              popper: withCtx(() => [
                createTextVNode(toDisplayString(unref(t)("runner.studio.closeStudio")), 1)
              ]),
              default: withCtx(() => [
                createBaseVNode("button", {
                  class: normalizeClass(`border-r ${controlsClassName}`),
                  disabled: unref(studioStore).isLoading,
                  onClick: handleClose
                }, [
                  createVNode(_component_i_cy_delete_x16)
                ], 10, _hoisted_11$1)
              ]),
              _: 1
            }),
            createVNode(_sfc_main$w, { placement: "top" }, {
              popper: withCtx(() => [
                createTextVNode(toDisplayString(unref(t)("runner.studio.restartStudio")), 1)
              ]),
              default: withCtx(() => [
                createBaseVNode("button", {
                  class: normalizeClass(`border-r ${controlsClassName}`),
                  disabled: unref(studioStore).isLoading,
                  onClick: handleRestart
                }, [
                  createVNode(_component_i_cy_action_restart_x16)
                ], 10, _hoisted_12)
              ]),
              _: 1
            }),
            createVNode(_sfc_main$w, { placement: "top" }, {
              popper: withCtx(() => [
                createTextVNode(toDisplayString(unref(t)(commandsCopied.value ? "runner.studio.commandsCopied" : "runner.studio.copyCommands")), 1)
              ]),
              default: withCtx(() => [
                createBaseVNode("button", {
                  class: normalizeClass(controlsClassName),
                  disabled: unref(studioStore).isLoading || unref(studioStore).isEmpty,
                  onClick: handleCopyCommands,
                  onMouseleave: _cache[1] || (_cache[1] = () => commandsCopied.value = false)
                }, [
                  commandsCopied.value ? (openBlock(), createElementBlock("span", _hoisted_14, [
                    createVNode(_component_i_cy_checkmark_x16, { class: "icon-dark-green-400 icon-light-green-400" })
                  ])) : (openBlock(), createElementBlock("span", _hoisted_15, [
                    createVNode(_component_i_cy_general_clipboard_x16)
                  ]))
                ], 40, _hoisted_13)
              ]),
              _: 1
            })
          ]),
          createBaseVNode("div", _hoisted_16, [
            createBaseVNode("button", {
              class: "rounded-md bg-indigo-500 mx-3 text-white py-2 px-3 hover:bg-indigo-400 disabled:opacity-50 disabled:pointer-events-none",
              disabled: unref(studioStore).isLoading || unref(studioStore).isEmpty || unref(studioStore).isFailed,
              onClick: handleSaveCommands
            }, toDisplayString(unref(t)("runner.studio.saveTestButton")), 9, _hoisted_17)
          ])
        ])
      ]);
    };
  }
});
const _withScopeId$1 = (n) => (pushScopeId("data-v-1c834c7a"), n = n(), popScopeId(), n);
const _hoisted_1$f = {
  "cy-data": "studio-url-prompt",
  class: "border rounded-md flex flex-col h-fit bg-gray-1000 border-gray-200 w-fit py-4 px-3 top-16 left-16 text-gray-200 z-51 studio-url-container absolute"
};
const _hoisted_2$a = { class: "text-center" };
const _hoisted_3$7 = { class: "flex mt-4 mb-1 justify-between" };
const _hoisted_4$6 = ["disabled"];
const _hoisted_5$4 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", {
  "cy-data": "studio-url-overlay",
  class: "bg-black h-full w-full opacity-[.35] top-0 right-0 bottom-0 left-0 z-50 fixed"
}, null, -1));
const _sfc_main$j = /* @__PURE__ */ defineComponent({
  __name: "StudioUrlPrompt",
  props: {
    autUrlInputRef: null,
    urlInProgress: null
  },
  emits: ["submit", "cancel"],
  setup(__props, { emit }) {
    const props = __props;
    const { t } = useI18n$1();
    onMounted(() => {
      if (props.autUrlInputRef) {
        props.autUrlInputRef.focus();
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("div", _hoisted_1$f, [
          createBaseVNode("div", _hoisted_2$a, [
            createBaseVNode("span", null, toDisplayString(unref(t)("runner.studio.enterValidUrl")), 1)
          ]),
          createBaseVNode("form", {
            onSubmit: _cache[1] || (_cache[1] = withModifiers(($event) => emit("submit"), ["prevent"]))
          }, [
            createBaseVNode("div", _hoisted_3$7, [
              createBaseVNode("button", {
                class: "rounded bg-gray-800 mx-1 text-white py-1 px-3",
                type: "button",
                onClick: _cache[0] || (_cache[0] = ($event) => emit("cancel"))
              }, toDisplayString(unref(t)("runner.studio.actionCancel")), 1),
              createBaseVNode("button", {
                class: "rounded bg-gray-800 mx-1 text-white py-1 px-3 disabled:opacity-50 disabled:pointer-events-none",
                disabled: !__props.urlInProgress,
                type: "submit"
              }, toDisplayString(unref(t)("runner.studio.continue")) + " ➜ ", 9, _hoisted_4$6)
            ])
          ], 32)
        ]),
        _hoisted_5$4
      ], 64);
    };
  }
});
const StudioUrlPrompt_vue_vue_type_style_index_0_scoped_1c834c7a_lang = "";
const StudioUrlPrompt = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["__scopeId", "data-v-1c834c7a"]]);
const _hoisted_1$e = {
  key: 0,
  class: "flex flex-col"
};
const _sfc_main$i = /* @__PURE__ */ defineComponent({
  __name: "SpecRunnerDropdown",
  props: {
    variant: { default: void 0 },
    align: { default: "right" },
    disabled: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _cache) => {
      const _component_i_cy_chevron_down = __unplugin_components_0$9;
      return openBlock(), createBlock(unref(Popover), {
        key: `${props.disabled}`,
        class: "bg-white rounded border-[1px] border-gray-100 h-[32px] relative"
      }, {
        default: withCtx(({ open, close }) => [
          createVNode(unref(PopoverButton), {
            class: normalizeClass(["border-transparent rounded grow h-full border-[1px] px-[12px] group", {
              "hocus-default": !props.disabled,
              "opacity-50 cursor-auto": props.disabled
            }]),
            disabled: props.disabled
          }, {
            default: withCtx(() => [
              createBaseVNode("div", {
                class: normalizeClass(["flex gap-[8px] items-center", {
                  "group-hocus:text-indigo-600": !props.disabled,
                  "text-indigo-600": open,
                  "text-gray-600": !open
                }])
              }, [
                renderSlot(_ctx.$slots, "heading", {
                  open,
                  close
                }),
                createVNode(_component_i_cy_chevron_down, {
                  class: normalizeClass(["transform transition-all w-[10px] duration-300", {
                    "group-hocus:icon-dark-indigo-500": !props.disabled,
                    "icon-dark-gray-200": !open,
                    "rotate-180 icon-dark-indigo-500": open
                  }])
                }, null, 8, ["class"])
              ], 2)
            ]),
            _: 2
          }, 1032, ["class", "disabled"]),
          createVNode(TransitionQuickFade, null, {
            default: withCtx(() => [
              createVNode(unref(PopoverPanel), {
                static: "",
                class: normalizeClass(["bg-white rounded shadow-dropdown top-[36px] z-10 absolute", { "hidden": !open, "right-0": __props.align === "right", "left-0": __props.align === "left" }])
              }, {
                default: withCtx(() => [
                  props.variant !== "panel" ? (openBlock(), createElementBlock("ul", _hoisted_1$e, [
                    renderSlot(_ctx.$slots, "default")
                  ])) : renderSlot(_ctx.$slots, "default", { key: 1 })
                ]),
                _: 2
              }, 1032, ["class"])
            ]),
            _: 2
          }, 1024)
        ]),
        _: 3
      });
    };
  }
});
const _hoisted_1$d = { class: "flex flex-wrap grow p-[16px] gap-[12px] justify-end" };
const _hoisted_2$9 = ["value", "onKeyup"];
const _hoisted_3$6 = {
  key: 1,
  class: "grow"
};
const _hoisted_4$5 = ["src", "alt"];
const _hoisted_5$3 = { class: "max-h-[50vh] overflow-auto" };
const _hoisted_6$3 = { class: "whitespace-nowrap" };
const _hoisted_7$2 = {
  key: 0,
  class: "ml-[-6px] text-gray-500"
};
const _hoisted_8 = { class: "max-h-50vw p-[24px] pt-5 text-gray-700 leading-5 w-[346px] overflow-auto" };
const _hoisted_9 = { class: "font-bold" };
const _hoisted_10 = { class: "font-bold" };
const _hoisted_11 = { class: "flex justify-center" };
const _sfc_main$h = /* @__PURE__ */ defineComponent({
  __name: "SpecRunnerHeaderOpenMode",
  props: {
    gql: null,
    eventManager: null,
    getAutIframe: { type: Function }
  },
  setup(__props) {
    var _a;
    const props = __props;
    gql`
fragment SpecRunnerHeader on CurrentProject {
  id
  configFile
  currentTestingType
  activeBrowser {
    id
    displayName
    majorVersion
  }
  config
  ...VerticalBrowserListItems
}
`;
    const { t } = useI18n();
    const autStore = useAutStore();
    const specStore = useSpecStore();
    const route = useRoute();
    const studioStore = useStudioStore();
    const urlInProgress = ref("");
    const autUrlInputRef = ref();
    const showAlert = ref(false);
    const { autHeaderEl } = useAutHeader();
    watchEffect(() => {
      showAlert.value = route.params.shouldShowTroubleRenderingAlert === "true";
    });
    const autIframe = props.getAutIframe();
    const displayScale = computed(() => {
      return autStore.scale < 1 ? `${Math.round(autStore.scale * 100)}%` : 0;
    });
    const autUrl = computed(() => {
      if (studioStore.isActive && studioStore.url) {
        return studioStore.url;
      }
      return autStore.url;
    });
    const selectorPlaygroundStore = useSelectorPlaygroundStore();
    const togglePlayground$1 = () => togglePlayground(autIframe);
    const selectedBrowser = ref({ ...props.gql.activeBrowser });
    const activeSpecPath = (_a = specStore.activeSpec) == null ? void 0 : _a.absolute;
    const isDisabled = computed(() => autStore.isRunning || autStore.isLoading);
    function setStudioUrl(event) {
      const url = event.currentTarget.value;
      urlInProgress.value = url;
    }
    function visitUrl() {
      studioStore.visitUrl(urlInProgress.value);
    }
    function openInNewTab() {
      var _a2;
      if (!autStore.url || studioStore.isActive) {
        return;
      }
      (_a2 = window.open(autStore.url, "_blank")) == null ? void 0 : _a2.focus();
    }
    return (_ctx, _cache) => {
      var _a2;
      const _component_i_cy_crosshairs_x16 = __unplugin_components_0$2;
      const _component_i_cy_ruler_x16 = __unplugin_components_0$3;
      const _component_i18n_t = resolveComponent("i18n-t");
      const _component_i_cy_book_x16 = __unplugin_components_0$a;
      return openBlock(), createElementBlock("div", {
        id: "spec-runner-header",
        ref_key: "autHeaderEl",
        ref: autHeaderEl,
        class: "min-h-[64px] text-[14px]"
      }, [
        createBaseVNode("div", _hoisted_1$d, [
          props.gql.currentTestingType === "e2e" ? (openBlock(), createElementBlock("div", {
            key: 0,
            "data-cy": "aut-url",
            class: normalizeClass(["border rounded flex grow border-gray-100 h-[32px] overflow-hidden align-middle", {
              "bg-gray-50": unref(autStore).isLoadingUrl
            }])
          }, [
            createVNode(_sfc_main$A, {
              "data-cy": "playground-activator",
              disabled: unref(isDisabled),
              class: "rounded-none border-gray-100 border-r-[1px] mr-[12px]",
              variant: "text",
              "aria-label": unref(t)("runner.selectorPlayground.toggle"),
              onClick: togglePlayground$1
            }, {
              default: withCtx(() => [
                createVNode(_component_i_cy_crosshairs_x16, {
                  class: normalizeClass([unref(selectorPlaygroundStore).show ? "icon-dark-indigo-500" : "icon-dark-gray-500"])
                }, null, 8, ["class"])
              ]),
              _: 1
            }, 8, ["disabled", "aria-label"]),
            createBaseVNode("input", {
              ref_key: "autUrlInputRef",
              ref: autUrlInputRef,
              target: "_blank",
              value: unref(studioStore).needsUrl ? urlInProgress.value : unref(autUrl),
              "data-cy": "aut-url-input",
              class: "flex grow mr-[12px] leading-normal max-w-full text-indigo-500 z-51 self-center hocus-link-default truncate",
              onInput: setStudioUrl,
              onClick: openInNewTab,
              onKeyup: withKeys(visitUrl, ["enter"])
            }, null, 40, _hoisted_2$9),
            unref(studioStore).needsUrl ? (openBlock(), createBlock(StudioUrlPrompt, {
              key: 0,
              "aut-url-input-ref": autUrlInputRef.value,
              "url-in-progress": urlInProgress.value,
              onSubmit: visitUrl,
              onCancel: _cache[0] || (_cache[0] = () => __props.eventManager.emit("studio:cancel", void 0))
            }, null, 8, ["aut-url-input-ref", "url-in-progress"])) : createCommentVNode("", true)
          ], 2)) : (openBlock(), createElementBlock("div", _hoisted_3$6, [
            createVNode(_sfc_main$A, {
              "data-cy": "playground-activator",
              disabled: unref(isDisabled),
              class: "border-gray-100 mr-[12px]",
              variant: "outline",
              "aria-label": unref(t)("runner.selectorPlayground.toggle"),
              onClick: togglePlayground$1
            }, {
              default: withCtx(() => [
                createVNode(_component_i_cy_crosshairs_x16, {
                  class: normalizeClass([unref(selectorPlaygroundStore).show ? "icon-dark-indigo-500" : "icon-dark-gray-500"])
                }, null, 8, ["class"])
              ]),
              _: 1
            }, 8, ["disabled", "aria-label"])
          ])),
          ((_a2 = selectedBrowser.value) == null ? void 0 : _a2.displayName) ? (openBlock(), createBlock(_sfc_main$i, {
            key: 2,
            "data-cy": "select-browser",
            disabled: unref(autStore).isRunning
          }, {
            heading: withCtx(() => [
              createBaseVNode("img", {
                class: "min-w-[16px] w-[16px]",
                src: unref(allBrowsersIcons)[selectedBrowser.value.displayName] || unref(allBrowsersIcons).generic,
                alt: selectedBrowser.value.displayName
              }, null, 8, _hoisted_4$5),
              createTextVNode(" " + toDisplayString(selectedBrowser.value.displayName) + " " + toDisplayString(selectedBrowser.value.majorVersion), 1)
            ]),
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_5$3, [
                createVNode(_sfc_main$B, {
                  gql: props.gql,
                  "spec-path": unref(activeSpecPath)
                }, null, 8, ["gql", "spec-path"])
              ])
            ]),
            _: 1
          }, 8, ["disabled"])) : createCommentVNode("", true),
          createVNode(_sfc_main$i, {
            variant: "panel",
            "data-cy": "viewport"
          }, {
            heading: withCtx(() => [
              createVNode(_component_i_cy_ruler_x16, { class: "icon-dark-gray-500 icon-light-gray-400" }),
              createBaseVNode("span", _hoisted_6$3, toDisplayString(unref(autStore).viewportWidth) + "x" + toDisplayString(unref(autStore).viewportHeight), 1),
              unref(displayScale) ? (openBlock(), createElementBlock("span", _hoisted_7$2, " (" + toDisplayString(unref(displayScale)) + ") ", 1)) : createCommentVNode("", true)
            ]),
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_8, [
                createVNode(_component_i18n_t, {
                  tag: "p",
                  keypath: "runner.viewportTooltip.infoText",
                  class: "mb-[24px]"
                }, {
                  default: withCtx(() => [
                    createBaseVNode("strong", _hoisted_9, toDisplayString(unref(autStore).defaultViewportWidth) + "px", 1),
                    createBaseVNode("strong", _hoisted_10, toDisplayString(unref(autStore).defaultViewportHeight) + "px", 1),
                    createTextVNode(" " + toDisplayString(props.gql.currentTestingType === "e2e" ? "end-to-end" : "component"), 1)
                  ]),
                  _: 1
                }),
                createVNode(_component_i18n_t, {
                  tag: "p",
                  keypath: "runner.viewportTooltip.configText",
                  class: "mb-[24px]"
                }, {
                  configFile: withCtx(() => [
                    createVNode(_sfc_main$C, { class: "font-medium text-xs leading-5" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(props.gql.configFile), 1)
                      ]),
                      _: 1
                    })
                  ]),
                  viewportCommand: withCtx(() => [
                    createVNode(_sfc_main$C, { class: "font-medium text-xs leading-5" }, {
                      default: withCtx(() => [
                        createTextVNode("cy.viewport()")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createBaseVNode("div", _hoisted_11, [
                  createVNode(_sfc_main$A, {
                    class: "font-medium",
                    "data-cy": "viewport-docs",
                    "prefix-icon": unref(__unplugin_components_0$a),
                    "prefix-icon-class": "icon-dark-indigo-500",
                    variant: "outline",
                    href: unref(t)("runner.viewportTooltip.buttonHref")
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(t)("runner.viewportTooltip.buttonText")), 1)
                    ]),
                    _: 1
                  }, 8, ["prefix-icon", "href"])
                ])
              ])
            ]),
            _: 1
          })
        ]),
        unref(selectorPlaygroundStore).show ? (openBlock(), createBlock(SelectorPlayground, {
          key: 0,
          "get-aut-iframe": __props.getAutIframe,
          "event-manager": __props.eventManager
        }, null, 8, ["get-aut-iframe", "event-manager"])) : createCommentVNode("", true),
        unref(studioStore).isActive ? (openBlock(), createBlock(_sfc_main$k, { key: 1 })) : createCommentVNode("", true),
        createVNode(_sfc_main$E, {
          modelValue: showAlert.value,
          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => showAlert.value = $event),
          status: "success",
          dismissible: ""
        }, {
          title: withCtx(() => [
            createVNode(_component_i_cy_book_x16, { class: "pr-[2px] inline-block icon-dark-indigo-500 icon-light-indigo-200" }),
            createVNode(_sfc_main$D, { href: "https://on.cypress.io/styling-components" }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(unref(t)("runner.header.reviewDocs")), 1)
              ]),
              _: 1
            }),
            createTextVNode(" " + toDisplayString(unref(t)("runner.header.troubleRendering")), 1)
          ]),
          _: 1
        }, 8, ["modelValue"])
      ], 512);
    };
  }
});
const __default__$1 = defineComponent({
  inheritAttrs: false
});
const _sfc_main$g = /* @__PURE__ */ defineComponent({
  ...__default__$1,
  __name: "RemoveClassesDuringScreenshotting",
  setup(__props) {
    const screenshotStore = useScreenshotStore();
    const attrs = useAttrs();
    const classes = computed(() => {
      return {
        [attrs.class]: !screenshotStore.isScreenshotting
      };
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(unref(classes))
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 2);
    };
  }
});
const _sfc_main$f = /* @__PURE__ */ defineComponent({
  __name: "AdjustRunnerStyleDuringScreenshot",
  setup(__props) {
    const screenshotStore = useScreenshotStore();
    const style = computed(() => {
      if (screenshotStore.isScreenshotting) {
        return {
          left: `0px`,
          width: `100%`
        };
      }
      return {
        // since run mode has no nav, let's check for run mode here
        width: isRunMode ? "100%" : `calc(100% - ${runnerConstants.collapsedNavBarWidth})`
      };
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        style: normalizeStyle(unref(style))
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 4);
    };
  }
});
const _withScopeId = (n) => (pushScopeId("data-v-0efcdee6"), n = n(), popScopeId(), n);
const _hoisted_1$c = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", null, null, -1));
const _hoisted_2$8 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", null, null, -1));
const _hoisted_3$5 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", null, null, -1));
const _hoisted_4$4 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", null, null, -1));
const _hoisted_5$2 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", null, null, -1));
const _hoisted_6$2 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", null, null, -1));
const _hoisted_7$1 = [
  _hoisted_1$c,
  _hoisted_2$8,
  _hoisted_3$5,
  _hoisted_4$4,
  _hoisted_5$2,
  _hoisted_6$2
];
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  __name: "ScreenshotHelperPixels",
  setup(__props) {
    const screenshotStore = useScreenshotStore();
    getEventManager();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass({
          "screenshot-helper-pixels": true,
          "hidden": unref(screenshotStore).isScreenshotting
        })
      }, _hoisted_7$1, 2);
    };
  }
});
const ScreenshotHelperPixels_vue_vue_type_style_index_0_scoped_0efcdee6_lang = "";
const ScreenshotHelperPixels = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["__scopeId", "data-v-0efcdee6"]]);
gql`
mutation Preferences_SetPreferences ($value: String!) {
  setPreferences (value: $value, type: global) {
    ...TestingPreferences
    ...SpecRunner_Preferences
  }
}`;
function usePreferences() {
  const runnerUiStore = useRunnerUiStore();
  const setPreferences = useMutation(Preferences_SetPreferencesDocument);
  function update(preference, value) {
    if (runnerUiStore[preference] !== value) {
      runnerUiStore.setPreference(preference, value);
      setPreferences.executeMutation({ value: JSON.stringify({ [preference]: value }) });
    }
  }
  return {
    update
  };
}
var entities$1 = {};
var encode$1 = {};
const amp$2 = "&";
const apos$1 = "'";
const gt$2 = ">";
const lt$2 = "<";
const quot$2 = '"';
const require$$2 = {
  amp: amp$2,
  apos: apos$1,
  gt: gt$2,
  lt: lt$2,
  quot: quot$2
};
const Aacute$1 = "Á";
const aacute$1 = "á";
const Abreve = "Ă";
const abreve = "ă";
const ac = "∾";
const acd = "∿";
const acE = "∾̳";
const Acirc$1 = "Â";
const acirc$1 = "â";
const acute$1 = "´";
const Acy = "А";
const acy = "а";
const AElig$1 = "Æ";
const aelig$1 = "æ";
const af = "⁡";
const Afr = "𝔄";
const afr = "𝔞";
const Agrave$1 = "À";
const agrave$1 = "à";
const alefsym = "ℵ";
const aleph = "ℵ";
const Alpha = "Α";
const alpha = "α";
const Amacr = "Ā";
const amacr = "ā";
const amalg = "⨿";
const amp$1 = "&";
const AMP$1 = "&";
const andand = "⩕";
const And = "⩓";
const and = "∧";
const andd = "⩜";
const andslope = "⩘";
const andv = "⩚";
const ang = "∠";
const ange = "⦤";
const angle = "∠";
const angmsdaa = "⦨";
const angmsdab = "⦩";
const angmsdac = "⦪";
const angmsdad = "⦫";
const angmsdae = "⦬";
const angmsdaf = "⦭";
const angmsdag = "⦮";
const angmsdah = "⦯";
const angmsd = "∡";
const angrt = "∟";
const angrtvb = "⊾";
const angrtvbd = "⦝";
const angsph = "∢";
const angst = "Å";
const angzarr = "⍼";
const Aogon = "Ą";
const aogon = "ą";
const Aopf = "𝔸";
const aopf = "𝕒";
const apacir = "⩯";
const ap = "≈";
const apE = "⩰";
const ape = "≊";
const apid = "≋";
const apos = "'";
const ApplyFunction = "⁡";
const approx = "≈";
const approxeq = "≊";
const Aring$1 = "Å";
const aring$1 = "å";
const Ascr = "𝒜";
const ascr = "𝒶";
const Assign = "≔";
const ast = "*";
const asymp = "≈";
const asympeq = "≍";
const Atilde$1 = "Ã";
const atilde$1 = "ã";
const Auml$1 = "Ä";
const auml$1 = "ä";
const awconint = "∳";
const awint = "⨑";
const backcong = "≌";
const backepsilon = "϶";
const backprime = "‵";
const backsim = "∽";
const backsimeq = "⋍";
const Backslash = "∖";
const Barv = "⫧";
const barvee = "⊽";
const barwed = "⌅";
const Barwed = "⌆";
const barwedge = "⌅";
const bbrk = "⎵";
const bbrktbrk = "⎶";
const bcong = "≌";
const Bcy = "Б";
const bcy = "б";
const bdquo = "„";
const becaus = "∵";
const because = "∵";
const Because = "∵";
const bemptyv = "⦰";
const bepsi = "϶";
const bernou = "ℬ";
const Bernoullis = "ℬ";
const Beta = "Β";
const beta = "β";
const beth = "ℶ";
const between = "≬";
const Bfr = "𝔅";
const bfr = "𝔟";
const bigcap = "⋂";
const bigcirc = "◯";
const bigcup = "⋃";
const bigodot = "⨀";
const bigoplus = "⨁";
const bigotimes = "⨂";
const bigsqcup = "⨆";
const bigstar = "★";
const bigtriangledown = "▽";
const bigtriangleup = "△";
const biguplus = "⨄";
const bigvee = "⋁";
const bigwedge = "⋀";
const bkarow = "⤍";
const blacklozenge = "⧫";
const blacksquare = "▪";
const blacktriangle = "▴";
const blacktriangledown = "▾";
const blacktriangleleft = "◂";
const blacktriangleright = "▸";
const blank = "␣";
const blk12 = "▒";
const blk14 = "░";
const blk34 = "▓";
const block = "█";
const bne = "=⃥";
const bnequiv = "≡⃥";
const bNot = "⫭";
const bnot = "⌐";
const Bopf = "𝔹";
const bopf = "𝕓";
const bot = "⊥";
const bottom = "⊥";
const bowtie = "⋈";
const boxbox = "⧉";
const boxdl = "┐";
const boxdL = "╕";
const boxDl = "╖";
const boxDL = "╗";
const boxdr = "┌";
const boxdR = "╒";
const boxDr = "╓";
const boxDR = "╔";
const boxh = "─";
const boxH = "═";
const boxhd = "┬";
const boxHd = "╤";
const boxhD = "╥";
const boxHD = "╦";
const boxhu = "┴";
const boxHu = "╧";
const boxhU = "╨";
const boxHU = "╩";
const boxminus = "⊟";
const boxplus = "⊞";
const boxtimes = "⊠";
const boxul = "┘";
const boxuL = "╛";
const boxUl = "╜";
const boxUL = "╝";
const boxur = "└";
const boxuR = "╘";
const boxUr = "╙";
const boxUR = "╚";
const boxv = "│";
const boxV = "║";
const boxvh = "┼";
const boxvH = "╪";
const boxVh = "╫";
const boxVH = "╬";
const boxvl = "┤";
const boxvL = "╡";
const boxVl = "╢";
const boxVL = "╣";
const boxvr = "├";
const boxvR = "╞";
const boxVr = "╟";
const boxVR = "╠";
const bprime = "‵";
const breve = "˘";
const Breve = "˘";
const brvbar$1 = "¦";
const bscr = "𝒷";
const Bscr = "ℬ";
const bsemi = "⁏";
const bsim = "∽";
const bsime = "⋍";
const bsolb = "⧅";
const bsol = "\\";
const bsolhsub = "⟈";
const bull = "•";
const bullet = "•";
const bump = "≎";
const bumpE = "⪮";
const bumpe = "≏";
const Bumpeq = "≎";
const bumpeq = "≏";
const Cacute = "Ć";
const cacute = "ć";
const capand = "⩄";
const capbrcup = "⩉";
const capcap = "⩋";
const cap = "∩";
const Cap = "⋒";
const capcup = "⩇";
const capdot = "⩀";
const CapitalDifferentialD = "ⅅ";
const caps = "∩︀";
const caret = "⁁";
const caron = "ˇ";
const Cayleys = "ℭ";
const ccaps = "⩍";
const Ccaron = "Č";
const ccaron = "č";
const Ccedil$1 = "Ç";
const ccedil$1 = "ç";
const Ccirc = "Ĉ";
const ccirc = "ĉ";
const Cconint = "∰";
const ccups = "⩌";
const ccupssm = "⩐";
const Cdot = "Ċ";
const cdot = "ċ";
const cedil$1 = "¸";
const Cedilla = "¸";
const cemptyv = "⦲";
const cent$1 = "¢";
const centerdot = "·";
const CenterDot = "·";
const cfr = "𝔠";
const Cfr = "ℭ";
const CHcy = "Ч";
const chcy = "ч";
const check = "✓";
const checkmark = "✓";
const Chi = "Χ";
const chi = "χ";
const circ = "ˆ";
const circeq = "≗";
const circlearrowleft = "↺";
const circlearrowright = "↻";
const circledast = "⊛";
const circledcirc = "⊚";
const circleddash = "⊝";
const CircleDot = "⊙";
const circledR = "®";
const circledS = "Ⓢ";
const CircleMinus = "⊖";
const CirclePlus = "⊕";
const CircleTimes = "⊗";
const cir = "○";
const cirE = "⧃";
const cire = "≗";
const cirfnint = "⨐";
const cirmid = "⫯";
const cirscir = "⧂";
const ClockwiseContourIntegral = "∲";
const CloseCurlyDoubleQuote = "”";
const CloseCurlyQuote = "’";
const clubs = "♣";
const clubsuit = "♣";
const colon = ":";
const Colon = "∷";
const Colone = "⩴";
const colone = "≔";
const coloneq = "≔";
const comma = ",";
const commat = "@";
const comp = "∁";
const compfn = "∘";
const complement = "∁";
const complexes = "ℂ";
const cong = "≅";
const congdot = "⩭";
const Congruent = "≡";
const conint = "∮";
const Conint = "∯";
const ContourIntegral = "∮";
const copf = "𝕔";
const Copf = "ℂ";
const coprod = "∐";
const Coproduct = "∐";
const copy$1 = "©";
const COPY$1 = "©";
const copysr = "℗";
const CounterClockwiseContourIntegral = "∳";
const crarr = "↵";
const cross = "✗";
const Cross = "⨯";
const Cscr = "𝒞";
const cscr = "𝒸";
const csub = "⫏";
const csube = "⫑";
const csup = "⫐";
const csupe = "⫒";
const ctdot = "⋯";
const cudarrl = "⤸";
const cudarrr = "⤵";
const cuepr = "⋞";
const cuesc = "⋟";
const cularr = "↶";
const cularrp = "⤽";
const cupbrcap = "⩈";
const cupcap = "⩆";
const CupCap = "≍";
const cup = "∪";
const Cup = "⋓";
const cupcup = "⩊";
const cupdot = "⊍";
const cupor = "⩅";
const cups = "∪︀";
const curarr = "↷";
const curarrm = "⤼";
const curlyeqprec = "⋞";
const curlyeqsucc = "⋟";
const curlyvee = "⋎";
const curlywedge = "⋏";
const curren$1 = "¤";
const curvearrowleft = "↶";
const curvearrowright = "↷";
const cuvee = "⋎";
const cuwed = "⋏";
const cwconint = "∲";
const cwint = "∱";
const cylcty = "⌭";
const dagger = "†";
const Dagger = "‡";
const daleth = "ℸ";
const darr = "↓";
const Darr = "↡";
const dArr = "⇓";
const dash = "‐";
const Dashv = "⫤";
const dashv = "⊣";
const dbkarow = "⤏";
const dblac = "˝";
const Dcaron = "Ď";
const dcaron = "ď";
const Dcy = "Д";
const dcy = "д";
const ddagger = "‡";
const ddarr = "⇊";
const DD = "ⅅ";
const dd = "ⅆ";
const DDotrahd = "⤑";
const ddotseq = "⩷";
const deg$1 = "°";
const Del = "∇";
const Delta = "Δ";
const delta = "δ";
const demptyv = "⦱";
const dfisht = "⥿";
const Dfr = "𝔇";
const dfr = "𝔡";
const dHar = "⥥";
const dharl = "⇃";
const dharr = "⇂";
const DiacriticalAcute = "´";
const DiacriticalDot = "˙";
const DiacriticalDoubleAcute = "˝";
const DiacriticalGrave = "`";
const DiacriticalTilde = "˜";
const diam = "⋄";
const diamond = "⋄";
const Diamond = "⋄";
const diamondsuit = "♦";
const diams = "♦";
const die = "¨";
const DifferentialD = "ⅆ";
const digamma = "ϝ";
const disin = "⋲";
const div = "÷";
const divide$1 = "÷";
const divideontimes = "⋇";
const divonx = "⋇";
const DJcy = "Ђ";
const djcy = "ђ";
const dlcorn = "⌞";
const dlcrop = "⌍";
const dollar = "$";
const Dopf = "𝔻";
const dopf = "𝕕";
const Dot = "¨";
const dot = "˙";
const DotDot = "⃜";
const doteq = "≐";
const doteqdot = "≑";
const DotEqual = "≐";
const dotminus = "∸";
const dotplus = "∔";
const dotsquare = "⊡";
const doublebarwedge = "⌆";
const DoubleContourIntegral = "∯";
const DoubleDot = "¨";
const DoubleDownArrow = "⇓";
const DoubleLeftArrow = "⇐";
const DoubleLeftRightArrow = "⇔";
const DoubleLeftTee = "⫤";
const DoubleLongLeftArrow = "⟸";
const DoubleLongLeftRightArrow = "⟺";
const DoubleLongRightArrow = "⟹";
const DoubleRightArrow = "⇒";
const DoubleRightTee = "⊨";
const DoubleUpArrow = "⇑";
const DoubleUpDownArrow = "⇕";
const DoubleVerticalBar = "∥";
const DownArrowBar = "⤓";
const downarrow = "↓";
const DownArrow = "↓";
const Downarrow = "⇓";
const DownArrowUpArrow = "⇵";
const DownBreve = "̑";
const downdownarrows = "⇊";
const downharpoonleft = "⇃";
const downharpoonright = "⇂";
const DownLeftRightVector = "⥐";
const DownLeftTeeVector = "⥞";
const DownLeftVectorBar = "⥖";
const DownLeftVector = "↽";
const DownRightTeeVector = "⥟";
const DownRightVectorBar = "⥗";
const DownRightVector = "⇁";
const DownTeeArrow = "↧";
const DownTee = "⊤";
const drbkarow = "⤐";
const drcorn = "⌟";
const drcrop = "⌌";
const Dscr = "𝒟";
const dscr = "𝒹";
const DScy = "Ѕ";
const dscy = "ѕ";
const dsol = "⧶";
const Dstrok = "Đ";
const dstrok = "đ";
const dtdot = "⋱";
const dtri = "▿";
const dtrif = "▾";
const duarr = "⇵";
const duhar = "⥯";
const dwangle = "⦦";
const DZcy = "Џ";
const dzcy = "џ";
const dzigrarr = "⟿";
const Eacute$1 = "É";
const eacute$1 = "é";
const easter = "⩮";
const Ecaron = "Ě";
const ecaron = "ě";
const Ecirc$1 = "Ê";
const ecirc$1 = "ê";
const ecir = "≖";
const ecolon = "≕";
const Ecy = "Э";
const ecy = "э";
const eDDot = "⩷";
const Edot = "Ė";
const edot = "ė";
const eDot = "≑";
const ee = "ⅇ";
const efDot = "≒";
const Efr = "𝔈";
const efr = "𝔢";
const eg = "⪚";
const Egrave$1 = "È";
const egrave$1 = "è";
const egs = "⪖";
const egsdot = "⪘";
const el = "⪙";
const Element = "∈";
const elinters = "⏧";
const ell = "ℓ";
const els = "⪕";
const elsdot = "⪗";
const Emacr = "Ē";
const emacr = "ē";
const empty = "∅";
const emptyset = "∅";
const EmptySmallSquare = "◻";
const emptyv = "∅";
const EmptyVerySmallSquare = "▫";
const emsp13 = " ";
const emsp14 = " ";
const emsp = " ";
const ENG = "Ŋ";
const eng = "ŋ";
const ensp = " ";
const Eogon = "Ę";
const eogon = "ę";
const Eopf = "𝔼";
const eopf = "𝕖";
const epar = "⋕";
const eparsl = "⧣";
const eplus = "⩱";
const epsi = "ε";
const Epsilon = "Ε";
const epsilon = "ε";
const epsiv = "ϵ";
const eqcirc = "≖";
const eqcolon = "≕";
const eqsim = "≂";
const eqslantgtr = "⪖";
const eqslantless = "⪕";
const Equal = "⩵";
const equals = "=";
const EqualTilde = "≂";
const equest = "≟";
const Equilibrium = "⇌";
const equiv = "≡";
const equivDD = "⩸";
const eqvparsl = "⧥";
const erarr = "⥱";
const erDot = "≓";
const escr = "ℯ";
const Escr = "ℰ";
const esdot = "≐";
const Esim = "⩳";
const esim = "≂";
const Eta = "Η";
const eta = "η";
const ETH$1 = "Ð";
const eth$1 = "ð";
const Euml$1 = "Ë";
const euml$1 = "ë";
const euro = "€";
const excl = "!";
const exist = "∃";
const Exists = "∃";
const expectation = "ℰ";
const exponentiale = "ⅇ";
const ExponentialE = "ⅇ";
const fallingdotseq = "≒";
const Fcy = "Ф";
const fcy = "ф";
const female = "♀";
const ffilig = "ﬃ";
const fflig = "ﬀ";
const ffllig = "ﬄ";
const Ffr = "𝔉";
const ffr = "𝔣";
const filig = "ﬁ";
const FilledSmallSquare = "◼";
const FilledVerySmallSquare = "▪";
const fjlig = "fj";
const flat = "♭";
const fllig = "ﬂ";
const fltns = "▱";
const fnof = "ƒ";
const Fopf = "𝔽";
const fopf = "𝕗";
const forall = "∀";
const ForAll = "∀";
const fork = "⋔";
const forkv = "⫙";
const Fouriertrf = "ℱ";
const fpartint = "⨍";
const frac12$1 = "½";
const frac13 = "⅓";
const frac14$1 = "¼";
const frac15 = "⅕";
const frac16 = "⅙";
const frac18 = "⅛";
const frac23 = "⅔";
const frac25 = "⅖";
const frac34$1 = "¾";
const frac35 = "⅗";
const frac38 = "⅜";
const frac45 = "⅘";
const frac56 = "⅚";
const frac58 = "⅝";
const frac78 = "⅞";
const frasl = "⁄";
const frown = "⌢";
const fscr = "𝒻";
const Fscr = "ℱ";
const gacute = "ǵ";
const Gamma = "Γ";
const gamma = "γ";
const Gammad = "Ϝ";
const gammad = "ϝ";
const gap = "⪆";
const Gbreve = "Ğ";
const gbreve = "ğ";
const Gcedil = "Ģ";
const Gcirc = "Ĝ";
const gcirc = "ĝ";
const Gcy = "Г";
const gcy = "г";
const Gdot = "Ġ";
const gdot = "ġ";
const ge = "≥";
const gE = "≧";
const gEl = "⪌";
const gel = "⋛";
const geq = "≥";
const geqq = "≧";
const geqslant = "⩾";
const gescc = "⪩";
const ges = "⩾";
const gesdot = "⪀";
const gesdoto = "⪂";
const gesdotol = "⪄";
const gesl = "⋛︀";
const gesles = "⪔";
const Gfr = "𝔊";
const gfr = "𝔤";
const gg = "≫";
const Gg = "⋙";
const ggg = "⋙";
const gimel = "ℷ";
const GJcy = "Ѓ";
const gjcy = "ѓ";
const gla = "⪥";
const gl = "≷";
const glE = "⪒";
const glj = "⪤";
const gnap = "⪊";
const gnapprox = "⪊";
const gne = "⪈";
const gnE = "≩";
const gneq = "⪈";
const gneqq = "≩";
const gnsim = "⋧";
const Gopf = "𝔾";
const gopf = "𝕘";
const grave = "`";
const GreaterEqual = "≥";
const GreaterEqualLess = "⋛";
const GreaterFullEqual = "≧";
const GreaterGreater = "⪢";
const GreaterLess = "≷";
const GreaterSlantEqual = "⩾";
const GreaterTilde = "≳";
const Gscr = "𝒢";
const gscr = "ℊ";
const gsim = "≳";
const gsime = "⪎";
const gsiml = "⪐";
const gtcc = "⪧";
const gtcir = "⩺";
const gt$1 = ">";
const GT$1 = ">";
const Gt = "≫";
const gtdot = "⋗";
const gtlPar = "⦕";
const gtquest = "⩼";
const gtrapprox = "⪆";
const gtrarr = "⥸";
const gtrdot = "⋗";
const gtreqless = "⋛";
const gtreqqless = "⪌";
const gtrless = "≷";
const gtrsim = "≳";
const gvertneqq = "≩︀";
const gvnE = "≩︀";
const Hacek = "ˇ";
const hairsp = " ";
const half = "½";
const hamilt = "ℋ";
const HARDcy = "Ъ";
const hardcy = "ъ";
const harrcir = "⥈";
const harr = "↔";
const hArr = "⇔";
const harrw = "↭";
const Hat = "^";
const hbar = "ℏ";
const Hcirc = "Ĥ";
const hcirc = "ĥ";
const hearts = "♥";
const heartsuit = "♥";
const hellip = "…";
const hercon = "⊹";
const hfr = "𝔥";
const Hfr = "ℌ";
const HilbertSpace = "ℋ";
const hksearow = "⤥";
const hkswarow = "⤦";
const hoarr = "⇿";
const homtht = "∻";
const hookleftarrow = "↩";
const hookrightarrow = "↪";
const hopf = "𝕙";
const Hopf = "ℍ";
const horbar = "―";
const HorizontalLine = "─";
const hscr = "𝒽";
const Hscr = "ℋ";
const hslash = "ℏ";
const Hstrok = "Ħ";
const hstrok = "ħ";
const HumpDownHump = "≎";
const HumpEqual = "≏";
const hybull = "⁃";
const hyphen = "‐";
const Iacute$1 = "Í";
const iacute$1 = "í";
const ic = "⁣";
const Icirc$1 = "Î";
const icirc$1 = "î";
const Icy = "И";
const icy = "и";
const Idot = "İ";
const IEcy = "Е";
const iecy = "е";
const iexcl$1 = "¡";
const iff = "⇔";
const ifr = "𝔦";
const Ifr = "ℑ";
const Igrave$1 = "Ì";
const igrave$1 = "ì";
const ii = "ⅈ";
const iiiint = "⨌";
const iiint = "∭";
const iinfin = "⧜";
const iiota = "℩";
const IJlig = "Ĳ";
const ijlig = "ĳ";
const Imacr = "Ī";
const imacr = "ī";
const image = "ℑ";
const ImaginaryI = "ⅈ";
const imagline = "ℐ";
const imagpart = "ℑ";
const imath = "ı";
const Im = "ℑ";
const imof = "⊷";
const imped = "Ƶ";
const Implies = "⇒";
const incare = "℅";
const infin = "∞";
const infintie = "⧝";
const inodot = "ı";
const intcal = "⊺";
const int = "∫";
const Int = "∬";
const integers = "ℤ";
const Integral = "∫";
const intercal = "⊺";
const Intersection = "⋂";
const intlarhk = "⨗";
const intprod = "⨼";
const InvisibleComma = "⁣";
const InvisibleTimes = "⁢";
const IOcy = "Ё";
const iocy = "ё";
const Iogon = "Į";
const iogon = "į";
const Iopf = "𝕀";
const iopf = "𝕚";
const Iota = "Ι";
const iota = "ι";
const iprod = "⨼";
const iquest$1 = "¿";
const iscr = "𝒾";
const Iscr = "ℐ";
const isin = "∈";
const isindot = "⋵";
const isinE = "⋹";
const isins = "⋴";
const isinsv = "⋳";
const isinv = "∈";
const it = "⁢";
const Itilde = "Ĩ";
const itilde = "ĩ";
const Iukcy = "І";
const iukcy = "і";
const Iuml$1 = "Ï";
const iuml$1 = "ï";
const Jcirc = "Ĵ";
const jcirc = "ĵ";
const Jcy = "Й";
const jcy = "й";
const Jfr = "𝔍";
const jfr = "𝔧";
const jmath = "ȷ";
const Jopf = "𝕁";
const jopf = "𝕛";
const Jscr = "𝒥";
const jscr = "𝒿";
const Jsercy = "Ј";
const jsercy = "ј";
const Jukcy = "Є";
const jukcy = "є";
const Kappa = "Κ";
const kappa = "κ";
const kappav = "ϰ";
const Kcedil = "Ķ";
const kcedil = "ķ";
const Kcy = "К";
const kcy = "к";
const Kfr = "𝔎";
const kfr = "𝔨";
const kgreen = "ĸ";
const KHcy = "Х";
const khcy = "х";
const KJcy = "Ќ";
const kjcy = "ќ";
const Kopf = "𝕂";
const kopf = "𝕜";
const Kscr = "𝒦";
const kscr = "𝓀";
const lAarr = "⇚";
const Lacute = "Ĺ";
const lacute = "ĺ";
const laemptyv = "⦴";
const lagran = "ℒ";
const Lambda = "Λ";
const lambda = "λ";
const lang = "⟨";
const Lang = "⟪";
const langd = "⦑";
const langle = "⟨";
const lap = "⪅";
const Laplacetrf = "ℒ";
const laquo$1 = "«";
const larrb = "⇤";
const larrbfs = "⤟";
const larr = "←";
const Larr = "↞";
const lArr = "⇐";
const larrfs = "⤝";
const larrhk = "↩";
const larrlp = "↫";
const larrpl = "⤹";
const larrsim = "⥳";
const larrtl = "↢";
const latail = "⤙";
const lAtail = "⤛";
const lat = "⪫";
const late = "⪭";
const lates = "⪭︀";
const lbarr = "⤌";
const lBarr = "⤎";
const lbbrk = "❲";
const lbrace = "{";
const lbrack = "[";
const lbrke = "⦋";
const lbrksld = "⦏";
const lbrkslu = "⦍";
const Lcaron = "Ľ";
const lcaron = "ľ";
const Lcedil = "Ļ";
const lcedil = "ļ";
const lceil = "⌈";
const lcub = "{";
const Lcy = "Л";
const lcy = "л";
const ldca = "⤶";
const ldquo = "“";
const ldquor = "„";
const ldrdhar = "⥧";
const ldrushar = "⥋";
const ldsh = "↲";
const le = "≤";
const lE = "≦";
const LeftAngleBracket = "⟨";
const LeftArrowBar = "⇤";
const leftarrow = "←";
const LeftArrow = "←";
const Leftarrow = "⇐";
const LeftArrowRightArrow = "⇆";
const leftarrowtail = "↢";
const LeftCeiling = "⌈";
const LeftDoubleBracket = "⟦";
const LeftDownTeeVector = "⥡";
const LeftDownVectorBar = "⥙";
const LeftDownVector = "⇃";
const LeftFloor = "⌊";
const leftharpoondown = "↽";
const leftharpoonup = "↼";
const leftleftarrows = "⇇";
const leftrightarrow = "↔";
const LeftRightArrow = "↔";
const Leftrightarrow = "⇔";
const leftrightarrows = "⇆";
const leftrightharpoons = "⇋";
const leftrightsquigarrow = "↭";
const LeftRightVector = "⥎";
const LeftTeeArrow = "↤";
const LeftTee = "⊣";
const LeftTeeVector = "⥚";
const leftthreetimes = "⋋";
const LeftTriangleBar = "⧏";
const LeftTriangle = "⊲";
const LeftTriangleEqual = "⊴";
const LeftUpDownVector = "⥑";
const LeftUpTeeVector = "⥠";
const LeftUpVectorBar = "⥘";
const LeftUpVector = "↿";
const LeftVectorBar = "⥒";
const LeftVector = "↼";
const lEg = "⪋";
const leg = "⋚";
const leq = "≤";
const leqq = "≦";
const leqslant = "⩽";
const lescc = "⪨";
const les = "⩽";
const lesdot = "⩿";
const lesdoto = "⪁";
const lesdotor = "⪃";
const lesg = "⋚︀";
const lesges = "⪓";
const lessapprox = "⪅";
const lessdot = "⋖";
const lesseqgtr = "⋚";
const lesseqqgtr = "⪋";
const LessEqualGreater = "⋚";
const LessFullEqual = "≦";
const LessGreater = "≶";
const lessgtr = "≶";
const LessLess = "⪡";
const lesssim = "≲";
const LessSlantEqual = "⩽";
const LessTilde = "≲";
const lfisht = "⥼";
const lfloor = "⌊";
const Lfr = "𝔏";
const lfr = "𝔩";
const lg = "≶";
const lgE = "⪑";
const lHar = "⥢";
const lhard = "↽";
const lharu = "↼";
const lharul = "⥪";
const lhblk = "▄";
const LJcy = "Љ";
const ljcy = "љ";
const llarr = "⇇";
const ll = "≪";
const Ll = "⋘";
const llcorner = "⌞";
const Lleftarrow = "⇚";
const llhard = "⥫";
const lltri = "◺";
const Lmidot = "Ŀ";
const lmidot = "ŀ";
const lmoustache = "⎰";
const lmoust = "⎰";
const lnap = "⪉";
const lnapprox = "⪉";
const lne = "⪇";
const lnE = "≨";
const lneq = "⪇";
const lneqq = "≨";
const lnsim = "⋦";
const loang = "⟬";
const loarr = "⇽";
const lobrk = "⟦";
const longleftarrow = "⟵";
const LongLeftArrow = "⟵";
const Longleftarrow = "⟸";
const longleftrightarrow = "⟷";
const LongLeftRightArrow = "⟷";
const Longleftrightarrow = "⟺";
const longmapsto = "⟼";
const longrightarrow = "⟶";
const LongRightArrow = "⟶";
const Longrightarrow = "⟹";
const looparrowleft = "↫";
const looparrowright = "↬";
const lopar = "⦅";
const Lopf = "𝕃";
const lopf = "𝕝";
const loplus = "⨭";
const lotimes = "⨴";
const lowast = "∗";
const lowbar = "_";
const LowerLeftArrow = "↙";
const LowerRightArrow = "↘";
const loz = "◊";
const lozenge = "◊";
const lozf = "⧫";
const lpar = "(";
const lparlt = "⦓";
const lrarr = "⇆";
const lrcorner = "⌟";
const lrhar = "⇋";
const lrhard = "⥭";
const lrm = "‎";
const lrtri = "⊿";
const lsaquo = "‹";
const lscr = "𝓁";
const Lscr = "ℒ";
const lsh = "↰";
const Lsh = "↰";
const lsim = "≲";
const lsime = "⪍";
const lsimg = "⪏";
const lsqb = "[";
const lsquo = "‘";
const lsquor = "‚";
const Lstrok = "Ł";
const lstrok = "ł";
const ltcc = "⪦";
const ltcir = "⩹";
const lt$1 = "<";
const LT$1 = "<";
const Lt = "≪";
const ltdot = "⋖";
const lthree = "⋋";
const ltimes = "⋉";
const ltlarr = "⥶";
const ltquest = "⩻";
const ltri = "◃";
const ltrie = "⊴";
const ltrif = "◂";
const ltrPar = "⦖";
const lurdshar = "⥊";
const luruhar = "⥦";
const lvertneqq = "≨︀";
const lvnE = "≨︀";
const macr$1 = "¯";
const male = "♂";
const malt = "✠";
const maltese = "✠";
const map = "↦";
const mapsto = "↦";
const mapstodown = "↧";
const mapstoleft = "↤";
const mapstoup = "↥";
const marker = "▮";
const mcomma = "⨩";
const Mcy = "М";
const mcy = "м";
const mdash = "—";
const mDDot = "∺";
const measuredangle = "∡";
const MediumSpace = " ";
const Mellintrf = "ℳ";
const Mfr = "𝔐";
const mfr = "𝔪";
const mho = "℧";
const micro$1 = "µ";
const midast = "*";
const midcir = "⫰";
const mid = "∣";
const middot$1 = "·";
const minusb = "⊟";
const minus = "−";
const minusd = "∸";
const minusdu = "⨪";
const MinusPlus = "∓";
const mlcp = "⫛";
const mldr = "…";
const mnplus = "∓";
const models = "⊧";
const Mopf = "𝕄";
const mopf = "𝕞";
const mp = "∓";
const mscr = "𝓂";
const Mscr = "ℳ";
const mstpos = "∾";
const Mu = "Μ";
const mu = "μ";
const multimap = "⊸";
const mumap = "⊸";
const nabla = "∇";
const Nacute = "Ń";
const nacute = "ń";
const nang = "∠⃒";
const nap = "≉";
const napE = "⩰̸";
const napid = "≋̸";
const napos = "ŉ";
const napprox = "≉";
const natural = "♮";
const naturals = "ℕ";
const natur = "♮";
const nbsp$1 = " ";
const nbump = "≎̸";
const nbumpe = "≏̸";
const ncap = "⩃";
const Ncaron = "Ň";
const ncaron = "ň";
const Ncedil = "Ņ";
const ncedil = "ņ";
const ncong = "≇";
const ncongdot = "⩭̸";
const ncup = "⩂";
const Ncy = "Н";
const ncy = "н";
const ndash = "–";
const nearhk = "⤤";
const nearr = "↗";
const neArr = "⇗";
const nearrow = "↗";
const ne = "≠";
const nedot = "≐̸";
const NegativeMediumSpace = "​";
const NegativeThickSpace = "​";
const NegativeThinSpace = "​";
const NegativeVeryThinSpace = "​";
const nequiv = "≢";
const nesear = "⤨";
const nesim = "≂̸";
const NestedGreaterGreater = "≫";
const NestedLessLess = "≪";
const NewLine = "\n";
const nexist = "∄";
const nexists = "∄";
const Nfr = "𝔑";
const nfr = "𝔫";
const ngE = "≧̸";
const nge = "≱";
const ngeq = "≱";
const ngeqq = "≧̸";
const ngeqslant = "⩾̸";
const nges = "⩾̸";
const nGg = "⋙̸";
const ngsim = "≵";
const nGt = "≫⃒";
const ngt = "≯";
const ngtr = "≯";
const nGtv = "≫̸";
const nharr = "↮";
const nhArr = "⇎";
const nhpar = "⫲";
const ni = "∋";
const nis = "⋼";
const nisd = "⋺";
const niv = "∋";
const NJcy = "Њ";
const njcy = "њ";
const nlarr = "↚";
const nlArr = "⇍";
const nldr = "‥";
const nlE = "≦̸";
const nle = "≰";
const nleftarrow = "↚";
const nLeftarrow = "⇍";
const nleftrightarrow = "↮";
const nLeftrightarrow = "⇎";
const nleq = "≰";
const nleqq = "≦̸";
const nleqslant = "⩽̸";
const nles = "⩽̸";
const nless = "≮";
const nLl = "⋘̸";
const nlsim = "≴";
const nLt = "≪⃒";
const nlt = "≮";
const nltri = "⋪";
const nltrie = "⋬";
const nLtv = "≪̸";
const nmid = "∤";
const NoBreak = "⁠";
const NonBreakingSpace = " ";
const nopf = "𝕟";
const Nopf = "ℕ";
const Not = "⫬";
const not$1 = "¬";
const NotCongruent = "≢";
const NotCupCap = "≭";
const NotDoubleVerticalBar = "∦";
const NotElement = "∉";
const NotEqual = "≠";
const NotEqualTilde = "≂̸";
const NotExists = "∄";
const NotGreater = "≯";
const NotGreaterEqual = "≱";
const NotGreaterFullEqual = "≧̸";
const NotGreaterGreater = "≫̸";
const NotGreaterLess = "≹";
const NotGreaterSlantEqual = "⩾̸";
const NotGreaterTilde = "≵";
const NotHumpDownHump = "≎̸";
const NotHumpEqual = "≏̸";
const notin = "∉";
const notindot = "⋵̸";
const notinE = "⋹̸";
const notinva = "∉";
const notinvb = "⋷";
const notinvc = "⋶";
const NotLeftTriangleBar = "⧏̸";
const NotLeftTriangle = "⋪";
const NotLeftTriangleEqual = "⋬";
const NotLess = "≮";
const NotLessEqual = "≰";
const NotLessGreater = "≸";
const NotLessLess = "≪̸";
const NotLessSlantEqual = "⩽̸";
const NotLessTilde = "≴";
const NotNestedGreaterGreater = "⪢̸";
const NotNestedLessLess = "⪡̸";
const notni = "∌";
const notniva = "∌";
const notnivb = "⋾";
const notnivc = "⋽";
const NotPrecedes = "⊀";
const NotPrecedesEqual = "⪯̸";
const NotPrecedesSlantEqual = "⋠";
const NotReverseElement = "∌";
const NotRightTriangleBar = "⧐̸";
const NotRightTriangle = "⋫";
const NotRightTriangleEqual = "⋭";
const NotSquareSubset = "⊏̸";
const NotSquareSubsetEqual = "⋢";
const NotSquareSuperset = "⊐̸";
const NotSquareSupersetEqual = "⋣";
const NotSubset = "⊂⃒";
const NotSubsetEqual = "⊈";
const NotSucceeds = "⊁";
const NotSucceedsEqual = "⪰̸";
const NotSucceedsSlantEqual = "⋡";
const NotSucceedsTilde = "≿̸";
const NotSuperset = "⊃⃒";
const NotSupersetEqual = "⊉";
const NotTilde = "≁";
const NotTildeEqual = "≄";
const NotTildeFullEqual = "≇";
const NotTildeTilde = "≉";
const NotVerticalBar = "∤";
const nparallel = "∦";
const npar = "∦";
const nparsl = "⫽⃥";
const npart = "∂̸";
const npolint = "⨔";
const npr = "⊀";
const nprcue = "⋠";
const nprec = "⊀";
const npreceq = "⪯̸";
const npre = "⪯̸";
const nrarrc = "⤳̸";
const nrarr = "↛";
const nrArr = "⇏";
const nrarrw = "↝̸";
const nrightarrow = "↛";
const nRightarrow = "⇏";
const nrtri = "⋫";
const nrtrie = "⋭";
const nsc = "⊁";
const nsccue = "⋡";
const nsce = "⪰̸";
const Nscr = "𝒩";
const nscr = "𝓃";
const nshortmid = "∤";
const nshortparallel = "∦";
const nsim = "≁";
const nsime = "≄";
const nsimeq = "≄";
const nsmid = "∤";
const nspar = "∦";
const nsqsube = "⋢";
const nsqsupe = "⋣";
const nsub = "⊄";
const nsubE = "⫅̸";
const nsube = "⊈";
const nsubset = "⊂⃒";
const nsubseteq = "⊈";
const nsubseteqq = "⫅̸";
const nsucc = "⊁";
const nsucceq = "⪰̸";
const nsup = "⊅";
const nsupE = "⫆̸";
const nsupe = "⊉";
const nsupset = "⊃⃒";
const nsupseteq = "⊉";
const nsupseteqq = "⫆̸";
const ntgl = "≹";
const Ntilde$1 = "Ñ";
const ntilde$1 = "ñ";
const ntlg = "≸";
const ntriangleleft = "⋪";
const ntrianglelefteq = "⋬";
const ntriangleright = "⋫";
const ntrianglerighteq = "⋭";
const Nu = "Ν";
const nu = "ν";
const num = "#";
const numero = "№";
const numsp = " ";
const nvap = "≍⃒";
const nvdash = "⊬";
const nvDash = "⊭";
const nVdash = "⊮";
const nVDash = "⊯";
const nvge = "≥⃒";
const nvgt = ">⃒";
const nvHarr = "⤄";
const nvinfin = "⧞";
const nvlArr = "⤂";
const nvle = "≤⃒";
const nvlt = "<⃒";
const nvltrie = "⊴⃒";
const nvrArr = "⤃";
const nvrtrie = "⊵⃒";
const nvsim = "∼⃒";
const nwarhk = "⤣";
const nwarr = "↖";
const nwArr = "⇖";
const nwarrow = "↖";
const nwnear = "⤧";
const Oacute$1 = "Ó";
const oacute$1 = "ó";
const oast = "⊛";
const Ocirc$1 = "Ô";
const ocirc$1 = "ô";
const ocir = "⊚";
const Ocy = "О";
const ocy = "о";
const odash = "⊝";
const Odblac = "Ő";
const odblac = "ő";
const odiv = "⨸";
const odot = "⊙";
const odsold = "⦼";
const OElig = "Œ";
const oelig = "œ";
const ofcir = "⦿";
const Ofr = "𝔒";
const ofr = "𝔬";
const ogon = "˛";
const Ograve$1 = "Ò";
const ograve$1 = "ò";
const ogt = "⧁";
const ohbar = "⦵";
const ohm = "Ω";
const oint = "∮";
const olarr = "↺";
const olcir = "⦾";
const olcross = "⦻";
const oline = "‾";
const olt = "⧀";
const Omacr = "Ō";
const omacr = "ō";
const Omega = "Ω";
const omega = "ω";
const Omicron = "Ο";
const omicron = "ο";
const omid = "⦶";
const ominus = "⊖";
const Oopf = "𝕆";
const oopf = "𝕠";
const opar = "⦷";
const OpenCurlyDoubleQuote = "“";
const OpenCurlyQuote = "‘";
const operp = "⦹";
const oplus = "⊕";
const orarr = "↻";
const Or = "⩔";
const or = "∨";
const ord = "⩝";
const order = "ℴ";
const orderof = "ℴ";
const ordf$1 = "ª";
const ordm$1 = "º";
const origof = "⊶";
const oror = "⩖";
const orslope = "⩗";
const orv = "⩛";
const oS = "Ⓢ";
const Oscr = "𝒪";
const oscr = "ℴ";
const Oslash$1 = "Ø";
const oslash$1 = "ø";
const osol = "⊘";
const Otilde$1 = "Õ";
const otilde$1 = "õ";
const otimesas = "⨶";
const Otimes = "⨷";
const otimes = "⊗";
const Ouml$1 = "Ö";
const ouml$1 = "ö";
const ovbar = "⌽";
const OverBar = "‾";
const OverBrace = "⏞";
const OverBracket = "⎴";
const OverParenthesis = "⏜";
const para$1 = "¶";
const parallel = "∥";
const par = "∥";
const parsim = "⫳";
const parsl = "⫽";
const part = "∂";
const PartialD = "∂";
const Pcy = "П";
const pcy = "п";
const percnt = "%";
const period = ".";
const permil = "‰";
const perp = "⊥";
const pertenk = "‱";
const Pfr = "𝔓";
const pfr = "𝔭";
const Phi = "Φ";
const phi = "φ";
const phiv = "ϕ";
const phmmat = "ℳ";
const phone = "☎";
const Pi = "Π";
const pi = "π";
const pitchfork = "⋔";
const piv = "ϖ";
const planck = "ℏ";
const planckh = "ℎ";
const plankv = "ℏ";
const plusacir = "⨣";
const plusb = "⊞";
const pluscir = "⨢";
const plus = "+";
const plusdo = "∔";
const plusdu = "⨥";
const pluse = "⩲";
const PlusMinus = "±";
const plusmn$1 = "±";
const plussim = "⨦";
const plustwo = "⨧";
const pm = "±";
const Poincareplane = "ℌ";
const pointint = "⨕";
const popf = "𝕡";
const Popf = "ℙ";
const pound$1 = "£";
const prap = "⪷";
const Pr = "⪻";
const pr = "≺";
const prcue = "≼";
const precapprox = "⪷";
const prec = "≺";
const preccurlyeq = "≼";
const Precedes = "≺";
const PrecedesEqual = "⪯";
const PrecedesSlantEqual = "≼";
const PrecedesTilde = "≾";
const preceq = "⪯";
const precnapprox = "⪹";
const precneqq = "⪵";
const precnsim = "⋨";
const pre = "⪯";
const prE = "⪳";
const precsim = "≾";
const prime = "′";
const Prime = "″";
const primes = "ℙ";
const prnap = "⪹";
const prnE = "⪵";
const prnsim = "⋨";
const prod = "∏";
const Product = "∏";
const profalar = "⌮";
const profline = "⌒";
const profsurf = "⌓";
const prop = "∝";
const Proportional = "∝";
const Proportion = "∷";
const propto = "∝";
const prsim = "≾";
const prurel = "⊰";
const Pscr = "𝒫";
const pscr = "𝓅";
const Psi = "Ψ";
const psi = "ψ";
const puncsp = " ";
const Qfr = "𝔔";
const qfr = "𝔮";
const qint = "⨌";
const qopf = "𝕢";
const Qopf = "ℚ";
const qprime = "⁗";
const Qscr = "𝒬";
const qscr = "𝓆";
const quaternions = "ℍ";
const quatint = "⨖";
const quest = "?";
const questeq = "≟";
const quot$1 = '"';
const QUOT$1 = '"';
const rAarr = "⇛";
const race = "∽̱";
const Racute = "Ŕ";
const racute = "ŕ";
const radic = "√";
const raemptyv = "⦳";
const rang = "⟩";
const Rang = "⟫";
const rangd = "⦒";
const range$1 = "⦥";
const rangle = "⟩";
const raquo$1 = "»";
const rarrap = "⥵";
const rarrb = "⇥";
const rarrbfs = "⤠";
const rarrc = "⤳";
const rarr = "→";
const Rarr = "↠";
const rArr = "⇒";
const rarrfs = "⤞";
const rarrhk = "↪";
const rarrlp = "↬";
const rarrpl = "⥅";
const rarrsim = "⥴";
const Rarrtl = "⤖";
const rarrtl = "↣";
const rarrw = "↝";
const ratail = "⤚";
const rAtail = "⤜";
const ratio = "∶";
const rationals = "ℚ";
const rbarr = "⤍";
const rBarr = "⤏";
const RBarr = "⤐";
const rbbrk = "❳";
const rbrace = "}";
const rbrack = "]";
const rbrke = "⦌";
const rbrksld = "⦎";
const rbrkslu = "⦐";
const Rcaron = "Ř";
const rcaron = "ř";
const Rcedil = "Ŗ";
const rcedil = "ŗ";
const rceil = "⌉";
const rcub = "}";
const Rcy = "Р";
const rcy = "р";
const rdca = "⤷";
const rdldhar = "⥩";
const rdquo = "”";
const rdquor = "”";
const rdsh = "↳";
const real = "ℜ";
const realine = "ℛ";
const realpart = "ℜ";
const reals = "ℝ";
const Re = "ℜ";
const rect = "▭";
const reg$1 = "®";
const REG$1 = "®";
const ReverseElement = "∋";
const ReverseEquilibrium = "⇋";
const ReverseUpEquilibrium = "⥯";
const rfisht = "⥽";
const rfloor = "⌋";
const rfr = "𝔯";
const Rfr = "ℜ";
const rHar = "⥤";
const rhard = "⇁";
const rharu = "⇀";
const rharul = "⥬";
const Rho = "Ρ";
const rho = "ρ";
const rhov = "ϱ";
const RightAngleBracket = "⟩";
const RightArrowBar = "⇥";
const rightarrow = "→";
const RightArrow = "→";
const Rightarrow = "⇒";
const RightArrowLeftArrow = "⇄";
const rightarrowtail = "↣";
const RightCeiling = "⌉";
const RightDoubleBracket = "⟧";
const RightDownTeeVector = "⥝";
const RightDownVectorBar = "⥕";
const RightDownVector = "⇂";
const RightFloor = "⌋";
const rightharpoondown = "⇁";
const rightharpoonup = "⇀";
const rightleftarrows = "⇄";
const rightleftharpoons = "⇌";
const rightrightarrows = "⇉";
const rightsquigarrow = "↝";
const RightTeeArrow = "↦";
const RightTee = "⊢";
const RightTeeVector = "⥛";
const rightthreetimes = "⋌";
const RightTriangleBar = "⧐";
const RightTriangle = "⊳";
const RightTriangleEqual = "⊵";
const RightUpDownVector = "⥏";
const RightUpTeeVector = "⥜";
const RightUpVectorBar = "⥔";
const RightUpVector = "↾";
const RightVectorBar = "⥓";
const RightVector = "⇀";
const ring = "˚";
const risingdotseq = "≓";
const rlarr = "⇄";
const rlhar = "⇌";
const rlm = "‏";
const rmoustache = "⎱";
const rmoust = "⎱";
const rnmid = "⫮";
const roang = "⟭";
const roarr = "⇾";
const robrk = "⟧";
const ropar = "⦆";
const ropf = "𝕣";
const Ropf = "ℝ";
const roplus = "⨮";
const rotimes = "⨵";
const RoundImplies = "⥰";
const rpar = ")";
const rpargt = "⦔";
const rppolint = "⨒";
const rrarr = "⇉";
const Rrightarrow = "⇛";
const rsaquo = "›";
const rscr = "𝓇";
const Rscr = "ℛ";
const rsh = "↱";
const Rsh = "↱";
const rsqb = "]";
const rsquo = "’";
const rsquor = "’";
const rthree = "⋌";
const rtimes = "⋊";
const rtri = "▹";
const rtrie = "⊵";
const rtrif = "▸";
const rtriltri = "⧎";
const RuleDelayed = "⧴";
const ruluhar = "⥨";
const rx = "℞";
const Sacute = "Ś";
const sacute = "ś";
const sbquo = "‚";
const scap = "⪸";
const Scaron = "Š";
const scaron = "š";
const Sc = "⪼";
const sc = "≻";
const sccue = "≽";
const sce = "⪰";
const scE = "⪴";
const Scedil = "Ş";
const scedil = "ş";
const Scirc = "Ŝ";
const scirc = "ŝ";
const scnap = "⪺";
const scnE = "⪶";
const scnsim = "⋩";
const scpolint = "⨓";
const scsim = "≿";
const Scy = "С";
const scy = "с";
const sdotb = "⊡";
const sdot = "⋅";
const sdote = "⩦";
const searhk = "⤥";
const searr = "↘";
const seArr = "⇘";
const searrow = "↘";
const sect$1 = "§";
const semi = ";";
const seswar = "⤩";
const setminus = "∖";
const setmn = "∖";
const sext = "✶";
const Sfr = "𝔖";
const sfr = "𝔰";
const sfrown = "⌢";
const sharp = "♯";
const SHCHcy = "Щ";
const shchcy = "щ";
const SHcy = "Ш";
const shcy = "ш";
const ShortDownArrow = "↓";
const ShortLeftArrow = "←";
const shortmid = "∣";
const shortparallel = "∥";
const ShortRightArrow = "→";
const ShortUpArrow = "↑";
const shy$1 = "­";
const Sigma = "Σ";
const sigma = "σ";
const sigmaf = "ς";
const sigmav = "ς";
const sim = "∼";
const simdot = "⩪";
const sime = "≃";
const simeq = "≃";
const simg = "⪞";
const simgE = "⪠";
const siml = "⪝";
const simlE = "⪟";
const simne = "≆";
const simplus = "⨤";
const simrarr = "⥲";
const slarr = "←";
const SmallCircle = "∘";
const smallsetminus = "∖";
const smashp = "⨳";
const smeparsl = "⧤";
const smid = "∣";
const smile = "⌣";
const smt = "⪪";
const smte = "⪬";
const smtes = "⪬︀";
const SOFTcy = "Ь";
const softcy = "ь";
const solbar = "⌿";
const solb = "⧄";
const sol = "/";
const Sopf = "𝕊";
const sopf = "𝕤";
const spades = "♠";
const spadesuit = "♠";
const spar = "∥";
const sqcap = "⊓";
const sqcaps = "⊓︀";
const sqcup = "⊔";
const sqcups = "⊔︀";
const Sqrt = "√";
const sqsub = "⊏";
const sqsube = "⊑";
const sqsubset = "⊏";
const sqsubseteq = "⊑";
const sqsup = "⊐";
const sqsupe = "⊒";
const sqsupset = "⊐";
const sqsupseteq = "⊒";
const square = "□";
const Square = "□";
const SquareIntersection = "⊓";
const SquareSubset = "⊏";
const SquareSubsetEqual = "⊑";
const SquareSuperset = "⊐";
const SquareSupersetEqual = "⊒";
const SquareUnion = "⊔";
const squarf = "▪";
const squ = "□";
const squf = "▪";
const srarr = "→";
const Sscr = "𝒮";
const sscr = "𝓈";
const ssetmn = "∖";
const ssmile = "⌣";
const sstarf = "⋆";
const Star = "⋆";
const star = "☆";
const starf = "★";
const straightepsilon = "ϵ";
const straightphi = "ϕ";
const strns = "¯";
const sub = "⊂";
const Sub = "⋐";
const subdot = "⪽";
const subE = "⫅";
const sube = "⊆";
const subedot = "⫃";
const submult = "⫁";
const subnE = "⫋";
const subne = "⊊";
const subplus = "⪿";
const subrarr = "⥹";
const subset = "⊂";
const Subset = "⋐";
const subseteq = "⊆";
const subseteqq = "⫅";
const SubsetEqual = "⊆";
const subsetneq = "⊊";
const subsetneqq = "⫋";
const subsim = "⫇";
const subsub = "⫕";
const subsup = "⫓";
const succapprox = "⪸";
const succ = "≻";
const succcurlyeq = "≽";
const Succeeds = "≻";
const SucceedsEqual = "⪰";
const SucceedsSlantEqual = "≽";
const SucceedsTilde = "≿";
const succeq = "⪰";
const succnapprox = "⪺";
const succneqq = "⪶";
const succnsim = "⋩";
const succsim = "≿";
const SuchThat = "∋";
const sum = "∑";
const Sum = "∑";
const sung = "♪";
const sup1$1 = "¹";
const sup2$1 = "²";
const sup3$1 = "³";
const sup = "⊃";
const Sup = "⋑";
const supdot = "⪾";
const supdsub = "⫘";
const supE = "⫆";
const supe = "⊇";
const supedot = "⫄";
const Superset = "⊃";
const SupersetEqual = "⊇";
const suphsol = "⟉";
const suphsub = "⫗";
const suplarr = "⥻";
const supmult = "⫂";
const supnE = "⫌";
const supne = "⊋";
const supplus = "⫀";
const supset = "⊃";
const Supset = "⋑";
const supseteq = "⊇";
const supseteqq = "⫆";
const supsetneq = "⊋";
const supsetneqq = "⫌";
const supsim = "⫈";
const supsub = "⫔";
const supsup = "⫖";
const swarhk = "⤦";
const swarr = "↙";
const swArr = "⇙";
const swarrow = "↙";
const swnwar = "⤪";
const szlig$1 = "ß";
const Tab = "	";
const target = "⌖";
const Tau = "Τ";
const tau = "τ";
const tbrk = "⎴";
const Tcaron = "Ť";
const tcaron = "ť";
const Tcedil = "Ţ";
const tcedil = "ţ";
const Tcy = "Т";
const tcy = "т";
const tdot = "⃛";
const telrec = "⌕";
const Tfr = "𝔗";
const tfr = "𝔱";
const there4 = "∴";
const therefore = "∴";
const Therefore = "∴";
const Theta = "Θ";
const theta = "θ";
const thetasym = "ϑ";
const thetav = "ϑ";
const thickapprox = "≈";
const thicksim = "∼";
const ThickSpace = "  ";
const ThinSpace = " ";
const thinsp = " ";
const thkap = "≈";
const thksim = "∼";
const THORN$1 = "Þ";
const thorn$1 = "þ";
const tilde = "˜";
const Tilde = "∼";
const TildeEqual = "≃";
const TildeFullEqual = "≅";
const TildeTilde = "≈";
const timesbar = "⨱";
const timesb = "⊠";
const times$1 = "×";
const timesd = "⨰";
const tint = "∭";
const toea = "⤨";
const topbot = "⌶";
const topcir = "⫱";
const top = "⊤";
const Topf = "𝕋";
const topf = "𝕥";
const topfork = "⫚";
const tosa = "⤩";
const tprime = "‴";
const trade = "™";
const TRADE = "™";
const triangle = "▵";
const triangledown = "▿";
const triangleleft = "◃";
const trianglelefteq = "⊴";
const triangleq = "≜";
const triangleright = "▹";
const trianglerighteq = "⊵";
const tridot = "◬";
const trie = "≜";
const triminus = "⨺";
const TripleDot = "⃛";
const triplus = "⨹";
const trisb = "⧍";
const tritime = "⨻";
const trpezium = "⏢";
const Tscr = "𝒯";
const tscr = "𝓉";
const TScy = "Ц";
const tscy = "ц";
const TSHcy = "Ћ";
const tshcy = "ћ";
const Tstrok = "Ŧ";
const tstrok = "ŧ";
const twixt = "≬";
const twoheadleftarrow = "↞";
const twoheadrightarrow = "↠";
const Uacute$1 = "Ú";
const uacute$1 = "ú";
const uarr = "↑";
const Uarr = "↟";
const uArr = "⇑";
const Uarrocir = "⥉";
const Ubrcy = "Ў";
const ubrcy = "ў";
const Ubreve = "Ŭ";
const ubreve = "ŭ";
const Ucirc$1 = "Û";
const ucirc$1 = "û";
const Ucy = "У";
const ucy = "у";
const udarr = "⇅";
const Udblac = "Ű";
const udblac = "ű";
const udhar = "⥮";
const ufisht = "⥾";
const Ufr = "𝔘";
const ufr = "𝔲";
const Ugrave$1 = "Ù";
const ugrave$1 = "ù";
const uHar = "⥣";
const uharl = "↿";
const uharr = "↾";
const uhblk = "▀";
const ulcorn = "⌜";
const ulcorner = "⌜";
const ulcrop = "⌏";
const ultri = "◸";
const Umacr = "Ū";
const umacr = "ū";
const uml$1 = "¨";
const UnderBar = "_";
const UnderBrace = "⏟";
const UnderBracket = "⎵";
const UnderParenthesis = "⏝";
const Union = "⋃";
const UnionPlus = "⊎";
const Uogon = "Ų";
const uogon = "ų";
const Uopf = "𝕌";
const uopf = "𝕦";
const UpArrowBar = "⤒";
const uparrow = "↑";
const UpArrow = "↑";
const Uparrow = "⇑";
const UpArrowDownArrow = "⇅";
const updownarrow = "↕";
const UpDownArrow = "↕";
const Updownarrow = "⇕";
const UpEquilibrium = "⥮";
const upharpoonleft = "↿";
const upharpoonright = "↾";
const uplus = "⊎";
const UpperLeftArrow = "↖";
const UpperRightArrow = "↗";
const upsi = "υ";
const Upsi = "ϒ";
const upsih = "ϒ";
const Upsilon = "Υ";
const upsilon = "υ";
const UpTeeArrow = "↥";
const UpTee = "⊥";
const upuparrows = "⇈";
const urcorn = "⌝";
const urcorner = "⌝";
const urcrop = "⌎";
const Uring = "Ů";
const uring = "ů";
const urtri = "◹";
const Uscr = "𝒰";
const uscr = "𝓊";
const utdot = "⋰";
const Utilde = "Ũ";
const utilde = "ũ";
const utri = "▵";
const utrif = "▴";
const uuarr = "⇈";
const Uuml$1 = "Ü";
const uuml$1 = "ü";
const uwangle = "⦧";
const vangrt = "⦜";
const varepsilon = "ϵ";
const varkappa = "ϰ";
const varnothing = "∅";
const varphi = "ϕ";
const varpi = "ϖ";
const varpropto = "∝";
const varr = "↕";
const vArr = "⇕";
const varrho = "ϱ";
const varsigma = "ς";
const varsubsetneq = "⊊︀";
const varsubsetneqq = "⫋︀";
const varsupsetneq = "⊋︀";
const varsupsetneqq = "⫌︀";
const vartheta = "ϑ";
const vartriangleleft = "⊲";
const vartriangleright = "⊳";
const vBar = "⫨";
const Vbar = "⫫";
const vBarv = "⫩";
const Vcy = "В";
const vcy = "в";
const vdash = "⊢";
const vDash = "⊨";
const Vdash = "⊩";
const VDash = "⊫";
const Vdashl = "⫦";
const veebar = "⊻";
const vee = "∨";
const Vee = "⋁";
const veeeq = "≚";
const vellip = "⋮";
const verbar = "|";
const Verbar = "‖";
const vert = "|";
const Vert = "‖";
const VerticalBar = "∣";
const VerticalLine = "|";
const VerticalSeparator = "❘";
const VerticalTilde = "≀";
const VeryThinSpace = " ";
const Vfr = "𝔙";
const vfr = "𝔳";
const vltri = "⊲";
const vnsub = "⊂⃒";
const vnsup = "⊃⃒";
const Vopf = "𝕍";
const vopf = "𝕧";
const vprop = "∝";
const vrtri = "⊳";
const Vscr = "𝒱";
const vscr = "𝓋";
const vsubnE = "⫋︀";
const vsubne = "⊊︀";
const vsupnE = "⫌︀";
const vsupne = "⊋︀";
const Vvdash = "⊪";
const vzigzag = "⦚";
const Wcirc = "Ŵ";
const wcirc = "ŵ";
const wedbar = "⩟";
const wedge = "∧";
const Wedge = "⋀";
const wedgeq = "≙";
const weierp = "℘";
const Wfr = "𝔚";
const wfr = "𝔴";
const Wopf = "𝕎";
const wopf = "𝕨";
const wp = "℘";
const wr = "≀";
const wreath = "≀";
const Wscr = "𝒲";
const wscr = "𝓌";
const xcap = "⋂";
const xcirc = "◯";
const xcup = "⋃";
const xdtri = "▽";
const Xfr = "𝔛";
const xfr = "𝔵";
const xharr = "⟷";
const xhArr = "⟺";
const Xi = "Ξ";
const xi = "ξ";
const xlarr = "⟵";
const xlArr = "⟸";
const xmap = "⟼";
const xnis = "⋻";
const xodot = "⨀";
const Xopf = "𝕏";
const xopf = "𝕩";
const xoplus = "⨁";
const xotime = "⨂";
const xrarr = "⟶";
const xrArr = "⟹";
const Xscr = "𝒳";
const xscr = "𝓍";
const xsqcup = "⨆";
const xuplus = "⨄";
const xutri = "△";
const xvee = "⋁";
const xwedge = "⋀";
const Yacute$1 = "Ý";
const yacute$1 = "ý";
const YAcy = "Я";
const yacy = "я";
const Ycirc = "Ŷ";
const ycirc = "ŷ";
const Ycy = "Ы";
const ycy = "ы";
const yen$1 = "¥";
const Yfr = "𝔜";
const yfr = "𝔶";
const YIcy = "Ї";
const yicy = "ї";
const Yopf = "𝕐";
const yopf = "𝕪";
const Yscr = "𝒴";
const yscr = "𝓎";
const YUcy = "Ю";
const yucy = "ю";
const yuml$1 = "ÿ";
const Yuml = "Ÿ";
const Zacute = "Ź";
const zacute = "ź";
const Zcaron = "Ž";
const zcaron = "ž";
const Zcy = "З";
const zcy = "з";
const Zdot = "Ż";
const zdot = "ż";
const zeetrf = "ℨ";
const ZeroWidthSpace = "​";
const Zeta = "Ζ";
const zeta = "ζ";
const zfr = "𝔷";
const Zfr = "ℨ";
const ZHcy = "Ж";
const zhcy = "ж";
const zigrarr = "⇝";
const zopf = "𝕫";
const Zopf = "ℤ";
const Zscr = "𝒵";
const zscr = "𝓏";
const zwj = "‍";
const zwnj = "‌";
const require$$0$1 = {
  Aacute: Aacute$1,
  aacute: aacute$1,
  Abreve,
  abreve,
  ac,
  acd,
  acE,
  Acirc: Acirc$1,
  acirc: acirc$1,
  acute: acute$1,
  Acy,
  acy,
  AElig: AElig$1,
  aelig: aelig$1,
  af,
  Afr,
  afr,
  Agrave: Agrave$1,
  agrave: agrave$1,
  alefsym,
  aleph,
  Alpha,
  alpha,
  Amacr,
  amacr,
  amalg,
  amp: amp$1,
  AMP: AMP$1,
  andand,
  And,
  and,
  andd,
  andslope,
  andv,
  ang,
  ange,
  angle,
  angmsdaa,
  angmsdab,
  angmsdac,
  angmsdad,
  angmsdae,
  angmsdaf,
  angmsdag,
  angmsdah,
  angmsd,
  angrt,
  angrtvb,
  angrtvbd,
  angsph,
  angst,
  angzarr,
  Aogon,
  aogon,
  Aopf,
  aopf,
  apacir,
  ap,
  apE,
  ape,
  apid,
  apos,
  ApplyFunction,
  approx,
  approxeq,
  Aring: Aring$1,
  aring: aring$1,
  Ascr,
  ascr,
  Assign,
  ast,
  asymp,
  asympeq,
  Atilde: Atilde$1,
  atilde: atilde$1,
  Auml: Auml$1,
  auml: auml$1,
  awconint,
  awint,
  backcong,
  backepsilon,
  backprime,
  backsim,
  backsimeq,
  Backslash,
  Barv,
  barvee,
  barwed,
  Barwed,
  barwedge,
  bbrk,
  bbrktbrk,
  bcong,
  Bcy,
  bcy,
  bdquo,
  becaus,
  because,
  Because,
  bemptyv,
  bepsi,
  bernou,
  Bernoullis,
  Beta,
  beta,
  beth,
  between,
  Bfr,
  bfr,
  bigcap,
  bigcirc,
  bigcup,
  bigodot,
  bigoplus,
  bigotimes,
  bigsqcup,
  bigstar,
  bigtriangledown,
  bigtriangleup,
  biguplus,
  bigvee,
  bigwedge,
  bkarow,
  blacklozenge,
  blacksquare,
  blacktriangle,
  blacktriangledown,
  blacktriangleleft,
  blacktriangleright,
  blank,
  blk12,
  blk14,
  blk34,
  block,
  bne,
  bnequiv,
  bNot,
  bnot,
  Bopf,
  bopf,
  bot,
  bottom,
  bowtie,
  boxbox,
  boxdl,
  boxdL,
  boxDl,
  boxDL,
  boxdr,
  boxdR,
  boxDr,
  boxDR,
  boxh,
  boxH,
  boxhd,
  boxHd,
  boxhD,
  boxHD,
  boxhu,
  boxHu,
  boxhU,
  boxHU,
  boxminus,
  boxplus,
  boxtimes,
  boxul,
  boxuL,
  boxUl,
  boxUL,
  boxur,
  boxuR,
  boxUr,
  boxUR,
  boxv,
  boxV,
  boxvh,
  boxvH,
  boxVh,
  boxVH,
  boxvl,
  boxvL,
  boxVl,
  boxVL,
  boxvr,
  boxvR,
  boxVr,
  boxVR,
  bprime,
  breve,
  Breve,
  brvbar: brvbar$1,
  bscr,
  Bscr,
  bsemi,
  bsim,
  bsime,
  bsolb,
  bsol,
  bsolhsub,
  bull,
  bullet,
  bump,
  bumpE,
  bumpe,
  Bumpeq,
  bumpeq,
  Cacute,
  cacute,
  capand,
  capbrcup,
  capcap,
  cap,
  Cap,
  capcup,
  capdot,
  CapitalDifferentialD,
  caps,
  caret,
  caron,
  Cayleys,
  ccaps,
  Ccaron,
  ccaron,
  Ccedil: Ccedil$1,
  ccedil: ccedil$1,
  Ccirc,
  ccirc,
  Cconint,
  ccups,
  ccupssm,
  Cdot,
  cdot,
  cedil: cedil$1,
  Cedilla,
  cemptyv,
  cent: cent$1,
  centerdot,
  CenterDot,
  cfr,
  Cfr,
  CHcy,
  chcy,
  check,
  checkmark,
  Chi,
  chi,
  circ,
  circeq,
  circlearrowleft,
  circlearrowright,
  circledast,
  circledcirc,
  circleddash,
  CircleDot,
  circledR,
  circledS,
  CircleMinus,
  CirclePlus,
  CircleTimes,
  cir,
  cirE,
  cire,
  cirfnint,
  cirmid,
  cirscir,
  ClockwiseContourIntegral,
  CloseCurlyDoubleQuote,
  CloseCurlyQuote,
  clubs,
  clubsuit,
  colon,
  Colon,
  Colone,
  colone,
  coloneq,
  comma,
  commat,
  comp,
  compfn,
  complement,
  complexes,
  cong,
  congdot,
  Congruent,
  conint,
  Conint,
  ContourIntegral,
  copf,
  Copf,
  coprod,
  Coproduct,
  copy: copy$1,
  COPY: COPY$1,
  copysr,
  CounterClockwiseContourIntegral,
  crarr,
  cross,
  Cross,
  Cscr,
  cscr,
  csub,
  csube,
  csup,
  csupe,
  ctdot,
  cudarrl,
  cudarrr,
  cuepr,
  cuesc,
  cularr,
  cularrp,
  cupbrcap,
  cupcap,
  CupCap,
  cup,
  Cup,
  cupcup,
  cupdot,
  cupor,
  cups,
  curarr,
  curarrm,
  curlyeqprec,
  curlyeqsucc,
  curlyvee,
  curlywedge,
  curren: curren$1,
  curvearrowleft,
  curvearrowright,
  cuvee,
  cuwed,
  cwconint,
  cwint,
  cylcty,
  dagger,
  Dagger,
  daleth,
  darr,
  Darr,
  dArr,
  dash,
  Dashv,
  dashv,
  dbkarow,
  dblac,
  Dcaron,
  dcaron,
  Dcy,
  dcy,
  ddagger,
  ddarr,
  DD,
  dd,
  DDotrahd,
  ddotseq,
  deg: deg$1,
  Del,
  Delta,
  delta,
  demptyv,
  dfisht,
  Dfr,
  dfr,
  dHar,
  dharl,
  dharr,
  DiacriticalAcute,
  DiacriticalDot,
  DiacriticalDoubleAcute,
  DiacriticalGrave,
  DiacriticalTilde,
  diam,
  diamond,
  Diamond,
  diamondsuit,
  diams,
  die,
  DifferentialD,
  digamma,
  disin,
  div,
  divide: divide$1,
  divideontimes,
  divonx,
  DJcy,
  djcy,
  dlcorn,
  dlcrop,
  dollar,
  Dopf,
  dopf,
  Dot,
  dot,
  DotDot,
  doteq,
  doteqdot,
  DotEqual,
  dotminus,
  dotplus,
  dotsquare,
  doublebarwedge,
  DoubleContourIntegral,
  DoubleDot,
  DoubleDownArrow,
  DoubleLeftArrow,
  DoubleLeftRightArrow,
  DoubleLeftTee,
  DoubleLongLeftArrow,
  DoubleLongLeftRightArrow,
  DoubleLongRightArrow,
  DoubleRightArrow,
  DoubleRightTee,
  DoubleUpArrow,
  DoubleUpDownArrow,
  DoubleVerticalBar,
  DownArrowBar,
  downarrow,
  DownArrow,
  Downarrow,
  DownArrowUpArrow,
  DownBreve,
  downdownarrows,
  downharpoonleft,
  downharpoonright,
  DownLeftRightVector,
  DownLeftTeeVector,
  DownLeftVectorBar,
  DownLeftVector,
  DownRightTeeVector,
  DownRightVectorBar,
  DownRightVector,
  DownTeeArrow,
  DownTee,
  drbkarow,
  drcorn,
  drcrop,
  Dscr,
  dscr,
  DScy,
  dscy,
  dsol,
  Dstrok,
  dstrok,
  dtdot,
  dtri,
  dtrif,
  duarr,
  duhar,
  dwangle,
  DZcy,
  dzcy,
  dzigrarr,
  Eacute: Eacute$1,
  eacute: eacute$1,
  easter,
  Ecaron,
  ecaron,
  Ecirc: Ecirc$1,
  ecirc: ecirc$1,
  ecir,
  ecolon,
  Ecy,
  ecy,
  eDDot,
  Edot,
  edot,
  eDot,
  ee,
  efDot,
  Efr,
  efr,
  eg,
  Egrave: Egrave$1,
  egrave: egrave$1,
  egs,
  egsdot,
  el,
  Element,
  elinters,
  ell,
  els,
  elsdot,
  Emacr,
  emacr,
  empty,
  emptyset,
  EmptySmallSquare,
  emptyv,
  EmptyVerySmallSquare,
  emsp13,
  emsp14,
  emsp,
  ENG,
  eng,
  ensp,
  Eogon,
  eogon,
  Eopf,
  eopf,
  epar,
  eparsl,
  eplus,
  epsi,
  Epsilon,
  epsilon,
  epsiv,
  eqcirc,
  eqcolon,
  eqsim,
  eqslantgtr,
  eqslantless,
  Equal,
  equals,
  EqualTilde,
  equest,
  Equilibrium,
  equiv,
  equivDD,
  eqvparsl,
  erarr,
  erDot,
  escr,
  Escr,
  esdot,
  Esim,
  esim,
  Eta,
  eta,
  ETH: ETH$1,
  eth: eth$1,
  Euml: Euml$1,
  euml: euml$1,
  euro,
  excl,
  exist,
  Exists,
  expectation,
  exponentiale,
  ExponentialE,
  fallingdotseq,
  Fcy,
  fcy,
  female,
  ffilig,
  fflig,
  ffllig,
  Ffr,
  ffr,
  filig,
  FilledSmallSquare,
  FilledVerySmallSquare,
  fjlig,
  flat,
  fllig,
  fltns,
  fnof,
  Fopf,
  fopf,
  forall,
  ForAll,
  fork,
  forkv,
  Fouriertrf,
  fpartint,
  frac12: frac12$1,
  frac13,
  frac14: frac14$1,
  frac15,
  frac16,
  frac18,
  frac23,
  frac25,
  frac34: frac34$1,
  frac35,
  frac38,
  frac45,
  frac56,
  frac58,
  frac78,
  frasl,
  frown,
  fscr,
  Fscr,
  gacute,
  Gamma,
  gamma,
  Gammad,
  gammad,
  gap,
  Gbreve,
  gbreve,
  Gcedil,
  Gcirc,
  gcirc,
  Gcy,
  gcy,
  Gdot,
  gdot,
  ge,
  gE,
  gEl,
  gel,
  geq,
  geqq,
  geqslant,
  gescc,
  ges,
  gesdot,
  gesdoto,
  gesdotol,
  gesl,
  gesles,
  Gfr,
  gfr,
  gg,
  Gg,
  ggg,
  gimel,
  GJcy,
  gjcy,
  gla,
  gl,
  glE,
  glj,
  gnap,
  gnapprox,
  gne,
  gnE,
  gneq,
  gneqq,
  gnsim,
  Gopf,
  gopf,
  grave,
  GreaterEqual,
  GreaterEqualLess,
  GreaterFullEqual,
  GreaterGreater,
  GreaterLess,
  GreaterSlantEqual,
  GreaterTilde,
  Gscr,
  gscr,
  gsim,
  gsime,
  gsiml,
  gtcc,
  gtcir,
  gt: gt$1,
  GT: GT$1,
  Gt,
  gtdot,
  gtlPar,
  gtquest,
  gtrapprox,
  gtrarr,
  gtrdot,
  gtreqless,
  gtreqqless,
  gtrless,
  gtrsim,
  gvertneqq,
  gvnE,
  Hacek,
  hairsp,
  half,
  hamilt,
  HARDcy,
  hardcy,
  harrcir,
  harr,
  hArr,
  harrw,
  Hat,
  hbar,
  Hcirc,
  hcirc,
  hearts,
  heartsuit,
  hellip,
  hercon,
  hfr,
  Hfr,
  HilbertSpace,
  hksearow,
  hkswarow,
  hoarr,
  homtht,
  hookleftarrow,
  hookrightarrow,
  hopf,
  Hopf,
  horbar,
  HorizontalLine,
  hscr,
  Hscr,
  hslash,
  Hstrok,
  hstrok,
  HumpDownHump,
  HumpEqual,
  hybull,
  hyphen,
  Iacute: Iacute$1,
  iacute: iacute$1,
  ic,
  Icirc: Icirc$1,
  icirc: icirc$1,
  Icy,
  icy,
  Idot,
  IEcy,
  iecy,
  iexcl: iexcl$1,
  iff,
  ifr,
  Ifr,
  Igrave: Igrave$1,
  igrave: igrave$1,
  ii,
  iiiint,
  iiint,
  iinfin,
  iiota,
  IJlig,
  ijlig,
  Imacr,
  imacr,
  image,
  ImaginaryI,
  imagline,
  imagpart,
  imath,
  Im,
  imof,
  imped,
  Implies,
  incare,
  "in": "∈",
  infin,
  infintie,
  inodot,
  intcal,
  int,
  Int,
  integers,
  Integral,
  intercal,
  Intersection,
  intlarhk,
  intprod,
  InvisibleComma,
  InvisibleTimes,
  IOcy,
  iocy,
  Iogon,
  iogon,
  Iopf,
  iopf,
  Iota,
  iota,
  iprod,
  iquest: iquest$1,
  iscr,
  Iscr,
  isin,
  isindot,
  isinE,
  isins,
  isinsv,
  isinv,
  it,
  Itilde,
  itilde,
  Iukcy,
  iukcy,
  Iuml: Iuml$1,
  iuml: iuml$1,
  Jcirc,
  jcirc,
  Jcy,
  jcy,
  Jfr,
  jfr,
  jmath,
  Jopf,
  jopf,
  Jscr,
  jscr,
  Jsercy,
  jsercy,
  Jukcy,
  jukcy,
  Kappa,
  kappa,
  kappav,
  Kcedil,
  kcedil,
  Kcy,
  kcy,
  Kfr,
  kfr,
  kgreen,
  KHcy,
  khcy,
  KJcy,
  kjcy,
  Kopf,
  kopf,
  Kscr,
  kscr,
  lAarr,
  Lacute,
  lacute,
  laemptyv,
  lagran,
  Lambda,
  lambda,
  lang,
  Lang,
  langd,
  langle,
  lap,
  Laplacetrf,
  laquo: laquo$1,
  larrb,
  larrbfs,
  larr,
  Larr,
  lArr,
  larrfs,
  larrhk,
  larrlp,
  larrpl,
  larrsim,
  larrtl,
  latail,
  lAtail,
  lat,
  late,
  lates,
  lbarr,
  lBarr,
  lbbrk,
  lbrace,
  lbrack,
  lbrke,
  lbrksld,
  lbrkslu,
  Lcaron,
  lcaron,
  Lcedil,
  lcedil,
  lceil,
  lcub,
  Lcy,
  lcy,
  ldca,
  ldquo,
  ldquor,
  ldrdhar,
  ldrushar,
  ldsh,
  le,
  lE,
  LeftAngleBracket,
  LeftArrowBar,
  leftarrow,
  LeftArrow,
  Leftarrow,
  LeftArrowRightArrow,
  leftarrowtail,
  LeftCeiling,
  LeftDoubleBracket,
  LeftDownTeeVector,
  LeftDownVectorBar,
  LeftDownVector,
  LeftFloor,
  leftharpoondown,
  leftharpoonup,
  leftleftarrows,
  leftrightarrow,
  LeftRightArrow,
  Leftrightarrow,
  leftrightarrows,
  leftrightharpoons,
  leftrightsquigarrow,
  LeftRightVector,
  LeftTeeArrow,
  LeftTee,
  LeftTeeVector,
  leftthreetimes,
  LeftTriangleBar,
  LeftTriangle,
  LeftTriangleEqual,
  LeftUpDownVector,
  LeftUpTeeVector,
  LeftUpVectorBar,
  LeftUpVector,
  LeftVectorBar,
  LeftVector,
  lEg,
  leg,
  leq,
  leqq,
  leqslant,
  lescc,
  les,
  lesdot,
  lesdoto,
  lesdotor,
  lesg,
  lesges,
  lessapprox,
  lessdot,
  lesseqgtr,
  lesseqqgtr,
  LessEqualGreater,
  LessFullEqual,
  LessGreater,
  lessgtr,
  LessLess,
  lesssim,
  LessSlantEqual,
  LessTilde,
  lfisht,
  lfloor,
  Lfr,
  lfr,
  lg,
  lgE,
  lHar,
  lhard,
  lharu,
  lharul,
  lhblk,
  LJcy,
  ljcy,
  llarr,
  ll,
  Ll,
  llcorner,
  Lleftarrow,
  llhard,
  lltri,
  Lmidot,
  lmidot,
  lmoustache,
  lmoust,
  lnap,
  lnapprox,
  lne,
  lnE,
  lneq,
  lneqq,
  lnsim,
  loang,
  loarr,
  lobrk,
  longleftarrow,
  LongLeftArrow,
  Longleftarrow,
  longleftrightarrow,
  LongLeftRightArrow,
  Longleftrightarrow,
  longmapsto,
  longrightarrow,
  LongRightArrow,
  Longrightarrow,
  looparrowleft,
  looparrowright,
  lopar,
  Lopf,
  lopf,
  loplus,
  lotimes,
  lowast,
  lowbar,
  LowerLeftArrow,
  LowerRightArrow,
  loz,
  lozenge,
  lozf,
  lpar,
  lparlt,
  lrarr,
  lrcorner,
  lrhar,
  lrhard,
  lrm,
  lrtri,
  lsaquo,
  lscr,
  Lscr,
  lsh,
  Lsh,
  lsim,
  lsime,
  lsimg,
  lsqb,
  lsquo,
  lsquor,
  Lstrok,
  lstrok,
  ltcc,
  ltcir,
  lt: lt$1,
  LT: LT$1,
  Lt,
  ltdot,
  lthree,
  ltimes,
  ltlarr,
  ltquest,
  ltri,
  ltrie,
  ltrif,
  ltrPar,
  lurdshar,
  luruhar,
  lvertneqq,
  lvnE,
  macr: macr$1,
  male,
  malt,
  maltese,
  "Map": "⤅",
  map,
  mapsto,
  mapstodown,
  mapstoleft,
  mapstoup,
  marker,
  mcomma,
  Mcy,
  mcy,
  mdash,
  mDDot,
  measuredangle,
  MediumSpace,
  Mellintrf,
  Mfr,
  mfr,
  mho,
  micro: micro$1,
  midast,
  midcir,
  mid,
  middot: middot$1,
  minusb,
  minus,
  minusd,
  minusdu,
  MinusPlus,
  mlcp,
  mldr,
  mnplus,
  models,
  Mopf,
  mopf,
  mp,
  mscr,
  Mscr,
  mstpos,
  Mu,
  mu,
  multimap,
  mumap,
  nabla,
  Nacute,
  nacute,
  nang,
  nap,
  napE,
  napid,
  napos,
  napprox,
  natural,
  naturals,
  natur,
  nbsp: nbsp$1,
  nbump,
  nbumpe,
  ncap,
  Ncaron,
  ncaron,
  Ncedil,
  ncedil,
  ncong,
  ncongdot,
  ncup,
  Ncy,
  ncy,
  ndash,
  nearhk,
  nearr,
  neArr,
  nearrow,
  ne,
  nedot,
  NegativeMediumSpace,
  NegativeThickSpace,
  NegativeThinSpace,
  NegativeVeryThinSpace,
  nequiv,
  nesear,
  nesim,
  NestedGreaterGreater,
  NestedLessLess,
  NewLine,
  nexist,
  nexists,
  Nfr,
  nfr,
  ngE,
  nge,
  ngeq,
  ngeqq,
  ngeqslant,
  nges,
  nGg,
  ngsim,
  nGt,
  ngt,
  ngtr,
  nGtv,
  nharr,
  nhArr,
  nhpar,
  ni,
  nis,
  nisd,
  niv,
  NJcy,
  njcy,
  nlarr,
  nlArr,
  nldr,
  nlE,
  nle,
  nleftarrow,
  nLeftarrow,
  nleftrightarrow,
  nLeftrightarrow,
  nleq,
  nleqq,
  nleqslant,
  nles,
  nless,
  nLl,
  nlsim,
  nLt,
  nlt,
  nltri,
  nltrie,
  nLtv,
  nmid,
  NoBreak,
  NonBreakingSpace,
  nopf,
  Nopf,
  Not,
  not: not$1,
  NotCongruent,
  NotCupCap,
  NotDoubleVerticalBar,
  NotElement,
  NotEqual,
  NotEqualTilde,
  NotExists,
  NotGreater,
  NotGreaterEqual,
  NotGreaterFullEqual,
  NotGreaterGreater,
  NotGreaterLess,
  NotGreaterSlantEqual,
  NotGreaterTilde,
  NotHumpDownHump,
  NotHumpEqual,
  notin,
  notindot,
  notinE,
  notinva,
  notinvb,
  notinvc,
  NotLeftTriangleBar,
  NotLeftTriangle,
  NotLeftTriangleEqual,
  NotLess,
  NotLessEqual,
  NotLessGreater,
  NotLessLess,
  NotLessSlantEqual,
  NotLessTilde,
  NotNestedGreaterGreater,
  NotNestedLessLess,
  notni,
  notniva,
  notnivb,
  notnivc,
  NotPrecedes,
  NotPrecedesEqual,
  NotPrecedesSlantEqual,
  NotReverseElement,
  NotRightTriangleBar,
  NotRightTriangle,
  NotRightTriangleEqual,
  NotSquareSubset,
  NotSquareSubsetEqual,
  NotSquareSuperset,
  NotSquareSupersetEqual,
  NotSubset,
  NotSubsetEqual,
  NotSucceeds,
  NotSucceedsEqual,
  NotSucceedsSlantEqual,
  NotSucceedsTilde,
  NotSuperset,
  NotSupersetEqual,
  NotTilde,
  NotTildeEqual,
  NotTildeFullEqual,
  NotTildeTilde,
  NotVerticalBar,
  nparallel,
  npar,
  nparsl,
  npart,
  npolint,
  npr,
  nprcue,
  nprec,
  npreceq,
  npre,
  nrarrc,
  nrarr,
  nrArr,
  nrarrw,
  nrightarrow,
  nRightarrow,
  nrtri,
  nrtrie,
  nsc,
  nsccue,
  nsce,
  Nscr,
  nscr,
  nshortmid,
  nshortparallel,
  nsim,
  nsime,
  nsimeq,
  nsmid,
  nspar,
  nsqsube,
  nsqsupe,
  nsub,
  nsubE,
  nsube,
  nsubset,
  nsubseteq,
  nsubseteqq,
  nsucc,
  nsucceq,
  nsup,
  nsupE,
  nsupe,
  nsupset,
  nsupseteq,
  nsupseteqq,
  ntgl,
  Ntilde: Ntilde$1,
  ntilde: ntilde$1,
  ntlg,
  ntriangleleft,
  ntrianglelefteq,
  ntriangleright,
  ntrianglerighteq,
  Nu,
  nu,
  num,
  numero,
  numsp,
  nvap,
  nvdash,
  nvDash,
  nVdash,
  nVDash,
  nvge,
  nvgt,
  nvHarr,
  nvinfin,
  nvlArr,
  nvle,
  nvlt,
  nvltrie,
  nvrArr,
  nvrtrie,
  nvsim,
  nwarhk,
  nwarr,
  nwArr,
  nwarrow,
  nwnear,
  Oacute: Oacute$1,
  oacute: oacute$1,
  oast,
  Ocirc: Ocirc$1,
  ocirc: ocirc$1,
  ocir,
  Ocy,
  ocy,
  odash,
  Odblac,
  odblac,
  odiv,
  odot,
  odsold,
  OElig,
  oelig,
  ofcir,
  Ofr,
  ofr,
  ogon,
  Ograve: Ograve$1,
  ograve: ograve$1,
  ogt,
  ohbar,
  ohm,
  oint,
  olarr,
  olcir,
  olcross,
  oline,
  olt,
  Omacr,
  omacr,
  Omega,
  omega,
  Omicron,
  omicron,
  omid,
  ominus,
  Oopf,
  oopf,
  opar,
  OpenCurlyDoubleQuote,
  OpenCurlyQuote,
  operp,
  oplus,
  orarr,
  Or,
  or,
  ord,
  order,
  orderof,
  ordf: ordf$1,
  ordm: ordm$1,
  origof,
  oror,
  orslope,
  orv,
  oS,
  Oscr,
  oscr,
  Oslash: Oslash$1,
  oslash: oslash$1,
  osol,
  Otilde: Otilde$1,
  otilde: otilde$1,
  otimesas,
  Otimes,
  otimes,
  Ouml: Ouml$1,
  ouml: ouml$1,
  ovbar,
  OverBar,
  OverBrace,
  OverBracket,
  OverParenthesis,
  para: para$1,
  parallel,
  par,
  parsim,
  parsl,
  part,
  PartialD,
  Pcy,
  pcy,
  percnt,
  period,
  permil,
  perp,
  pertenk,
  Pfr,
  pfr,
  Phi,
  phi,
  phiv,
  phmmat,
  phone,
  Pi,
  pi,
  pitchfork,
  piv,
  planck,
  planckh,
  plankv,
  plusacir,
  plusb,
  pluscir,
  plus,
  plusdo,
  plusdu,
  pluse,
  PlusMinus,
  plusmn: plusmn$1,
  plussim,
  plustwo,
  pm,
  Poincareplane,
  pointint,
  popf,
  Popf,
  pound: pound$1,
  prap,
  Pr,
  pr,
  prcue,
  precapprox,
  prec,
  preccurlyeq,
  Precedes,
  PrecedesEqual,
  PrecedesSlantEqual,
  PrecedesTilde,
  preceq,
  precnapprox,
  precneqq,
  precnsim,
  pre,
  prE,
  precsim,
  prime,
  Prime,
  primes,
  prnap,
  prnE,
  prnsim,
  prod,
  Product,
  profalar,
  profline,
  profsurf,
  prop,
  Proportional,
  Proportion,
  propto,
  prsim,
  prurel,
  Pscr,
  pscr,
  Psi,
  psi,
  puncsp,
  Qfr,
  qfr,
  qint,
  qopf,
  Qopf,
  qprime,
  Qscr,
  qscr,
  quaternions,
  quatint,
  quest,
  questeq,
  quot: quot$1,
  QUOT: QUOT$1,
  rAarr,
  race,
  Racute,
  racute,
  radic,
  raemptyv,
  rang,
  Rang,
  rangd,
  range: range$1,
  rangle,
  raquo: raquo$1,
  rarrap,
  rarrb,
  rarrbfs,
  rarrc,
  rarr,
  Rarr,
  rArr,
  rarrfs,
  rarrhk,
  rarrlp,
  rarrpl,
  rarrsim,
  Rarrtl,
  rarrtl,
  rarrw,
  ratail,
  rAtail,
  ratio,
  rationals,
  rbarr,
  rBarr,
  RBarr,
  rbbrk,
  rbrace,
  rbrack,
  rbrke,
  rbrksld,
  rbrkslu,
  Rcaron,
  rcaron,
  Rcedil,
  rcedil,
  rceil,
  rcub,
  Rcy,
  rcy,
  rdca,
  rdldhar,
  rdquo,
  rdquor,
  rdsh,
  real,
  realine,
  realpart,
  reals,
  Re,
  rect,
  reg: reg$1,
  REG: REG$1,
  ReverseElement,
  ReverseEquilibrium,
  ReverseUpEquilibrium,
  rfisht,
  rfloor,
  rfr,
  Rfr,
  rHar,
  rhard,
  rharu,
  rharul,
  Rho,
  rho,
  rhov,
  RightAngleBracket,
  RightArrowBar,
  rightarrow,
  RightArrow,
  Rightarrow,
  RightArrowLeftArrow,
  rightarrowtail,
  RightCeiling,
  RightDoubleBracket,
  RightDownTeeVector,
  RightDownVectorBar,
  RightDownVector,
  RightFloor,
  rightharpoondown,
  rightharpoonup,
  rightleftarrows,
  rightleftharpoons,
  rightrightarrows,
  rightsquigarrow,
  RightTeeArrow,
  RightTee,
  RightTeeVector,
  rightthreetimes,
  RightTriangleBar,
  RightTriangle,
  RightTriangleEqual,
  RightUpDownVector,
  RightUpTeeVector,
  RightUpVectorBar,
  RightUpVector,
  RightVectorBar,
  RightVector,
  ring,
  risingdotseq,
  rlarr,
  rlhar,
  rlm,
  rmoustache,
  rmoust,
  rnmid,
  roang,
  roarr,
  robrk,
  ropar,
  ropf,
  Ropf,
  roplus,
  rotimes,
  RoundImplies,
  rpar,
  rpargt,
  rppolint,
  rrarr,
  Rrightarrow,
  rsaquo,
  rscr,
  Rscr,
  rsh,
  Rsh,
  rsqb,
  rsquo,
  rsquor,
  rthree,
  rtimes,
  rtri,
  rtrie,
  rtrif,
  rtriltri,
  RuleDelayed,
  ruluhar,
  rx,
  Sacute,
  sacute,
  sbquo,
  scap,
  Scaron,
  scaron,
  Sc,
  sc,
  sccue,
  sce,
  scE,
  Scedil,
  scedil,
  Scirc,
  scirc,
  scnap,
  scnE,
  scnsim,
  scpolint,
  scsim,
  Scy,
  scy,
  sdotb,
  sdot,
  sdote,
  searhk,
  searr,
  seArr,
  searrow,
  sect: sect$1,
  semi,
  seswar,
  setminus,
  setmn,
  sext,
  Sfr,
  sfr,
  sfrown,
  sharp,
  SHCHcy,
  shchcy,
  SHcy,
  shcy,
  ShortDownArrow,
  ShortLeftArrow,
  shortmid,
  shortparallel,
  ShortRightArrow,
  ShortUpArrow,
  shy: shy$1,
  Sigma,
  sigma,
  sigmaf,
  sigmav,
  sim,
  simdot,
  sime,
  simeq,
  simg,
  simgE,
  siml,
  simlE,
  simne,
  simplus,
  simrarr,
  slarr,
  SmallCircle,
  smallsetminus,
  smashp,
  smeparsl,
  smid,
  smile,
  smt,
  smte,
  smtes,
  SOFTcy,
  softcy,
  solbar,
  solb,
  sol,
  Sopf,
  sopf,
  spades,
  spadesuit,
  spar,
  sqcap,
  sqcaps,
  sqcup,
  sqcups,
  Sqrt,
  sqsub,
  sqsube,
  sqsubset,
  sqsubseteq,
  sqsup,
  sqsupe,
  sqsupset,
  sqsupseteq,
  square,
  Square,
  SquareIntersection,
  SquareSubset,
  SquareSubsetEqual,
  SquareSuperset,
  SquareSupersetEqual,
  SquareUnion,
  squarf,
  squ,
  squf,
  srarr,
  Sscr,
  sscr,
  ssetmn,
  ssmile,
  sstarf,
  Star,
  star,
  starf,
  straightepsilon,
  straightphi,
  strns,
  sub,
  Sub,
  subdot,
  subE,
  sube,
  subedot,
  submult,
  subnE,
  subne,
  subplus,
  subrarr,
  subset,
  Subset,
  subseteq,
  subseteqq,
  SubsetEqual,
  subsetneq,
  subsetneqq,
  subsim,
  subsub,
  subsup,
  succapprox,
  succ,
  succcurlyeq,
  Succeeds,
  SucceedsEqual,
  SucceedsSlantEqual,
  SucceedsTilde,
  succeq,
  succnapprox,
  succneqq,
  succnsim,
  succsim,
  SuchThat,
  sum,
  Sum,
  sung,
  sup1: sup1$1,
  sup2: sup2$1,
  sup3: sup3$1,
  sup,
  Sup,
  supdot,
  supdsub,
  supE,
  supe,
  supedot,
  Superset,
  SupersetEqual,
  suphsol,
  suphsub,
  suplarr,
  supmult,
  supnE,
  supne,
  supplus,
  supset,
  Supset,
  supseteq,
  supseteqq,
  supsetneq,
  supsetneqq,
  supsim,
  supsub,
  supsup,
  swarhk,
  swarr,
  swArr,
  swarrow,
  swnwar,
  szlig: szlig$1,
  Tab,
  target,
  Tau,
  tau,
  tbrk,
  Tcaron,
  tcaron,
  Tcedil,
  tcedil,
  Tcy,
  tcy,
  tdot,
  telrec,
  Tfr,
  tfr,
  there4,
  therefore,
  Therefore,
  Theta,
  theta,
  thetasym,
  thetav,
  thickapprox,
  thicksim,
  ThickSpace,
  ThinSpace,
  thinsp,
  thkap,
  thksim,
  THORN: THORN$1,
  thorn: thorn$1,
  tilde,
  Tilde,
  TildeEqual,
  TildeFullEqual,
  TildeTilde,
  timesbar,
  timesb,
  times: times$1,
  timesd,
  tint,
  toea,
  topbot,
  topcir,
  top,
  Topf,
  topf,
  topfork,
  tosa,
  tprime,
  trade,
  TRADE,
  triangle,
  triangledown,
  triangleleft,
  trianglelefteq,
  triangleq,
  triangleright,
  trianglerighteq,
  tridot,
  trie,
  triminus,
  TripleDot,
  triplus,
  trisb,
  tritime,
  trpezium,
  Tscr,
  tscr,
  TScy,
  tscy,
  TSHcy,
  tshcy,
  Tstrok,
  tstrok,
  twixt,
  twoheadleftarrow,
  twoheadrightarrow,
  Uacute: Uacute$1,
  uacute: uacute$1,
  uarr,
  Uarr,
  uArr,
  Uarrocir,
  Ubrcy,
  ubrcy,
  Ubreve,
  ubreve,
  Ucirc: Ucirc$1,
  ucirc: ucirc$1,
  Ucy,
  ucy,
  udarr,
  Udblac,
  udblac,
  udhar,
  ufisht,
  Ufr,
  ufr,
  Ugrave: Ugrave$1,
  ugrave: ugrave$1,
  uHar,
  uharl,
  uharr,
  uhblk,
  ulcorn,
  ulcorner,
  ulcrop,
  ultri,
  Umacr,
  umacr,
  uml: uml$1,
  UnderBar,
  UnderBrace,
  UnderBracket,
  UnderParenthesis,
  Union,
  UnionPlus,
  Uogon,
  uogon,
  Uopf,
  uopf,
  UpArrowBar,
  uparrow,
  UpArrow,
  Uparrow,
  UpArrowDownArrow,
  updownarrow,
  UpDownArrow,
  Updownarrow,
  UpEquilibrium,
  upharpoonleft,
  upharpoonright,
  uplus,
  UpperLeftArrow,
  UpperRightArrow,
  upsi,
  Upsi,
  upsih,
  Upsilon,
  upsilon,
  UpTeeArrow,
  UpTee,
  upuparrows,
  urcorn,
  urcorner,
  urcrop,
  Uring,
  uring,
  urtri,
  Uscr,
  uscr,
  utdot,
  Utilde,
  utilde,
  utri,
  utrif,
  uuarr,
  Uuml: Uuml$1,
  uuml: uuml$1,
  uwangle,
  vangrt,
  varepsilon,
  varkappa,
  varnothing,
  varphi,
  varpi,
  varpropto,
  varr,
  vArr,
  varrho,
  varsigma,
  varsubsetneq,
  varsubsetneqq,
  varsupsetneq,
  varsupsetneqq,
  vartheta,
  vartriangleleft,
  vartriangleright,
  vBar,
  Vbar,
  vBarv,
  Vcy,
  vcy,
  vdash,
  vDash,
  Vdash,
  VDash,
  Vdashl,
  veebar,
  vee,
  Vee,
  veeeq,
  vellip,
  verbar,
  Verbar,
  vert,
  Vert,
  VerticalBar,
  VerticalLine,
  VerticalSeparator,
  VerticalTilde,
  VeryThinSpace,
  Vfr,
  vfr,
  vltri,
  vnsub,
  vnsup,
  Vopf,
  vopf,
  vprop,
  vrtri,
  Vscr,
  vscr,
  vsubnE,
  vsubne,
  vsupnE,
  vsupne,
  Vvdash,
  vzigzag,
  Wcirc,
  wcirc,
  wedbar,
  wedge,
  Wedge,
  wedgeq,
  weierp,
  Wfr,
  wfr,
  Wopf,
  wopf,
  wp,
  wr,
  wreath,
  Wscr,
  wscr,
  xcap,
  xcirc,
  xcup,
  xdtri,
  Xfr,
  xfr,
  xharr,
  xhArr,
  Xi,
  xi,
  xlarr,
  xlArr,
  xmap,
  xnis,
  xodot,
  Xopf,
  xopf,
  xoplus,
  xotime,
  xrarr,
  xrArr,
  Xscr,
  xscr,
  xsqcup,
  xuplus,
  xutri,
  xvee,
  xwedge,
  Yacute: Yacute$1,
  yacute: yacute$1,
  YAcy,
  yacy,
  Ycirc,
  ycirc,
  Ycy,
  ycy,
  yen: yen$1,
  Yfr,
  yfr,
  YIcy,
  yicy,
  Yopf,
  yopf,
  Yscr,
  yscr,
  YUcy,
  yucy,
  yuml: yuml$1,
  Yuml,
  Zacute,
  zacute,
  Zcaron,
  zcaron,
  Zcy,
  zcy,
  Zdot,
  zdot,
  zeetrf,
  ZeroWidthSpace,
  Zeta,
  zeta,
  zfr,
  Zfr,
  ZHcy,
  zhcy,
  zigrarr,
  zopf,
  Zopf,
  Zscr,
  zscr,
  zwj,
  zwnj
};
var inverseXML = getInverseObj(require$$2), xmlReplacer = getInverseReplacer(inverseXML);
encode$1.XML = getInverse(inverseXML, xmlReplacer);
var inverseHTML = getInverseObj(require$$0$1), htmlReplacer = getInverseReplacer(inverseHTML);
encode$1.HTML = getInverse(inverseHTML, htmlReplacer);
function getInverseObj(obj) {
  return Object.keys(obj).sort().reduce(function(inverse, name) {
    inverse[obj[name]] = "&" + name + ";";
    return inverse;
  }, {});
}
function getInverseReplacer(inverse) {
  var single = [], multiple = [];
  Object.keys(inverse).forEach(function(k) {
    if (k.length === 1) {
      single.push("\\" + k);
    } else {
      multiple.push(k);
    }
  });
  multiple.unshift("[" + single.join("") + "]");
  return new RegExp(multiple.join("|"), "g");
}
var re_nonASCII = /[^\0-\x7F]/g, re_astralSymbols = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
function singleCharReplacer(c) {
  return "&#x" + c.charCodeAt(0).toString(16).toUpperCase() + ";";
}
function astralReplacer(c) {
  var high = c.charCodeAt(0);
  var low = c.charCodeAt(1);
  var codePoint = (high - 55296) * 1024 + low - 56320 + 65536;
  return "&#x" + codePoint.toString(16).toUpperCase() + ";";
}
function getInverse(inverse, re) {
  function func(name) {
    return inverse[name];
  }
  return function(data) {
    return data.replace(re, func).replace(re_astralSymbols, astralReplacer).replace(re_nonASCII, singleCharReplacer);
  };
}
var re_xmlChars = getInverseReplacer(inverseXML);
function escapeXML(data) {
  return data.replace(re_xmlChars, singleCharReplacer).replace(re_astralSymbols, astralReplacer).replace(re_nonASCII, singleCharReplacer);
}
encode$1.escape = escapeXML;
const Aacute = "Á";
const aacute = "á";
const Acirc = "Â";
const acirc = "â";
const acute = "´";
const AElig = "Æ";
const aelig = "æ";
const Agrave = "À";
const agrave = "à";
const amp = "&";
const AMP = "&";
const Aring = "Å";
const aring = "å";
const Atilde = "Ã";
const atilde = "ã";
const Auml = "Ä";
const auml = "ä";
const brvbar = "¦";
const Ccedil = "Ç";
const ccedil = "ç";
const cedil = "¸";
const cent = "¢";
const copy = "©";
const COPY = "©";
const curren = "¤";
const deg = "°";
const divide = "÷";
const Eacute = "É";
const eacute = "é";
const Ecirc = "Ê";
const ecirc = "ê";
const Egrave = "È";
const egrave = "è";
const ETH = "Ð";
const eth = "ð";
const Euml = "Ë";
const euml = "ë";
const frac12 = "½";
const frac14 = "¼";
const frac34 = "¾";
const gt = ">";
const GT = ">";
const Iacute = "Í";
const iacute = "í";
const Icirc = "Î";
const icirc = "î";
const iexcl = "¡";
const Igrave = "Ì";
const igrave = "ì";
const iquest = "¿";
const Iuml = "Ï";
const iuml = "ï";
const laquo = "«";
const lt = "<";
const LT = "<";
const macr = "¯";
const micro = "µ";
const middot = "·";
const nbsp = " ";
const not = "¬";
const Ntilde = "Ñ";
const ntilde = "ñ";
const Oacute = "Ó";
const oacute = "ó";
const Ocirc = "Ô";
const ocirc = "ô";
const Ograve = "Ò";
const ograve = "ò";
const ordf = "ª";
const ordm = "º";
const Oslash = "Ø";
const oslash = "ø";
const Otilde = "Õ";
const otilde = "õ";
const Ouml = "Ö";
const ouml = "ö";
const para = "¶";
const plusmn = "±";
const pound = "£";
const quot = '"';
const QUOT = '"';
const raquo = "»";
const reg = "®";
const REG = "®";
const sect = "§";
const shy = "­";
const sup1 = "¹";
const sup2 = "²";
const sup3 = "³";
const szlig = "ß";
const THORN = "Þ";
const thorn = "þ";
const times = "×";
const Uacute = "Ú";
const uacute = "ú";
const Ucirc = "Û";
const ucirc = "û";
const Ugrave = "Ù";
const ugrave = "ù";
const uml = "¨";
const Uuml = "Ü";
const uuml = "ü";
const Yacute = "Ý";
const yacute = "ý";
const yen = "¥";
const yuml = "ÿ";
const require$$1 = {
  Aacute,
  aacute,
  Acirc,
  acirc,
  acute,
  AElig,
  aelig,
  Agrave,
  agrave,
  amp,
  AMP,
  Aring,
  aring,
  Atilde,
  atilde,
  Auml,
  auml,
  brvbar,
  Ccedil,
  ccedil,
  cedil,
  cent,
  copy,
  COPY,
  curren,
  deg,
  divide,
  Eacute,
  eacute,
  Ecirc,
  ecirc,
  Egrave,
  egrave,
  ETH,
  eth,
  Euml,
  euml,
  frac12,
  frac14,
  frac34,
  gt,
  GT,
  Iacute,
  iacute,
  Icirc,
  icirc,
  iexcl,
  Igrave,
  igrave,
  iquest,
  Iuml,
  iuml,
  laquo,
  lt,
  LT,
  macr,
  micro,
  middot,
  nbsp,
  not,
  Ntilde,
  ntilde,
  Oacute,
  oacute,
  Ocirc,
  ocirc,
  Ograve,
  ograve,
  ordf,
  ordm,
  Oslash,
  oslash,
  Otilde,
  otilde,
  Ouml,
  ouml,
  para,
  plusmn,
  pound,
  quot,
  QUOT,
  raquo,
  reg,
  REG,
  sect,
  shy,
  sup1,
  sup2,
  sup3,
  szlig,
  THORN,
  thorn,
  times,
  Uacute,
  uacute,
  Ucirc,
  ucirc,
  Ugrave,
  ugrave,
  uml,
  Uuml,
  uuml,
  Yacute,
  yacute,
  yen,
  yuml
};
const require$$0 = {
  "0": 65533,
  "128": 8364,
  "130": 8218,
  "131": 402,
  "132": 8222,
  "133": 8230,
  "134": 8224,
  "135": 8225,
  "136": 710,
  "137": 8240,
  "138": 352,
  "139": 8249,
  "140": 338,
  "142": 381,
  "145": 8216,
  "146": 8217,
  "147": 8220,
  "148": 8221,
  "149": 8226,
  "150": 8211,
  "151": 8212,
  "152": 732,
  "153": 8482,
  "154": 353,
  "155": 8250,
  "156": 339,
  "158": 382,
  "159": 376
};
var decodeMap = require$$0;
var decode_codepoint = decodeCodePoint$1;
function decodeCodePoint$1(codePoint) {
  if (codePoint >= 55296 && codePoint <= 57343 || codePoint > 1114111) {
    return "�";
  }
  if (codePoint in decodeMap) {
    codePoint = decodeMap[codePoint];
  }
  var output = "";
  if (codePoint > 65535) {
    codePoint -= 65536;
    output += String.fromCharCode(codePoint >>> 10 & 1023 | 55296);
    codePoint = 56320 | codePoint & 1023;
  }
  output += String.fromCharCode(codePoint);
  return output;
}
var entityMap = require$$0$1, legacyMap = require$$1, xmlMap = require$$2, decodeCodePoint = decode_codepoint;
var decodeXMLStrict = getStrictDecoder(xmlMap), decodeHTMLStrict = getStrictDecoder(entityMap);
function getStrictDecoder(map2) {
  var keys = Object.keys(map2).join("|"), replace = getReplacer(map2);
  keys += "|#[xX][\\da-fA-F]+|#\\d+";
  var re = new RegExp("&(?:" + keys + ");", "g");
  return function(str) {
    return String(str).replace(re, replace);
  };
}
var decodeHTML = function() {
  var legacy = Object.keys(legacyMap).sort(sorter);
  var keys = Object.keys(entityMap).sort(sorter);
  for (var i = 0, j = 0; i < keys.length; i++) {
    if (legacy[j] === keys[i]) {
      keys[i] += ";?";
      j++;
    } else {
      keys[i] += ";";
    }
  }
  var re = new RegExp("&(?:" + keys.join("|") + "|#[xX][\\da-fA-F]+;?|#\\d+;?)", "g"), replace = getReplacer(entityMap);
  function replacer(str) {
    if (str.substr(-1) !== ";")
      str += ";";
    return replace(str);
  }
  return function(str) {
    return String(str).replace(re, replacer);
  };
}();
function sorter(a, b) {
  return a < b ? 1 : -1;
}
function getReplacer(map2) {
  return function replace(str) {
    if (str.charAt(1) === "#") {
      if (str.charAt(2) === "X" || str.charAt(2) === "x") {
        return decodeCodePoint(parseInt(str.substr(3), 16));
      }
      return decodeCodePoint(parseInt(str.substr(2), 10));
    }
    return map2[str.slice(1, -1)];
  };
}
var decode$1 = {
  XML: decodeXMLStrict,
  HTML: decodeHTML,
  HTMLStrict: decodeHTMLStrict
};
var encode = encode$1, decode = decode$1;
entities$1.decode = function(data, level) {
  return (!level || level <= 0 ? decode.XML : decode.HTML)(data);
};
entities$1.decodeStrict = function(data, level) {
  return (!level || level <= 0 ? decode.XML : decode.HTMLStrict)(data);
};
entities$1.encode = function(data, level) {
  return (!level || level <= 0 ? encode.XML : encode.HTML)(data);
};
entities$1.encodeXML = encode.XML;
entities$1.encodeHTML4 = entities$1.encodeHTML5 = entities$1.encodeHTML = encode.HTML;
entities$1.decodeXML = entities$1.decodeXMLStrict = decode.XML;
entities$1.decodeHTML4 = entities$1.decodeHTML5 = entities$1.decodeHTML = decode.HTML;
entities$1.decodeHTML4Strict = entities$1.decodeHTML5Strict = entities$1.decodeHTMLStrict = decode.HTMLStrict;
entities$1.escape = encode.escape;
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target2, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target2, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties(Constructor, staticProps);
  return Constructor;
}
var entities = entities$1;
var defaults = {
  fg: "#FFF",
  bg: "#000",
  newline: false,
  escapeXML: false,
  stream: false,
  colors: getDefaultColors()
};
function getDefaultColors() {
  var colors = {
    0: "#000",
    1: "#A00",
    2: "#0A0",
    3: "#A50",
    4: "#00A",
    5: "#A0A",
    6: "#0AA",
    7: "#AAA",
    8: "#555",
    9: "#F55",
    10: "#5F5",
    11: "#FF5",
    12: "#55F",
    13: "#F5F",
    14: "#5FF",
    15: "#FFF"
  };
  range(0, 5).forEach(function(red) {
    range(0, 5).forEach(function(green) {
      range(0, 5).forEach(function(blue) {
        return setStyleColor(red, green, blue, colors);
      });
    });
  });
  range(0, 23).forEach(function(gray) {
    var c = gray + 232;
    var l = toHexString(gray * 10 + 8);
    colors[c] = "#" + l + l + l;
  });
  return colors;
}
function setStyleColor(red, green, blue, colors) {
  var c = 16 + red * 36 + green * 6 + blue;
  var r = red > 0 ? red * 40 + 55 : 0;
  var g = green > 0 ? green * 40 + 55 : 0;
  var b = blue > 0 ? blue * 40 + 55 : 0;
  colors[c] = toColorHexString([r, g, b]);
}
function toHexString(num2) {
  var str = num2.toString(16);
  while (str.length < 2) {
    str = "0" + str;
  }
  return str;
}
function toColorHexString(ref2) {
  var results = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = void 0;
  try {
    for (var _iterator = ref2[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var r = _step.value;
      results.push(toHexString(r));
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
  return "#" + results.join("");
}
function generateOutput(stack, token, data, options) {
  var result;
  if (token === "text") {
    result = pushText(data, options);
  } else if (token === "display") {
    result = handleDisplay(stack, data, options);
  } else if (token === "xterm256") {
    result = pushForegroundColor(stack, options.colors[data]);
  } else if (token === "rgb") {
    result = handleRgb(stack, data);
  }
  return result;
}
function handleRgb(stack, data) {
  data = data.substring(2).slice(0, -1);
  var operation = +data.substr(0, 2);
  var color = data.substring(5).split(";");
  var rgb = color.map(function(value) {
    return ("0" + Number(value).toString(16)).substr(-2);
  }).join("");
  return pushStyle(stack, (operation === 38 ? "color:#" : "background-color:#") + rgb);
}
function handleDisplay(stack, code, options) {
  code = parseInt(code, 10);
  var codeMap = {
    "-1": function _() {
      return "<br/>";
    },
    0: function _() {
      return stack.length && resetStyles(stack);
    },
    1: function _() {
      return pushTag(stack, "b");
    },
    3: function _() {
      return pushTag(stack, "i");
    },
    4: function _() {
      return pushTag(stack, "u");
    },
    8: function _() {
      return pushStyle(stack, "display:none");
    },
    9: function _() {
      return pushTag(stack, "strike");
    },
    22: function _() {
      return pushStyle(stack, "font-weight:normal;text-decoration:none;font-style:normal");
    },
    23: function _() {
      return closeTag(stack, "i");
    },
    24: function _() {
      return closeTag(stack, "u");
    },
    39: function _() {
      return pushForegroundColor(stack, options.fg);
    },
    49: function _() {
      return pushBackgroundColor(stack, options.bg);
    },
    53: function _() {
      return pushStyle(stack, "text-decoration:overline");
    }
  };
  var result;
  if (codeMap[code]) {
    result = codeMap[code]();
  } else if (4 < code && code < 7) {
    result = pushTag(stack, "blink");
  } else if (29 < code && code < 38) {
    result = pushForegroundColor(stack, options.colors[code - 30]);
  } else if (39 < code && code < 48) {
    result = pushBackgroundColor(stack, options.colors[code - 40]);
  } else if (89 < code && code < 98) {
    result = pushForegroundColor(stack, options.colors[8 + (code - 90)]);
  } else if (99 < code && code < 108) {
    result = pushBackgroundColor(stack, options.colors[8 + (code - 100)]);
  }
  return result;
}
function resetStyles(stack) {
  var stackClone = stack.slice(0);
  stack.length = 0;
  return stackClone.reverse().map(function(tag) {
    return "</" + tag + ">";
  }).join("");
}
function range(low, high) {
  var results = [];
  for (var j = low; j <= high; j++) {
    results.push(j);
  }
  return results;
}
function notCategory(category) {
  return function(e) {
    return (category === null || e.category !== category) && category !== "all";
  };
}
function categoryForCode(code) {
  code = parseInt(code, 10);
  var result = null;
  if (code === 0) {
    result = "all";
  } else if (code === 1) {
    result = "bold";
  } else if (2 < code && code < 5) {
    result = "underline";
  } else if (4 < code && code < 7) {
    result = "blink";
  } else if (code === 8) {
    result = "hide";
  } else if (code === 9) {
    result = "strike";
  } else if (29 < code && code < 38 || code === 39 || 89 < code && code < 98) {
    result = "foreground-color";
  } else if (39 < code && code < 48 || code === 49 || 99 < code && code < 108) {
    result = "background-color";
  }
  return result;
}
function pushText(text, options) {
  if (options.escapeXML) {
    return entities.encodeXML(text);
  }
  return text;
}
function pushTag(stack, tag, style) {
  if (!style) {
    style = "";
  }
  stack.push(tag);
  return ["<" + tag, style ? ' style="' + style + '"' : void 0, ">"].join("");
}
function pushStyle(stack, style) {
  return pushTag(stack, "span", style);
}
function pushForegroundColor(stack, color) {
  return pushTag(stack, "span", "color:" + color);
}
function pushBackgroundColor(stack, color) {
  return pushTag(stack, "span", "background-color:" + color);
}
function closeTag(stack, style) {
  var last;
  if (stack.slice(-1)[0] === style) {
    last = stack.pop();
  }
  if (last) {
    return "</" + style + ">";
  }
}
function tokenize(text, options, callback) {
  var ansiMatch = false;
  var ansiHandler = 3;
  function remove() {
    return "";
  }
  function removeXterm256(m, g1) {
    callback("xterm256", g1);
    return "";
  }
  function newline(m) {
    if (options.newline) {
      callback("display", -1);
    } else {
      callback("text", m);
    }
    return "";
  }
  function ansiMess(m, g1) {
    ansiMatch = true;
    if (g1.trim().length === 0) {
      g1 = "0";
    }
    g1 = g1.trimRight(";").split(";");
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = void 0;
    try {
      for (var _iterator2 = g1[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var g = _step2.value;
        callback("display", g);
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
          _iterator2["return"]();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
    return "";
  }
  function realText(m) {
    callback("text", m);
    return "";
  }
  function rgb(m) {
    callback("rgb", m);
    return "";
  }
  var tokens = [{
    pattern: /^\x08+/,
    sub: remove
  }, {
    pattern: /^\x1b\[[012]?K/,
    sub: remove
  }, {
    pattern: /^\x1b\[\(B/,
    sub: remove
  }, {
    pattern: /^\x1b\[[34]8;2;\d+;\d+;\d+m/,
    sub: rgb
  }, {
    pattern: /^\x1b\[38;5;(\d+)m/,
    sub: removeXterm256
  }, {
    pattern: /^\n/,
    sub: newline
  }, {
    pattern: /^\r+\n/,
    sub: newline
  }, {
    pattern: /^\x1b\[((?:\d{1,3};?)+|)m/,
    sub: ansiMess
  }, {
    // CSI n J
    // ED - Erase in Display Clears part of the screen.
    // If n is 0 (or missing), clear from cursor to end of screen.
    // If n is 1, clear from cursor to beginning of the screen.
    // If n is 2, clear entire screen (and moves cursor to upper left on DOS ANSI.SYS).
    // If n is 3, clear entire screen and delete all lines saved in the scrollback buffer
    //   (this feature was added for xterm and is supported by other terminal applications).
    pattern: /^\x1b\[\d?J/,
    sub: remove
  }, {
    // CSI n ; m f
    // HVP - Horizontal Vertical Position Same as CUP
    pattern: /^\x1b\[\d{0,3};\d{0,3}f/,
    sub: remove
  }, {
    // catch-all for CSI sequences?
    pattern: /^\x1b\[?[\d;]{0,3}/,
    sub: remove
  }, {
    /**
     * extracts real text - not containing:
     * - `\x1b' - ESC - escape (Ascii 27)
     * - '\x08' - BS - backspace (Ascii 8)
     * - `\n` - Newline - linefeed (LF) (ascii 10)
     * - `\r` - Windows Carriage Return (CR)
     */
    pattern: /^(([^\x1b\x08\r\n])+)/,
    sub: realText
  }];
  function process(handler2, i2) {
    if (i2 > ansiHandler && ansiMatch) {
      return;
    }
    ansiMatch = false;
    text = text.replace(handler2.pattern, handler2.sub);
  }
  var results1 = [];
  var _text = text, length = _text.length;
  outer:
    while (length > 0) {
      for (var i = 0, o = 0, len = tokens.length; o < len; i = ++o) {
        var handler = tokens[i];
        process(handler, i);
        if (text.length !== length) {
          length = text.length;
          continue outer;
        }
      }
      if (text.length === length) {
        break;
      }
      results1.push(0);
      length = text.length;
    }
  return results1;
}
function updateStickyStack(stickyStack, token, data) {
  if (token !== "text") {
    stickyStack = stickyStack.filter(notCategory(categoryForCode(data)));
    stickyStack.push({
      token,
      data,
      category: categoryForCode(data)
    });
  }
  return stickyStack;
}
var Filter = /* @__PURE__ */ function() {
  function Filter2(options) {
    _classCallCheck(this, Filter2);
    options = options || {};
    if (options.colors) {
      options.colors = Object.assign({}, defaults.colors, options.colors);
    }
    this.options = Object.assign({}, defaults, options);
    this.stack = [];
    this.stickyStack = [];
  }
  _createClass(Filter2, [{
    key: "toHtml",
    value: function toHtml(input) {
      var _this = this;
      input = typeof input === "string" ? [input] : input;
      var stack = this.stack, options = this.options;
      var buf = [];
      this.stickyStack.forEach(function(element) {
        var output = generateOutput(stack, element.token, element.data, options);
        if (output) {
          buf.push(output);
        }
      });
      tokenize(input.join(""), options, function(token, data) {
        var output = generateOutput(stack, token, data, options);
        if (output) {
          buf.push(output);
        }
        if (options.stream) {
          _this.stickyStack = updateStickyStack(_this.stickyStack, token, data);
        }
      });
      if (stack.length) {
        buf.push(resetStyles(stack));
      }
      return buf.join("");
    }
  }]);
  return Filter2;
}();
var ansi_to_html = Filter;
const ansiToHtml = ansi_to_html;
const _hoisted_1$b = ["innerHTML"];
const _sfc_main$d = /* @__PURE__ */ defineComponent({
  __name: "ScriptError",
  props: {
    error: null
  },
  setup(__props) {
    const props = __props;
    const autStore = useAutStore();
    const convert = new ansiToHtml({
      fg: "#000",
      bg: "#fff",
      newline: false,
      escapeXML: true,
      stream: false
    });
    const scriptError = computed(() => convert.toHtml(props.error));
    const style = computed(() => `height: calc(100vh - ${autStore.specRunnerHeaderHeight + 32}px)`);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("pre", {
        class: "bg-white text-sm p-[24px] text-red-500 overflow-auto whitespace-pre-wrap break-all",
        style: normalizeStyle(unref(style)),
        innerHTML: unref(scriptError)
      }, null, 12, _hoisted_1$b);
    };
  }
});
const __default__ = {
  name: "ResizablePanels"
};
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  ...__default__,
  props: {
    showPanel1: { type: Boolean, default: true },
    showPanel2: { type: Boolean, default: true },
    initialPanel1Width: { default: runnerConstants.defaultSpecListWidth },
    initialPanel2Width: { default: runnerConstants.defaultReporterWidth },
    minPanel1Width: { default: 200 },
    minPanel2Width: { default: 220 },
    minPanel3Width: { default: 100 },
    maxTotalWidth: { default: window.innerWidth },
    offsetLeft: { default: 0 }
  },
  emits: ["resizeEnd", "panelWidthUpdated"],
  setup(__props, { emit }) {
    const props = __props;
    const panel1HandleX = ref(props.initialPanel1Width);
    const panel2HandleX = ref(props.initialPanel2Width + props.initialPanel1Width);
    const panel1IsDragging = ref(false);
    const panel2IsDragging = ref(false);
    const cachedPanel1Width = ref(props.initialPanel1Width);
    const panel2Width = ref(props.initialPanel2Width);
    const handleMousedown = (panel, event) => {
      if (panel === "panel1") {
        panel1IsDragging.value = true;
      } else if (panel === "panel2") {
        panel2IsDragging.value = true;
        panel2HandleX.value = event.clientX;
      }
    };
    const handleMousemove = (event) => {
      if (!panel1IsDragging.value && !panel2IsDragging.value) {
        return;
      }
      if (panel1IsDragging.value && isNewWidthAllowed(event.clientX, "panel1")) {
        panel1HandleX.value = event.clientX;
        cachedPanel1Width.value = event.clientX - props.offsetLeft;
        emit("panelWidthUpdated", { panel: "panel1", width: panel1Width.value });
      } else if (panel2IsDragging.value && isNewWidthAllowed(event.clientX, "panel2")) {
        panel2HandleX.value = event.clientX;
        panel2Width.value = event.clientX - props.offsetLeft - panel1Width.value;
        emit("panelWidthUpdated", { panel: "panel2", width: panel2Width.value });
      }
    };
    const handleMouseup = () => {
      if (panel1IsDragging.value) {
        panel1IsDragging.value = false;
        handleResizeEnd("panel1");
        return;
      }
      handleResizeEnd("panel2");
      panel2IsDragging.value = false;
    };
    const maxPanel1Width = computed(() => {
      const unavailableWidth = panel2Width.value + props.minPanel3Width;
      return props.maxTotalWidth - unavailableWidth;
    });
    const panel1Width = computed(() => {
      if (!props.showPanel1) {
        return 0;
      }
      return cachedPanel1Width.value;
    });
    const maxPanel2Width = computed(() => {
      const unavailableWidth = panel1Width.value + props.minPanel3Width;
      return props.maxTotalWidth - unavailableWidth;
    });
    const panel3width = computed(() => {
      const panel3SpaceAvailable = props.maxTotalWidth - panel1Width.value - panel2Width.value;
      const minimumWithBuffer = props.minPanel3Width;
      return panel3SpaceAvailable < props.minPanel3Width ? minimumWithBuffer : panel3SpaceAvailable;
    });
    function handleResizeEnd(panel) {
      emit("resizeEnd", panel);
    }
    function isNewWidthAllowed(mouseClientX, panel) {
      const isMaxWidthSmall = props.maxTotalWidth < panel1Width.value + panel2Width.value + props.minPanel3Width;
      const fallbackWidth = 50;
      if (panel === "panel1") {
        const newWidth2 = mouseClientX - props.offsetLeft;
        if (isMaxWidthSmall && newWidth2 > fallbackWidth) {
          return true;
        }
        const result = panel1IsDragging.value && newWidth2 >= props.minPanel1Width && newWidth2 <= maxPanel1Width.value;
        return result;
      }
      const newWidth = mouseClientX - props.offsetLeft - panel1Width.value;
      if (isMaxWidthSmall && newWidth > fallbackWidth) {
        return true;
      }
      return panel2IsDragging.value && newWidth >= props.minPanel2Width && newWidth <= maxPanel2Width.value;
    }
    watchEffect(() => {
      if (!props.showPanel1) {
        emit("panelWidthUpdated", { panel: "panel1", width: 0 });
      } else if (props.showPanel1) {
        emit("panelWidthUpdated", { panel: "panel1", width: cachedPanel1Width.value });
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        id: "resizable-panels-root",
        class: normalizeClass(["flex", {
          "select-none": panel1IsDragging.value || panel2IsDragging.value
        }]),
        onMouseup: handleMouseup,
        onMousemove: handleMousemove
      }, [
        withDirectives(createBaseVNode("div", {
          "data-cy": "specs-list-panel",
          class: "h-full shrink-0 z-20 relative",
          style: normalizeStyle({ width: `${unref(panel1Width)}px` })
        }, [
          renderSlot(_ctx.$slots, "panel1", { isDragging: panel1IsDragging.value }),
          createBaseVNode("div", {
            "data-cy": "panel1ResizeHandle",
            class: "cursor-ew-resize h-full top-0 right-[-6px] w-[10px] z-30 absolute",
            onMousedown: _cache[0] || (_cache[0] = ($event) => handleMousedown("panel1", $event))
          }, null, 32)
        ], 4), [
          [vShow, __props.showPanel1]
        ]),
        withDirectives(createBaseVNode("div", {
          "data-cy": "reporter-panel",
          class: "h-full shrink-0 z-10 relative",
          style: normalizeStyle({ width: `${panel2Width.value}px` })
        }, [
          renderSlot(_ctx.$slots, "panel2"),
          createBaseVNode("div", {
            "data-cy": "panel2ResizeHandle",
            class: "cursor-ew-resize h-full top-0 right-[-6px] w-[10px] z-30 absolute",
            onMousedown: _cache[1] || (_cache[1] = ($event) => handleMousedown("panel2", $event))
          }, null, 32)
        ], 4), [
          [vShow, __props.showPanel2]
        ]),
        createBaseVNode("div", {
          "data-cy": "aut-panel",
          class: normalizeClass(["grow h-full bg-gray-100 relative", { "pointer-events-none": panel2IsDragging.value }]),
          style: normalizeStyle({
            width: `${unref(panel3width)}px`
          })
        }, [
          renderSlot(_ctx.$slots, "panel3", { width: unref(panel3width) })
        ], 6)
      ], 34);
    };
  }
});
const _hoisted_1$a = ["id"];
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "AutomationElement",
  setup(__props) {
    const automationElementId = UnifiedRunnerAPI.getAutomationElementId();
    const runnerUiStore = useRunnerUiStore();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        id: unref(automationElementId),
        style: { "display": "none" }
      }, toDisplayString(unref(runnerUiStore).randomString), 9, _hoisted_1$a);
    };
  }
});
const { collapsedNavBarWidth } = runnerConstants;
const autMargin = 16;
const reporterWidth = ref(0);
const specListWidth = ref(0);
const useRunnerStyle = () => {
  const { width: windowWidth, height: windowHeight } = useWindowSize();
  const runnerUIStore = useRunnerUiStore();
  const screenshotStore = useScreenshotStore();
  const autStore = useAutStore();
  const { reporterWidth: initialReporterWidth, specListWidth: initialSpecsListWidth } = runnerUIStore;
  reporterWidth.value = initialReporterWidth;
  specListWidth.value = initialSpecsListWidth;
  const containerWidth = computed(() => {
    const miscBorders = 4;
    const containerMinimum = 50;
    let nonAutWidth = autMargin * 2;
    if (!isRunMode) {
      nonAutWidth += collapsedNavBarWidth;
    }
    if (!window.__CYPRESS_CONFIG__.hideCommandLog) {
      nonAutWidth += reporterWidth.value + specListWidth.value + miscBorders;
    }
    const containerWidth2 = windowWidth.value - nonAutWidth;
    const newContainerWidth = containerWidth2 < containerMinimum ? containerMinimum : containerWidth2;
    return newContainerWidth;
  });
  const containerHeight = computed(() => {
    const nonAutHeight = autStore.specRunnerHeaderHeight + autMargin * 2;
    return windowHeight.value - nonAutHeight;
  });
  const scale = computed(() => {
    let scale2 = 1;
    if (!screenshotStore.isScreenshotting) {
      scale2 = Math.min(containerWidth.value / autStore.viewportDimensions.width, containerHeight.value / autStore.viewportDimensions.height, 1);
    }
    return scale2;
  });
  const viewportStyle = computed(() => {
    let style = `
    width: ${autStore.viewportDimensions.width}px;
    height: ${autStore.viewportDimensions.height}px;
    transform: scale(${scale.value});
    position: absolute;
    `;
    if (!screenshotStore.isScreenshotting) {
      style += `
      margin-left: ${containerWidth.value / 2 - autStore.viewportDimensions.width / 2}px`;
    }
    return style;
  });
  watchEffect(() => {
    autStore.setScale(scale.value);
  });
  return {
    viewportStyle,
    windowWidth: computed(() => {
      if (isRunMode) {
        return windowWidth.value;
      }
      return windowWidth.value - collapsedNavBarWidth;
    })
  };
};
function useResizablePanels() {
  const preferences = usePreferences();
  const handleResizeEnd = (panel) => {
    if (panel === "panel1") {
      preferences.update("specListWidth", specListWidth.value);
    } else {
      preferences.update("reporterWidth", reporterWidth.value);
    }
  };
  const handlePanelWidthUpdated = ({ panel, width }) => {
    if (panel === "panel1") {
      specListWidth.value = width;
    } else {
      reporterWidth.value = width;
    }
  };
  return {
    handlePanelWidthUpdated,
    handleResizeEnd
  };
}
function useEventManager() {
  const eventManager = getEventManager();
  const autStore = useAutStore();
  const specStore = useSpecStore();
  const studioStore = useStudioStore();
  const router = useRouter();
  function runSpec(isRerun = false) {
    if (!specStore.activeSpec) {
      throw Error(`Cannot run spec when specStore.active spec is null or undefined!`);
    }
    autStore.setScriptError(null);
    UnifiedRunnerAPI.executeSpec(specStore.activeSpec, isRerun);
  }
  function initializeRunnerLifecycleEvents() {
    eventManager.on("restart", () => {
      if (specStore.activeSpec) {
        const isRerun = true;
        runSpec(isRerun);
      }
    });
    eventManager.on("script:error", (err) => {
      autStore.setScriptError(err);
    });
    eventManager.on("visit:failed", (payload) => {
      getAutIframeModel().showVisitFailure(payload);
    });
    eventManager.on("page:loading", (isLoading) => {
      if (isLoading) {
        return;
      }
      getAutIframeModel().reattachStudio();
    });
    eventManager.on("visit:blank", ({ testIsolation }) => {
      getAutIframeModel().visitBlankPage(testIsolation);
    });
    eventManager.on("run:end", () => {
      if (studioStore.isLoading) {
        getAutIframeModel().startStudio();
      }
    });
    eventManager.on("expect:origin", addCrossOriginIframe);
    eventManager.on("testFilter:cloudDebug:dismiss", () => {
      const currentRoute = router.currentRoute.value;
      const { mode, ...query } = currentRoute.query;
      router.replace({ ...currentRoute, query });
    });
  }
  const startSpecWatcher = () => {
    return watch(() => specStore.activeSpec, () => {
      if (specStore.activeSpec) {
        runSpec();
      }
    }, { immediate: true, flush: "post" });
  };
  function cleanupRunner() {
    empty$1(getRunnerElement());
    window.UnifiedRunner.shortcuts.stop();
    const reporterElement = getReporterElement();
    if (reporterElement) {
      empty$1(reporterElement);
    }
  }
  return {
    initializeRunnerLifecycleEvents,
    runSpec,
    startSpecWatcher,
    cleanupRunner
  };
}
const _hoisted_1$9 = /* @__PURE__ */ createBaseVNode("img", {
  class: "h-[64px] w-[64px]",
  src: _imports_0
}, null, -1);
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "AutInfo",
  setup(__props) {
    const { windowWidth } = useRunnerStyle();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "flex flex-col p-[32px] gap-[16px] items-center",
        style: normalizeStyle({ width: `${unref(windowWidth)}px` })
      }, [
        _hoisted_1$9,
        renderSlot(_ctx.$slots, "default")
      ], 4);
    };
  }
});
const _hoisted_1$8 = { class: "flex flex-col gap-[16px]" };
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "AutomationDisconnected",
  setup(__props) {
    const { t } = useI18n$1();
    gql`
mutation AutomationDisconnected_RelaunchBrowser {
  launchOpenProject {
    id
  }
}
`;
    const gqlRelaunch = useMutation(AutomationDisconnected_RelaunchBrowserDocument);
    const relaunch = () => gqlRelaunch.executeMutation({});
    return (_ctx, _cache) => {
      const _component_i_cy_book_x16 = __unplugin_components_0$a;
      return openBlock(), createBlock(_sfc_main$a, null, {
        default: withCtx(() => [
          createVNode(_sfc_main$E, {
            title: unref(t)("runner.automation.disconnected.title"),
            status: "warning",
            icon: unref(ErrorOutlineIcon),
            dismissible: false,
            class: "w-full max-w-[600px]"
          }, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_1$8, [
                createBaseVNode("p", null, toDisplayString(unref(t)("runner.automation.disconnected.description")), 1),
                createVNode(_sfc_main$A, {
                  size: "md",
                  "prefix-icon": unref(RefreshIcon$1),
                  "prefix-icon-class": "icon-dark-white",
                  onClick: relaunch
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(t)("runner.automation.disconnected.reload")), 1)
                  ]),
                  _: 1
                }, 8, ["prefix-icon"]),
                createVNode(_sfc_main$D, {
                  class: "mt-[16px] text-indigo-500",
                  href: "https://on.cypress.io/launching-browsers"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_i_cy_book_x16, { class: "ml-[8px] -top-[2px] relative inline-block icon-dark-indigo-500 icon-light-indigo-100" }),
                    createTextVNode(" " + toDisplayString(unref(t)("runner.automation.shared.link")), 1)
                  ]),
                  _: 1
                })
              ])
            ]),
            _: 1
          }, 8, ["title", "icon"])
        ]),
        _: 1
      });
    };
  }
});
const _hoisted_1$7 = { class: "flex flex-col gap-[16px]" };
const _hoisted_2$7 = ["src"];
const _hoisted_3$4 = { class: "max-h-[50vh] overflow-auto" };
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "AutomationMissing",
  props: {
    gql: { default: null }
  },
  setup(__props) {
    var _a;
    const props = __props;
    const { t } = useI18n$1();
    gql`
fragment AutomationMissing on CurrentProject {
  id
  ...VerticalBrowserListItems
  activeBrowser {
    id
    displayName
    majorVersion
  }
}
`;
    const selectedBrowser = ref({ ...(_a = props.gql) == null ? void 0 : _a.activeBrowser });
    return (_ctx, _cache) => {
      const _component_i_cy_book_x16 = __unplugin_components_0$a;
      return openBlock(), createBlock(_sfc_main$a, null, {
        default: withCtx(() => [
          createVNode(_sfc_main$E, {
            title: unref(t)("runner.automation.missing.title"),
            status: "warning",
            icon: unref(ErrorOutlineIcon),
            dismissible: false,
            overflow: false,
            class: "w-full max-w-[600px]"
          }, {
            default: withCtx(() => {
              var _a2;
              return [
                createBaseVNode("div", _hoisted_1$7, [
                  createBaseVNode("p", null, toDisplayString(unref(t)("runner.automation.missing.description")), 1),
                  props.gql && ((_a2 = selectedBrowser.value) == null ? void 0 : _a2.displayName) ? (openBlock(), createBlock(_sfc_main$i, {
                    key: 0,
                    align: "left",
                    class: "max-w-max",
                    "data-cy": "select-browser"
                  }, {
                    heading: withCtx(() => [
                      createBaseVNode("img", {
                        class: "min-w-[16px] w-[16px]",
                        src: unref(allBrowsersIcons)[selectedBrowser.value.displayName] || unref(allBrowsersIcons).generic
                      }, null, 8, _hoisted_2$7),
                      createTextVNode(" " + toDisplayString(selectedBrowser.value.displayName) + " " + toDisplayString(selectedBrowser.value.majorVersion), 1)
                    ]),
                    default: withCtx(() => [
                      createBaseVNode("div", _hoisted_3$4, [
                        createVNode(_sfc_main$B, {
                          gql: props.gql
                        }, null, 8, ["gql"])
                      ])
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  createVNode(_sfc_main$D, {
                    class: "mt-[16px] text-indigo-500",
                    href: "https://on.cypress.io/launching-browsers"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_i_cy_book_x16, { class: "ml-[8px] -top-[2px] relative inline-block icon-dark-indigo-500 icon-light-indigo-100" }),
                      createTextVNode(" " + toDisplayString(unref(t)("runner.automation.shared.link")), 1)
                    ]),
                    _: 1
                  })
                ])
              ];
            }),
            _: 1
          }, 8, ["title", "icon"])
        ]),
        _: 1
      });
    };
  }
});
const _hoisted_1$6 = { class: "max-w-2xl p-6 text-gray-900" };
const _hoisted_2$6 = { class: "mb-1" };
const _hoisted_3$3 = /* @__PURE__ */ createBaseVNode("ul", { class: "mb-1" }, [
  /* @__PURE__ */ createBaseVNode("li", null, [
    /* @__PURE__ */ createBaseVNode("pre", null, ".check()")
  ]),
  /* @__PURE__ */ createBaseVNode("li", null, [
    /* @__PURE__ */ createBaseVNode("pre", null, ".click()")
  ]),
  /* @__PURE__ */ createBaseVNode("li", null, [
    /* @__PURE__ */ createBaseVNode("pre", null, ".select()")
  ]),
  /* @__PURE__ */ createBaseVNode("li", null, [
    /* @__PURE__ */ createBaseVNode("pre", null, ".type()")
  ]),
  /* @__PURE__ */ createBaseVNode("li", null, [
    /* @__PURE__ */ createBaseVNode("pre", null, ".uncheck()")
  ])
], -1);
const _hoisted_4$3 = {
  class: "text-indigo-500",
  href: "https://on.cypress.io/studio-beta",
  target: "_blank"
};
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "StudioInstructionsModal",
  props: {
    open: { type: Boolean }
  },
  emits: ["close"],
  setup(__props, { emit }) {
    const props = __props;
    const { t } = useI18n$1();
    return (_ctx, _cache) => {
      const _component_i18n_t = resolveComponent("i18n-t");
      return openBlock(), createBlock(_sfc_main$F, {
        "model-value": props.open,
        "help-link": "https://on.cypress.io/guides/references/cypress-studio",
        "help-text": unref(t)("links.learnMoreButton"),
        variant: "bare",
        "data-cy": "studio-instructions-modal",
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => emit("close"))
      }, {
        title: withCtx(() => [
          createTextVNode(toDisplayString(unref(t)("runner.studio.studio")) + " " + toDisplayString(unref(t)("versions.beta")), 1)
        ]),
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_1$6, [
            createBaseVNode("p", _hoisted_2$6, toDisplayString(unref(t)("runner.studio.studioDetailedDescription")), 1),
            _hoisted_3$3,
            createBaseVNode("p", null, [
              createTextVNode(toDisplayString(unref(t)("runner.studio.experimentalMessage")) + " ", 1),
              createVNode(_component_i18n_t, {
                scope: "global",
                keypath: "runner.studio.feedbackPrompt"
              }, {
                default: withCtx(() => [
                  createBaseVNode("a", _hoisted_4$3, toDisplayString(unref(t)("runner.studio.feedbackLink")), 1)
                ]),
                _: 1
              })
            ])
          ])
        ]),
        _: 1
      }, 8, ["model-value", "help-text"]);
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
const _hoisted_2$5 = /* @__PURE__ */ createBaseVNode("path", {
  d: "M12.9497 12.9497C10.2161 15.6834 5.78392 15.6834 3.05025 12.9497C0.316583 10.2161 0.316583 5.78392 3.05025 3.05025C5.78392 0.316583 10.2161 0.316583 12.9497 3.05025C15.6834 5.78392 15.6834 10.2161 12.9497 12.9497Z",
  stroke: "#1B1E2E",
  "stroke-width": "2",
  class: "icon-dark"
}, null, -1);
const _hoisted_3$2 = /* @__PURE__ */ createBaseVNode("path", {
  d: "M6 8L7.5 10L10 6",
  stroke: "#1B1E2E",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  class: "icon-dark"
}, null, -1);
const _hoisted_4$2 = [
  _hoisted_2$5,
  _hoisted_3$2
];
function render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1$5, _hoisted_4$2);
}
const __unplugin_components_0 = { name: "cy-circle-check_x16", render };
const _hoisted_1$4 = { class: "max-w-sm w-sm py-5 px-5" };
const _hoisted_2$4 = { class: "w-full" };
const _hoisted_3$1 = { class: "ml-3" };
const _hoisted_4$1 = ["disabled"];
const _hoisted_5$1 = { class: "rounded-md flex bg-indigo-500 py-1.5 px-1 align-center hover:bg-indigo-400" };
const _hoisted_6$1 = { class: "ml-2 pt-1" };
const _hoisted_7 = { class: "font-medium mx-2 text-white" };
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "StudioSaveModal",
  props: {
    open: { type: Boolean }
  },
  emits: ["close"],
  setup(__props, { emit }) {
    const props = __props;
    const { t } = useI18n$1();
    const studioStore = useStudioStore();
    const testName = ref("");
    function submit(e) {
      e.preventDefault();
      studioStore.save(testName.value);
    }
    return (_ctx, _cache) => {
      const _component_i_cy_circle_check_x16 = __unplugin_components_0;
      return openBlock(), createBlock(_sfc_main$F, {
        "model-value": props.open,
        "no-help": true,
        variant: "bare",
        "data-cy": "studio-save-modal",
        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => emit("close"))
      }, {
        title: withCtx(() => [
          createTextVNode(toDisplayString(unref(t)("runner.studio.saveTest")), 1)
        ]),
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_1$4, [
            createBaseVNode("form", {
              class: "flex items-center justify-evenly",
              onSubmit: submit
            }, [
              createBaseVNode("div", _hoisted_2$4, [
                createVNode(Input, {
                  id: "testName",
                  modelValue: testName.value,
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => testName.value = $event),
                  class: "rounded-md",
                  placeholder: unref(t)("runner.studio.testName"),
                  type: "text",
                  required: true
                }, null, 8, ["modelValue", "placeholder"])
              ]),
              createBaseVNode("div", _hoisted_3$1, [
                createBaseVNode("button", {
                  class: "disabled:opacity-50 disabled:pointer-events-none",
                  type: "submit",
                  disabled: !testName.value
                }, [
                  createBaseVNode("div", _hoisted_5$1, [
                    createBaseVNode("div", _hoisted_6$1, [
                      createVNode(_component_i_cy_circle_check_x16, { class: "fill-gray-200 stroke-gray-1000" })
                    ]),
                    createBaseVNode("div", _hoisted_7, toDisplayString(unref(t)("runner.studio.saveTestButton")), 1)
                  ])
                ], 8, _hoisted_4$1)
              ])
            ], 32)
          ])
        ]),
        _: 1
      }, 8, ["model-value"]);
    };
  }
});
const _hoisted_1$3 = ["id"];
const _hoisted_2$3 = ["id"];
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "SpecRunnerOpenMode",
  props: {
    gql: null
  },
  setup(__props) {
    const props = __props;
    const {
      preferredMinimumPanelWidth,
      absoluteAutMinimum,
      absoluteSpecListMinimum,
      absoluteReporterMinimum,
      collapsedNavBarWidth: collapsedNavBarWidth2
    } = runnerConstants;
    gql`
fragment SpecRunner_Preferences on Query {
  localSettings {
    preferences {
      isSideNavigationOpen
      isSpecsListOpen
      autoScrollingEnabled
      reporterWidth
      specListWidth
    }
  }
}
`;
    gql`
fragment SpecRunner_Config on CurrentProject {
  id
  config
}
`;
    gql`
fragment SpecRunner on Query {
  ...Specs_InlineSpecList
  currentProject {
    id
    ...SpecRunner_Config
    ...SpecRunnerHeader
    ...AutomationMissing
  }
  ...ChooseExternalEditor
  ...SpecRunner_Preferences
}
`;
    gql`
mutation SpecRunnerOpenMode_OpenFileInIDE ($input: FileDetailsInput!) {
  openFileInIDE (input: $input)
}
`;
    const eventManager = getEventManager();
    const autStore = useAutStore();
    const screenshotStore = useScreenshotStore();
    const runnerUiStore = useRunnerUiStore();
    const preferences = usePreferences();
    const {
      handlePanelWidthUpdated,
      handleResizeEnd
    } = useResizablePanels();
    const {
      initializeRunnerLifecycleEvents,
      startSpecWatcher,
      cleanupRunner
    } = useEventManager();
    const studioStore = useStudioStore();
    const specsListWidthPreferences = computed(() => {
      return props.gql.localSettings.preferences.specListWidth ?? runnerUiStore.specListWidth;
    });
    const reporterWidthPreferences = computed(() => {
      return props.gql.localSettings.preferences.reporterWidth ?? runnerUiStore.reporterWidth;
    });
    const isSpecsListOpenPreferences = computed(() => {
      return props.gql.localSettings.preferences.isSpecsListOpen ?? false;
    });
    const hideCommandLog = runnerUiStore.hideCommandLog;
    startSpecWatcher();
    onMounted(() => {
      initializeRunnerLifecycleEvents();
    });
    preferences.update("autoScrollingEnabled", props.gql.localSettings.preferences.autoScrollingEnabled ?? true);
    if (!hideCommandLog) {
      preferences.update("isSpecsListOpen", isSpecsListOpenPreferences.value);
      preferences.update("reporterWidth", reporterWidthPreferences.value);
      preferences.update("specListWidth", specsListWidthPreferences.value);
    }
    const {
      viewportStyle,
      windowWidth
    } = useRunnerStyle();
    function getMinimum(absoluteMinimum, doesContentFit) {
      return doesContentFit ? Math.min(absoluteMinimum, windowWidth.value / 6) : preferredMinimumPanelWidth;
    }
    const minWidths = computed(() => {
      let smallestIdealWindowSize = preferredMinimumPanelWidth * 2 + collapsedNavBarWidth2;
      let contentWidth = reporterWidthPreferences.value + collapsedNavBarWidth2 + preferredMinimumPanelWidth;
      if (isSpecsListOpenPreferences.value) {
        contentWidth += specsListWidthPreferences.value;
        smallestIdealWindowSize += preferredMinimumPanelWidth;
      }
      const isWindowTooSmall = windowWidth.value < smallestIdealWindowSize;
      const doesContentFit = contentWidth > windowWidth.value || isWindowTooSmall;
      return {
        aut: getMinimum(absoluteAutMinimum, doesContentFit),
        specsList: getMinimum(absoluteSpecListMinimum, doesContentFit),
        reporter: getMinimum(absoluteReporterMinimum, doesContentFit)
      };
    });
    let fileToOpen;
    const openFileInIDE = useMutation(SpecRunnerOpenMode_OpenFileInIdeDocument);
    function openFile() {
      runnerUiStore.setShowChooseExternalEditorModal(false);
      if (!fileToOpen) {
        return;
      }
      openFileInIDE.executeMutation({
        input: {
          filePath: fileToOpen.absoluteFile,
          line: fileToOpen.line,
          column: fileToOpen.column
        }
      });
    }
    onMounted(() => {
      const eventManager2 = getEventManager();
      eventManager2.on("open:file", (file) => {
        fileToOpen = file;
        if (props.gql.localSettings.preferences.preferredEditorBinary) {
          openFile();
        } else {
          runnerUiStore.setShowChooseExternalEditorModal(true);
        }
      });
      eventManager2.on("save:app:state", (state) => {
        preferences.update("isSpecsListOpen", state.isSpecsListOpen);
        preferences.update("autoScrollingEnabled", state.autoScrollingEnabled);
      });
    });
    onBeforeUnmount(() => {
      cleanupRunner();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(_sfc_main$7, {
          open: unref(studioStore).instructionModalIsOpen,
          onClose: unref(studioStore).closeInstructionModal
        }, null, 8, ["open", "onClose"]),
        createVNode(_sfc_main$6, {
          open: unref(studioStore).saveModalIsOpen,
          onClose: unref(studioStore).closeSaveModal
        }, null, 8, ["open", "onClose"]),
        createVNode(_sfc_main$f, {
          id: "main-pane",
          class: "flex"
        }, {
          default: withCtx(() => [
            createVNode(_sfc_main$b),
            unref(runnerUiStore).automationStatus === "DISCONNECTED" ? (openBlock(), createBlock(_sfc_main$9, { key: 0 })) : unref(runnerUiStore).automationStatus === "MISSING" ? (openBlock(), createBlock(_sfc_main$8, {
              key: 1,
              gql: props.gql.currentProject
            }, null, 8, ["gql"])) : (openBlock(), createBlock(_sfc_main$c, {
              key: 2,
              style: normalizeStyle({ width: `calc(100vw - ${unref(screenshotStore).isScreenshotting ? 0 : unref(collapsedNavBarWidth2)}px)` }),
              "offset-left": unref(collapsedNavBarWidth2),
              "max-total-width": unref(windowWidth) - unref(collapsedNavBarWidth2),
              "initial-panel1-width": unref(specsListWidthPreferences),
              "initial-panel2-width": unref(reporterWidthPreferences),
              "min-panel1-width": unref(minWidths).specsList,
              "min-panel2-width": unref(minWidths).reporter,
              "min-panel3-width": unref(minWidths).aut,
              "show-panel1": unref(runnerUiStore).isSpecsListOpen && !unref(screenshotStore).isScreenshotting,
              "show-panel2": !unref(screenshotStore).isScreenshotting && !unref(hideCommandLog),
              onResizeEnd: unref(handleResizeEnd),
              onPanelWidthUpdated: unref(handlePanelWidthUpdated)
            }, {
              panel1: withCtx(({ isDragging }) => [
                props.gql.currentProject ? withDirectives((openBlock(), createBlock(_sfc_main$G, {
                  key: 0,
                  id: "inline-spec-list",
                  class: normalizeClass(["h-full bg-gray-1000 border-gray-900 border-r force-dark", { "pointer-events-none": isDragging }])
                }, {
                  default: withCtx(() => [
                    createVNode(_sfc_main$q, {
                      id: "reporter-inline-specs-list",
                      gql: props.gql
                    }, null, 8, ["gql"]),
                    createVNode(_sfc_main$H, {
                      open: unref(runnerUiStore).showChooseExternalEditorModal,
                      gql: props.gql,
                      onClose: _cache[0] || (_cache[0] = ($event) => unref(runnerUiStore).setShowChooseExternalEditorModal(false)),
                      onSelected: openFile
                    }, null, 8, ["open", "gql"])
                  ]),
                  _: 2
                }, 1032, ["class"])), [
                  [vShow, unref(runnerUiStore).isSpecsListOpen]
                ]) : createCommentVNode("", true)
              ]),
              panel2: withCtx(() => [
                createVNode(_sfc_main$G, { class: "h-full" }, {
                  default: withCtx(() => [
                    _cache[1] || (setBlockTracking(-1), _cache[1] = !unref(hideCommandLog) ? (openBlock(), createElementBlock("div", {
                      key: 0,
                      id: unref(REPORTER_ID),
                      class: "w-full force-dark"
                    }, null, 8, _hoisted_1$3)) : createCommentVNode("", true), setBlockTracking(1), _cache[1])
                  ]),
                  _: 1
                })
              ]),
              panel3: withCtx(() => [
                createVNode(_sfc_main$G, { class: "bg-white" }, {
                  default: withCtx(() => [
                    props.gql.currentProject ? (openBlock(), createBlock(_sfc_main$h, {
                      key: 0,
                      gql: props.gql.currentProject,
                      "event-manager": unref(eventManager),
                      "get-aut-iframe": unref(getAutIframeModel)
                    }, null, 8, ["gql", "event-manager", "get-aut-iframe"])) : createCommentVNode("", true)
                  ]),
                  _: 1
                }),
                createVNode(_sfc_main$g, { class: "h-0 p-[16px]" }, {
                  default: withCtx(() => [
                    unref(autStore).scriptError ? (openBlock(), createBlock(_sfc_main$d, {
                      key: 0,
                      error: unref(autStore).scriptError.error
                    }, null, 8, ["error"])) : createCommentVNode("", true),
                    withDirectives(createBaseVNode("div", {
                      id: unref(RUNNER_ID),
                      class: "origin-top viewport",
                      style: normalizeStyle(unref(viewportStyle))
                    }, null, 12, _hoisted_2$3), [
                      [vShow, !unref(autStore).scriptError]
                    ])
                  ]),
                  _: 1
                }),
                createVNode(_sfc_main$n, {
                  "event-manager": unref(eventManager),
                  "get-aut-iframe": unref(getAutIframeModel)
                }, null, 8, ["event-manager", "get-aut-iframe"]),
                createVNode(ScreenshotHelperPixels)
              ]),
              _: 1
            }, 8, ["style", "offset-left", "max-total-width", "initial-panel1-width", "initial-panel2-width", "min-panel1-width", "min-panel2-width", "min-panel3-width", "show-panel1", "show-panel2", "onResizeEnd", "onPanelWidthUpdated"]))
          ]),
          _: 1
        })
      ], 64);
    };
  }
});
const SpecRunnerOpenMode_vue_vue_type_style_index_0_scoped_8dd4e318_lang = "";
if (typeof block0 === "function")
  block0(_sfc_main$5);
const SpecRunnerOpenMode = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-8dd4e318"]]);
gql`
mutation TestsForRun ($spec: String!) {
  testsForRun (spec: $spec)
}
`;
const initialized = ref(false);
function useUnifiedRunner() {
  let prevQuery;
  onMounted(async () => {
    await UnifiedRunnerAPI.initialize();
    initialized.value = true;
  });
  onBeforeUnmount(() => {
    UnifiedRunnerAPI.teardown();
    initialized.value = false;
  });
  return {
    initialized: readonly(initialized),
    watchSpecs: (specs) => {
      const specStore = useSpecStore();
      const route = useRoute();
      const selectorPlaygroundStore = useSelectorPlaygroundStore();
      const testsForRunMutation = useMutation(TestsForRunDocument);
      watchEffect(async () => {
        var _a, _b;
        const queryFile = getPathForPlatform(route.query.file);
        if (!queryFile) {
          return;
        }
        const activeSpecInSpecsList = queryFile === RUN_ALL_SPECS_KEY ? RUN_ALL_SPECS : specs.value.find((x) => x.relative === queryFile);
        if (lodashExports.isEqual(route.query, prevQuery) && lodashExports.isEqual(activeSpecInSpecsList, specStore.activeSpec)) {
          return;
        }
        prevQuery = route.query;
        if (!activeSpecInSpecsList) {
          return specStore.setActiveSpec(null);
        }
        if (route.query.mode && route.query.mode === "debug") {
          const posixPath = posixify(activeSpecInSpecsList.relative);
          const res = await testsForRunMutation.executeMutation({ spec: posixPath });
          specStore.setTestFilter(((_b = (_a = res.data) == null ? void 0 : _a.testsForRun) == null ? void 0 : _b.length) ? res.data.testsForRun : void 0);
        } else {
          specStore.setTestFilter(void 0);
        }
        specStore.setActiveSpec({ ...activeSpecInSpecsList });
      });
      watch(() => getPathForPlatform(route.query.file), () => {
        if (selectorPlaygroundStore.show) {
          const autIframe = getAutIframeModel();
          autIframe.toggleSelectorPlayground(false);
          selectorPlaygroundStore.setEnabled(false);
          selectorPlaygroundStore.setShow(false);
        }
      }, { flush: "post" });
    }
  };
}
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "SpecRunnerContainerOpenMode",
  props: {
    gql: null
  },
  setup(__props) {
    const props = __props;
    const specStore = useSpecStore();
    const router = useRouter();
    const route = useRoute();
    const specs = computed(() => {
      var _a;
      return ((_a = props.gql.currentProject) == null ? void 0 : _a.specs) ?? [];
    });
    const { initialized: initialized2, watchSpecs } = useUnifiedRunner();
    watchSpecs(specs);
    specStore.$subscribe((mutation, state) => {
      const queryFile = getPathForPlatform(route.query.file);
      const shouldRedirect = route.name === "SpecRunner" && queryFile && state.activeSpec === null;
      if (shouldRedirect) {
        router.push({
          name: "Specs",
          params: {
            unrunnable: queryFile
          }
        });
      }
    }, {
      immediate: true
    });
    return (_ctx, _cache) => {
      return unref(initialized2) && unref(specStore).activeSpec ? (openBlock(), createBlock(SpecRunnerOpenMode, {
        key: 0,
        gql: props.gql
      }, null, 8, ["gql"])) : createCommentVNode("", true);
    };
  }
});
const _hoisted_1$2 = { class: "flex grow flex-wrap py-[16px] gap-[12px] justify-end" };
const _hoisted_2$2 = { class: "mx-[12px] max-w-full grid text-gray-600 items-center truncate" };
const _hoisted_3 = {
  key: 1,
  class: "grow"
};
const _hoisted_4 = ["src"];
const _hoisted_5 = { class: "whitespace-nowrap" };
const _hoisted_6 = {
  key: 0,
  class: "mr-[-6px] text-gray-500"
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "SpecRunnerHeaderRunMode",
  setup(__props) {
    const displayScale = computed(() => {
      return autStore.scale < 1 ? `${Math.round(autStore.scale * 100)}%` : 0;
    });
    const autStore = useAutStore();
    const { autHeaderEl } = useAutHeader();
    const selectedBrowser = window.__CYPRESS_BROWSER__;
    const testingType = window.__CYPRESS_TESTING_TYPE__;
    return (_ctx, _cache) => {
      const _component_i_cy_ruler_x16 = __unplugin_components_0$3;
      return openBlock(), createElementBlock("div", {
        id: "spec-runner-header",
        ref_key: "autHeaderEl",
        ref: autHeaderEl,
        class: "min-h-[64px] px-[16px] text-[14px]"
      }, [
        createBaseVNode("div", _hoisted_1$2, [
          unref(testingType) === "e2e" ? (openBlock(), createElementBlock("div", {
            key: 0,
            "data-cy": "aut-url",
            class: normalizeClass(["border rounded flex grow border-[1px] border-gray-100 h-[32px] align-middle overflow-hidden", {
              "bg-gray-50": unref(autStore).isLoadingUrl
            }])
          }, [
            createBaseVNode("div", _hoisted_2$2, toDisplayString(unref(autStore).url), 1)
          ], 2)) : (openBlock(), createElementBlock("div", _hoisted_3)),
          createVNode(_sfc_main$i, {
            "data-cy": "select-browser",
            disabled: unref(autStore).isRunning
          }, {
            heading: withCtx(() => [
              unref(selectedBrowser).displayName ? (openBlock(), createElementBlock("img", {
                key: 0,
                class: "min-w-[16px] w-[16px]",
                alt: "",
                src: unref(allBrowsersIcons)[unref(selectedBrowser).displayName] || unref(allBrowsersIcons).generic
              }, null, 8, _hoisted_4)) : createCommentVNode("", true),
              createTextVNode(" " + toDisplayString(unref(selectedBrowser).displayName) + " " + toDisplayString(unref(selectedBrowser).majorVersion), 1)
            ]),
            _: 1
          }, 8, ["disabled"]),
          createVNode(_sfc_main$i, {
            variant: "panel",
            "data-cy": "viewport"
          }, {
            heading: withCtx(() => [
              createVNode(_component_i_cy_ruler_x16, { class: "icon-dark-gray-500 icon-light-gray-400" }),
              createBaseVNode("span", _hoisted_5, toDisplayString(unref(autStore).viewportWidth) + "x" + toDisplayString(unref(autStore).viewportHeight), 1),
              unref(displayScale) ? (openBlock(), createElementBlock("span", _hoisted_6, "(" + toDisplayString(unref(displayScale)) + ")", 1)) : createCommentVNode("", true)
            ]),
            _: 1
          })
        ])
      ], 512);
    };
  }
});
const _hoisted_1$1 = ["id"];
const _hoisted_2$1 = ["id"];
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "SpecRunnerRunMode",
  setup(__props) {
    const eventManager = getEventManager();
    const autStore = useAutStore();
    const screenshotStore = useScreenshotStore();
    const runnerUiStore = useRunnerUiStore();
    const {
      viewportStyle,
      windowWidth
    } = useRunnerStyle();
    const {
      handlePanelWidthUpdated,
      handleResizeEnd
    } = useResizablePanels();
    const {
      initializeRunnerLifecycleEvents,
      startSpecWatcher,
      cleanupRunner
    } = useEventManager();
    const hideCommandLog = runnerUiStore.hideCommandLog;
    startSpecWatcher();
    onMounted(() => {
      initializeRunnerLifecycleEvents();
    });
    onBeforeUnmount(() => {
      cleanupRunner();
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$f, {
        id: "main-pane",
        class: "flex"
      }, {
        default: withCtx(() => [
          createVNode(_sfc_main$b),
          unref(runnerUiStore).automationStatus === "DISCONNECTED" ? (openBlock(), createBlock(_sfc_main$9, { key: 0 })) : unref(runnerUiStore).automationStatus === "MISSING" ? (openBlock(), createBlock(_sfc_main$8, { key: 1 })) : (openBlock(), createBlock(_sfc_main$c, {
            key: 2,
            class: "w-full",
            "max-total-width": unref(windowWidth),
            "initial-panel1-width": 0,
            "initial-panel2-width": unref(runnerUiStore).reporterWidth,
            "show-panel1": false,
            "show-panel2": !unref(screenshotStore).isScreenshotting && !unref(hideCommandLog),
            onResizeEnd: unref(handleResizeEnd),
            onPanelWidthUpdated: unref(handlePanelWidthUpdated)
          }, {
            panel2: withCtx(() => [
              createVNode(_sfc_main$G, { class: "h-full" }, {
                default: withCtx(() => [
                  _cache[0] || (setBlockTracking(-1), _cache[0] = !unref(hideCommandLog) ? (openBlock(), createElementBlock("div", {
                    key: 0,
                    id: unref(REPORTER_ID),
                    class: "w-full force-dark"
                  }, null, 8, _hoisted_1$1)) : createCommentVNode("", true), setBlockTracking(1), _cache[0])
                ]),
                _: 1
              })
            ]),
            panel3: withCtx(() => [
              createVNode(_sfc_main$G, null, {
                default: withCtx(() => [
                  createVNode(_sfc_main$3, {
                    "event-manager": unref(eventManager),
                    "get-aut-iframe": unref(getAutIframeModel),
                    class: "bg-white"
                  }, null, 8, ["event-manager", "get-aut-iframe"])
                ]),
                _: 1
              }),
              createVNode(_sfc_main$g, { class: "h-0 p-[16px]" }, {
                default: withCtx(() => [
                  unref(autStore).scriptError ? (openBlock(), createBlock(_sfc_main$d, {
                    key: 0,
                    error: unref(autStore).scriptError.error
                  }, null, 8, ["error"])) : createCommentVNode("", true),
                  withDirectives(createBaseVNode("div", {
                    id: unref(RUNNER_ID),
                    class: "origin-top viewport",
                    style: normalizeStyle(unref(viewportStyle))
                  }, null, 12, _hoisted_2$1), [
                    [vShow, !unref(autStore).scriptError]
                  ])
                ]),
                _: 1
              }),
              createVNode(_sfc_main$n, {
                "event-manager": unref(eventManager),
                "get-aut-iframe": unref(getAutIframeModel)
              }, null, 8, ["event-manager", "get-aut-iframe"]),
              createVNode(ScreenshotHelperPixels)
            ]),
            _: 1
          }, 8, ["max-total-width", "initial-panel2-width", "show-panel2", "onResizeEnd", "onPanelWidthUpdated"]))
        ]),
        _: 1
      });
    };
  }
});
const SpecRunnerRunMode_vue_vue_type_style_index_0_scoped_142a6429_lang = "";
if (typeof block0 === "function")
  block0(_sfc_main$2);
const SpecRunnerRunMode = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-142a6429"]]);
const _hoisted_1 = { key: 0 };
const _hoisted_2 = { key: 1 };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "SpecRunnerContainerRunMode",
  props: {
    runModeSpecs: null
  },
  setup(__props) {
    const props = __props;
    const specStore = useSpecStore();
    const { initialized: initialized2, watchSpecs } = useUnifiedRunner();
    watchSpecs(ref(props.runModeSpecs));
    return (_ctx, _cache) => {
      return unref(specStore).activeSpec ? (openBlock(), createElementBlock("div", _hoisted_1, [
        unref(initialized2) ? (openBlock(), createBlock(SpecRunnerRunMode, { key: 0 })) : createCommentVNode("", true)
      ])) : (openBlock(), createElementBlock("div", _hoisted_2, " Error, no spec matched! "));
    };
  }
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Runner",
  setup(__props) {
    gql`
query SpecPageContainer {
  ...SpecRunner
}
`;
    gql`
subscription SpecPageContainer_specsChange {
  specsChange {
    id
    specs {
      id
      ...SpecNode_InlineSpecList
    }
  }
}
`;
    gql`
subscription Runner_ConfigChange {
  configChange {
    id
    serveConfig
  }
}
`;
    useSubscription({
      query: SpecPageContainer_SpecsChangeDocument,
      pause: isRunMode
    });
    const query = useQuery({
      query: SpecPageContainerDocument,
      pause: isRunMode
    });
    let initialLoad = true;
    const specStore = useSpecStore();
    const configChangeHandler = (_prev, next) => {
      var _a;
      if (!((_a = next.configChange) == null ? void 0 : _a.serveConfig)) {
        throw Error(`Did not get expected serveConfig from subscription`);
      }
      if (!initialLoad && specStore.activeSpec) {
        try {
          window.__CYPRESS_CONFIG__ = next.configChange.serveConfig;
          const eventManager = useEventManager();
          const isRerun = true;
          eventManager.runSpec(isRerun);
        } catch (e) {
        }
      }
      initialLoad = false;
    };
    useSubscription({ query: Runner_ConfigChangeDocument }, configChangeHandler);
    const specs = window.__RUN_MODE_SPECS__;
    return (_ctx, _cache) => {
      var _a, _b;
      return openBlock(), createElementBlock("div", null, [
        unref(isRunMode) ? (openBlock(), createBlock(_sfc_main$1, {
          key: 0,
          "run-mode-specs": unref(specs)
        }, null, 8, ["run-mode-specs"])) : ((_b = (_a = unref(query).data.value) == null ? void 0 : _a.currentProject) == null ? void 0 : _b.specs) ? (openBlock(), createBlock(_sfc_main$4, {
          key: 1,
          gql: unref(query).data.value
        }, null, 8, ["gql"])) : createCommentVNode("", true)
      ]);
    };
  }
});
const Runner_vue_vue_type_style_index_0_lang = "";
if (typeof block0 === "function")
  block0(_sfc_main);
export {
  _sfc_main as default
};
