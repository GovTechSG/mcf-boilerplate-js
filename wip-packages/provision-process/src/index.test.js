import childProcess from 'child_process';
import path from 'path';

const CONSOLE_DEBUG_ENABLED = false;

describe('provision-process', () => {
  const {spawn} = childProcess;

  let checkList;
  let testProcess;

  /**
   * Checks if the checkList is all true and resolves if it is.
   *
   * @param {Function} done
   */
  const verifyDone = (done) => {
    if (Object.keys(checkList).reduce((e, i) => e && checkList[i], true)) {
      done();
    } else if (checkList.errorless !== true) {
      done(new Error('an error occurred'));
    }
  };

  /**
   * Sets checklist parameters based on whether the :errorOutput
   * contains certain strings.
   *
   * @param {String} errorOutput
   * @param {String} signal
   */
  const matchErrorsToChecklist = (errorOutput, signal) => {
    if (errorOutput.match(`Signal ${signal} received.`)) {
      checkList.signalCodeEmitted = true;
    } else if (errorOutput.match(/Exiting with status code [0-9]+\./)) {
      checkList.childProcessExited = true;
    } else if (errorOutput.match(/AN ERROR OCCURRED/)) {
      checkList.errorless = false;
    }
  };

  /**
   * Sets checklist parameters based on whether the :standardOutput
   * contains certain strings.
   *
   * @param {String} standardOutput
   * @param {String} signal
   */
  const matchOutputToChecklist = (standardOutput, signal) => {
    if (standardOutput.match(/_test_output_ listening on [0-9]+/)) {
      testProcess.kill(signal);
      checkList.serverStarted = true;
    } else if (standardOutput.match(/_test_output_ server closed/)) {
      checkList.serverClosed = true;
    } else if (standardOutput.match(/_test_output_ middleware ran/)) {
      checkList.middlewareRan = true;
    }
  };

  beforeEach(() => {
    checkList = {
      serverStarted: false,
      signalCodeEmitted: false,
      middlewareRan: false,
      serverClosed: false,
      childProcessExited: false,
      errorless: true,
    };
    testProcess =
      spawn('node', [
        path.join(__dirname, '../test/resources/server.js'),
      ]);
  });

  it('works as expected with SIGINT', (done) => {
    const SIGNAL_CODE = 'SIGINT';

    testProcess.stderr.on('data', (data) => {
      const output = data.toString();
      CONSOLE_DEBUG_ENABLED && process.stderr.write('! ' + output);
      matchErrorsToChecklist(output, SIGNAL_CODE);
      verifyDone(done);
    });

    testProcess.stdout.on('data', (data) => {
      const output = data.toString();
      CONSOLE_DEBUG_ENABLED && process.stdout.write('> ' + output);
      matchOutputToChecklist(output, SIGNAL_CODE);
      verifyDone(done);
    });
  });

  it('works as expected with SIGTERM', (done) => {
    const SIGNAL_CODE = 'SIGTERM';

    testProcess.stderr.on('data', (data) => {
      const output = data.toString();
      CONSOLE_DEBUG_ENABLED && process.stderr.write('! ' + output);
      matchErrorsToChecklist(output, SIGNAL_CODE);
      verifyDone(done);
    });

    testProcess.stdout.on('data', (data) => {
      const output = data.toString();
      CONSOLE_DEBUG_ENABLED && process.stdout.write('> ' + output);
      matchOutputToChecklist(output, SIGNAL_CODE);
      verifyDone(done);
    });
  });
});
