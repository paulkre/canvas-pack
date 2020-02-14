import pad from "pad-number";

type CanvasExporterType = {
  saveFrame(): Promise<void>;
};

function validateExtension(path: string) {
  if (!path.match(/\.png$/)) throw Error("Output file format must be PNG");
}

function getPadCount(path: string) {
  const matches = path.match(/(#+)/g);

  if (!matches)
    throw Error('Frame number must be encoded in path (e.g. "out/#####.png")');

  if (matches.length > 1)
    throw Error("Too many frame-number-placeholders in output path");

  return matches[0].length;
}

function getOutPathCreator(path: string, padCount: number) {
  const [part0, part1] = path.split("#").filter(str => str.length !== 0);
  return (frameNumber: number) =>
    `${part0}${pad(frameNumber, padCount)}${part1}`;
}

export const CanvasExporter: (
  canvas: HTMLCanvasElement,
  path?: string
) => CanvasExporterType = (canvas, path = "out/#####.png") => {
  validateExtension(path);
  const padCount = getPadCount(path);
  const maxFrameCount = Math.pow(10, padCount) - 1;
  const createOutPath = getOutPathCreator(path, padCount);
  const type = "image/png";

  let frameNumber = -1;

  return {
    async saveFrame() {
      if (frameNumber >= maxFrameCount) return;

      frameNumber++;
      await fetch(`/api/saveFrame/${btoa(createOutPath(frameNumber))}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": type
        },
        body: canvas.toDataURL(type).replace(/^data:image\/png;base64,/, "")
      });
    }
  };
};
