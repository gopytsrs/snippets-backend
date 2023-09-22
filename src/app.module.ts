import { Module } from '@nestjs/common';
import { SnippetsModule } from './snippets/snippets.module';
import { PrismaModule } from './prisma/prisma.module';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    SnippetsModule,
    PrismaModule,
    LoggerModule.forRoot({
      pinoHttp: {
        customProps: () => ({
          context: 'HTTP',
        }),
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
            colorize: true,
            ignore: 'pid,res,req',
            levelFirst: true,
          },
        },
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
