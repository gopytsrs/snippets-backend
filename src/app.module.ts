import { Module } from '@nestjs/common';
import { SnippetsModule } from './snippets/snippets.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [SnippetsModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
