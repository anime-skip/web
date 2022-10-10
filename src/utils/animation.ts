export type InterpolationFn = (start: number, end: number, decimalPercent: number) => number;

export const InterpolateLinear: InterpolationFn = (start, end, decimalPercent) =>
  start + (end - start) * decimalPercent;

/**
 * Based off two points, V and P, where V is the vertex and where V and P are both located on the
 * `y=x` line, such as:
 *
 * ```
 * V=(0,0) P=(48,48)
 * ```
 *
 * The general form of a quadratic equation, `y - y1 = m(x - x_1)^2`, can be simplified to:
 *
 * ```
 * x1 = V_x
 * y1 = V_y
 * m = 1 / (P_x - V_x) = 1 / (P_y - V_y)
 *
 * y = (x - V_x)^2 / (P_x - V_x) + V_y
 * ```
 *
 * But for interpolation and because the points are on the `x=y` line, this can be simplified even
 * further:
 *
 * ```
 * V = (v, v)
 * P = (p, p)
 *
 * y = (x - v)^2 / (p - v) + v
 * ```
 *
 * Enter this equation into <https://www.desmos.com/calculator> for verification.
 *
 * ```
 * v=4
 * p=0
 * y=\frac{\left(x-v\right)^{2}}{p-v}+v
 * ```
 */
function quadratic(v: number, p: number, x: number, pow = 2): number {
  return Math.pow(x - v, 2) / (p - v) + v;
}

/**
 * Simple quadratic interpolation, where the vertex of the parabola is the end value
 */
export const InterpolateEaseOut: InterpolationFn = (start, end, decimalPercent) =>
  quadratic(end, start, (end - start) * decimalPercent, 6);

/**
 * Simple quadratic interpolation, where the vertex of the parabola is the start value
 */
export const InterpolateEaseIn: InterpolationFn = (start, end, decimalPercent) =>
  quadratic(start, end, (end - start) * decimalPercent, 6);
