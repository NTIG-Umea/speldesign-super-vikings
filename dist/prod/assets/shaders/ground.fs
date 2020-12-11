
---
name: Colorful Voronoi
type: fragment
author: Brandon Fogerty (xdpixel.com)
---

#ifdef GL_ES
precision mediump float;
#endif

uniform float time;
uniform vec2 resolution;
varying vec2 fragCoord;

#define M_PI 3.141592653589793

float rand(float x) {
    return mod(floor(x) * 421321.13213, 1.0) * mod(floor(x) * 32321.5433, 1.0);
}

float perlin(float x) {
	float i = floor(x);  // integer
    float f = fract(x);  // fraction
    float u = f * f * (3.0 - 2.0 * f ); // custom cubic curve
    return mix(rand(i), rand(i + 1.0), u); // using it in the interpolation
}

void main( void )
{
    vec2 uv = ( fragCoord.xy / resolution.xy );

    if(uv.y < perlin(uv.x + time)) {
        gl_FragColor = vec4(mod(uv.x + time, 1.0), 0.0, 0.0, 1.0);
    }
    else {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
    }

    /*
    if(mod(time, 1.0) < uv.y) {
        gl_FragColor = vec4(uv.x, uv.y, 1.0, 1.0);
    }
    else {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
    }
    */
}