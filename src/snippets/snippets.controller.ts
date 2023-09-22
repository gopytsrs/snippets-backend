import { Controller, Get, Param, Post, Body, Query } from '@nestjs/common';
import { SnippetsService } from './snippets.service';
import { Snippet } from '@prisma/client';
import { CreateSnippetDto } from './dto/create-snippet.dto';
import { GetSnippetsQueryParamsDto } from './dto/get-snippets-query-params.dto';

@Controller('snippets')
export class SnippetsController {
  constructor(private readonly snippetsService: SnippetsService) {}

  @Get()
  async getSnippets(
    @Query() queryParams: GetSnippetsQueryParamsDto,
  ): Promise<Snippet[]> {
    return this.snippetsService.getSnippets(queryParams);
  }

  @Post('/create')
  async createSnippet(
    @Body() createSnippetDto: CreateSnippetDto,
  ): Promise<Snippet> {
    return this.snippetsService.createSnippet(createSnippetDto);
  }

  @Get(':uuid')
  async getSnippet(@Param('uuid') uuid: string): Promise<Snippet> {
    return this.snippetsService.getSnippet(uuid);
  }
}
