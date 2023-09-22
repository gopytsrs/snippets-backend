import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsEnum, IsOptional } from 'class-validator';

export enum OrderKey {
  VIEWS = 'views',
  CREATED_AT = 'createdAt',
}

export enum SortOrder {
  DESC = 'desc',
  ASC = 'asc',
}

export class GetSnippetsQueryParamsDto {
  @ApiPropertyOptional({ description: 'The key to order the snippets by' })
  @IsEnum(OrderKey)
  @IsOptional()
  orderKey?: OrderKey;

  @ApiPropertyOptional({ description: 'The sort order' })
  @IsEnum(SortOrder)
  @IsOptional()
  sortOrder?: SortOrder;

  @ApiPropertyOptional({ description: 'The page to fetch' })
  @IsInt()
  @Type(() => Number)
  page: number = 1;
}
