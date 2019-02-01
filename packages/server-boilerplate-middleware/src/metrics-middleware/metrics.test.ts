import express from 'express';
import supertest from 'supertest';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import {metricsMiddleware, stopPushgateway} from './metrics';

chai.use(sinonChai);
const {expect} = chai;

describe('metrics-middleware', () => {
  context('integration tests', () => {
    describe('metrics endpoint registration', () => {
      const metricsEndpoint = '/_test_metrics_endpoint';

      it('works as expected', () => {
        const metrics = metricsMiddleware();
        const server = express();
        server.use(metrics);
        server.use(metricsEndpoint, metrics.metricsMiddleware);
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
        const metrics = metricsMiddleware();
        const server = express();
        server.use(metrics);
        server.use(metricsEndpoint, metrics.metricsMiddleware);
        const expectedMetrics = Object.keys(metrics.promClient.register._metrics);
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

    describe('pushgateway support', () => {
      const pushgatewayJobName = '_test_job';
      const pushgatewayMetricsEndpoint = '/metrics/job/:jobName';
      const mockPushgatewayInterface = '0.0.0.0';
      let mockPushgatewayServer;

      beforeEach(() => {
        console.log('before each');
        mockPushgatewayServer = express();
      });

      it('works', (done) => {
        console.log('gggggggggggggggggggggggggg');
        mockPushgatewayServer.put(pushgatewayMetricsEndpoint, (req, res) => {
          console.log('received request');
          expect(req.params.jobName).to.equal(pushgatewayJobName);
          let data = '';
          req.on('data', (chunk) => (data += chunk.toString()));
          req.on('end', () => {
            res.send('ok');
            expect(data).to.contain('up 1');
            stopPushgateway();
            mockInstance.close();
            done();
          });
        });
        console.log('before listen', mockPushgatewayServer.listen, mockPushgatewayInterface);
        const mockInstance = mockPushgatewayServer.listen(
          null, // this assigns a random open port
          mockPushgatewayInterface,
        );
        mockInstance.on('listening', () => {
          const {port} = mockInstance.address(); // retrieve random port
          console.log('onlistening', port);
          metricsMiddleware({
            probeIntervalInMilliseconds: 500,
            // ^ any lower than 500 risks race condition to done()
            pushgatewayJobName,
            pushgatewayUrl: `http://${mockPushgatewayInterface}:${port}/`,
          });
        });
      });
    });
  });

  describe('available metrics', () => {
    let registeredMetrics;

    beforeEach(() => {
      const metrics = metricsMiddleware();
      registeredMetrics = Object.keys(metrics.promClient.register._metrics);
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
      expect(registeredMetrics).to.include.members(['http_request_duration_seconds']);
    });
  });
});
