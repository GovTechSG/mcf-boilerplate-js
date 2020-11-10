export interface IXrayMiddlewareOptions {
  config?: any[];
  daemonAddress?: string;
}

const AWSXRay = require('aws-xray-sdk');

export const DEFAULT_XRAY_CONFIG = [AWSXRay.plugins.EC2Plugin, AWSXRay.plugins.ECSPlugin];
export const DEFAULT_XRAY_DAEMON_ADDRESS = 'tcp:xray:2000 udp:xray:2000'
export const DEFAULT_AWS_XRAY_TRACING_NAME = 'boilerplate'