import {API, FileInfo, Options} from 'jscodeshift';
import {ASTPath, JSCodeshift, ImportDeclaration} from "jscodeshift/src/core";

export default function someNewTransform(file: FileInfo, api: API, options: Options) {
  const jscodeshift: JSCodeshift = api.jscodeshift
  const root = jscodeshift(file.source)

  const updatedAnything = root
    .find<ImportDeclaration>(jscodeshift.ImportDeclaration)

  return updatedAnything ? root.toSource() : null;
}
