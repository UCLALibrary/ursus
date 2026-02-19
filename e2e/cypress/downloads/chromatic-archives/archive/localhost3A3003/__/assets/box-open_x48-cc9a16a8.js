import { d0 as decodeBase64Unicode, o as openBlock, j as createElementBlock, a_ as createStaticVNode } from "./index-8631b600.js";
function getPathForPlatform(posixPath) {
  if (!posixPath) {
    return null;
  }
  const cy = window.Cypress;
  const platform = (cy == null ? void 0 : cy.platform) || JSON.parse(decodeBase64Unicode(window.__CYPRESS_CONFIG__.base64Config)).platform;
  if (platform === "win32")
    return posixPath.replaceAll("/", "\\");
  return posixPath;
}
function posixify(path) {
  return path.replace(/\\/g, "/");
}
const _hoisted_1 = {
  height: "1em",
  width: "1em",
  style: { "min-width": "48px", "min-height": "48px" },
  viewBox: "0 0 48 48",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
};
const _hoisted_2 = /* @__PURE__ */ createStaticVNode('<path fill-rule="evenodd" clip-rule="evenodd" d="M43 25.1622L28.5 33L24\n28.4872V47L43 37.2564V25.1622Z" fill="#D0D2E0" class="icon-light"></path><path d="M24 9L5 18.7436L24 28.4872L43 18.7436L24 9Z" fill="#D0D2E0" class="icon-light"></path><path d="M24 47L5 37.2564V25.1622M24 47L43 37.2564V25.1622M24 47V28.4872M24\n9L5 18.7436M24 9L43 18.7436M24 9L28 5L47 14.5L43 18.7436M24 9L20 5L1 14.5L5\n18.7436M5 18.7436L24 28.4872M5 18.7436L1 23L5 25.1622M43 18.7436L24\n28.4872M43 18.7436L47 23L43 25.1622M24 28.4872L19.5 33L5 25.1622M24\n28.4872L28.5 33L43 25.1622" stroke="#1B1E2E" class="icon-dark" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M18 7L19.1314 9.86863L22 11L19.1314 12.1314L18 15L16.8686\n12.1314L14 11L16.8686 9.86863L18 7Z" fill="#1FA971" stroke="#00814D" class="icon-dark-secondary-stroke icon-light-secondary-fill" stroke-width="2" stroke-linejoin="round"></path><path d="M27 1L27.8485 3.15147L30 4L27.8485 4.84853L27 7L26.1515 4.84853L24\n4L26.1515 3.15147L27 1Z" fill="#1FA971" stroke="#00814D" class="icon-dark-secondary-stroke icon-light-secondary-fill" stroke-width="2" stroke-linejoin="round"></path><path d="M28 12L29.4142 15.5858L33 17L29.4142 18.4142L28 22L26.5858\n18.4142L23 17L26.5858 15.5858L28 12Z" fill="#1FA971" stroke="#00814D" class="icon-dark-secondary-stroke icon-light-secondary-fill" stroke-width="2" stroke-linejoin="round"></path>', 6);
const _hoisted_8 = [
  _hoisted_2
];
function render(_ctx, _cache) {
  return openBlock(), createElementBlock("svg", _hoisted_1, _hoisted_8);
}
const __unplugin_components_0 = { name: "cy-box-open_x48", render };
export {
  __unplugin_components_0 as _,
  getPathForPlatform as g,
  posixify as p
};
