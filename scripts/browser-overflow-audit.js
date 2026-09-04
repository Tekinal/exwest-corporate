(() => {
  const root = document.documentElement;
  const viewportWidth = root.clientWidth;
  const tolerance = 1;
  const visible = (element) => {
    const style = getComputedStyle(element);
    const rect = element.getBoundingClientRect();
    return style.display !== "none" && style.visibility !== "hidden" && Number(style.opacity) !== 0 && rect.width > 0 && rect.height > 0;
  };
  const overflowing = Array.from(document.querySelectorAll("body *"))
    .filter(visible)
    .map((element) => ({
      element,
      rect: element.getBoundingClientRect(),
    }))
    .filter(({ rect }) => rect.left < -tolerance || rect.right > viewportWidth + tolerance)
    .map(({ element, rect }) => ({
      selector: `${element.tagName.toLowerCase()}${element.id ? `#${element.id}` : ""}${Array.from(element.classList).map((name) => `.${name}`).join("")}`,
      left: Math.round(rect.left * 10) / 10,
      right: Math.round(rect.right * 10) / 10,
      width: Math.round(rect.width * 10) / 10,
    }));
  const result = {
    url: location.href,
    viewport: { width: viewportWidth, height: window.innerHeight },
    documentWidth: root.scrollWidth,
    pass: root.scrollWidth <= viewportWidth && overflowing.length === 0,
    overflowing,
  };
  console.table(overflowing);
  if (!result.pass) throw new Error(`Horizontal overflow: document ${root.scrollWidth}px / viewport ${viewportWidth}px`);
  return result;
})();
