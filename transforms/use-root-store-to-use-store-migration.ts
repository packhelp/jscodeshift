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
      node => keys.map(key =>
        jscodeshift.variableDeclaration.from({
          kind: "const",
          declarations: [
            // Lets dig deeper! 🕵️‍
            // But, if in trouble, https://grep.app to the rescue!
            // Search "variableDeclaration.from(" in it
          ]
        }
      ))
    )

  return updatedAnything ? root.toSource() : null;
}
