import {API, FileInfo, Options} from 'jscodeshift';
import {ASTPath, JSCodeshift, ImportDeclaration, StringLiteral} from "jscodeshift/src/core";
import {addCommentToNode} from "../utils/add-comment-to-node";

function isImportingFromCreator(path) {
  return path.indexOf('/creator/') > -1;
}

export default function someNewTransform(file: FileInfo, api: API, options: Options) {
  const jscodeshift: JSCodeshift = api.jscodeshift
  const root = jscodeshift(file.source)
  const nodesToUpdate = new Set<ASTPath<StringLiteral>>();

  const updatedAnything = root
    .find<ImportDeclaration>(jscodeshift.ImportDeclaration)
    .find<StringLiteral>(jscodeshift.StringLiteral)
    .filter((node) => isImportingFromCreator(node.value.value))
    .forEach((path) => nodesToUpdate.add(path));

  nodesToUpdate.forEach((node) => {
    console.log(`⛔️ Found forbidden import!`)
    console.log(`   File: ${file.path}`)
    console.log(`   Import path: ${node.value.value}`)
    addCommentToNode(jscodeshift, node, '⛔️ kurła nie importuj z creatora!')
  });

  return updatedAnything ? root.toSource() : null;
}

// Run:
//
// yarn run jscodeshift \
//   -t transforms/detect-invalid-imports.ts \
//   --extensions=ts \
//   --parser=ts \
//   --ignore-pattern=./../**/node_modules/** \
//   ./../packhelp/shared-libs/**/*.ts
