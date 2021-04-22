import {API, FileInfo, Options} from 'jscodeshift';
import {ASTPath, JSCodeshift, ImportDeclaration, StringLiteral} from "jscodeshift/src/core";

export default function someNewTransform(file: FileInfo, api: API, options: Options) {
  const jscodeshift: JSCodeshift = api.jscodeshift
  const root = jscodeshift(file.source)

  const updatedAnything = root
    .find<ImportDeclaration>(jscodeshift.ImportDeclaration)
    .find<StringLiteral>(jscodeshift.StringLiteral)

  return updatedAnything ? root.toSource() : null;
}
