import systemTests from '../lib/system-tests'

describe('e2e typescript in spec and support file', function () {
  systemTests.setup()

  it('spec passes', function () {
    return systemTests.exec(this, {
      spec: 'typescript_passing_spec.ts',
      snapshot: true,
    })
  })

  it('spec fails with syntax error', function () {
    return systemTests.exec(this, {
      spec: 'typescript_syntax_error_spec.ts',
      snapshot: true,
      expectedExitCode: 1,
      onStdout: systemTests.normalizeWebpackErrors,
    })
  })

  it('project passes', function () {
    return systemTests.exec(this, {
      project: 'ts-proj',
      snapshot: true,
    })
  })

  // this covers spec/support files as well as the plugins file
  // @see https://github.com/cypress-io/cypress/issues/7006
  // @see https://github.com/cypress-io/cypress/issues/8555
  it('respects tsconfig paths', function () {
    return systemTests.exec(this, {
      project: 'ts-proj-with-paths',
    })
  })
})
