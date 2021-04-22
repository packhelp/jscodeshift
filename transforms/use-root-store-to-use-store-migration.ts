import {API, FileInfo, Options} from 'jscodeshift';
import {ASTPath, JSCodeshift, ObjectPattern, VariableDeclaration} from "jscodeshift/src/core";

export default function someNewTransform(file: FileInfo, api: API, options: Options) {
  const jscodeshift: JSCodeshift = api.jscodeshift
  const root = jscodeshift(file.source)

  const updatedAnything = root
    .find(jscodeshift.VariableDeclaration, {
      declarations: [{
        type: 'VariableDeclarator',
        init: {
          type: 'CallExpression',
          callee: {
            name: 'useRootStore'
          }
        }
      }],
    })
    .forEach((variableDeclaration: ASTPath<VariableDeclaration>) => {
      jscodeshift(variableDeclaration)
        // \___ This is how we tell jscodeshift to search within code block
        //      instead of whole file :)
        .find<ObjectPattern>(jscodeshift.ObjectPattern)
    })
  return updatedAnything ? root.toSource() : null;
}
