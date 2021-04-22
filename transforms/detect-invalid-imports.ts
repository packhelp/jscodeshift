import {API, FileInfo, Options} from 'jscodeshift';
import {ASTPath, JSCodeshift, CatchClause} from "jscodeshift/src/core";
import {addCommentToNode} from "../utils/add-comment-to-node";

export default function someNewTransform(file: FileInfo, api: API, options: Options) {
  const jscodeshift: JSCodeshift = api.jscodeshift
  const root = jscodeshift(file.source)

  const updatedAnything = root                           // In root
    .find(jscodeshift.CatchClause)                       // find all "catch {}"
    .forEach((catchClause: ASTPath<CatchClause>) => {    // for each found
      return addCommentToNode(                           // add comment above
        jscodeshift,
        catchClause,
        'Found catch! :)'
      )
    })

  return updatedAnything ? root.toSource() : null;
}
