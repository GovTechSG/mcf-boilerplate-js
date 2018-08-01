# Example application
This directory contains an example application using all components in the `@mcf/*` namespace.

You will need Docker Compose to run the example:

```bash
docker-compose up
```

This example can be used to demonstrate tracing and centralised logging. To demonstrate tracing, run the following `curl` command:

```bash
curl "http://localhost:8084/trace/other"
```

This will utilise the packaged `request` module to send a request to a second server. All logs will be sent to the FluentD service, so check that out to see the centralised logs together with the B3 propagation headers required for distributed tracing.

You could also check out the Zipkin service at http://localhost:9411 to see the traces which were recorded.

# Cheers
