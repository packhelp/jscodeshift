import {API, FileInfo, Options} from 'jscodeshift';
import {ASTPath, JSCodeshift, CatchClause} from "jscodeshift/src/core";

export default function someNewTransform(file: FileInfo, api: API, options: Options) {
  const jscodeshift: JSCodeshift = api.jscodeshift
  const root = jscodeshift(file.source)

  const updatedAnything = root
    .find(jscodeshift.CatchClause)

  return updatedAnything ? root.toSource() : null;
}
