import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { NextFunction, Request, Response } from 'express';
import { Histogram, Counter } from "prom-client";

@Injectable()
export class LatencyMiddleware implements NestMiddleware {
  constructor(
    @InjectMetric("http_request_duration_ms") public latencyGraph: Histogram<string>,
    @InjectMetric("http_response_status_code") public statusCodeCounter: Counter<string>
    ) {}
  use(req: Request, res: Response, next: NextFunction) {
    let start = Date.now();
    res.on('close', () => {
      this.statusCodeCounter.labels(res.statusCode.toString(), req.path).inc()
      this.latencyGraph.labels(req.path).observe(Date.now() - start)
    });

    next();
  }
}
