import AWSXRay from 'aws-xray-sdk';

export interface IXrayMiddlewareOptions {
  config?: AWSXRay.plugins.Plugin[];
  daemonAddress?: string;
  tracingName?: string;
}

export const DEFAULT_XRAY_CONFIG = [AWSXRay.plugins.EC2Plugin, AWSXRay.plugins.ECSPlugin];
export const DEFAULT_XRAY_DAEMON_ADDRESS = 'tcp:xray-service.xray.svc.cluster.local:2000 udp:xray-service.xray.svc.cluster.local:2000'
export const DEFAULT_AWS_XRAY_TRACING_NAME = 'boilerplate'