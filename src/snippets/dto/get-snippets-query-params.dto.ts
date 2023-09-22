import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsEnum, IsOptional } from 'class-validator';

export enum OrderKey {
  VIEWS = 'views',
  DATE = 'date',
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
  cursorId: number = 1;
}
