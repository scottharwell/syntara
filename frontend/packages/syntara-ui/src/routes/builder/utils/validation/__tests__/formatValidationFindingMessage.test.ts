import { describe, expect, it } from 'vitest'

import { formatValidationFindingMessage } from '../formatValidationFindingMessage'

describe('formatValidationFindingMessage', () => {
  it('rewrites unreachable Node id messages to Step display names', () => {
    expect(
      formatValidationFindingMessage(
        "Node 'activity_7f0feaf7_abc' is unreachable from any trigger",
        'activity_7f0feaf7_abc',
        'Orphan Script'
      )
    ).toBe('Step "Orphan Script" is unreachable from any trigger')
  })

  it('uses Step terminology when name lookup fails', () => {
    const message = "Node 'activity_7f0feaf7_abc' is unreachable from any trigger"
    expect(formatValidationFindingMessage(message, 'activity_7f0feaf7_abc', undefined)).toBe(
      'Step "activity_7f0feaf7_abc" is unreachable from any trigger'
    )
  })

  it('falls back when node id is missing', () => {
    const message = 'Workflow must have at least one trigger'
    expect(formatValidationFindingMessage(message, null, 'Unused')).toBe(message)
  })

  it('uses Step terminology when name equals id', () => {
    const message = "Node 'script3' is unreachable from any trigger"
    expect(formatValidationFindingMessage(message, 'script3', 'script3')).toBe('Step "script3" is unreachable from any trigger')
  })

  it('replaces embedded ids in other finding messages without Node prefix', () => {
    expect(
      formatValidationFindingMessage(
        'Configuration for activity_7f0feaf7_abc is incomplete',
        'activity_7f0feaf7_abc',
        'Empty Script'
      )
    ).toBe('Configuration for Empty Script is incomplete')
  })

  it('leaves messages that do not embed the id unchanged', () => {
    expect(formatValidationFindingMessage('Missing required field: code', 'script-1', 'Empty Script')).toBe(
      'Missing required field: code'
    )
  })
})
