import Victor from 'victor';

const M_PI = Math.PI;

function fract(x) {
    if (x >= 0) return x - Math.floor(x);
    else return x - Math.ceil(x);
}

function mix(a, b, t) {
    return a + (b - a) * t;
}

function rand(x) {
    return fract(Math.sin(x) * 100000.0);
}

export default {
    perlin(x) {
        const i = Math.floor(x); // integer
        const f = fract(x); // fraction
        const u = f * f * (3.0 - 2.0 * f); // custom cubic curve
        return (mix(rand(i), rand(i + 1.0), u) + 1) / 2; // using it in the interpolation
    },
};
