export async function wait(milliseconds: number): Promise<boolean> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, milliseconds);
  });
}
