import express from 'express';
import supertest from 'supertest';

import chai from 'chai';
import sinonChai from 'sinon-chai';
import metricsMiddleware from './metrics';

chai.use(sinonChai);
const {expect} = chai;

describe('observability/metrics', () => {
  it('exports a function', () => {
    expect(metricsMiddleware).to.be.a('function');
  });

  it('has the correct keys', () => {
    expect(metricsMiddleware).to.have.keys([
      'constant',
      'getMetricsEndpointHandler',
      'instance',
      'options',
      'reset',
    ]);
  });

  context('integration tests', () => {
    it('returns an Express compatible middleware', () => {
      expect(() => {
        express().use(metricsMiddleware());
      }).to.not.throw();
    });

    describe('metrics endpoint registration', () => {
      const metricsEndpoint = '/_test_metrics_endpoint';

      beforeEach(() => {
        metricsMiddleware.reset();
      });

      after(() => {
        metricsMiddleware.reset();
      });

      it('works as expected', () => {
        const server = express();
        server.use(metricsMiddleware());
        server.use(
          metricsEndpoint,
          metricsMiddleware.getMetricsEndpointHandler()
        );
        return supertest(server)
          .get(metricsEndpoint)
          .expect(200)
          .expect('content-type', 'text/plain');
      });

      it('does not happen automatically', () => {
        const server = express();
        server.use(metricsMiddleware());
        return supertest(server)
          .get(metricsEndpoint)
          .expect(404);
      });

      it('has to be manually done', () => {
        const server = express();
        server.use(metricsMiddleware());
        server.use(
          metricsEndpoint,
          metricsMiddleware.getMetricsEndpointHandler()
        );
        const expectedMetrics =
          Object.keys(metricsMiddleware().promClient.register._metrics);
        return supertest(server)
          .get(metricsEndpoint)
          .expect(200)
          .then((res) => {
            expectedMetrics.forEach((expectedMetricLabel) => {
              expect(res.text).to.contain(expectedMetricLabel);
            });
          });
      });
    });
  });

  describe('constructor()', () => {
    let registeredMetrics;

    beforeEach(() => {
      metricsMiddleware.reset();
      metricsMiddleware();
      registeredMetrics =
        Object.keys(metricsMiddleware.instance.promClient.register._metrics);
    });

    it('returns a singleton', () => {
      const testValue = {metricsMiddleware: '_test_value'};
      metricsMiddleware.instance = testValue;
      expect(metricsMiddleware()).to.deep.equal(testValue);
    });

    it('returns from the .instance property', () => {
      const testValue = {metricsMiddleware: '_test_value'};
      metricsMiddleware.instance = testValue;
      expect(metricsMiddleware()).to.deep.equal(testValue);
      expect(metricsMiddleware()).to.deep.equal(metricsMiddleware.instance);
    });

    it('probes required process metrics', () => {
      expect(registeredMetrics).to.include.members([
        'up',
        'process_cpu_user_seconds_total',
        'process_cpu_system_seconds_total',
        'process_cpu_seconds_total',
        'process_start_time_seconds',
        'process_resident_memory_bytes',
        'process_virtual_memory_bytes',
        'process_heap_bytes',
        'process_open_fds',
        'process_max_fds',
      ]);
    });

    it('probes required runtime metrics', () => {
      expect(registeredMetrics).to.include.members([
        'nodejs_eventloop_lag_seconds',
        'nodejs_active_handles_total',
        'nodejs_active_requests_total',
        'nodejs_heap_size_total_bytes',
        'nodejs_heap_size_used_bytes',
        'nodejs_external_memory_bytes',
        'nodejs_heap_space_size_total_bytes',
        'nodejs_heap_space_size_used_bytes',
        'nodejs_heap_space_size_available_bytes',
        'nodejs_version_info',
      ]);
    });

    it('probes required http layer metrics', () => {
      expect(registeredMetrics).to.include.members([
        'http_request_duration_seconds',
      ]);
    });
  });

  describe('.instance', () => {
    beforeEach(() => {
      metricsMiddleware.reset();
    });

    it('is instantiated by the constructor', () => {
      expect(metricsMiddleware.instance).to.be.null;
      metricsMiddleware();
      expect(metricsMiddleware.instance).to.not.be.null;
    });
  });

  describe('.options', () => {
    it('configures the package to not autoregister a /metrics endpoint', () => {
      expect(metricsMiddleware.options.autoregister).to.deep.equal(false);
    });

    it('includes the path of the HTTP layer metrics', () => {
      expect(metricsMiddleware.options.includePath).to.deep.equal(true);
    });

    it('includes the method of the HTTP layer metrics', () => {
      expect(metricsMiddleware.options.includeMethod).to.deep.equal(true);
    });
  });

  describe('.reset()', () => {
    it('sets the .instance property to null', () => {
      metricsMiddleware.instance = 1;
      metricsMiddleware.reset();
      expect(metricsMiddleware.instance).to.be.null;
    });
  });
});
