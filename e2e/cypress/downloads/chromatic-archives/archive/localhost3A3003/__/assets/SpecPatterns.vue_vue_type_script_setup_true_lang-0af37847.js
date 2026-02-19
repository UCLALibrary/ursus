import { d as defineComponent, L as gql, o as openBlock, c as createBlock, w as withCtx, p as renderSlot, a as createBaseVNode, t as toDisplayString, ce as _sfc_main$3, k as createCommentVNode, m as computed, j as createElementBlock, n as normalizeClass, b as unref, u as useI18n, f as createVNode, F as Fragment, D as renderList, cf as __unplugin_components_0 } from "./index-8631b600.js";
const _hoisted_1$2 = ["onClick"];
const _hoisted_2$1 = { class: "text-purple-500 cursor-pointer" };
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "OpenConfigFileInIDE",
  props: {
    gql: null
  },
  setup(__props) {
    const props = __props;
    gql`
fragment OpenConfigFileInIDE on CurrentProject {
  id
  configFile
  configFileAbsolutePath
}
`;
    return (_ctx, _cache) => {
      return props.gql.configFileAbsolutePath ? (openBlock(), createBlock(_sfc_main$3, {
        key: 0,
        "file-path": props.gql.configFileAbsolutePath
      }, {
        default: withCtx(({ onClick }) => [
          renderSlot(_ctx.$slots, "default", { onClick }, () => [
            createBaseVNode("button", {
              "data-testid": "open-config-file",
              class: "hocus-link-default decoration-purple-500",
              onClick
            }, [
              createBaseVNode("span", _hoisted_2$1, toDisplayString(props.gql.configFile ?? "cypress.config.js"), 1)
            ], 8, _hoisted_1$2)
          ])
        ]),
        _: 3
      }, 8, ["file-path"])) : createCommentVNode("", true);
    };
  }
});
const _hoisted_1$1 = {
  class: "inline-flex items-center",
  "data-cy": "file-match-indicator"
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "FileMatchIndicator",
  props: {
    variant: { default: "default" }
  },
  setup(__props) {
    const props = __props;
    const colorClasses = {
      default: "bg-jade-100 text-jade-600",
      info: "bg-purple-100 text-purple-600"
    };
    const color = computed(() => {
      return colorClasses[props.variant];
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        createBaseVNode("span", {
          class: normalizeClass(["rounded font-medium h-[24px] text-center px-[8px] truncate select-none", unref(color)])
        }, [
          renderSlot(_ctx.$slots, "default")
        ], 2)
      ]);
    };
  }
});
const _hoisted_1 = { class: "rounded border-gray-100 border-[1px] w-full" };
const _hoisted_2 = { class: "flex p-[16px] items-center justify-between" };
const _hoisted_3 = { key: 0 };
const _hoisted_4 = { key: 1 };
const _hoisted_5 = ["onClick"];
const _hoisted_6 = { class: "group-hocus:underline" };
const _hoisted_7 = { class: "divide-gray-200 divide-y bg-gray-50 px-[16px]" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SpecPatterns",
  props: {
    gql: null,
    variant: null
  },
  setup(__props) {
    const props = __props;
    gql`
fragment SpecPatterns on CurrentProject {
  id
  config
  currentTestingType
  ...OpenConfigFileInIDE
  configFile
  specs {
    id
  }
}
`;
    const { t } = useI18n();
    const specPatterns = computed(() => {
      var _a;
      const patterns = (_a = props.gql.config.find((x) => x.field === "specPattern")) == null ? void 0 : _a.value;
      if (!patterns) {
        return [];
      }
      return typeof patterns === "string" ? [patterns] : patterns;
    });
    return (_ctx, _cache) => {
      const _component_i_cy_document_text_x16 = __unplugin_components_0;
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          createVNode(_sfc_main$1, {
            variant: props.variant
          }, {
            default: withCtx(() => [
              props.variant === "info" ? (openBlock(), createElementBlock("span", _hoisted_3, "specPattern")) : (openBlock(), createElementBlock("span", _hoisted_4, toDisplayString(unref(t)("components.specPattern.matches", props.gql.specs.length)), 1))
            ]),
            _: 1
          }, 8, ["variant"]),
          createVNode(_sfc_main$2, {
            gql: props.gql
          }, {
            default: withCtx(({ onClick }) => [
              createBaseVNode("button", {
                class: "flex outline-transparent text-indigo-500 gap-[8px] items-center group",
                onClick
              }, [
                createVNode(_component_i_cy_document_text_x16, { class: "icon-light-gray-100 icon-dark-gray-500" }),
                createBaseVNode("span", _hoisted_6, toDisplayString(props.gql.configFile), 1)
              ], 8, _hoisted_5)
            ]),
            _: 1
          }, 8, ["gql"])
        ]),
        createBaseVNode("div", _hoisted_7, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(specPatterns), (pattern) => {
            return openBlock(), createElementBlock("code", {
              key: pattern,
              class: "flex py-[8px] text-gray-600 text-[14px] leading-[24px] block",
              "data-cy": "spec-pattern"
            }, toDisplayString(pattern), 1);
          }), 128))
        ])
      ]);
    };
  }
});
export {
  _sfc_main as _,
  _sfc_main$2 as a,
  _sfc_main$1 as b
};
