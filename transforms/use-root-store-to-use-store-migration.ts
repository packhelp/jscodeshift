import {API, FileInfo, Options} from 'jscodeshift';
import {ASTPath, JSCodeshift} from "jscodeshift/src/core";

export default function someNewTransform(file: FileInfo, api: API, options: Options) {
  const jscodeshift: JSCodeshift = api.jscodeshift
  const root = jscodeshift(file.source)

  const updatedAnything = root
    .find(jscodeshift.VariableDeclaration)
  //                  \_____ Ok, ok, but how to find code blocks that contain
  //                         some specific stuff inside?

  return updatedAnything ? root.toSource() : null;
}

// Run transformation against code below in ASTExplorer:

// const Button = () => {
//   const { dielineService, authService, logger } = useRootStore()
//   return <button></button>
// }
