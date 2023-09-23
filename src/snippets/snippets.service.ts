import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Snippet } from '@prisma/client';
import { CreateSnippetDto } from './dto/create-snippet.dto';
import {
  GetSnippetsQueryParamsDto,
  SortOrder,
} from './dto/get-snippets-query-params.dto';
import { PAGE_SIZE } from './constants';
import { PaginatedResponse } from './types/PaginatedResponse';

@Injectable()
export class SnippetsService {
  private readonly logger = new Logger(SnippetsService.name);
  constructor(private prisma: PrismaService) {}

  async getSnippets(
    queryParams: GetSnippetsQueryParamsDto,
  ): Promise<PaginatedResponse<Snippet>> {
    const { views, createdAt, page } = queryParams;
    const where: Prisma.SnippetWhereInput = {
      expiresAt: { gte: new Date().toISOString() },
    };

    // Order matters, should order by view first
    const orderBy = [
      ...(views ? [{ views }] : []),
      {
        createdAt: createdAt || SortOrder.DESC,
      },
    ];

    const pagination = {
      take: PAGE_SIZE,
      skip: page ? (page - 1) * PAGE_SIZE : 0,
    };

    const total = await this.prisma.snippet.count({ where });

    this.logger.log(
      { orderBy, pagination, where },
      `[SnippetsService:getSnippets]`,
    );

    const snippets = await this.prisma.snippet.findMany({
      where,
      ...pagination,
      orderBy,
    });
    return {
      total,
      data: snippets,
    };
  }

  async createSnippet(createSnippetDto: CreateSnippetDto): Promise<Snippet> {
    const { title, content, expiryInSeconds } = createSnippetDto;
    this.logger.log({ title, content }, `[SnippetsService:createSnippet]`);
    return this.prisma.snippet.create({
      data: {
        title,
        content,
        createdAt: new Date(Date.now()),
        expiresAt: new Date(Date.now() + 1000 * expiryInSeconds),
      },
    });
  }

  async getSnippet(uuid: string): Promise<Snippet | null> {
    this.logger.log({ uuid }, `[SnippetsService:getSnippet]`);
    try {
      return await this.prisma.snippet.update({
        where: { uuid },
        data: { views: { increment: 1 } },
      });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        //Record not found ref:https://www.prisma.io/docs/reference/api-reference/error-reference#p2025
        if (err.code === 'P2025') {
          throw new BadRequestException(
            "Snippet with given uuid doesn't exist",
          );
        }
        throw err;
      }
    }
  }
}
