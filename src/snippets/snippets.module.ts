import { Module } from '@nestjs/common';
import { SnippetsService } from './snippets.service';
import { SnippetsController } from './snippets.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [SnippetsController],
  providers: [SnippetsService, PrismaService],
})
export class SnippetsModule {}
