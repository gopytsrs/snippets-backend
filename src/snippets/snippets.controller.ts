import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Query,
  HttpStatus,
} from '@nestjs/common';
import { SnippetsService } from './snippets.service';
import { Snippet } from '@prisma/client';
import { CreateSnippetDto } from './dto/create-snippet.dto';
import { GetSnippetsQueryParamsDto } from './dto/get-snippets-query-params.dto';
import {
  ApiTags,
  ApiOkResponse,
  ApiInternalServerErrorResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { PaginatedResponse } from './types/PaginatedResponse';

@ApiTags('snippets')
@Controller('snippets')
export class SnippetsController {
  constructor(private readonly snippetsService: SnippetsService) {}

  @Get()
  @ApiOkResponse({
    description: 'The snippets have been succesfully fetched',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  async getSnippets(
    @Query() queryParams: GetSnippetsQueryParamsDto,
  ): Promise<PaginatedResponse<Snippet>> {
    return this.snippetsService.getSnippets(queryParams);
  }

  @Post('/create')
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: 'The snippet has been succesfully created',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  async createSnippet(
    @Body() createSnippetDto: CreateSnippetDto,
  ): Promise<Snippet> {
    return this.snippetsService.createSnippet(createSnippetDto);
  }

  @Get(':uuid')
  @ApiOkResponse({
    description: 'The snippet has been successfully fetched',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiBadRequestResponse({
    description: 'Bad request',
  })
  async getSnippet(@Param('uuid') uuid: string): Promise<Snippet> {
    return this.snippetsService.getSnippet(uuid);
  }
}
