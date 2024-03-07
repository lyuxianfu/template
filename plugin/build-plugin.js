import fs from "fs";
import path from "path";
import archiver from "archiver";
export default () => {
  let outDir;
  let isDev = false;
  return {
    config(data) {
      isDev = data.isDev;
      outDir = data?.build?.outDir || "dist";
    },
    async closeBundle() {
      if (isDev) return;
      const sourceFilePath = path.resolve(__dirname, "../" + outDir);
      const zipFileName = path.resolve(__dirname, "../" + outDir + ".zip");

      const output = fs.createWriteStream(zipFileName);
      const archive = archiver("zip", { zlib: { level: 9 } });

      output.on("close", () => {
        console.log("Folder compressed successfully!");
      });

      archive.pipe(output);
      archive.directory(sourceFilePath, outDir);
      archive.finalize();
    },
  };
};
