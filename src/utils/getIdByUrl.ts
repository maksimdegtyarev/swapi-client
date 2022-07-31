export const getIdByUrl = (url: string): number => {
  const regex = /.*\/([0-9]+)\//gm;
  let m;

  while ((m = regex.exec(url)) !== null) {
    if (m.index === regex.lastIndex) {
        regex.lastIndex++;
    }

    if (m.length > 1) {
      return Number(m[1]);
    }
  }
  throw new Error();
};