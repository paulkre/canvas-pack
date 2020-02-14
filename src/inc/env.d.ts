declare module "pad-number" {
  const padNumber: (
    value: number,
    padLength: number,
    character?: string
  ) => number;
  export default padNumber;
}
