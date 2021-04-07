import {API, FileInfo} from 'jscodeshift';
import {ASTPath, CatchClause, Collection, JSCodeshift, ThrowStatement} from "jscodeshift/src/core";

function addCommentToNode(codeApi: JSCodeshift, node, text: string) {
  const comment = codeApi.commentLine(text, true, false);
  const comments = node.node.comments = node.node.comments || [];
  comments.push(comment);
}

function performValidations(codeApi: JSCodeshift, catchClausePath: ASTPath<CatchClause>) {
  const catchClauseSourceCode = codeApi(catchClausePath)
  const throwStatements = catchClauseSourceCode.find(codeApi.ThrowStatement)

  assertMissingCatchParam(codeApi, catchClausePath, throwStatements)
  assertMissingThrowStatement(codeApi, catchClausePath, throwStatements)

  throwStatements.forEach(throwPath => {
    assertNotUsedCatchParamInThrowStatement(codeApi, catchClausePath, throwPath)
  })
}

function assertMissingCatchParam(codeApi: JSCodeshift, catchClausePath: ASTPath<CatchClause>, throwStatements: Collection<ThrowStatement>) {
  const catchParam = catchClausePath.node.param
  if (!catchParam) {
    addCommentToNode(codeApi, catchClausePath, ' ⚠️ Potential issue: missing catch param')
  }
}

function assertMissingThrowStatement(codeApi: JSCodeshift, catchClausePath: ASTPath<CatchClause>, throwStatements: Collection<ThrowStatement>) {
  const noThrowStatements = throwStatements.length === 0
  if (noThrowStatements) {
    addCommentToNode(codeApi, catchClausePath, ' ⚠️ Potential issue: missing throw in catch clause')
  }
}

function assertNotUsedCatchParamInThrowStatement(codeApi: JSCodeshift, catchClausePath: ASTPath<CatchClause>, throwPath) {
  const catchParam = catchClausePath.node.param
  if (catchParam) {
    const throwIdentifiersWithCatchParam = codeApi(throwPath).find(codeApi.Identifier, {name: (catchParam as any).name})

    if (throwIdentifiersWithCatchParam.length === 0) {
      addCommentToNode(codeApi, catchClausePath, ' ⚠️ Potential issue: missing catch param identifier in throw statement')
    }
  }
}

/**
 *
 * Transformer
 *
 */

export default function transformer(file: FileInfo, api: API) {
  const codeApi = api.jscodeshift
  const fileSourceCode = codeApi(file.source)

  return fileSourceCode
    .find(codeApi.CatchClause)
    .forEach(catchClausePath => {
      performValidations(codeApi, catchClausePath)
    })
    .toSource();
}


