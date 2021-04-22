import {API, FileInfo, Options} from 'jscodeshift';
import {ASTPath, JSCodeshift, ObjectPattern, VariableDeclaration} from "jscodeshift/src/core";

const capitalizeFirstLetter = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export default function someNewTransform(file: FileInfo, api: API, options: Options) {
  const jscodeshift: JSCodeshift = api.jscodeshift
  const root = jscodeshift(file.source)
  const keys = []

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
              jscodeshift.variableDeclarator.from({
                id: jscodeshift.identifier(key),
                init: jscodeshift.callExpression.from({
                  callee: jscodeshift.identifier('useStore'),
                  arguments: [
                    jscodeshift.memberExpression(
                      jscodeshift.identifier('Stores'),
                      jscodeshift.identifier(capitalizeFirstLetter(key))
                    )
                  ]
                })
              })    // Alright!
            ]       // Now, let's run "yarn test"
          }         // And obviously let's check if it fails
        ))          // if we remove "capitalizeFirstLetter"
    ).toSource()

  return updatedAnything ? root.toSource() : null;
}
