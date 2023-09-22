import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Snippet } from '@prisma/client';
import { CreateSnippetDto } from './dto/create-snippet.dto';
import { GetSnippetsQueryParamsDto } from './dto/get-snippets-query-params.dto';
import { PAGE_SIZE, SNIPPET_EXPIRY_TIME } from './constants';

@Injectable()
export class SnippetsService {
  private readonly logger = new Logger(SnippetsService.name);
  constructor(private prisma: PrismaService) {}

  private getLastSnippetDate(): string {
    // Get the last ate that the snippets will be consiere fresh
    const lastSnippetDate = Date.now() - SNIPPET_EXPIRY_TIME;
    return new Date(lastSnippetDate).toISOString();
  }

  async getSnippets(
    queryParams: GetSnippetsQueryParamsDto,
  ): Promise<Snippet[]> {
    //Todo: implement cursor pagination
    const { sortOrder, orderKey } = queryParams;
    const where: Prisma.SnippetWhereInput = {
      createdAt: { gte: this.getLastSnippetDate() },
    };
    const orderBy: Prisma.SnippetOrderByWithRelationInput =
      orderKey && sortOrder
        ? {
            [orderKey]: sortOrder,
          }
        : {};

    this.logger.log({ sortOrder, orderKey }, `[SnippetsService:getSnippets]`);
    return this.prisma.snippet.findMany({
      where,
      take: PAGE_SIZE,
      orderBy,
    });
  }

  async createSnippet(createSnippetDto: CreateSnippetDto): Promise<Snippet> {
    const { title, content } = createSnippetDto;
    this.logger.log({ title, content }, `[SnippetsService:createSnippet]`);
    return this.prisma.snippet.create({
      data: {
        title,
        content,
      },
    });
  }

  async getSnippet(uuid: string): Promise<Snippet> {
    this.logger.log({ uuid }, `[SnippetsService:getSnippet]`);
    return this.prisma.snippet.update({
      where: { uuid },
      data: { views: { increment: 1 } },
    });
  }
}
