import { IncomingHttpHeaders } from 'http'

interface HttpHeaders extends IncomingHttpHeaders {
  token: string;
}

declare module 'egg' {
  interface Context {
    headers: HttpHeaders;
  }
  
  interface Request {
    headers: HttpHeaders;
  }
}
