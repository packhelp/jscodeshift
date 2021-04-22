import {API, FileInfo, Options} from 'jscodeshift';
import {ASTPath, JSCodeshift, ImportDeclaration, StringLiteral} from "jscodeshift/src/core";

function isImportingFromCreator(path) {
  return path.indexOf('/creator/') > -1;
}

export default function someNewTransform(file: FileInfo, api: API, options: Options) {
  const jscodeshift: JSCodeshift = api.jscodeshift
  const root = jscodeshift(file.source)
  const nodesToUpdate = new Set();

  const updatedAnything = root
    .find<ImportDeclaration>(jscodeshift.ImportDeclaration)
    .find<StringLiteral>(jscodeshift.StringLiteral)
    .filter((node) => isImportingFromCreator(node.value.value))
    .forEach((path) => nodesToUpdate.add(path));

  return updatedAnything ? root.toSource() : null;
}
