import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsEnum, IsOptional } from 'class-validator';

export enum SortOrder {
  DESC = 'desc',
  ASC = 'asc',
}

export class GetSnippetsQueryParamsDto {
  @ApiPropertyOptional({ description: 'What to order the snippets view by' })
  @IsEnum(SortOrder)
  @IsOptional()
  views?: SortOrder;

  @ApiPropertyOptional({
    description: 'What to order the snippets createdAt by',
  })
  @IsEnum(SortOrder)
  @IsOptional()
  createdAt?: SortOrder;

  @ApiPropertyOptional({ description: 'The page to fetch' })
  @IsInt()
  @Type(() => Number)
  page: number = 1;
}
