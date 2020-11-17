# Example application
This directory contains an example application using all components in the `@mcf/*` namespace.

You will need Docker Compose to run the example:

```bash
docker-compose up
```

Tracing is done with AWS X-Ray, in order to setup and test, you would need to have your AWS credentials setup already.The `docker-compose` would reference your machine's `~/.aws` credentials for permissions to send the x-ray trace data to AWS.

```bash
cp .env-example .env
```

- Replace `AWS_PROFILE` with your local aws profile name
- To demonstrate tracing, run the following `curl` command:

```bash
curl "http://localhost:8084/trace/other"
# OR
curl "http://localhost:8085/trace/other"
```

This will utilise the packaged `request` module to send a request to a second server. All logs will be sent to the FluentD service, so check that out to see the centralised logs.

In order to see the x-ray tracing, login to your AWS console and check out the x-ray service.

The following services are made available while this example is running:

| Service | URL |
| --- | --- |
| Kibana | [http://localhost:5601](http://localhost:5601) |
| Prometheus | [http://localhost:9090](http://localhost:9090) |
