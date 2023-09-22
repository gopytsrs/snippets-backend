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
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { PaginatedResponse } from './types/PaginatedResponse';

@ApiTags('snippets')
@Controller('snippets')
export class SnippetsController {
  constructor(private readonly snippetsService: SnippetsService) {}

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The snippets have been succesfully fetched',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  async getSnippets(
    @Query() queryParams: GetSnippetsQueryParamsDto,
  ): Promise<PaginatedResponse<Snippet>> {
    return this.snippetsService.getSnippets(queryParams);
  }

  @Post('/create')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The snippet has been succesfully created',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  async createSnippet(
    @Body() createSnippetDto: CreateSnippetDto,
  ): Promise<Snippet> {
    return this.snippetsService.createSnippet(createSnippetDto);
  }

  @Get(':uuid')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The snippet has been successfully fetched',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Malformed request body',
  })
  async getSnippet(@Param('uuid') uuid: string): Promise<Snippet> {
    return this.snippetsService.getSnippet(uuid);
  }
}
