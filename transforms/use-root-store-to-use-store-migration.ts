import {API, FileInfo, Options} from 'jscodeshift';
import {ASTPath, JSCodeshift} from "jscodeshift/src/core";

export default function someNewTransform(file: FileInfo, api: API, options: Options) {
  const jscodeshift: JSCodeshift = api.jscodeshift
  const root = jscodeshift(file.source)

  const updatedAnything = root
    .find(jscodeshift.CatchClause)
  //                     \___ sooo, how should i know how things are named? :<
  //                          https://astexplorer.net to the rescue!

  return updatedAnything ? root.toSource() : null;
}
