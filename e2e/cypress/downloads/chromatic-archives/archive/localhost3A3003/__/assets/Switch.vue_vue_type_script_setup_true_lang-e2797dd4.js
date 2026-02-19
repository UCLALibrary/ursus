import { d as defineComponent, o as openBlock, j as createElementBlock, a as createBaseVNode, n as normalizeClass } from "./index-8631b600.js";
const _hoisted_1 = ["id", "disabled", "aria-checked"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Switch",
  props: {
    value: { type: Boolean, default: false },
    size: { default: "lg" },
    name: null,
    disabled: { type: Boolean, default: false }
  },
  emits: ["update"],
  setup(__props) {
    const sizeClasses = {
      "sm": {
        container: "w-[16px] h-[10px]",
        indicator: "w-[6px] h-[6px] ml-[2px]",
        translate: "translate-x-[6px]"
      },
      "md": {
        container: "w-[24px] h-[12px]",
        indicator: "w-[8px] h-[8px] ml-[2px]",
        translate: "translate-x-[12px]"
      },
      "lg": {
        container: "w-[32px] h-[16px]",
        indicator: "w-[12px] h-[12px] ml-[2px]",
        translate: "translate-x-[14px]"
      },
      "xl": {
        container: "w-[48px] h-[24px]",
        indicator: "w-[16px] h-[16px] ml-[4px]",
        translate: "translate-x-[24px]"
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("button", {
        id: __props.name,
        class: normalizeClass(["border-transparent border rounded-[50px] relative hocus-default disabled:ring-0 disabled:outline-0 disabled:bg-gray-100", [__props.value ? "bg-jade-400" : "bg-gray-300", sizeClasses[__props.size].container, {
          "!hocus:ring-0": __props.size === "sm"
        }]]),
        disabled: __props.disabled,
        role: "switch",
        "aria-checked": __props.value,
        onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("update", !__props.value))
      }, [
        createBaseVNode("span", {
          class: normalizeClass(["bg-white rounded-[50px] transform transition-transform ease-out duration-200 block toggle", [{ [sizeClasses[__props.size].translate]: __props.value }, sizeClasses[__props.size].indicator]])
        }, null, 2)
      ], 10, _hoisted_1);
    };
  }
});
export {
  _sfc_main as _
};
