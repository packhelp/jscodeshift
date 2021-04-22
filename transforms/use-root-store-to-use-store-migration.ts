import {API, FileInfo, Options} from 'jscodeshift';
import {ASTPath, JSCodeshift, ObjectPattern, VariableDeclaration} from "jscodeshift/src/core";

export default function someNewTransform(file: FileInfo, api: API, options: Options) {
  const jscodeshift: JSCodeshift = api.jscodeshift
  const root = jscodeshift(file.source)
  const keys: String[] = []

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
        .find<ObjectPattern>(jscodeshift.ObjectPattern)
        .at(0)
        .forEach((objectPattern: ASTPath<ObjectPattern>) => objectPattern.node.properties.map((property: any) => {
          keys.push(property.key.name)
          return property
        }))
    })
    .replaceWith(
      p => // <--- Shiet... I know how to search code,
                  //      but how to make new one?
    )

  return updatedAnything ? root.toSource() : null;
}
