import DataUriParser from "datauri/parser.js";
import path from "path";

export interface MultipartFile {
  type: string;
  fieldname: string;
  filename: string;
  encoding: string;
  mimetype: string;
  toBuffer: () => Promise<Buffer>;
}

export function getDataUri(file: MultipartFile): Promise<{ content: string }> {
  return file.toBuffer().then((buffer) => {
    const parser = new DataUriParser();
    const extName = path.extname(file.filename).toString();
    return parser.format(extName, buffer) as { content: string };
  });
}
