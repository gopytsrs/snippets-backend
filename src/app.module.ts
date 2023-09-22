import { Module } from '@nestjs/common';
import { SnippetsModule } from './snippets/snippets.module';

@Module({
  imports: [SnippetsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
