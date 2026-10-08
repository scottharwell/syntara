/**
 * Rewrites backend validation finding messages so user-facing UI shows step
 * display names instead of raw activity ids when a name is known.
 *
 * Example:
 *   Node 'activity_7f0feaf7_…' is unreachable from any trigger
 *   → Step "My Script" is unreachable from any trigger
 */
export function formatValidationFindingMessage(
  message: string,
  nodeId: string | null,
  nodeName: string | undefined
): string {
  let formatted = message
  if (nodeId && nodeName && nodeName !== nodeId && formatted.includes(nodeId)) {
    formatted = formatted.split(nodeId).join(nodeName)
  }

  const nodeMatch = /^(?:Node|Step) '([^']+)'/i.exec(formatted)
  if (nodeMatch) {
    formatted = `Step "${nodeMatch[1]}"${formatted.slice(nodeMatch[0].length)}`
  }

  return formatted
}
