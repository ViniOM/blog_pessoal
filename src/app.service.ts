import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  testeApp(): string {
    return '<h1>Hello World! TesteApp( )</h1>';
  }
}
