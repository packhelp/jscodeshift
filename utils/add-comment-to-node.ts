import {JSCodeshift} from "jscodeshift/src/core";

export function addCommentToNode(codeApi: JSCodeshift, node, text: string) {
  const comment = codeApi.commentLine(text, true, false);
  const comments = node.node.comments = node.node.comments || [];
  comments.push(comment);
}
