// When called without arguments, return the center of the rectangle. When a Point is passed as an argument, the rectangle’s x and y values are adjusted, so that the new center of the rectangle is p.
function center(rect, point) {
  const { x = 0, y = 0, width: w, height: h } = rect;
  if (!point) return $point(x + w / 2, y + h / 2);
  const { x: px, y: py } = point;
  rect.x = px - w / 2;
  rect.y = py - h / 2;
  return point;
}

// Return true if the given point lies within the bounds of the rectangle, false otherwise.
function containsPoint(rect, point) {
  const { x, y, width: w, height: h } = rect;
  const { x: px, y: py } = point;
  return x <= px && px <= x + w && y <= py && py <= y + h;
}

// Return true if the given rectangle lies entirely within the bounds of this rectangle, false otherwise.
function containsRect(rect, otherRect) {
  const { x, y, width: w, height: h } = rect;
  const { x: x1, y: y1, width: w1, height: h1 } = otherRect;
  return x <= x1 && y <= y1 && x1 + w1 <= x + w && y1 + h1 <= y + h;
}

// Return true if this rectangle intersects with the other rectangle, false otherwise.
function intersects(rect, otherRect) {
  const { x, y, width: w, height: h } = rect;
  const { x: x1, y: y1, width: w1, height: h1 } = otherRect;
  return x < x1 + w1 && x1 < x + w && y < y1 + h1 && y1 < y + h;
}

// Return a $rect that corresponds to the intersection of this rectangle with the other one.
function intersection(rect, otherRect) {
  const { x, y, width: w, height: h } = rect;
  const { x: x1, y: y1, width: w1, height: h1 } = otherRect;
  const nx = Math.max(x, x1);
  const nw = Math.min(x + w, x1 + w1) - nx;
  const ny = Math.max(y, y1);
  const nh = Math.min(y + h, y1 + h1) - ny;
  return $rect(nx, ny, nw, nh);
}

// Return the smallest $rect that encloses both rectangles.
function union(rect, otherRect) {
  const { x, y, width: w, height: h } = rect;
  const { x: x1, y: y1, width: w1, height: h1 } = otherRect;
  const nx = Math.min(x, x1);
  const nw = Math.max(x + w, x1 + w1) - nx;
  const ny = Math.min(y, y1);
  const nh = Math.max(y + h, y1 + h1) - ny;
  return $rect(nx, ny, nw, nh);
}
// Equivalent to $rect(r.x + x, r.y + y, r.w, r.h)
function translate(rect, { x: x1 = 0, y: y1 = 0 } = {}) {
  const { x, y, width, height } = rect;
  return $rect(x + x1, y + y1, width, height);
}

// Return a $rect that is adjusted by the given edge insets. bottom/right are optional and default to the same value as top/left.
function inset(rect, { top = 0, left = 0, right = left, bottom = top } = {}) {
  const { x, y, width, height } = rect;
  return $rect(x + left, y + top, width - left - right, height - top - bottom);
}

module.exports = {
  center,
  containsPoint,
  containsRect,
  intersects,
  intersection,
  union,
  translate,
  inset
};
