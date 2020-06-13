# canvas-pack

A creative-coding environment for JavaScript. It will automatically reload your code in the browser as soon as you make changes.

## Usage

1. Install canvas pack in your project (`npm install --save canvas-pack`).
2. Create `index.js` in root directory:

   ```javascript
   import createRegl from "regl";

   const canvas = document.getElementById("canvas");

   const regl = createRegl(canvas);

   const drawTriangle = regl({
     frag: `
      precision mediump float;
      uniform vec4 color;
      void main() {
         gl_FragColor = color;
      }`,

     vert: `
      precision mediump float;
      attribute vec2 position;
      void main() {
         gl_Position = vec4(position, 0, 1);
      }`,

     attributes: {
       position: regl.buffer([
         [-0.9, -0.9],
         [0.9, -0.9],
         [0.9, 0.9],
       ]),
     },

     uniforms: {
       color: regl.prop("color"),
     },

     count: 3,
   });

   regl.frame(({ time, tick }) => {
     regl.clear({
       color: [0, 0, 0, 0],
       depth: 1,
     });

     drawTriangle({
       color: [
         Math.cos(time * 0.1),
         Math.sin(time * 0.08),
         Math.cos(time * 0.3),
         1,
       ],
     });
   });
   ```

3. Add `start` script to `package.json`:

   ```json
   {
     "scripts": {
       "start": "canvas-pack"
     }
   }
   ```

4. Run `npm start`.
5. Open browser and navigate to [http://localhost:3000/](http://localhost:3000/).
